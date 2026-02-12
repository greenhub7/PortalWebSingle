
class PhoneValidator {
    constructor() {
        this.validPhonePattern = /^(\+1?)?(\d{10})$/; 
        this.dominicanPattern = /^(\+1809|\+1829|\+1849|809|829|849)(\d{7})$/; 
    }

    
    cleanPhoneNumber(phone) {
        if (!phone) return '';
        return phone.replace(/[\s\-\(\)]/g, '');
    }

    
    isValidFormat(phone) {
        const cleaned = this.cleanPhoneNumber(phone);
        
        
        const digitsOnly = cleaned.replace(/[^\d]/g, '');
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
            return false;
        }

        
        if (cleaned.includes('+')) {
            const plusIndex = cleaned.indexOf('+');
            if (plusIndex !== 0) return false;
            
            const afterPlus = cleaned.substring(1);
            return /^\d+$/.test(afterPlus);
        }

        
        return /^\d+$/.test(cleaned);
    }

    
    formatForDisplay(phone) {
        const cleaned = this.cleanPhoneNumber(phone);
        
        if (!cleaned) return '';
        
        
        if (cleaned.startsWith('+')) {
            return cleaned;
        }

        
        if (cleaned.length === 10 && (cleaned.startsWith('809') || cleaned.startsWith('829') || cleaned.startsWith('849'))) {
            return `+1${cleaned}`;
        }

        
        if (cleaned.length === 10) {
            return `+1${cleaned}`;
        }

        
        if (cleaned.length === 11 && cleaned.startsWith('1')) {
            return `+${cleaned}`;
        }

        return `+${cleaned}`;
    }

    
    validateAndFormat(phone) {
        const result = {
            isValid: false,
            originalNumber: phone,
            formattedNumber: phone,
            message: '',
            wasFormatted: false
        };

        if (!phone || phone.trim() === '') {
            result.message = 'Número de teléfono requerido';
            return result;
        }

        const cleaned = this.cleanPhoneNumber(phone);
        
        if (!this.isValidFormat(cleaned)) {
            result.message = 'Formato de número inválido. Use formatos como: +18091234567, 8091234567, o +1234567890';
            return result;
        }

        const formatted = this.formatForDisplay(phone);
        result.formattedNumber = formatted;
        result.wasFormatted = phone !== formatted;
        result.isValid = true;
        result.message = result.wasFormatted ? 'Número formateado automáticamente' : 'Número válido';

        return result;
    }

    
    setupLiveValidation(inputSelector, messageSelector = null) {
        const input = document.querySelector(inputSelector);
        const messageElement = messageSelector ? document.querySelector(messageSelector) : null;

        if (!input) return;

        
        const updateValidation = () => {
            const validation = this.validateAndFormat(input.value);
            
            
            input.classList.remove('is-valid', 'is-invalid');
            
            if (input.value.trim() === '') {
                
                if (messageElement) {
                    messageElement.textContent = '';
                    messageElement.className = '';
                }
                return;
            }

            if (validation.isValid) {
                input.classList.add('is-valid');
                if (messageElement) {
                    messageElement.textContent = validation.message;
                    messageElement.className = 'text-success small';
                }
                
                
                if (validation.wasFormatted) {
                    input.value = validation.formattedNumber;
                }
            } else {
                input.classList.add('is-invalid');
                if (messageElement) {
                    messageElement.textContent = validation.message;
                    messageElement.className = 'text-danger small';
                }
            }
        };

        
        input.addEventListener('blur', updateValidation);
        input.addEventListener('input', debounce(updateValidation, 300));
    }

    
    async checkNumberForMessaging(phone) {
        try {
            const response = await fetch('/api/phone/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: phone })
            });

            if (!response.ok) {
                throw new Error('Error validando número');
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error validating phone:', error);
            return {
                isValid: false,
                isBlacklisted: false,
                errorMessage: 'Error validando número'
            };
        }
    }
}


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


window.phoneValidator = new PhoneValidator();


document.addEventListener('DOMContentLoaded', function() {
    
    const phoneInputs = document.querySelectorAll('input[name*="Tel"], input[name*="Cel"], input[name*="Phone"], input[type="tel"], input[data-phone-validation]');
    
    phoneInputs.forEach((input, index) => {
        const messageId = `phone-validation-message-${index}`;
        
        
        let messageElement = input.parentNode.querySelector('.phone-validation-message');
        if (!messageElement) {
            messageElement = document.createElement('div');
            messageElement.id = messageId;
            messageElement.className = 'phone-validation-message';
            input.parentNode.appendChild(messageElement);
        }
        
        window.phoneValidator.setupLiveValidation(`#${input.id}`, `#${messageElement.id}`);
    });
});


window.validatePhoneForMessaging = async function(phone, buttonElement = null) {
    if (buttonElement) {
        buttonElement.disabled = true;
        buttonElement.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Validando...';
    }

    try {
        const validation = window.phoneValidator.validateAndFormat(phone);
        if (!validation.isValid) {
            if (buttonElement) {
                buttonElement.disabled = false;
                buttonElement.innerHTML = buttonElement.getAttribute('data-original-text') || 'Enviar';
            }
            throw new Error(validation.message);
        }

        
        const serverValidation = await window.phoneValidator.checkNumberForMessaging(validation.formattedNumber);
        if (serverValidation.isBlacklisted) {
            if (buttonElement) {
                buttonElement.disabled = false;
                buttonElement.innerHTML = buttonElement.getAttribute('data-original-text') || 'Enviar';
            }
            throw new Error('Este número está bloqueado debido a fallos previos de entrega');
        }

        return {
            isValid: true,
            formattedNumber: validation.formattedNumber,
            originalNumber: validation.originalNumber
        };
    } catch (error) {
        if (buttonElement) {
            buttonElement.disabled = false;
            buttonElement.innerHTML = buttonElement.getAttribute('data-original-text') || 'Enviar';
        }
        throw error;
    }
};