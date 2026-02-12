const numericPositveExpresion = /^([0-9]+)(\.[0-9]+)?([eE][\+-]?[0-9]+)?$/;
const numericExpresion = /^(-*[0-9]+)(\.[0-9]+)?([eE][\+-]?[0-9]+)?$/;
const alfabeticExpresion = /^[a-zA-Záéíóúñ]+$/;
const alfabeticWithSpaceExpresion = /^[a-zA-Záéíóúñ\s]+$/
const alfanumericExpresion = /^[a-zA-Záéíóúñ0-9_-]+$|^$|^\s$/;
const dateFormatExpresion = /^(19\d\d|20\d\d)[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])([T](0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[12345][0-9]):(0[0-9]|[12345][0-9]))*$/;
const urlExpresion = /^(((ht|ft)ps?):\/\/)?[\w-\.]+(:\d+)?([\w-\.,@?^=%&:/~\+#]*[\w-@?^=%&/~\+#])?$/i;
const specialCharacters = /[\W|_]+/g;

const validator = {

    assert: function (value, fn ) {
        if (validator.is(value, 'function') && !fn) {
            return function() { 
                return value.apply(null, arguments);
            };
        }
        return fn(value);
    },

    isPositiveNumber: function (value) {
        return numericPositveExpresion.test(value);
    },
    isNumber: function (value) {
        return numericExpresion.test(value);
    },

    isOnlyText: function (value) {
        return alfabeticExpresion.test(value);
    },
    isTextWithSpace: function (value) {
        return alfabeticWithSpaceExpresion.test(value);
    },
    isAlfaNumeric: function (value) {
        return alfanumericExpresion.test(value);
    },

    hasSpecialCharacters: function (value) {
        return specialCharacters.test(value);
    },

    isEmpty: function (value) {
        if (value && validator.is(value, 'object')) {
            value = Object.keys(value);
        };
        return trim(convertObjectToString(value)) === '';
    },

    isNullOrUndefined: function (value) {
        return value === null || value === undefined;
    },
    isNullOrUndefinedOrEmpty: function (value) {
        return value === null || value === undefined || validator.isEmpty(value);
    },

    isISODate: function (value) {
        return dateFormatExpresion.test(value) || value instanceof Date;
    },

    isURL: function (value) {
        return urlExpresion.test(value);
    },

    greaterThen: function (intValue1, intValue2) {
        if (!intValue2) {
            return function(val) {
                return val > intValue1;
            };
        }

        return intValue1 > intValue2;
    },
    lowerThen: function (intValue1, intValue2) {
        if (!intValue2) {
            return function(val) {
                return val < intValue1;
            };
        }
        return intValue1 < intValue2;
    },
    greaterOrEqualsThen: function (intValue1, intValue2) {
        if (!intValue2) {
            return function(val) {
                return val >= intValue1;
            };
        }
        return intValue1 >= intValue2;
    },
    lowerOrEqualsThen: function (intValue1, intValue2) {
        if (!intValue2) {
            return function(val) {
                return val <= intValue1;
            };
        }
        return intValue1 <= intValue2;
    },
    isPrimitive: function (value) {
        return validator.is(value, 'string') || validator.is(value, 'number') || validator.is(value, 'boolean');
    },
    is: function (value, type) {
        return RegExp( '\\[object ' + type + '\\]', 'i').test(Object.prototype.toString.call(value));
    },

    isValidJson: function (json) {
        try {
            JSON.parse(json);
            return true;
        } catch (e) {
            return false;
        }
    },    
    isValidXml: function (xml) {
        try {
            XML.parse(xml);
            return true;
        } catch (e) {
            return false;
        }
    }
}

function convertValue(value) {
    try {
        return JSON.parse(trim(value));
    } catch(e) {}

    return trim(value);
}

function convertObjectToString(value) {
    try {
        return JSON.stringify(value).replace(/[\{\}\[\]]+/, "");
    } catch(e) {}

    return trim(value);
}

function trim(value) {
    return value.replace(/^\s*|\s*$/g, '');
}

function validate(value) {
    let upValue = value;
    return {
        assert: function(...validationFunctions) {
            if (!validator.is(validationFunctions, "array")) {
                validationFunctions = null;
                return false;
            }
            
            let fnValidator = "";
            let result = true;
            for (let i = 0, len = validationFunctions.length; i < len; i++) {
                fnValidator = validationFunctions[i];

                if (validator.is(fnValidator, 'array')) {
                    let  resultOr = false;
                    for (let f = 0, flen = fnValidator.length; f < flen; f++) {
                        if (validator.is(fnValidator[f], 'function')) {
                            resultOr = resultOr || fnValidator[f](value, upValue);
                            continue;
                        }
                        
                        resultOr = resultOr || validator[fnValidator[f]](value, upValue);
                    }
                    result =result && resultOr;
                    continue;
                }

                if (validator.is(fnValidator, 'function')) {
                    result =result && fnValidator(value, upValue);
                    continue;
                }
                
                result =result && validator[fnValidator](value, upValue);
                
                if (!result) return false;
            }
            validationFunctions = null;

            return result;
        },
        setValue: function(_value) {
            value = _value;
            upValue = _value;
            
            if (_value && '__value' in _value) {
                value = _value.__value;
            }
        }
    }
}

function json2xml(objectValue, root = 'root') {
    let pieces = [], att = null;
    if (!validator.isPrimitive(objectValue)) {
        for (const key in objectValue) {
            if (Object.prototype.hasOwnProperty.call(objectValue, key)) {
                if (key === "@att") {
                    att = objectValue[key];
                    continue;
                }
                if (key === "#text") {
                    pieces.push(objectValue[key]);
                    continue;
                }
                if (validator.isPrimitive(objectValue[key])) {
                    if (/[\/&<>'"]+/g.test(objectValue[key])) {
                        pieces.push(`<${key}><![CDATA[${objectValue[key]}]]></${key}>`);
                        continue;
                    }
                    pieces.push(`<${key}>${objectValue[key]}</${key}>`);
                }  
                if (validator.is(objectValue[key], "object")) {
                    pieces = pieces.concat(json2xml(objectValue[key], key));
                    continue;
                } 
                if (validator.is(objectValue[key], "array")) {
                    let array = [`<${key}>`], k = key.replace(/(es|s)$/gi,'');
                    for (let i = 0, len = objectValue[key].length; i < len; i++) {
                        if (validator.is(objectValue[key][i], "object")) {
                            array = array.concat(json2xml(objectValue[key][i], k));
                            continue;
                        }
                        if (validator.isPrimitive(objectValue[key][i])) {
                            if (/[\/&<>'"]+/g.test(objectValue[key][i])) {
                                array.push(`<${k}><![CDATA[${objectValue[key][i]}]]></${k}>`);
                                continue;
                            }
                            array.push(`<${k}>${objectValue[key][i]}</${k}>`);
                        }
                    }
                    array.push(`</${key}>`);
                    pieces = pieces.concat(array);
                }                
            }
        }
        // Attributes
        att = (att && Object.keys(att).reduce(function(acc, key){
            acc.push(`${key}="${att[key]}"`);
            return acc;
        }, []).join(" ")) || "";
        att =  (att && " " + att) || "";

        return `<${root}${att}>${pieces.join("")}</${root}>`;
    }

    return pieces.join("");
}

function xml2json(xmlValue) {
    let xml = xmlValue;

    if (typeof xmlValue === "string") {
        if (global.XML) {
            xml = XML.parse(xmlValue);
        } else if(global.DOMParser){ 
            var XMLParser = new DOMParser();
            xml = XMLParser.parseFromString(xmlValue, "text/xml");
        } else {
            throw new Error("Not XML parser found");
        }
    }

    let node;
    const json = Object.create(null), keysArray = [];
    for (let i = 0, len = xml.childNodes.length; i < len; i++) {
        node = xml.childNodes.item(i);
        if (!json[node.nodeName] && !!!node.nodeValue) {
            json[node.nodeName] = Object.create(null);
        }
        if ( node.nodeType === 1 ) {
            if ( node.hasAttributes() ) {
                for (let a = 0, aLen = node.attributes.length; a < aLen; a++) {
                    let attr = node.attributes.item(a);
                    if (a === 0) {
                        json[node.nodeName]["@att"] = Object.create(null);
                    }
                    json[node.nodeName]["@att"][attr.nodeName]=convertValue(attr.nodeValue)
                }
            }
            if (childElementCount(node) === 0) {
                if (node.hasAttributes()) {
                    json[node.nodeName]["#text"] = convertValue(node.textContent);
                } else {
                    if (validator.isEmpty(json[node.nodeName])) {
                        json[node.nodeName] = convertValue(node.textContent)
                    } else {
                        if (!validator.is(json[node.nodeName], "array")) {
                            json[node.nodeName] = [json[node.nodeName]];
                        }
                        json[node.nodeName].push(convertValue(node.textContent));
                        keysArray.push(node.nodeName);
                    }
                }
                continue;
            }

            if (typeof  xmlValue === 'string' || validator.isEmpty(json[node.nodeName])) {
                let list = xml2json(node);
                json[node.nodeName] = validator.is(list, 'array') ? list: Object.assign(json[node.nodeName], list)
            } else {
                if (!validator.is(json[node.nodeName], "array")) {
                    json[node.nodeName] = [json[node.nodeName]];
                }
                json[node.nodeName].push(xml2json(node));
                keysArray.push(node.nodeName);
            }
        }
    }

    function childElementCount(node) {
        let count = 0;
        const len = node.childNodes.length;
        for (let i = 0; i < len; i++) {
            let child = node.childNodes.item(i);
            if (child.nodeType === 1) {
                count++
            }
        }
        
        return count;
    }

    return keysArray.reduce((acc, it) => (acc[it] && acc[it]) || acc, json);
}

function validateRequiredFields(form, ...fields) {
    
    if (fields.length === 0) return false;

    const noFound = [];
    fields = flatten(fields);    

    for (let i = 0, len = fields.length; i < len; i++) {
        let fieldValue = fields[i].split('.').reduce(reducer, form);
        
        if (validator.isNullOrUndefined(fieldValue)) {
            noFound.push(fields[i]);
        }
    }

    if (noFound.length) {
        return getMessage(10008, `Petición inválida. ${noFound.length > 1 ? 'Los campos \'' + noFound.join(', ') + '\' son requeridos': 'El campo \'' + noFound.join(', ') + '\' es requerido'}`);
    }

    return false;
}

function getMessage(errCode, message) {
    switch (errCode) {
        case 1002:
            return {
                "error": 1002, 
                "mensaje": `Dato de entrada '${message}' es requerido`
            }
        case 1003:
            return {
                "error": 1003, 
                "mensaje": `Dato de entrada '${message}' no cumple con la longitud definida`
            }
        case 1004:
            return {
                "error": 1004, 
                "mensaje": `Dato de entrada '${message}' no cumple con el tipo de dato definido`
            }
        case 1008:
            return {
                "error": 1008, 
                "mensaje": message
            }
        case 1009:
            return {
                "error": 1009, 
                "mensaje": `Dato de entrada '${message}' no cumple con el rango definido`
            }
    
        default:
            return {
                "error": errCode, 
                "mensaje": message
            }
    }
}

function getStringMessageFromType(message, type, tagName = "ResponseError") {
    if (/^application\/xml$|^text\/xml$|xml/i.test(type)) {
        return json2xml(message, tagName );
    }
    if (/^application\/json$|json/i.test(type)) {
        return JSON.stringify(message);
    }

    return (message && message) || '';
}




function validateAll(form, options, ...fieldsToValidate) {
    return new Promise((res, rej) => {
        let validatorF = validate();
        fieldsToValidate = flatten(fieldsToValidate);
        for (let i = 0, len = fieldsToValidate.length; i < len; i++) {
            let fieldValue = fieldsToValidate[i].split('.').reduce(reducer2, form);
            validatorF.setValue(fieldValue); 
            const assertsFn = options[fieldsToValidate[i]];
            for (const errCode in assertsFn) {
                if (Object.prototype.hasOwnProperty.call(assertsFn, errCode)) {
                    if (errCode.indexOf('!') > -1 && !validatorF.assert(assertsFn[errCode])) {
                        let code = errCode.replace('!', '');
                        return rej(getMessage(+code, fieldsToValidate[i]));
                    } 
                    if (errCode.indexOf('!') === -1 && validatorF.assert(assertsFn[errCode])) {
                        return rej(getMessage(+errCode, fieldsToValidate[i]));
                    }
                }
            }   
        }
        validatorF.setValue(null);
        validatorF = null;

        res(true);
    });
}

function flatten(input, depth = 1) {
    const stack = [...input];
    let res = [];
    while (stack.length) {
        const next = stack.shift();
        if (Array.isArray(next) && depth > 0 ) {
            res = res.concat(flatten(next, depth -1));
        } else {
            res.push(next);
        }
    }
    return res;
}


function reducer(obj, key) {
    let arrayPart = key.match(/\[(\d|n)\]/); 
    if ((obj && Object.prototype.hasOwnProperty.call(obj, key)) || arrayPart) {
        if (arrayPart) {
            key = key.replace(arrayPart[0], '');
            const _ = obj[key];
            const pos = isNaN(+arrayPart[1])? _.length -1: +arrayPart[1];
            
            return ( _ && _[pos]) || null;
        }
        return obj[key];
    }

    return null;
}

function reducer2(obj, key) {
	let arrayPart = null, 
		result = {
			...obj,
			__value: (('__value' in obj) && obj.__value) || obj
        };
        
    obj = result.__value;
    arrayPart = key.match(/\[(\d|n)\]/);
    if (arrayPart) {
        key = key.replace(arrayPart[0], '');
        const pos = isNaN(+arrayPart[1])? obj[key].length -1: +arrayPart[1];
        obj = (obj && obj[key] && obj[key][pos]) || null;
    } else {
        obj = (obj && obj[key]) || null;
    }
    result[key] = obj;
    result.__value = obj;

    return result;
}

module.exports = Object.freeze({
    ...validator,
    validate,
    validateRequiredFields,
    validateAll,
    util: {
        trim,
        json2xml,
        xml2json,
        getMessage,
        getStringMessageFromType
    }
});