// Form 1 Data Population Module - Enhanced
const PerinatalPrintForm1 = (function() {
    
    function populate(data) {
        if (!data) {
            console.error('[Form1] ❌ No data provided to populate function');
            return;
        }

        console.log('[Form1] ========================================');
        console.log('[Form1] 🚀 Starting Form 1 population');
        console.log('[Form1] Data received:', data);
        console.log('[Form1] ========================================');

        // CRITICAL: Uncheck ALL radios and checkboxes first to clear HTML defaults
        uncheckAllInputs();

        // Patient and Person Information
        populatePatientInfo(data);
        
        // Medical Background (Antecedentes)
        populateMedicalBackground(data);
        
        // Obstetric Background
        populateObstetricBackground(data);
        
        // Current Pregnancy (Gestación Actual)
        populateCurrentPregnancy(data);
        
        // Prenatal Consultations (Consultas Antenatales)
        populatePrenatalConsultations(data);
        
        // Birth Information (Parto o Aborto) - Form 1 also has some birth fields
        populateBirthInfo(data);
        
        // Newborn Information (Recién Nacido)
        populateNewbornInfo(data);
        
        // Postpartum Information (Postparto)
        populatePostpartumInfo(data);
        
        console.log('[Form1] ========================================');
        console.log('[Form1] ✅ Form 1 population complete!');
        
        // Final count
        const radiosChecked = document.querySelectorAll('input[type="radio"]:checked').length;
        const checkboxesChecked = document.querySelectorAll('input[type="checkbox"]:checked').length;
        console.log(`[Form1] Final state - Radios checked: ${radiosChecked}, Checkboxes checked: ${checkboxesChecked}`);
        console.log('[Form1] ========================================');
    }

    function populatePatientInfo(data) {
        const patient = data.patient;
        if (!patient) {
            console.warn('[Form1] No patient data');
            return;
        }

        console.log('[Form1] Populating patient info:', patient);

        // Name - try to find NOMBRE field
        const nombreField = document.querySelector('input[type="text"]');
        if (nombreField && patient.fullName) {
            const names = patient.fullName.split(' ');
            nombreField.value = names[0] || '';
            console.log('[Form1] ✓ Set name:', names[0]);
        }

        // Surname - APELLIDO field
        const apellidoField = document.querySelectorAll('input[type="text"]')[1];
        if (apellidoField && patient.fullName) {
            const names = patient.fullName.split(' ');
            apellidoField.value = names.slice(1).join(' ') || '';
            console.log('[Form1] ✓ Set surname:', names.slice(1).join(' '));
        }

        // Address - DOMICILIO
        if (patient.address) {
            const addressField = document.querySelectorAll('input[type="text"]')[2];
            if (addressField) {
                addressField.value = patient.address;
                console.log('[Form1] ✓ Set address:', patient.address);
            }
        }

        // Phone - TELEF
        if (patient.tel || patient.cel) {
            const phoneField = document.querySelectorAll('input[type="text"]')[4];
            if (phoneField) {
                phoneField.value = patient.tel || patient.cel;
                console.log('[Form1] ✓ Set phone:', patient.tel || patient.cel);
            }
        }

        // Age
        if (patient.age) {
            const ageInput = document.querySelector('.consolidated-age-input');
            if (ageInput) {
                ageInput.value = patient.age.toString();
                console.log('[Form1] ✓ Set age:', patient.age);
            }
        }

        // Date of Birth (FECHA DE NACIMIENTO)
        if (patient.person && patient.person.dateOfBirth) {
            const date = new Date(patient.person.dateOfBirth);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString();
            
            // Find the birth date section - be very specific to avoid selecting name input
            const birthDateHeader = Array.from(document.querySelectorAll('.birth-date-header')).find(h => 
                h.textContent.includes('FECHA DE NACIMIENTO')
            );
            
            if (birthDateHeader) {
                const birthDateSection = birthDateHeader.closest('.birth-date-section');
                if (birthDateSection) {
                    const input = birthDateSection.querySelector('input.large-input');
                    if (input) {
                        input.value = `${day}/${month}/${year}`;
                        console.log(`[Form1] ✓ Set date of birth: ${day}/${month}/${year}`);
                    } else {
                        console.warn('[Form1] ✗ Date of birth input not found');
                    }
                } else {
                    console.warn('[Form1] ✗ Birth date section not found');
                }
            } else {
                console.warn('[Form1] ✗ Birth date header not found');
            }
        } else if (patient.dateOfBirth) {
            // Fallback to patient.dateOfBirth if person.dateOfBirth not available
            const date = new Date(patient.dateOfBirth);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString();
            
            const birthDateHeader = Array.from(document.querySelectorAll('.birth-date-header')).find(h => 
                h.textContent.includes('FECHA DE NACIMIENTO')
            );
            
            if (birthDateHeader) {
                const birthDateSection = birthDateHeader.closest('.birth-date-section');
                if (birthDateSection) {
                    const input = birthDateSection.querySelector('input.large-input');
                    if (input) {
                        input.value = `${day}/${month}/${year}`;
                        console.log(`[Form1] ✓ Set date of birth: ${day}/${month}/${year}`);
                    }
                }
            }
        } else {
            console.warn('[Form1] ✗ No date of birth data found in patient.person.dateOfBirth or patient.dateOfBirth');
        }

        // Identity Number (Cédula)
        if (patient.rnc || patient.record) {
            const idInput = document.querySelector('input[placeholder="Número de identidad"]');
            if (idInput) {
                idInput.value = patient.rnc || patient.record || '';
                console.log('[Form1] ✓ Set identity:', patient.rnc || patient.record);
            }
        }

        // Blood Type
        if (patient.bloodType) {
            const bloodTypeInputs = document.querySelectorAll('input[name*="blood"]');
            bloodTypeInputs.forEach(input => {
                if (input.value === patient.bloodType || input.placeholder === 'Blood Type') {
                    input.value = patient.bloodType;
                    console.log('[Form1] ✓ Set blood type:', patient.bloodType);
                }
            });
        }

        // Additional Personal Information
        // Marital Situation (ESTADO CIVIL)
        // MaritalSituation.Name: "casada", "unión estable", "soltera", "otro"
        if (patient.person && patient.person.maritalSituation) {
            const maritalStatus = patient.person.maritalSituation.name || patient.person.maritalSituation;
            const maritalLower = maritalStatus.toLowerCase();
            
            let radioName = '';
            if (maritalLower.includes('casada')) {
                radioName = 'casada '; // Note: has trailing space!
            } else if (maritalLower.includes('unión') || maritalLower.includes('union')) {
                radioName = 'unión';
            } else if (maritalLower.includes('soltera')) {
                radioName = 'soltera';
            } else if (maritalLower.includes('otro')) {
                radioName = 'otro1';
            }
            
            if (radioName) {
                const radio = document.querySelector(`input[name="${radioName}"]`);
                if (radio) {
                    radio.checked = true;
                    console.log(`[Form1] ✓ Set marital situation: ${maritalStatus}`);
                }
            }
        }

        // School Level
        if (patient.person && patient.person.schoolLevel) {
            const input = document.querySelector('input[placeholder*="Nivel Escolar"], input[placeholder*="School"]');
            if (input) {
                input.value = patient.person.schoolLevel.name || patient.person.schoolLevel;
                console.log('[Form1] ✓ Set school level');
            }
        }

        // Years in Greatest School Level (años en el mayor nivel)
        if (patient.person && patient.person.yearsInTheGreatestLevel) {
            // Find the specific .es-check div that contains "años en el mayor nivel" text
            // This div has an input with name="univers" (same as university radio, so be specific!)
            const schoolSection = Array.from(document.querySelectorAll('.es-check')).find(section => {
                const text = section.querySelector('p');
                return text && text.textContent.includes('años en el') && text.textContent.includes('mayor nivel');
            });
            
            if (schoolSection) {
                // Get the checkbox input specifically within .es-check (not the radio with same name!)
                const yearsInput = schoolSection.querySelector('input.check-box[name="univers"]');
                if (yearsInput) {
                    // Convert checkbox to text input if needed
                    if (yearsInput.type === 'checkbox') {
                        yearsInput.type = 'text';
                        yearsInput.setAttribute('maxlength', '2');
                    }
                    yearsInput.value = patient.person.yearsInTheGreatestLevel.toString();
                    console.log(`[Form1] ✓ Set years in greatest level: ${patient.person.yearsInTheGreatestLevel}`);
                } else {
                    console.warn('[Form1] ✗ Years input (input.check-box[name="univers"]) not found in .es-check section');
                }
            } else {
                console.warn('[Form1] ✗ .es-check section with "años en el mayor nivel" not found');
            }
        }

        // Nationality
        if (patient.person && patient.person.country) {
            const input = document.querySelector('input[placeholder*="Nacionalidad"], input[placeholder*="Country"]');
            if (input) {
                input.value = patient.person.country.name || patient.person.country;
                console.log('[Form1] ✓ Set nationality');
            }
        }

        // Prenatal Control Place (from root level)
        if (data.prenatalControlPlace) {
            const input = document.querySelector('input[name="PrenatalControlPlace"]');
            if (input) {
                input.value = data.prenatalControlPlace;
                console.log('[Form1] ✓ Set prenatal control place:', data.prenatalControlPlace);
            }
        }

        // Birth Place (from root level)
        if (data.birthPlace) {
            const input = document.querySelector('input[name="BirthPlace"]');
            if (input) {
                input.value = data.birthPlace;
                console.log('[Form1] ✓ Set birth place:', data.birthPlace);
            }
        }

        console.log('[Form1] Patient info populated');
    }

    function populateMedicalBackground(data) {
        const bg = data.medicalBackground;
        if (!bg) {
            console.warn('[Form1] No medical background data');
            return;
        }

        console.log('[Form1] Populating medical background:', bg);

        // Family History - FAMILIARES (actual HTML field names)
        setYesNoRadio('TBC', bg.familyTuberculosis);
        setYesNoRadio('diabetes22', bg.familyDiabetes);
        setYesNoRadio('hipertensión33', bg.familyHypertension);
        setYesNoRadio('preeclampsia1', bg.familyPreeclampsia);
        setYesNoRadio('eclampsia1', bg.familyEclampsia);
        setYesNoRadio('otra cond.', bg.familyOtherSeriousMedicalCondition);

        // Family Diabetes Type (TIPO) - enum: 1=Type I, 2=Type II, 3=Gestational
        // Note: Form1 HTML only has "ii" and "G" fields, Type I is missing
        if (bg.familyDiabetesType === 2) {
            const radio = document.querySelector('input[name="ii"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set family diabetes type: II');
            }
        } else if (bg.familyDiabetesType === 3) {
            const radio = document.querySelector('input[name="G"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set family diabetes type: Gestational');
            }
        } else if (bg.familyDiabetesType === 1) {
            console.warn('[Form1] ⚠ Family diabetes type I selected but field missing in Form1 HTML');
        }

        // Personal History - PERSONALES (actual HTML field names)
        setYesNoRadio('TBC1', bg.personalTuberculosis);
        setYesNoRadio('diabetes11', bg.personalDiabetes);
        setYesNoRadio('hipertensión22', bg.personalHypertension);
        setYesNoRadio('preeclampsia', bg.personalPreeclampsia);
        setYesNoRadio('eclampsia', bg.personalEclampsia);
        setYesNoRadio('genito-urinaria', bg.personalSurgery);
        setYesNoRadio('infertilidad', bg.personalInfertility);
        setYesNoRadio('cardiopat', bg.personalHeartDisease);
        setYesNoRadio('nefropatía', bg.personalNephropathy);
        setYesNoRadio('violencia22', bg.personalViolence);
        setYesNoRadio('VIH+', bg.personalHIVPositive);
        setYesNoRadio('médica grave', bg.personalOtherSeriousMedicalCondition);

        // Personal Diabetes Type (TIPO) - enum: 1=Type I, 2=Type II, 3=Gestational
        // Note: The "ii" and "G" fields appear to be shared between Family and Personal
        // This is a design issue in Form1 HTML - both sections share the same TIPO fields
        // We'll populate based on Personal diabetes type if Family type is not set
        if (!bg.familyDiabetesType && bg.personalDiabetesType) {
            if (bg.personalDiabetesType === 2) {
                const radio = document.querySelector('input[name="ii"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form1] ✓ Set personal diabetes type: II');
                }
            } else if (bg.personalDiabetesType === 3) {
                const radio = document.querySelector('input[name="G"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form1] ✓ Set personal diabetes type: Gestational');
                }
            } else if (bg.personalDiabetesType === 1) {
                console.warn('[Form1] ⚠ Personal diabetes type I selected but field missing in Form1 HTML');
            }
        }

        console.log('[Form1] Medical background populated');
    }

    function populateObstetricBackground(data) {
        const obs = data.obstetricBackground;
        if (!obs) {
            console.warn('[Form1] No obstetric background data');
            return;
        }

        console.log('[Form1] Populating obstetric background:', obs);

        // Numeric values - use check-box-input fields (actual HTML field names)
        setNumericInCheckBoxes('previas', obs.previousPregnancies);
        setNumericInCheckBoxes('abortos', obs.abortions);
        setNumericInCheckBoxes('partos', obs.births);
        setNumericInCheckBoxes('vaginales', obs.vaginalDeliveries);
        setNumericInCheckBoxes('áreas', obs.cesareans); // Note: HTML has name="áreas" for cesareas
        setNumericInCheckBoxes('vivos', obs.livingBorn);
        setNumericInCheckBoxes('nacidos', obs.deadBorn);
        setNumericInCheckBoxes('muertos', obs.diedFirstWeek);
        setNumericInCheckBoxes('después', obs.diedAfterFirstWeek);
        
        // VIVEN - uses viven1 and viven2 checkboxes (not check-box-input class)
        if (obs.living !== null && obs.living !== undefined) {
            const valueStr = obs.living.toString().padStart(2, '0');
            const input1 = document.querySelector('input[name="viven1"]');
            const input2 = document.querySelector('input[name="viven2"]');
            if (input1 && input2) {
                input1.value = valueStr[0];
                // input2.value = valueStr[1];
                console.log(`[Form1] ✓ Set viven (living): ${obs.living}`);
            }
        }

        // Ectopic Pregnancy - text field in edit form (string value like "1"), checkbox in print form
        // If has any value (not null/empty/undefined), check the checkbox
        if (obs.ectopicPregnancy !== null && obs.ectopicPregnancy !== undefined && obs.ectopicPregnancy !== '') {
            const checkbox = document.querySelector('input[name="ectópico"]');
            if (checkbox) {
                checkbox.checked = true;
                checkbox.value = obs.ectopicPregnancy; // Set the value as well
                console.log(`[Form1] ✓ Set ectopic pregnancy checkbox (value: "${obs.ectopicPregnancy}")`);
            } else {
                console.warn('[Form1] ✗ Ectopic pregnancy checkbox not found');
            }
        } else {
            console.log(`[Form1] Skipping ectopic pregnancy - value is: ${obs.ectopicPregnancy}`);
        }

        // Three Consecutive Spontaneous Abortions
        if (obs.threeConsecutiveSpontaneousAbortions === true || obs.threeConsecutiveSpontaneousAbortions === 1) {
            const radio = document.querySelector('input[name="consecutivos"][value="no"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set three consecutive abortions');
            }
        }

        // ULTIMO PREVIO (Last Previous Birth Weight Type)
        // Enum: 1=N/C, 2=Normal, 3=<2500g, 4=≥4000g
        if (obs.lastPreviousBirthWeightType) {
            let radioName = '';
            if (obs.lastPreviousBirthWeightType === 1) radioName = 'ULTIMO';
            else if (obs.lastPreviousBirthWeightType === 2) radioName = 'ULTIMO1';
            else if (obs.lastPreviousBirthWeightType === 3) radioName = 'ULTIMO2 '; // Note: has space!
            else if (obs.lastPreviousBirthWeightType === 4) radioName = 'ULTIMO3';
            
            if (radioName) {
                const radio = document.querySelector(`input[name="${radioName}"]`);
                if (radio) {
                    radio.checked = true;
                    console.log(`[Form1] ✓ Set ultimo previo: ${radioName} (value: ${obs.lastPreviousBirthWeightType})`);
                } else {
                    console.warn(`[Form1] ✗ Radio not found: name="${radioName}"`);
                }
            }
        }

        // ANTECEDENTE DE GEMELARES (Twins History)
        if (obs.twinsHistory === true || obs.twinsHistory === 1) {
            const radio = document.querySelector('input[name="Antecedente"][value="si"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set twins history: si');
            }
        } else if (obs.twinsHistory === false || obs.twinsHistory === 0 || obs.twinsHistory === 2) {
            const radio = document.querySelector('input[name="Antecedente"][value="no"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set twins history: no');
            }
        }

        // Last pregnancy end date - fix selector to find the correct input
        if (obs.lastPregnancyEndDate) {
            const date = new Date(obs.lastPregnancyEndDate);
            // Find the "FIN EMBARAZO ANTERIOR" section input
            const finEmbarazoSection = document.querySelector('.fin');
            if (finEmbarazoSection) {
                const dateInput = finEmbarazoSection.querySelector('.input-box.large input.large-input');
                if (dateInput) {
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear();
                    dateInput.value = `${day}/${month}/${year}`;
                    console.log(`[Form1] ✓ Set last pregnancy end date: ${day}/${month}/${year}`);
                }
            }
        }

        // Last Pregnancy Less Than One Year
        if (obs.lastPregnancyLessThanOneYear === true || obs.lastPregnancyLessThanOneYear === 1) {
            const radio = document.querySelector('input[name="menosde1"][value="no"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set last pregnancy less than one year');
            }
        }

        // Pregnancy planned - handle boolean properly
        setYesNoRadioBool('PLANEADO', obs.pregnancyPlanned);

        // Contraceptive method failure - HTML only has value="no" radios, so just check the matching one
        if (obs.contraceptiveMethodFailure) {
            const methods = {
                'barrier': 'barrera',
                'iud': 'DIU',
                'hormonal': 'hormo',
                'emergency': 'emergencia',
                'natural': 'natural'
            };
            const methodName = methods[obs.contraceptiveMethodFailure.toLowerCase()];
            if (methodName) {
                const radio = document.querySelector(`input[name="${methodName}"]`);
                if (radio) {
                    radio.checked = true;
                    console.log(`[Form1] ✓ Set contraceptive method: ${methodName}`);
                } else {
                    console.warn(`[Form1] ✗ Radio not found: name="${methodName}"`);
                }
            }
        }

        console.log('[Form1] Obstetric background populated');
    }

    function populateCurrentPregnancy(data) {
        const cp = data.currentPregnancy;
        if (!cp) {
            console.warn('[Form1] No current pregnancy data');
            return;
        }

        console.log('[Form1] Populating current pregnancy:', cp);

        // FUM (Last Menstrual Period) - find first .input-box.large1 input
        if (cp.lastMenstrualPeriod) {
            const date = new Date(cp.lastMenstrualPeriod);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            const inputBoxes = document.querySelectorAll('.input-box.large1');
            if (inputBoxes.length > 0) {
                const input = inputBoxes[0].querySelector('input.large-input');
                if (input) {
                    input.value = formattedDate;
                    console.log(`[Form1] ✓ Set FUM date: ${formattedDate}`);
                }
            }
        }

        // FPP (Estimated Due Date) - find second .input-box.large1 input
        if (cp.estimatedDueDate) {
            const date = new Date(cp.estimatedDueDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            const inputBoxes = document.querySelectorAll('.input-box.large1');
            if (inputBoxes.length > 1) {
                const input = inputBoxes[1].querySelector('input.large-input');
                if (input) {
                    input.value = formattedDate;
                    console.log(`[Form1] ✓ Set FPP date: ${formattedDate}`);
                }
            }
        }

        // Weight and Height - these use individual digit inputs, not checkboxes
        if (cp.previousWeight) {
            const weightStr = cp.previousWeight.toString().replace('.', '');
            const weightInputs = document.querySelectorAll('.gestacion-cell:first-child .char-inputs input');
            if (weightInputs.length >= 3) {
                // Fill weight digits (e.g., 65.5 -> "655" -> inputs[0]=6, inputs[1]=5, inputs[2]=5)
                for (let i = 0; i < Math.min(weightStr.length, 3); i++) {
                    weightInputs[i].value = weightStr[i];
                }
                console.log('[Form1] ✓ Set weight:', cp.previousWeight);
            }
        }
        if (cp.height) {
            const heightStr = cp.height.toString().replace('.', '');
            const heightInputs = document.querySelectorAll('.gestacion-cell:nth-child(2) .char-inputs input');
            if (heightInputs.length >= 3) {
                // Fill height digits (e.g., 162 -> inputs[0]=1, inputs[1]=6, inputs[2]=2)
                for (let i = 0; i < Math.min(heightStr.length, 3); i++) {
                    heightInputs[i].value = heightStr[i];
                }
                console.log('[Form1] ✓ Set height:', cp.height);
            }
        }

        // Examinations
        setYesNoRadio('ODONT', cp.normalDentalExamination);
        setYesNoRadio('MAMAS', cp.normalBreastExamination);

        // EG CONFIABLE POR (Gestational Age Reliability)
        // ReliableByFUM: 1=Si, 2=No → Form1 fields: Si=ecoo, No=fumm
        // ReliableByEchoLessThan20Weeks: 1=Si, 2=No → Form1 fields: Si=ecoo1, No=fumm1
        if (cp.reliableByFUM === 1) {
            const radio = document.querySelector('input[name="ecoo"]');
            if (radio) {
                // radio.checked = true;
                console.log('[Form1] ✓ Set FUM reliable: Si');
            }
        } else if (cp.reliableByFUM === 2) {
            const radio = document.querySelector('input[name="fumm"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set FUM reliable: No');
            }
        }
        
        if (cp.reliableByEchoLessThan20Weeks === 1) {
            const radio = document.querySelector('input[name="ecoo1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set ECO <20s reliable: Si');
            }
        } else if (cp.reliableByEchoLessThan20Weeks === 2) {
            const radio = document.querySelector('input[name="fumm1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set ECO <20s reliable: No');
            }
        }

        // CERVIX examinations (Visual Inspection, PAP, COLP)
        // Enum: 1=Normal, 2=Abnormal, 3=No se hizo
        // Form1 fields: Insp1/Insp2/Insp3, PAP1/PAP2/PAP3, COLP1/COLP2/COLP3
        if (cp.cervixVisualInspection === 1) {
            const radio = document.querySelector('input[name="Insp1"]');
            if (radio) radio.checked = true;
            console.log('[Form1] ✓ Set cervix visual inspection: Normal');
        } else if (cp.cervixVisualInspection === 2) {
            const radio = document.querySelector('input[name="Insp2"]');
            if (radio) radio.checked = true;
            console.log('[Form1] ✓ Set cervix visual inspection: Abnormal');
        } else if (cp.cervixVisualInspection === 3) {
            const radio = document.querySelector('input[name="Insp3"]');
            if (radio) radio.checked = true;
            console.log('[Form1] ✓ Set cervix visual inspection: No se hizo');
        }
        
        if (cp.cervixPapExam === 1) {
            const radio = document.querySelector('input[name="PAP1"]');
            if (radio) radio.checked = true;
            console.log('[Form1] ✓ Set cervix PAP: Normal');
        } else if (cp.cervixPapExam === 2) {
            const radio = document.querySelector('input[name="PAP2"]');
            if (radio) radio.checked = true;
            console.log('[Form1] ✓ Set cervix PAP: Abnormal');
        } else if (cp.cervixPapExam === 3) {
            const radio = document.querySelector('input[name="PAP3"]');
            if (radio) radio.checked = true;
            console.log('[Form1] ✓ Set cervix PAP: No se hizo');
        }
        
        if (cp.cervixColposcopy === 1) {
            const radio = document.querySelector('input[name="COLP1"]');
            if (radio) radio.checked = true;
            console.log('[Form1] ✓ Set cervix COLP: Normal');
        } else if (cp.cervixColposcopy === 2) {
            const radio = document.querySelector('input[name="COLP2"]');
            if (radio) radio.checked = true;
            console.log('[Form1] ✓ Set cervix COLP: Abnormal');
        } else if (cp.cervixColposcopy === 3) {
            const radio = document.querySelector('input[name="COLP3"]');
            if (radio) radio.checked = true;
            console.log('[Form1] ✓ Set cervix COLP: No se hizo');
        }

        // GRUPO (Blood Group) and Rh Factor
        // BloodGroupType: 1=A, 2=B, 3=AB, 4=O
        // RhFactorType: 1=Positive (+), 2=Negative (-)
        if (cp.bloodGroupType) {
            const bloodGroupMap = { 1: 'A', 2: 'B', 3: 'AB', 4: 'O' };
            const bloodGroup = bloodGroupMap[cp.bloodGroupType];
            if (bloodGroup) {
                const textarea = document.querySelector('.grupo-textarea');
                if (textarea) {
                    textarea.value = bloodGroup;
                    console.log(`[Form1] ✓ Set blood group: ${bloodGroup}`);
                }
            }
        }
        
        // Rh Factor - Both radios have name="Rh", first is "-", second is "+"
        if (cp.rhFactorType === 1) {
            // Positive (+) - second radio
            const radios = document.querySelectorAll('input[name="Rh"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set Rh factor: +');
            }
        } else if (cp.rhFactorType === 2) {
            // Negative (-) - first radio
            const radios = document.querySelectorAll('input[name="Rh"]');
            if (radios.length > 0) {
                radios[0].checked = true;
                console.log('[Form1] ✓ Set Rh factor: -');
            }
        }

        // Inmuniz (Rh Sensitization) - Both radios have name="Inmuniz1"
        // RhSensitization: 1=si, 2=no
        if (cp.rhSensitization === 1) {
            // Si - second radio with name="Inmuniz1"
            const radios = document.querySelectorAll('input[name="Inmuniz1"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set Rh sensitization: si');
            }
        } else if (cp.rhSensitization === 2) {
            // No - first radio with name="Inmuniz1"
            const radios = document.querySelectorAll('input[name="Inmuniz1"]');
            if (radios.length > 0) {
                radios[0].checked = true;
                console.log('[Form1] ✓ Set Rh sensitization: no');
            }
        }

        // γ globulina anti D (Anti-D Immunoglobulin)
        // AntiDImmunoglobulin: 1=sí, 2=no, 3=n/c
        // Form1 fields: globu1 (no), globu2 (sí), globu (n/c)
        // NOTE: These have different names so they're independent radios, not a group!
        console.log(`[Form1] Anti-D Immunoglobulin value: ${cp.antiDImmunoglobulin}`);
        
        if (cp.antiDImmunoglobulin === 1) {
            const radio = document.querySelector('input[name="globu2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set anti-D immunoglobulin: sí');
            }
        } else if (cp.antiDImmunoglobulin === 2) {
            const radio = document.querySelector('input[name="globu1"]');
            if (radio) {
                // radio.checked = true;
                console.log('[Form1] ✓ Set anti-D immunoglobulin: no');
            }
        } else if (cp.antiDImmunoglobulin === 3) {
            const radio = document.querySelector('input[name="globu"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set anti-D immunoglobulin: n/c');
            }
        } else {
            console.log('[Form1] ℹ Anti-D immunoglobulin not set - all radios should be white');
        }

        // Age risk factors - HTML structure incomplete, skipping for now
        // setYesNoRadio('menosde1', cp.youngerThan15);
        // setYesNoRadio('mayorde35', cp.olderThan35);

        // Habits during pregnancy - Smoking (Active)
        setYesNoRadio('FUMAACT', cp.smokingFirstTrimester);
        setYesNoRadio('FUMAACT1', cp.smokingSecondTrimester);
        setYesNoRadio('FUMAACT2', cp.smokingThirdTrimester);

        // Habits during pregnancy - Smoking (Passive)
        setYesNoRadio('FUMAPAS', cp.passiveSmokingFirstTrimester);
        setYesNoRadio('FUMAPAS1', cp.passiveSmokingSecondTrimester);
        setYesNoRadio('FUMAPAS2', cp.passiveSmokingThirdTrimester);

        // Habits during pregnancy - Drugs
        setYesNoRadio('DROGAS', cp.drugUseFirstTrimester);
        setYesNoRadio('DROGAS1', cp.drugUseSecondTrimester);
        setYesNoRadio('DROGAS2', cp.drugUseThirdTrimester);

        // Habits during pregnancy - Alcohol
        setYesNoRadio('ALCOHOL', cp.alcoholUseFirstTrimester);
        setYesNoRadio('ALCOHOL1', cp.alcoholUseSecondTrimester);
        setYesNoRadio('ALCOHOL2', cp.alcoholUseThirdTrimester);

        // Habits during pregnancy - Violence
        setYesNoRadio('VIOLENCIA', cp.violenceFirstTrimester);
        setYesNoRadio('VIOLENCIA1', cp.violenceSecondTrimester);
        setYesNoRadio('VIOLENCIA2', cp.violenceThirdTrimester);

        // Vaccines - COMPLETE REWRITE using correct *Time enum fields
        // VaccineApplicationTime enum: 1=No, 2=PrePregnancy, 3=DuringPregnancy, 4=PostpartumOrAbortion
        populateVaccine('difteria', cp.vaccineTetanusDiphtheriaTime, cp.vaccineTetanusDiphtheriaDate, cp.vaccineTetanusDiphtheriaGestationalWeeks, cp.vaccineTetanusDiphtheriaTotalDoses, 0);
        populateVaccine('tdap', cp.vaccineTdapTime, cp.vaccineTdapDate, cp.vaccineTdapGestationalWeeks, null, 1);
        populateVaccine('influenza', cp.vaccineInfluenzaTime, cp.vaccineInfluenzaDate, cp.vaccineInfluenzaGestationalWeeks, null, 2);
        populateVaccine('rubeolla', cp.vaccineRubellaTime, cp.vaccineRubellaDate, cp.vaccineRubellaGestationalWeeks, null, 3);
        populateVaccine('hepatitisb', cp.vaccineHepatitisBTime, cp.vaccineHepatitisBDate, cp.vaccineHepatitisBGestationalWeeks, null, 4);
        
        // Hepatitis A - special handling due to HTML bug (all options have name="hepatitisa2")
        if (cp.vaccineHepatitisATime !== null && cp.vaccineHepatitisATime !== undefined) {
            if (cp.vaccineHepatitisATime === 1) {
                // No
                const radio = document.querySelector('input[name="hepatitisa1"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form1] ✓ Set vaccine hepatitisa to option 1 (no)');
                }
            } else {
                // For options 2, 3, 4 - select by position since they all have name="hepatitisa2"
                const radios = document.querySelectorAll('input[name="hepatitisa2"]');
                const index = cp.vaccineHepatitisATime - 2; // 2→0, 3→1, 4→2
                if (radios[index]) {
                    radios[index].checked = true;
                    console.log(`[Form1] ✓ Set vaccine hepatitisa to option ${cp.vaccineHepatitisATime}`);
                }
            }
            
            // Populate date for hepatitis A
            if (cp.vaccineHepatitisADate) {
                const dateObj = new Date(cp.vaccineHepatitisADate);
                const day = dateObj.getDate().toString().padStart(2, '0');
                const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
                const year = dateObj.getFullYear().toString();
                
                const dateInputs = document.querySelectorAll('.vac-grid .input-box2 input.large-input, .vac-grid .input-box3 input.large-input');
                if (dateInputs[5]) {
                    dateInputs[5].value = `${day}/${month}/${year}`;
                    console.log(`[Form1] ✓ Set vaccine hepatitisa date: ${day}/${month}/${year}`);
                }
            }
            
            // Populate gestational weeks for hepatitis A (no checkboxes in HTML, skip)
            if (cp.vaccineHepatitisAGestationalWeeks) {
                console.log(`[Form1] ℹ Hepatitis A gestational weeks: ${cp.vaccineHepatitisAGestationalWeeks} (no checkboxes in HTML)`);
            }
        }
        
        // tamizaje hepatitis B (Hepatitis B screening)
        // Both radios have name="tamizaje", first is "no", second is "si"
        if (cp.hepatitisBScreening === true) {
            const radios = document.querySelectorAll('input[name="tamizaje"]');
            if (radios.length > 1) {
                // radios[1].checked = true; // Second radio is "si"
                console.log('[Form1] ✓ Set hepatitis B screening: si');
            }
        } else if (cp.hepatitisBScreening === false) {
            const radios = document.querySelectorAll('input[name="tamizaje"]');
            if (radios.length > 0) {
                // radios[0].checked = true; // First radio is "no"
                console.log('[Form1] ✓ Set hepatitis B screening: no');
            }
        }

        // Fe/FOLATOS indicados (Iron and Folate Supplements)
        // Note: Form1 has strange field naming - both "no" radios use name="Fe", "si" radios use Folatos1/Folatos2
        // Display logic: "si" radios are ALWAYS YELLOW (CSS default), "no" radios get CHECKMARK when selected
        // IronSupplements (boolean): false=check "no" radio (show checkmark)
        // FolateSupplementsLessThan20Weeks (boolean): false=check "no" radio (show checkmark)
        
        // Hb <20 sem - Hemoglobin value and anemia checkbox
        if (cp.hemoglobinLessThan20Weeks !== null && cp.hemoglobinLessThan20Weeks !== undefined) {
            const valueStr = cp.hemoglobinLessThan20Weeks.toString().replace('.', '').padStart(3, '0');
            const hb21 = document.querySelector('input[name="hb21"]');
            const hb22 = document.querySelector('input[name="hb22"]');
            const hb23 = document.querySelector('input[name="hb23"]');
            if (hb21 && hb22 && hb23) {
                // Convert checkboxes to text inputs if needed
                [hb21, hb22, hb23].forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                hb21.value = valueStr[0];
                hb22.value = valueStr[1];
                hb23.value = valueStr[2];
                console.log(`[Form1] ✓ Set Hb <20 sem: ${cp.hemoglobinLessThan20Weeks}`);
            }
        }
        
        // Anemia <20 weeks (<11.0 g/dl checkbox)
        if (cp.anemiaLessThan20Weeks === true) {
            const checkbox = document.querySelector('input[name="g/dl"]');
            if (checkbox) {
                checkbox.checked = true;
                console.log('[Form1] ✓ Set anemia <20 weeks checkbox');
            }
        }
        
        // Hb ≥20 sem - Hemoglobin value and anemia checkbox
        if (cp.hemoglobinGreaterOrEqual20Weeks !== null && cp.hemoglobinGreaterOrEqual20Weeks !== undefined) {
            const valueStr = cp.hemoglobinGreaterOrEqual20Weeks.toString().replace('.', '').padStart(3, '0');
            const hb201 = document.querySelector('input[name="hb201"]');
            const hb202 = document.querySelector('input[name="hb202"]');
            const hb203 = document.querySelector('input[name="hb203"]');
            if (hb201 && hb202 && hb203) {
                // Convert checkboxes to text inputs if needed
                [hb201, hb202, hb203].forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                hb201.value = valueStr[0];
                hb202.value = valueStr[1];
                hb203.value = valueStr[2];
                console.log(`[Form1] ✓ Set Hb ≥20 sem: ${cp.hemoglobinGreaterOrEqual20Weeks}`);
            }
        }
        
        // Anemia ≥20 weeks (<11.0 g/dl checkbox)
        if (cp.anemiaGreaterOrEqual20Weeks === true) {
            const checkbox = document.querySelector('input[name="11.0"]');
            if (checkbox) {
                checkbox.checked = true;
                console.log('[Form1] ✓ Set anemia ≥20 weeks checkbox');
            }
        }
        
        // Fe (Iron) - for <20 weeks
        if (cp.ironSupplements === false) {
            const feNoRadios = document.querySelectorAll('input[name="Fe"]');
            if (feNoRadios.length > 0) {
                feNoRadios[0].checked = true; // First Fe radio is for Fe "no"
                console.log('[Form1] ✓ Set Fe supplements: no (checkmark)');
            }
        } else {
            console.log('[Form1] ℹ Fe supplements: si (yellow, no checkmark on no)');
        }
        
        // Folatos (Folate) - for <20 weeks
        if (cp.folateSupplementsLessThan20Weeks === false) {
            const feNoRadios = document.querySelectorAll('input[name="Fe"]');
            if (feNoRadios.length > 1) {
                feNoRadios[1].checked = true; // Second Fe radio is for Folatos "no"
                console.log('[Form1] ✓ Set Folate supplements <20w: no (checkmark)');
            }
        } else {
            console.log('[Form1] ℹ Folate supplements <20w: si (yellow, no checkmark on no)');
        }

        // GLUCEMIA EN AYUNAS <20 sem (GlucoseLessThan20Weeks)
        // HTML: 3 checkboxes with names univer6, univer5, univer4 (e.g., 0.00 mg/dl)
        if (cp.glucoseLessThan20Weeks !== null && cp.glucoseLessThan20Weeks !== undefined) {
            const valueStr = cp.glucoseLessThan20Weeks.toString().replace('.', '').padStart(3, '0');
            const univer6 = document.querySelector('input[name="univer6"]');
            const univer5 = document.querySelector('input[name="univer5"]');
            const univer4 = document.querySelector('input[name="univer4"]');
            if (univer6 && univer5 && univer4) {
                // Convert checkboxes to text inputs if needed
                [univer6, univer5, univer4].forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                univer6.value = valueStr[0];
                univer5.value = valueStr[1];
                univer4.value = valueStr[2];
                console.log(`[Form1] ✓ Set GLUCEMIA EN AYUNAS <20 sem: ${cp.glucoseLessThan20Weeks}`);
            }
        }

        // GLUCEMIA EN AYUNAS ≥30 sem (GlucoseGreaterOrEqual30Weeks)
        // HTML: 3 checkboxes with names univer1, univer2, univer3 (e.g., 0.00 mg/dl)
        if (cp.glucoseGreaterOrEqual30Weeks !== null && cp.glucoseGreaterOrEqual30Weeks !== undefined) {
            const valueStr = cp.glucoseGreaterOrEqual30Weeks.toString().replace('.', '').padStart(3, '0');
            const univer1 = document.querySelector('input[name="univer1"]');
            const univer2 = document.querySelector('input[name="univer2"]');
            const univer3 = document.querySelector('input[name="univer3"]');
            if (univer1 && univer2 && univer3) {
                // Convert checkboxes to text inputs if needed
                [univer1, univer2, univer3].forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                univer1.value = valueStr[0];
                univer2.value = valueStr[1];
                univer3.value = valueStr[2];
                console.log(`[Form1] ✓ Set GLUCEMIA EN AYUNAS ≥30 sem: ${cp.glucoseGreaterOrEqual30Weeks}`);
            }
        }

        // PREPARACIÓN PARA EL PARTO (BirthPreparation)
        // HTML: Both radios have name="PREPARACIÓN", first is "no", second is "si"
        if (cp.birthPreparation === true) {
            const radios = document.querySelectorAll('input[name="PREPARACIÓN"]');
            if (radios.length > 1) {
                radios[1].checked = true; // Second radio is "si"
                console.log('[Form1] ✓ Set PREPARACIÓN PARA EL PARTO: si');
            }
        } else if (cp.birthPreparation === false) {
            const radios = document.querySelectorAll('input[name="PREPARACIÓN"]');
            if (radios.length > 0) {
                radios[0].checked = true; // First radio is "no"
                console.log('[Form1] ✓ Set PREPARACIÓN PARA EL PARTO: no');
            }
        }

        // CONSEJERIA LACTANCIA MATERNA (BreastfeedingCounseling)
        // HTML: Both radios have name="MATERNA", first is "no", second is "si"
        if (cp.breastfeedingCounseling === true) {
            const radios = document.querySelectorAll('input[name="MATERNA"]');
            if (radios.length > 1) {
                radios[1].checked = true; // Second radio is "si"
                console.log('[Form1] ✓ Set CONSEJERIA LACTANCIA MATERNA: si');
            }
        } else if (cp.breastfeedingCounseling === false) {
            const radios = document.querySelectorAll('input[name="MATERNA"]');
            if (radios.length > 0) {
                radios[0].checked = true; // First radio is "no"
                console.log('[Form1] ✓ Set CONSEJERIA LACTANCIA MATERNA: no');
            }
        }

        // VIH - DIAG TRATAMIENTO <20 sem
        // Prueba solicitada: HIVTestRequestedLessThan20Weeks (1=Si, 2=No, 3=n/c)
        // Fields: "20 sem" (Si), "20 sem2" (No), "20 sem3" (n/c)
        if (cp.hivTestRequestedLessThan20Weeks === 1) {
            const radio = document.querySelector('input[name="20 sem"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH <20 sem prueba solicitada: Si');
            }
        } else if (cp.hivTestRequestedLessThan20Weeks === 2) {
            const radio = document.querySelector('input[name="20 sem2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH <20 sem prueba solicitada: No');
            }
        } else if (cp.hivTestRequestedLessThan20Weeks === 3) {
            const radio = document.querySelector('input[name="20 sem3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH <20 sem prueba solicitada: n/c');
            }
        }

        // Prueba result: HIVTestResultLessThan20Weeks (1=+, 2=-, 3=n/c, 4=s/d)
        // Fields: "result1" (+), "result2" (-), "result3" (n/c), "result4" (s/d)
        if (cp.hivTestResultLessThan20Weeks === 1) {
            const radio = document.querySelector('input[name="result1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH <20 sem prueba result: +');
            }
        } else if (cp.hivTestResultLessThan20Weeks === 2) {
            const radio = document.querySelector('input[name="result2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH <20 sem prueba result: -');
            }
        } else if (cp.hivTestResultLessThan20Weeks === 3) {
            const radio = document.querySelector('input[name="result3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH <20 sem prueba result: n/c');
            }
        } else if (cp.hivTestResultLessThan20Weeks === 4) {
            const radio = document.querySelector('input[name="result4"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH <20 sem prueba result: s/d');
            }
        }

        // TARV en emb <20 sem: HIVARTLessThan20Weeks (1=Si, 2=No, 3=n/c)
        // NOTE: HTML has empty name="" for all three radios - cannot populate without fixing HTML
        if (cp.hivARTLessThan20Weeks !== null && cp.hivARTLessThan20Weeks !== undefined) {
            console.warn(`[Form1] ⚠ VIH <20 sem TARV value: ${cp.hivARTLessThan20Weeks} - HTML has empty name attributes, cannot populate`);
        }

        // VIH - DIAG TRATAMIENTO ≥20 sem
        // Prueba solicitada: HIVTestRequestedGreaterOrEqual20Weeks (1=Si, 2=No, 3=n/c)
        // Fields: "solicitada1" (Si), "solicitada2" (No), "solicitada3" (n/c)
        if (cp.hivTestRequestedGreaterOrEqual20Weeks === 1) {
            const radio = document.querySelector('input[name="solicitada1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH ≥20 sem prueba solicitada: Si');
            }
        } else if (cp.hivTestRequestedGreaterOrEqual20Weeks === 2) {
            const radio = document.querySelector('input[name="solicitada2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH ≥20 sem prueba solicitada: No');
            }
        } else if (cp.hivTestRequestedGreaterOrEqual20Weeks === 3) {
            const radio = document.querySelector('input[name="solicitada3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH ≥20 sem prueba solicitada: n/c');
            }
        }

        // Prueba result: HIVTestResultGreaterOrEqual20Weeks (1=+, 2=-, 3=n/c, 4=s/d)
        // Fields: "Prueba1" (+), "Prueba2" (-), "Prueba3" (n/c), "Prueba4" (s/d)
        if (cp.hivTestResultGreaterOrEqual20Weeks === 1) {
            const radio = document.querySelector('input[name="Prueba1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH ≥20 sem prueba result: +');
            }
        } else if (cp.hivTestResultGreaterOrEqual20Weeks === 2) {
            const radio = document.querySelector('input[name="Prueba2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH ≥20 sem prueba result: -');
            }
        } else if (cp.hivTestResultGreaterOrEqual20Weeks === 3) {
            const radio = document.querySelector('input[name="Prueba3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH ≥20 sem prueba result: n/c');
            }
        } else if (cp.hivTestResultGreaterOrEqual20Weeks === 4) {
            const radio = document.querySelector('input[name="Prueba4"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VIH ≥20 sem prueba result: s/d');
            }
        }

        // TARV en emb ≥20 sem: HIVARTGreaterOrEqual20Weeks (1=Si, 2=No, 3=n/c)
        // All three radios have name="emb", select by position
        if (cp.hivARTGreaterOrEqual20Weeks === 1) {
            const radios = document.querySelectorAll('input[name="emb"]');
            if (radios.length > 0) {
                radios[0].checked = true; // First radio is "Si"
                console.log('[Form1] ✓ Set VIH ≥20 sem TARV: Si');
            }
        } else if (cp.hivARTGreaterOrEqual20Weeks === 2) {
            const radios = document.querySelectorAll('input[name="emb"]');
            if (radios.length > 1) {
                radios[1].checked = true; // Second radio is "No"
                console.log('[Form1] ✓ Set VIH ≥20 sem TARV: No');
            }
        } else if (cp.hivARTGreaterOrEqual20Weeks === 3) {
            const radios = document.querySelectorAll('input[name="emb"]');
            if (radios.length > 2) {
                radios[2].checked = true; // Third radio is "n/c"
                console.log('[Form1] ✓ Set VIH ≥20 sem TARV: n/c');
            }
        }

        // SIFILIS - DIAG TRATAMIENTO <20 sem
        // no treponémica: SyphilisNonTreponemalResultLessThan20Weeks (1=-, 2=+, 3=s/d)
        // Fields: "no treponémica11" (-), "no treponémica22" (+), "no treponémica33" (s/d)
        if (cp.syphilisNonTreponemalResultLessThan20Weeks === 1) {
            const radio = document.querySelector('input[name="no treponémica11"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem no treponémica: -');
            }
        } else if (cp.syphilisNonTreponemalResultLessThan20Weeks === 2) {
            const radio = document.querySelector('input[name="no treponémica22"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem no treponémica: +');
            }
        } else if (cp.syphilisNonTreponemalResultLessThan20Weeks === 3) {
            const radio = document.querySelector('input[name="no treponémica33"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem no treponémica: s/d');
            }
        }

        // treponémica: SyphilisTreponemalResultLessThan20Weeks (1=-, 2=+, 3=s/d, 4=n/c)
        // Fields: "treponémica11" (-), "treponémica22" (+), "treponémica33" (s/d), "treponémica44" (n/c)
        if (cp.syphilisTreponemalResultLessThan20Weeks === 1) {
            const radio = document.querySelector('input[name="treponémica11"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem treponémica: -');
            }
        } else if (cp.syphilisTreponemalResultLessThan20Weeks === 2) {
            const radio = document.querySelector('input[name="treponémica22"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem treponémica: +');
            }
        } else if (cp.syphilisTreponemalResultLessThan20Weeks === 3) {
            const radio = document.querySelector('input[name="treponémica33"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem treponémica: s/d');
            }
        } else if (cp.syphilisTreponemalResultLessThan20Weeks === 4) {
            const radio = document.querySelector('input[name="treponémica44"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem treponémica: n/c');
            }
        }

        // Tratamiento: SyphilisTreatmentOptionLessThan20Weeks (1=no, 2=si, 3=s/d, 4=n/c)
        // Fields: "Tratamiento11" (no), "Tratamiento22" (si), "Tratamiento33" (s/d), "Tratamiento44" (n/c)
        if (cp.syphilisTreatmentOptionLessThan20Weeks === 1) {
            const radio = document.querySelector('input[name="Tratamiento11"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem Tratamiento: no');
            }
        } else if (cp.syphilisTreatmentOptionLessThan20Weeks === 2) {
            const radio = document.querySelector('input[name="Tratamiento22"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem Tratamiento: si');
            }
        } else if (cp.syphilisTreatmentOptionLessThan20Weeks === 3) {
            const radio = document.querySelector('input[name="Tratamiento33"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem Tratamiento: s/d');
            }
        } else if (cp.syphilisTreatmentOptionLessThan20Weeks === 4) {
            const radio = document.querySelector('input[name="Tratamiento44"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem Tratamiento: n/c');
            }
        }

        // Tratamiento semanas: SyphilisTreatmentWeeksLessThan20Weeks
        // Fields: "Tratamiento55", "Tratamiento66" (2 digits)
        if (cp.syphilisTreatmentWeeksLessThan20Weeks !== null && cp.syphilisTreatmentWeeksLessThan20Weeks !== undefined) {
            const weeksStr = cp.syphilisTreatmentWeeksLessThan20Weeks.toString().padStart(2, '0');
            const checkbox1 = document.querySelector('input[name="Tratamiento55"]');
            const checkbox2 = document.querySelector('input[name="Tratamiento66"]');
            if (checkbox1 && checkbox2) {
                // Convert checkboxes to text inputs if needed
                [checkbox1, checkbox2].forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                checkbox1.value = weeksStr[0];
                checkbox2.value = weeksStr[1];
                console.log(`[Form1] ✓ Set SIFILIS <20 sem Tratamiento semanas: ${cp.syphilisTreatmentWeeksLessThan20Weeks}`);
            }
        }

        // Tto. de la pareja: SyphilisPartnerTreatmentLessThan20Weeks (1=no, 2=si, 3=s/d, 4=n/c)
        // Fields: "parejaa11" (no), "parejaa33" (si), "parejaa22" (s/d), "parejaa44" (n/c)
        if (cp.syphilisPartnerTreatmentLessThan20Weeks === 1) {
            const radio = document.querySelector('input[name="parejaa11"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem Tto. pareja: no');
            }
        } else if (cp.syphilisPartnerTreatmentLessThan20Weeks === 2) {
            const radio = document.querySelector('input[name="parejaa33"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem Tto. pareja: si');
            }
        } else if (cp.syphilisPartnerTreatmentLessThan20Weeks === 3) {
            const radio = document.querySelector('input[name="parejaa22"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem Tto. pareja: s/d');
            }
        } else if (cp.syphilisPartnerTreatmentLessThan20Weeks === 4) {
            const radio = document.querySelector('input[name="parejaa44"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS <20 sem Tto. pareja: n/c');
            }
        }

        // SIFILIS - DIAG TRATAMIENTO ≥20 sem
        // no treponémica: SyphilisNonTreponemalResultGreaterOrEqual20Weeks (1=-, 2=+, 3=s/d)
        // Fields: "no treponémica1" (-), "no treponémica2" (+), "no treponémica3" (s/d)
        if (cp.syphilisNonTreponemalResultGreaterOrEqual20Weeks === 1) {
            const radio = document.querySelector('input[name="no treponémica1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem no treponémica: -');
            }
        } else if (cp.syphilisNonTreponemalResultGreaterOrEqual20Weeks === 2) {
            const radio = document.querySelector('input[name="no treponémica2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem no treponémica: +');
            }
        } else if (cp.syphilisNonTreponemalResultGreaterOrEqual20Weeks === 3) {
            const radio = document.querySelector('input[name="no treponémica3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem no treponémica: s/d');
            }
        }

        // treponémica: SyphilisTreponemalResultGreaterOrEqual20Weeks (1=-, 2=+, 3=s/d, 4=n/c)
        // Fields: "treponémica1" (-), "treponémica2" (+), "treponémica3" (s/d), "treponémica4" (n/c)
        if (cp.syphilisTreponemalResultGreaterOrEqual20Weeks === 1) {
            const radio = document.querySelector('input[name="treponémica1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem treponémica: -');
            }
        } else if (cp.syphilisTreponemalResultGreaterOrEqual20Weeks === 2) {
            const radio = document.querySelector('input[name="treponémica2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem treponémica: +');
            }
        } else if (cp.syphilisTreponemalResultGreaterOrEqual20Weeks === 3) {
            const radio = document.querySelector('input[name="treponémica3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem treponémica: s/d');
            }
        } else if (cp.syphilisTreponemalResultGreaterOrEqual20Weeks === 4) {
            const radio = document.querySelector('input[name="treponémica4"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem treponémica: n/c');
            }
        }

        // Tratamiento: SyphilisTreatmentOptionGreaterOrEqual20Weeks (1=no, 2=si, 3=s/d, 4=n/c)
        // Fields: "Tratamiento1" (no), "Tratamiento2" (si), "Tratamiento3" (s/d), "Tratamiento4" (n/c)
        if (cp.syphilisTreatmentOptionGreaterOrEqual20Weeks === 1) {
            const radio = document.querySelector('input[name="Tratamiento1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem Tratamiento: no');
            }
        } else if (cp.syphilisTreatmentOptionGreaterOrEqual20Weeks === 2) {
            const radio = document.querySelector('input[name="Tratamiento2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem Tratamiento: si');
            }
        } else if (cp.syphilisTreatmentOptionGreaterOrEqual20Weeks === 3) {
            const radio = document.querySelector('input[name="Tratamiento3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem Tratamiento: s/d');
            }
        } else if (cp.syphilisTreatmentOptionGreaterOrEqual20Weeks === 4) {
            const radio = document.querySelector('input[name="Tratamiento4"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem Tratamiento: n/c');
            }
        }

        // Tratamiento semanas: SyphilisTreatmentWeeksGreaterOrEqual20Weeks
        // Fields: "Tratamiento5", "Tratamiento6" (2 digits)
        if (cp.syphilisTreatmentWeeksGreaterOrEqual20Weeks !== null && cp.syphilisTreatmentWeeksGreaterOrEqual20Weeks !== undefined) {
            const weeksStr = cp.syphilisTreatmentWeeksGreaterOrEqual20Weeks.toString().padStart(2, '0');
            const checkbox1 = document.querySelector('input[name="Tratamiento5"]');
            const checkbox2 = document.querySelector('input[name="Tratamiento6"]');
            if (checkbox1 && checkbox2) {
                // Convert checkboxes to text inputs if needed
                [checkbox1, checkbox2].forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                checkbox1.value = weeksStr[0];
                checkbox2.value = weeksStr[1];
                console.log(`[Form1] ✓ Set SIFILIS ≥20 sem Tratamiento semanas: ${cp.syphilisTreatmentWeeksGreaterOrEqual20Weeks}`);
            }
        }

        // Tto. de la pareja: SyphilisPartnerTreatmentGreaterOrEqual20Weeks (1=no, 2=si, 3=s/d, 4=n/c)
        // NOTE: HTML has duplicate names - "de la1" for both no/si, "de la2" for both s/d/n/c
        // Select by position within each name group
        if (cp.syphilisPartnerTreatmentGreaterOrEqual20Weeks === 1) {
            const radios = document.querySelectorAll('input[name="de la1"]');
            if (radios.length > 0) {
                radios[0].checked = true; // First "de la1" is "no"
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem Tto. pareja: no');
            }
        } else if (cp.syphilisPartnerTreatmentGreaterOrEqual20Weeks === 2) {
            const radios = document.querySelectorAll('input[name="de la1"]');
            if (radios.length > 1) {
                radios[1].checked = true; // Second "de la1" is "si"
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem Tto. pareja: si');
            }
        } else if (cp.syphilisPartnerTreatmentGreaterOrEqual20Weeks === 3) {
            const radios = document.querySelectorAll('input[name="de la2"]');
            if (radios.length > 0) {
                radios[0].checked = true; // First "de la2" is "s/d"
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem Tto. pareja: s/d');
            }
        } else if (cp.syphilisPartnerTreatmentGreaterOrEqual20Weeks === 4) {
            const radios = document.querySelectorAll('input[name="de la2"]');
            if (radios.length > 1) {
                radios[1].checked = true; // Second "de la2" is "n/c"
                console.log('[Form1] ✓ Set SIFILIS ≥20 sem Tto. pareja: n/c');
            }
        }

        console.log('[Form1] Current pregnancy populated');
    }

    function populateVaccine(baseName, timeEnum, date, gestationalWeeks, totalDoses, rowIndex) {
        // timeEnum: 1=No, 2=PrePregnancy, 3=DuringPregnancy, 4=PostpartumOrAbortion
        if (timeEnum === null || timeEnum === undefined) {
            console.log(`[Form1] Skipping vaccine ${baseName} - no time value`);
            return;
        }

        // Map enum to radio button number (1→radio1, 2→radio2, 3→radio3, 4→radio4)
        const radioName = `${baseName}${timeEnum}`;
        const radio = document.querySelector(`input[name="${radioName}"]`);
        if (radio) {
            radio.checked = true;
            console.log(`[Form1] ✓ Set vaccine ${baseName} to option ${timeEnum}`);
        } else {
            console.warn(`[Form1] ✗ Vaccine radio not found: name="${radioName}"`);
        }

        // Populate vaccine date (día/mes/año format)
        if (date && rowIndex !== undefined) {
            const dateObj = new Date(date);
            const day = dateObj.getDate().toString().padStart(2, '0');
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
            const year = dateObj.getFullYear().toString();
            
            // Find the date input for this vaccine row (0-indexed)
            const dateInputs = document.querySelectorAll('.vac-grid .input-box2 input.large-input, .vac-grid .input-box3 input.large-input');
            if (dateInputs[rowIndex]) {
                dateInputs[rowIndex].value = `${day}/${month}/${year}`;
                console.log(`[Form1] ✓ Set vaccine ${baseName} date: ${day}/${month}/${year}`);
            }
        }
        
        // Populate gestational weeks if provided
        // Note: Gestational weeks can be present even for "no" or "previa embarazo" vaccines
        if (gestationalWeeks !== null && gestationalWeeks !== undefined) {
            // Map vaccine to gestational week checkbox names
            const weekCheckboxMap = {
                'difteria': ['universs10', 'universs9'],
                'tdap': ['universs8', 'universs7'],
                'influenza': ['universs6', 'universs5'],
                'rubeolla': ['universs4', 'universs3'],
                'hepatitisb': ['universs2', 'universs1'],
                'hepatitisa': null // No checkboxes for hepatitis A in HTML
            };
            
            const checkboxNames = weekCheckboxMap[baseName];
            if (checkboxNames) {
                const weeksStr = gestationalWeeks.toString().padStart(2, '0');
                
                // First checkbox = tens digit, second checkbox = ones digit
                const firstCheckbox = document.querySelector(`input[name="${checkboxNames[0]}"]`);
                const secondCheckbox = document.querySelector(`input[name="${checkboxNames[1]}"]`);
                
                if (firstCheckbox && secondCheckbox) {
                    firstCheckbox.value = weeksStr[0]; // Tens digit
                    secondCheckbox.value = weeksStr[1]; // Ones digit
                    console.log(`[Form1] ✓ Set vaccine ${baseName} gestational weeks: ${gestationalWeeks} (${weeksStr[0]}, ${weeksStr[1]})`);
                } else {
                    console.warn(`[Form1] ✗ Gestational week checkboxes not found for ${baseName}`);
                }
            } else if (baseName === 'hepatitisa') {
                console.log(`[Form1] ℹ Hepatitis A has no gestational week checkboxes in HTML`);
            }
        }
        
        // Populate total doses (n total dosis) - only for first vaccine (difteria) uses universs22/universs11
        if (totalDoses !== null && totalDoses !== undefined && baseName === 'difteria') {
            const dosesStr = totalDoses.toString().padStart(2, '0');
            const dose1 = document.querySelector('input[name="universs22"]');
            const dose2 = document.querySelector('input[name="universs11"]');
            if (dose1 && dose2) {
                dose1.value = dosesStr[0];
                dose2.value = dosesStr[1];
                console.log(`[Form1] ✓ Set total doses: ${totalDoses}`);
            }
        }
    }

    function populatePrenatalConsultations(data) {
        const consultations = data.prenatalConsultations;
        if (!consultations || consultations.length === 0) {
            console.warn('[Form1] No prenatal consultations data');
            return;
        }

        console.log('[Form1] Populating prenatal consultations:', consultations);

        // Find the prenatal consultations table
        const table = document.querySelector('.fifth-table tbody');
        if (!table) {
            console.error('[Form1] ✗ Prenatal consultations table not found');
            return;
        }

        const rows = table.querySelectorAll('tr');
        console.log(`[Form1] Found ${rows.length} consultation rows in table`);

        // Populate each consultation row
        consultations.forEach((consultation, index) => {
            if (index >= rows.length) {
                console.warn(`[Form1] Skipping consultation ${index + 1} - no more rows available`);
                return;
            }

            const row = rows[index];
            const inputs = row.querySelectorAll('input');
            
            if (inputs.length < 13) {
                console.warn(`[Form1] Row ${index} has only ${inputs.length} inputs, expected 13`);
                return;
            }

            // Column order: date, edad gest., peso, P.A., altura uterina, presentación, FCF, movim. fetales, proteinuria, lugar de control, signos de alarma, Iniciales Técnico, próxima cita
            
            // 0. Date (día | mes | año)
            if (consultation.consultationDate) {
                const date = new Date(consultation.consultationDate);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                inputs[0].value = `${day}/${month}/${year}`;
            }

            // 1. Gestational Age (weeks)
            if (consultation.gestationalAgeWeeks) {
                inputs[1].value = consultation.gestationalAgeWeeks;
            }

            // 2. Weight (kg)
            if (consultation.weight) {
                inputs[2].value = consultation.weight;
            }

            // 3. Blood Pressure (P.A.)
            if (consultation.bloodPressure) {
                inputs[3].value = consultation.bloodPressure;
            }

            // 4. Uterine Height (cm)
            if (consultation.uterineHeight) {
                inputs[4].value = consultation.uterineHeight;
            }

            // 5. Presentation
            if (consultation.presentation) {
                inputs[5].value = consultation.presentation;
            }

            // 6. Fetal Heart Rate (FCF in lpm)
            if (consultation.fetalHeartRate) {
                inputs[6].value = consultation.fetalHeartRate;
            }

            // 7. Fetal Movements (movim. fetales) - boolean to text
            if (consultation.fetalMovements !== null && consultation.fetalMovements !== undefined) {
                inputs[7].value = consultation.fetalMovements ? 'Si' : 'No';
            }

            // 8. Proteinuria - boolean to +/-
            if (consultation.proteinuria !== null && consultation.proteinuria !== undefined) {
                inputs[8].value = consultation.proteinuria ? '+' : '-';
            }

            // 9. Control Location (lugar de control)
            if (consultation.controlLocation) {
                inputs[9].value = consultation.controlLocation;
            }

            // 10. Warning Signs/Exams/Treatments (signos de alarma, exámenes, tratamientos)
            if (consultation.warningSignsExamsAndTreatments) {
                inputs[10].value = consultation.warningSignsExamsAndTreatments;
            }

            // 11. Technician Initials (Iniciales Técnico)
            if (consultation.technicianInitials) {
                inputs[11].value = consultation.technicianInitials;
            }

            // 12. Next Appointment (próxima cita)
            if (consultation.nextAppointment) {
                const date = new Date(consultation.nextAppointment);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                inputs[12].value = `${day}/${month}/${year}`;
            }

            console.log(`[Form1] ✓ Populated consultation row ${index + 1}`);
        });

        console.log(`[Form1] Prenatal consultations populated (${consultations.length} rows)`);
    }

    function populateBirthInfo(data) {
        const birth = data.birthInformation;
        if (!birth) {
            console.warn('[Form1] No birth information data');
            return;
        }

        console.log('[Form1] Populating birth information:', birth);

        // FECHA DE INGRESO (Admission Date) - first large-input in parto-aborto-grid
        if (birth.admissionDate) {
            const date = new Date(birth.admissionDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            // Find the first input in parto-aborto-grid section
            const partoSection = document.querySelector('.parto-aborto-grid');
            if (partoSection) {
                const dateInput = partoSection.querySelector('input.large-input');
                if (dateInput) {
                    dateInput.value = formattedDate;
                    console.log(`[Form1] ✓ Set admission date: ${formattedDate}`);
                }
            }
        }

        // CARNÉ (Has Prenatal Card)
        setYesNoRadio('CARNÉ', birth.hasPrenatalCard, true);

        // CONSULTAS PRENATALES total
        console.log(`[Form1] DEBUG prenatalConsultationsTotal value:`, birth.prenatalConsultationsTotal);
        if (birth.prenatalConsultationsTotal !== null && birth.prenatalConsultationsTotal !== undefined) {
            const inputs = document.querySelectorAll('input.check-box[name="NATALES"]');
            console.log(`[Form1] DEBUG Found ${inputs.length} NATALES inputs`);
            const valueStr = birth.prenatalConsultationsTotal.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                // Convert checkboxes to text inputs if needed
                inputs.forEach((input, idx) => {
                    console.log(`[Form1] DEBUG NATALES input ${idx} type before:`, input.type);
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                        input.style.width = '20px';
                        input.style.textAlign = 'center';
                    }
                    console.log(`[Form1] DEBUG NATALES input ${idx} type after:`, input.type);
                });
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set prenatal consultations total: ${birth.prenatalConsultationsTotal} (${valueStr[0]}, ${valueStr[1]})`);
                console.log(`[Form1] DEBUG Final values:`, inputs[0].value, inputs[1].value);
            } else {
                console.warn(`[Form1] ✗ Not enough NATALES inputs found: ${inputs.length}`);
            }
        } else {
            console.warn(`[Form1] ✗ prenatalConsultationsTotal is null or undefined`);
        }

        // EDAD GEST. 1ra CONSULTA (semanas)
        console.log(`[Form1] DEBUG firstConsultationGestationalAgeWeeks value:`, birth.firstConsultationGestationalAgeWeeks);
        if (birth.firstConsultationGestationalAgeWeeks !== null && birth.firstConsultationGestationalAgeWeeks !== undefined) {
            const inputs = document.querySelectorAll('input.check-box[name="CONSULTA"]');
            console.log(`[Form1] DEBUG Found ${inputs.length} CONSULTA inputs`);
            const valueStr = birth.firstConsultationGestationalAgeWeeks.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                // Convert checkboxes to text inputs if needed
                inputs.forEach((input, idx) => {
                    console.log(`[Form1] DEBUG CONSULTA input ${idx} type before:`, input.type);
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                        input.style.width = '20px';
                        input.style.textAlign = 'center';
                    }
                    console.log(`[Form1] DEBUG CONSULTA input ${idx} type after:`, input.type);
                });
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set first consultation gestational age: ${birth.firstConsultationGestationalAgeWeeks} (${valueStr[0]}, ${valueStr[1]})`);
                console.log(`[Form1] DEBUG Final values:`, inputs[0].value, inputs[1].value);
            } else {
                console.warn(`[Form1] ✗ Not enough CONSULTA inputs found: ${inputs.length}`);
            }
        } else {
            console.warn(`[Form1] ✗ firstConsultationGestationalAgeWeeks is null or undefined`);
        }

        // HOSPITALIZ. EN EMBARAZO
        setYesNoRadio('HOSPITALIZ', birth.hospitalizedDuringPregnancy, true);

        // Hospitalization days
        console.log(`[Form1] DEBUG hospitalizationDays value:`, birth.hospitalizationDays);
        if (birth.hospitalizationDays !== null && birth.hospitalizationDays !== undefined) {
            // Use separate queries and combine
            const hos1Inputs = document.querySelectorAll('input.check-box[name="hos1"]');
            const hos2Inputs = document.querySelectorAll('input.check-box[name="hos2"]');
            const inputs = [hos1Inputs[0], hos2Inputs[0]].filter(i => i);
            console.log(`[Form1] DEBUG Found ${inputs.length} hospitalization inputs (hos1: ${hos1Inputs.length}, hos2: ${hos2Inputs.length})`);
            const valueStr = birth.hospitalizationDays.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                // Convert checkboxes to text inputs if needed
                inputs.forEach((input, idx) => {
                    console.log(`[Form1] DEBUG hos input ${idx} type before:`, input.type);
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                        input.style.width = '20px';
                        input.style.textAlign = 'center';
                    }
                    console.log(`[Form1] DEBUG hos input ${idx} type after:`, input.type);
                });
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set hospitalization days: ${birth.hospitalizationDays} (${valueStr[0]}, ${valueStr[1]})`);
                console.log(`[Form1] DEBUG Final values:`, inputs[0].value, inputs[1].value);
            } else {
                console.warn(`[Form1] ✗ Not enough hospitalization inputs found: ${inputs.length}`);
            }
        } else {
            console.warn(`[Form1] ✗ hospitalizationDays is null or undefined`);
        }

        // CORTICOIDES ANTENATALES
        if (birth.corticosteroidsComplete === true) {
            const radio = document.querySelector('input[name="completo"]');
            if (radio) radio.checked = true;
        }
        if (birth.corticosteroidsIncomplete === true) {
            const radio = document.querySelector('input[name="incompl"]');
            if (radio) radio.checked = true;
        }
        if (birth.corticosteroidsNone === true) {
            const radio = document.querySelector('input[name="ninguna11"]');
            if (radio) radio.checked = true;
        }
        if (birth.corticosteroidsNA === true) {
            const radio = document.querySelector('input[name="n/c"]');
            if (radio) radio.checked = true;
        }

        // Corticosteroids start week
        console.log(`[Form1] DEBUG corticosteroidsStartWeek value:`, birth.corticosteroidsStartWeek);
        if (birth.corticosteroidsStartWeek !== null && birth.corticosteroidsStartWeek !== undefined) {
            // Use separate queries and combine
            const corti1Inputs = document.querySelectorAll('input.check-box[name="corti1"]');
            const corti2Inputs = document.querySelectorAll('input.check-box[name="corti2"]');
            const inputs = [corti1Inputs[0], corti2Inputs[0]].filter(i => i);
            console.log(`[Form1] DEBUG Found ${inputs.length} corticosteroids inputs (corti1: ${corti1Inputs.length}, corti2: ${corti2Inputs.length})`);
            const valueStr = birth.corticosteroidsStartWeek.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                // Convert checkboxes to text inputs if needed
                inputs.forEach((input, idx) => {
                    console.log(`[Form1] DEBUG corti input ${idx} type before:`, input.type);
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                        input.style.width = '20px';
                        input.style.textAlign = 'center';
                    }
                    console.log(`[Form1] DEBUG corti input ${idx} type after:`, input.type);
                });
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set corticosteroids start week: ${birth.corticosteroidsStartWeek} (${valueStr[0]}, ${valueStr[1]})`);
                console.log(`[Form1] DEBUG Final values:`, inputs[0].value, inputs[1].value);
            } else {
                console.warn(`[Form1] ✗ Not enough corticosteroids inputs found: ${inputs.length}`);
            }
        } else {
            console.warn(`[Form1] ✗ corticosteroidsStartWeek is null or undefined`);
        }

        // INICIO (Labor Onset)
        if (birth.spontaneousOnset === true) {
            const radio = document.querySelector('input[name="espontáneo"]');
            if (radio) radio.checked = true;
        }
        if (birth.inducedOnset === true) {
            const radio = document.querySelector('input[name="inducido"]');
            if (radio) radio.checked = true;
        }
        if (birth.electiveCesareanOnset === true) {
            const radio = document.querySelector('input[name="cesar. elect"]');
            if (radio) radio.checked = true;
        }

        // ROTURA DE MEMBRANAS
        setYesNoRadio('ROTURA', birth.membraneRupture, true);

        // Membrane rupture date
        if (birth.membraneRuptureDate) {
            const date = new Date(birth.membraneRuptureDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            // Find the date input in rotura-grid section (second large-input)
            const roturaSection = document.querySelector('.rotura-grid');
            if (roturaSection) {
                const dateInput = roturaSection.querySelector('input.large-input');
                if (dateInput) {
                    dateInput.value = formattedDate;
                    console.log(`[Form1] ✓ Set membrane rupture date: ${formattedDate}`);
                }
            }
        }

        // Membrane rupture time
        if (birth.membraneRuptureTime) {
            const roturaSection = document.querySelector('.rotura-grid');
            if (roturaSection) {
                const timeInput = roturaSection.querySelector('input.small-input1');
                if (timeInput) {
                    timeInput.value = birth.membraneRuptureTime;
                    console.log(`[Form1] ✓ Set membrane rupture time: ${birth.membraneRuptureTime}`);
                }
            }
        }

        // Membrane rupture checkboxes
        if (birth.membraneRuptureBefore37Weeks === true) {
            const radio = document.querySelector('input[name="37"]');
            if (radio) radio.checked = true;
        }
        if (birth.membraneRuptureMoreThan18Hours === true) {
            const radio = document.querySelector('input[name="18"]');
            if (radio) radio.checked = true;
        }
        if (birth.feverDuringLabor === true) {
            const radio = document.querySelector('input[name="temp"]');
            if (radio) radio.checked = true;
        }

        // Fever temperature (in char-inputs near temp checkbox)
        if (birth.feverTemperature) {
            const inputs = document.querySelectorAll('.rotura-grid input.check-box[name="univers"]');
            const valueStr = birth.feverTemperature.toString().replace('.', '').padStart(3, '0');
            if (inputs.length >= 3) {
                // Convert checkboxes to text inputs if needed
                inputs.forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                inputs[2].value = valueStr[2];
                console.log(`[Form1] ✓ Set fever temperature: ${birth.feverTemperature}`);
            }
        }

        // TAMAÑO FETAL ACORDE (Fetal Size Appropriate)
        setYesNoRadio('TAMAÑO', birth.fetalSizeAppropriate, true);

        // EDAD GEST. AL PARTO (Gestational Age at Birth)
        if (birth.gestationalAgeAtBirthWeeks) {
            const inputs = document.querySelectorAll('input.check-box[name="GEST1"], input.check-box[name="GEST2"]');
            const valueStr = birth.gestationalAgeAtBirthWeeks.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                // Convert checkboxes to text inputs if needed
                inputs.forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set gestational age at birth weeks: ${birth.gestationalAgeAtBirthWeeks}`);
            }
        }
        if (birth.gestationalAgeAtBirthDays) {
            const input = document.querySelector('input.check-box[name="GEST3"]');
            if (input) {
                // Convert checkbox to text input if needed
                if (input.type === 'checkbox') {
                    input.type = 'text';
                    input.setAttribute('maxlength', '1');
                }
                input.value = birth.gestationalAgeAtBirthDays.toString();
                console.log(`[Form1] ✓ Set gestational age at birth days: ${birth.gestationalAgeAtBirthDays}`);
            }
        }

        // Gestational Age Method
        if (birth.gestationalAgeByLMP === true) {
            const radio = document.querySelector('input[name="porfum"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set gestational age by FUM');
            }
        }
        if (birth.gestationalAgeByUltrasound === true) {
            const radio = document.querySelector('input[name="poreco"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set gestational age by Eco');
            }
        }

        // PRESENTACION / SITUACION (note: "cefálica " has a space in the name!)
        if (birth.cephalicPresentation === true) {
            const radio = document.querySelector('input[name="cefálica "]'); // Note the space!
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set presentation: cephalic');
            }
        }
        if (birth.pelvicPresentation === true) {
            const radio = document.querySelector('input[name="pelviana"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set presentation: pelvic');
            }
        }
        if (birth.transverseSituation === true) {
            const radio = document.querySelector('input[name="transversa"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set situation: transverse');
            }
        }

        // ACOMPAÑANTE TDP (Companion) - First radio in each row
        if (birth.companion) {
            const value = birth.companion.toLowerCase();
            let radioName = '';
            if (value === 'pareja') radioName = 'pareja';
            else if (value === 'familiar') radioName = 'familiar';
            else if (value === 'otro') radioName = 'o';
            else if (value === 'ninguno') radioName = 'ningunooo';
            
            if (radioName) {
                // Find the first radio with this name (TDP column)
                const radios = document.querySelectorAll(`input[name="${radioName}"]`);
                if (radios.length > 0) {
                    radios[0].checked = true; // First radio is TDP
                    console.log(`[Form1] ✓ Set companion TDP: ${birth.companion}`);
                }
            }
        }

        // ACOMPAÑANTE P (CompanionP) - Second radio in each row
        if (birth.companionP) {
            const value = birth.companionP.toLowerCase();
            let radioName = '';
            if (value === 'pareja') radioName = 'pareja';
            else if (value === 'familiar') radioName = 'familiar';
            else if (value === 'otro') radioName = 'o';
            else if (value === 'ninguno') radioName = 'ningunooo1';
            
            if (radioName) {
                // For P column, use second radio or specific name
                if (radioName === 'ningunooo1') {
                    const radio = document.querySelector(`input[name="${radioName}"]`);
                    if (radio) {
                        radio.checked = true;
                        console.log(`[Form1] ✓ Set companionP: ${birth.companionP}`);
                    }
                } else {
                    const radios = document.querySelectorAll(`input[name="${radioName}"]`);
                    if (radios.length > 1) {
                        radios[1].checked = true; // Second radio is P
                        console.log(`[Form1] ✓ Set companionP: ${birth.companionP}`);
                    }
                }
            }
        }

        // MEDICACION RECIBIDA (Medication Received)
        // Database fields → HTML field names mapping:
        // OxytocicsInLabor → ocitocios
        // AntibioticsTreatment → antibiot
        // AnalgesiaTreatment → analgesia
        // LocalAnesthesia → anest_local
        // RegionalAnesthesia → anest_region
        // GeneralAnesthesia → anest_gral
        // Transfusion → transfusion
        // MagnesiumSulfatePreeclampsia → sulfato_mg
        // MagnesiumSulfateEclampsia → eclam
        // OtherMedicationOneDetail → medic1/medic2 (text inputs)
        // OtherMedicationTwoDetail → medic3/medic4 (text inputs)
        
        setYesNoRadio('ocitocios', birth.oxytocicsInLabor, true);
        setYesNoRadio('antibiot', birth.antibioticsTreatment, true);
        setYesNoRadio('analgesia', birth.analgesiaTreatment, true);
        setYesNoRadio('anest_local', birth.localAnesthesia, true);
        setYesNoRadio('anest_region', birth.regionalAnesthesia, true);
        setYesNoRadio('anest_gral', birth.generalAnesthesia, true);
        setYesNoRadio('transfusion', birth.transfusion, true);
        setYesNoRadio('sulfato_mg', birth.magnesiumSulfatePreeclampsia, true);
        setYesNoRadio('eclam', birth.magnesiumSulfateEclampsia, true);

        // Otros medicamentos (text fields, not radios)
        if (birth.otherMedicationOneDetail) {
            const inputs = document.querySelectorAll('input[name="medic1"], input[name="medic2"]');
            const valueStr = birth.otherMedicationOneDetail.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set other medication 1: ${birth.otherMedicationOneDetail}`);
            }
        }
        if (birth.otherMedicationTwoDetail) {
            const inputs = document.querySelectorAll('input[name="medic3"], input[name="medic4"]');
            const valueStr = birth.otherMedicationTwoDetail.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set other medication 2: ${birth.otherMedicationTwoDetail}`);
            }
        }

        // ENFERMEDADES - TDP Prueba (Birth Tests)
        // Sífilis: BirthSyphilisTest (1=-, 2=+, 3=n/r, 4=n/c)
        // Fields: "Sífilis1" (-), "Sífilis2" (+), "Sífilis3" (n/r), "Sífilis4" (n/c)
        if (birth.birthSyphilisTest === 1) {
            const radio = document.querySelector('input[name="Sífilis1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth Syphilis test: -');
            }
        } else if (birth.birthSyphilisTest === 2) {
            const radio = document.querySelector('input[name="Sífilis2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth Syphilis test: +');
            }
        } else if (birth.birthSyphilisTest === 3) {
            const radio = document.querySelector('input[name="Sífilis3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth Syphilis test: n/r');
            }
        } else if (birth.birthSyphilisTest === 4) {
            const radio = document.querySelector('input[name="Sífilis4"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth Syphilis test: n/c');
            }
        }

        // VIH: BirthHIVTest (1=-, 2=+, 3=n/r, 4=n/c)
        // Fields: "VIH1" (-), "VIH2" (+), "VIH3" (n/r), "VIH4" (n/c)
        if (birth.birthHIVTest === 1) {
            const radio = document.querySelector('input[name="VIH1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth HIV test: -');
            }
        } else if (birth.birthHIVTest === 2) {
            const radio = document.querySelector('input[name="VIH2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth HIV test: +');
            }
        } else if (birth.birthHIVTest === 3) {
            const radio = document.querySelector('input[name="VIH3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth HIV test: n/r');
            }
        } else if (birth.birthHIVTest === 4) {
            const radio = document.querySelector('input[name="VIH4"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth HIV test: n/c');
            }
        }

        // TARV: BirthTARV (1=si, 2=no, 3=n/c)
        // All three radios have name="tarv", select by position
        if (birth.birthTARV === 1) {
            const radios = document.querySelectorAll('input[name="tarv"]');
            if (radios.length > 0) {
                radios[0].checked = true; // First radio is "si"
                console.log('[Form1] ✓ Set birth TARV: si');
            }
        } else if (birth.birthTARV === 2) {
            const radios = document.querySelectorAll('input[name="tarv"]');
            if (radios.length > 1) {
                radios[1].checked = true; // Second radio is "no"
                console.log('[Form1] ✓ Set birth TARV: no');
            }
        } else if (birth.birthTARV === 3) {
            const radios = document.querySelectorAll('input[name="tarv"]');
            if (radios.length > 2) {
                radios[2].checked = true; // Third radio is "n/c"
                console.log('[Form1] ✓ Set birth TARV: n/c');
            }
        }

        // NACIMIENTO section
        // VIVO/MUERTO: IsLiveBirth (true=VIVO, false=MUERTO)
        console.log(`[Form1] Birth status - isLiveBirth: ${birth.isLiveBirth}, deadBirthBeforeLabor: ${birth.deadBirthBeforeLabor}, deadBirthDuringLabor: ${birth.deadBirthDuringLabor}, deadBirthDuringLaborUnknown: ${birth.deadBirthDuringLaborUnknown}`);
        
        if (birth.isLiveBirth === true) {
            const radio = document.querySelector('input[name="vivo"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth status: VIVO');
            } else {
                console.warn('[Form1] ✗ VIVO radio not found');
            }
        } else if (birth.isLiveBirth === false) {
            // MUERTO - check sub-options
            if (birth.deadBirthBeforeLabor === true) {
                const radio = document.querySelector('input[name="anteparto"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form1] ✓ Set birth status: MUERTO - anteparto');
                } else {
                    console.warn('[Form1] ✗ anteparto radio not found');
                }
            }
            if (birth.deadBirthDuringLabor === true) {
                const radio = document.querySelector('input[name="parto12"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form1] ✓ Set birth status: MUERTO - parto');
                } else {
                    console.warn('[Form1] ✗ parto12 radio not found');
                }
            }
            if (birth.deadBirthDuringLaborUnknown === true) {
                const radio = document.querySelector('input[name="ignoramomento"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form1] ✓ Set birth status: MUERTO - ignora momento');
                } else {
                    console.warn('[Form1] ✗ ignoramomento radio not found');
                }
            }
        } else {
            console.log('[Form1] ℹ Birth status not set (isLiveBirth is null/undefined)');
        }

        // Birth Time and Date
        if (birth.birthTime) {
            // Find the time input in NACIMIENTO section (first input-box with hora/min)
            const nacimientoSection = document.querySelector('.section-header-naci');
            if (nacimientoSection) {
                const parentGrid = nacimientoSection.closest('.grid-cell').nextElementSibling;
                if (parentGrid) {
                    const timeInput = parentGrid.querySelector('.input-box input.large-input');
                    if (timeInput) {
                        timeInput.value = birth.birthTime;
                        console.log(`[Form1] ✓ Set birth time: ${birth.birthTime}`);
                    }
                }
            }
        }
        
        if (birth.birthDate) {
            const date = new Date(birth.birthDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            // Find the date input in NACIMIENTO section (second input-box with día/mes/año)
            const nacimientoSection = document.querySelector('.section-header-naci');
            if (nacimientoSection) {
                const parentGrid = nacimientoSection.closest('.grid-cell').nextElementSibling;
                if (parentGrid) {
                    const dateInputs = parentGrid.querySelectorAll('.input-box input.large-input');
                    if (dateInputs.length > 1) {
                        dateInputs[1].value = formattedDate;
                        console.log(`[Form1] ✓ Set birth date: ${formattedDate}`);
                    }
                }
            }
        }

        // MULTIPLE: MultipleBirth (true/false)
        if (birth.multipleBirth === false) {
            const radio = document.querySelector('input[name="MULTIPLE"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set multiple birth: no');
            }
        } else if (birth.multipleBirth === true) {
            const radios = document.querySelectorAll('input[name="MULTIPLE"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set multiple birth: si');
            }
        }

        // Birth Order (órden)
        if (birth.birthOrder) {
            const input = document.querySelector('input[name="órden"]');
            if (input) {
                // Convert checkbox to text input if needed
                if (input.type === 'checkbox') {
                    input.type = 'text';
                    input.setAttribute('maxlength', '1');
                }
                input.value = birth.birthOrder.toString();
                console.log(`[Form1] ✓ Set birth order: ${birth.birthOrder}`);
            }
        }

        // TERMINACION (Termination Type)
        if (birth.spontaneousBirth === true) {
            const radio = document.querySelector('input[name="espont"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set termination: espontáneo');
            }
        }
        if (birth.cesareanBirth === true) {
            const radio = document.querySelector('input[name="cesárea"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set termination: cesárea');
            }
        }
        if (birth.forcepsBirth === true) {
            const radio = document.querySelector('input[name="forceps"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set termination: forceps');
            }
        }
        if (birth.vacuumBirth === true) {
            const radio = document.querySelector('input[name="vacuum"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set termination: vacuum');
            }
        }
        if (birth.otherTermination === true) {
            const radio = document.querySelector('input[name="ignora "]'); // Note the space!
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set termination: otra');
            }
        }

        // INDICACION PRINCIPAL DE INDUCCION O PARTO OPERATORIO
        if (birth.mainIndicationForInductionOrOperativeDelivery) {
            const textarea = document.querySelector('.indica textarea.textarealine-full');
            if (textarea) {
                textarea.value = birth.mainIndicationForInductionOrOperativeDelivery;
                console.log('[Form1] ✓ Set main indication for induction/operative delivery');
            }
        }

        // INDUC and OPER codes
        // NOTE: HTML has incorrect field names - all use name="hos" which conflicts with hospitalization
        // We'll select them by their parent .indica-flex containers
        if (birth.inductionCode) {
            const indicaFlexDivs = document.querySelectorAll('.indica .indica-flex');
            if (indicaFlexDivs.length >= 1) {
                // First .indica-flex is INDUC
                const inductInputs = indicaFlexDivs[0].querySelectorAll('.char-inputs input.check-box');
                const valueStr = birth.inductionCode.toString().padStart(2, '0');
                if (inductInputs.length >= 2) {
                    // Convert checkboxes to text inputs if needed
                    [inductInputs[0], inductInputs[1]].forEach(input => {
                        if (input.type === 'checkbox') {
                            input.type = 'text';
                            input.setAttribute('maxlength', '1');
                        }
                    });
                    inductInputs[0].value = valueStr[0];
                    inductInputs[1].value = valueStr[1];
                    console.log(`[Form1] ✓ Set induction code: ${birth.inductionCode}`);
                } else {
                    console.warn(`[Form1] ✗ INDUC inputs not found (found ${inductInputs.length})`);
                }
            } else {
                console.warn('[Form1] ✗ .indica-flex containers not found');
            }
        }
        
        if (birth.operativeCode) {
            const indicaFlexDivs = document.querySelectorAll('.indica .indica-flex');
            if (indicaFlexDivs.length >= 2) {
                // Second .indica-flex is OPER
                const operInputs = indicaFlexDivs[1].querySelectorAll('.char-inputs input.check-box');
                const valueStr = birth.operativeCode.toString().padStart(2, '0');
                if (operInputs.length >= 2) {
                    // Convert checkboxes to text inputs if needed
                    [operInputs[0], operInputs[1]].forEach(input => {
                        if (input.type === 'checkbox') {
                            input.type = 'text';
                            input.setAttribute('maxlength', '1');
                        }
                    });
                    operInputs[0].value = valueStr[0];
                    operInputs[1].value = valueStr[1];
                    console.log(`[Form1] ✓ Set operative code: ${birth.operativeCode}`);
                } else {
                    console.warn(`[Form1] ✗ OPER inputs not found (found ${operInputs.length})`);
                }
            } else {
                console.warn('[Form1] ✗ .indica-flex containers not found');
            }
        }

        // POSICION PARTO (Birth Position)
        // BirthPosition: "sentada", "acostada", "cuclillas"
        // NOTE: "acostada " has trailing space in HTML!
        if (birth.birthPosition) {
            const value = birth.birthPosition.toLowerCase();
            let fieldName = value;
            
            // Add trailing space for "acostada"
            if (value === 'acostada') {
                fieldName = 'acostada ';
            }
            
            const radio = document.querySelector(`input[name="${fieldName}"]`);
            if (radio) {
                radio.checked = true;
                console.log(`[Form1] ✓ Set birth position: ${birth.birthPosition}`);
            } else {
                console.warn(`[Form1] ✗ Birth position radio not found: ${fieldName}`);
            }
        }

        // EPISIOTOMIA (Episiotomy)
        // Episiotomy: true/false
        // NOTE: HTML has BOTH radios with name="" (empty)! Must select by parent structure
        if (birth.episiotomy === false) {
            // Find the EPISIOTOMIA section and get first radio (no)
            const section = Array.from(document.querySelectorAll('.esta-header')).find(h => h.textContent.includes('EPISIOTOMIA'));
            if (section) {
                const radios = section.parentElement.querySelectorAll('input[type="radio"]');
                if (radios.length >= 1) {
                    radios[0].checked = true;
                    console.log('[Form1] ✓ Set episiotomy: no');
                }
            }
        } else if (birth.episiotomy === true) {
            // Find the EPISIOTOMIA section and get second radio (si)
            const section = Array.from(document.querySelectorAll('.esta-header')).find(h => h.textContent.includes('EPISIOTOMIA'));
            if (section) {
                const radios = section.parentElement.querySelectorAll('input[type="radio"]');
                if (radios.length >= 2) {
                    radios[1].checked = true;
                    console.log('[Form1] ✓ Set episiotomy: si');
                }
            }
        }

        // DESGARROS (Tears)
        // Tear: true/false, TearGrade: 1-4
        // NOTE: "no" radio is name="Grado1", grade input is name="Grado2"
        if (birth.tear === false) {
            const radio = document.querySelector('input[name="Grado1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set tear: no');
            }
        }
        if (birth.tearGrade) {
            const input = document.querySelector('input[name="Grado2"]');
            if (input) {
                // Convert checkbox to text input if needed
                if (input.type === 'checkbox') {
                    input.type = 'text';
                    input.setAttribute('maxlength', '1');
                }
                input.value = birth.tearGrade.toString();
                console.log(`[Form1] ✓ Set tear grade: ${birth.tearGrade}`);
            }
        }

        // OCITOCICOS (Oxytocics)
        // OxytocicsPreDelivery: true/false (prealumbr.)
        // OxytocicsPostDelivery: true/false (postalumbr.)
        if (birth.oxytocicsPreDelivery === false) {
            const radio = document.querySelector('input[name="prealumbr"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set oxytocics pre-delivery: no');
            }
        } else if (birth.oxytocicsPreDelivery === true) {
            const radios = document.querySelectorAll('input[name="prealumbr"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set oxytocics pre-delivery: si');
            }
        }
        
        if (birth.oxytocicsPostDelivery === false) {
            const radio = document.querySelector('input[name="postalumbr"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set oxytocics post-delivery: no');
            }
        } else if (birth.oxytocicsPostDelivery === true) {
            const radios = document.querySelectorAll('input[name="postalumbr"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set oxytocics post-delivery: si');
            }
        }

        // PLACENTA
        // CompletePlacenta: true/false (completa)
        // RetainedPlacenta: true/false (retenida)
        if (birth.completePlacenta === false) {
            const radio = document.querySelector('input[name="completa"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set complete placenta: no');
            }
        } else if (birth.completePlacenta === true) {
            const radios = document.querySelectorAll('input[name="completa"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set complete placenta: si');
            }
        }
        
        if (birth.retainedPlacenta === false) {
            const radio = document.querySelector('input[name="retenida"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set retained placenta: no');
            }
        } else if (birth.retainedPlacenta === true) {
            const radios = document.querySelectorAll('input[name="retenida"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set retained placenta: si');
            }
        }

        // LIGADURA CORDON (Cord Clamping Time)
        // CordClampingTime: 1=<1 min, 2=1 a 3 min
        // NOTE: Both radios have name="1min" (same name!)
        if (birth.cordClampingTime === 1) {
            const radios = document.querySelectorAll('input[name="1min"]');
            if (radios.length >= 1) {
                radios[0].checked = true;
                console.log('[Form1] ✓ Set cord clamping time: < 1 min');
            }
        } else if (birth.cordClampingTime === 2) {
            const radios = document.querySelectorAll('input[name="1min"]');
            if (radios.length >= 2) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set cord clamping time: 1 a 3 min');
            }
        }

        console.log('[Form1] Birth information populated');
    }

    function populateNewbornInfo(data) {
        console.log('[Form1] Populating newborn information...');
        
        const newborn = data.newbornInformation;
        if (!newborn) {
            console.warn('[Form1] No newborn information data');
            return;
        }

        // SEXO (Sex/Gender)
        // Sex: "F", "M", "U" (undefined/no definido)
        // NOTE: HTML has both F and M radios with name="f", and "no definido" with name="definido"
        if (newborn.sex === 'F') {
            const radios = document.querySelectorAll('input[name="f"]');
            if (radios.length >= 1) {
                radios[0].checked = true;
                console.log('[Form1] ✓ Set sex: F');
            }
        } else if (newborn.sex === 'M') {
            const radios = document.querySelectorAll('input[name="f"]');
            if (radios.length >= 2) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set sex: M');
            }
        } else if (newborn.sex === 'U') {
            const radio = document.querySelector('input[name="definido"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set sex: no definido');
            }
        }

        // PESO AL NACER (Birth Weight)
        // BirthWeight: decimal value (e.g., 3500 grams)
        // NOTE: 4 checkboxes with name="univers" need to be converted to text inputs
        if (newborn.birthWeight) {
            const weightStr = Math.round(newborn.birthWeight).toString().padStart(4, '0');
            const weightInputs = document.querySelectorAll('.reci-grid input[name="univers"]');
            
            if (weightInputs.length >= 4) {
                // Convert checkboxes to text inputs
                weightInputs.forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                
                // Fill weight digits (e.g., 3500 -> "3500")
                for (let i = 0; i < Math.min(weightStr.length, 4); i++) {
                    weightInputs[i].value = weightStr[i];
                }
                console.log(`[Form1] ✓ Set birth weight: ${newborn.birthWeight}g`);
            }
        }

        // Birth Weight Categories (< 2500g, >= 4000g)
        if (newborn.birthWeight) {
            if (newborn.birthWeight < 2500) {
                const radio = document.querySelector('input[name="2500"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form1] ✓ Set birth weight category: < 2500g');
                }
            } else if (newborn.birthWeight >= 4000) {
                const radio = document.querySelector('input[name="4000"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form1] ✓ Set birth weight category: >= 4000g');
                }
            }
        }

        // P. CEFALICO (Head Circumference)
        // HeadCircumference: decimal value in cm (e.g., 34.5)
        // NOTE: 4 checkboxes with name="univers" in P. CEFALICO section
        if (newborn.headCircumference) {
            const circumStr = newborn.headCircumference.toString().replace('.', '').padStart(4, '0');
            // Find P. CEFALICO text, then get the next sibling div with inputs
            const cefalicText = Array.from(document.querySelectorAll('.pt')).find(p => 
                p.textContent.trim().startsWith('P. CEFALICO')
            );
            
            if (cefalicText) {
                // Get the next sibling div that contains the char-inputs
                const inputContainer = cefalicText.nextElementSibling;
                if (inputContainer) {
                    const inputs = inputContainer.querySelectorAll('input[name="univers"]');
                    
                    if (inputs.length >= 4) {
                        // Convert checkboxes to text inputs
                        inputs.forEach(input => {
                            if (input.type === 'checkbox') {
                                input.type = 'text';
                                input.setAttribute('maxlength', '1');
                            }
                        });
                        
                        // Fill circumference digits (e.g., 34.5 -> "0345")
                        for (let i = 0; i < Math.min(circumStr.length, 4); i++) {
                            inputs[i].value = circumStr[i];
                        }
                        console.log(`[Form1] ✓ Set head circumference: ${newborn.headCircumference}cm`);
                    }
                }
            } else {
                console.warn('[Form1] ✗ P. CEFALICO section not found');
            }
        }

        // LONGITUD (Length)
        // Length: decimal value in cm (e.g., 50.0)
        // NOTE: 4 checkboxes with name="univers" in LONGITUD section
        // LONGITUD is in the same column-body as P. CEFALICO, need to find it specifically
        if (newborn.length) {
            const lengthStr = newborn.length.toString().replace('.', '').padStart(4, '0');
            // Find LONGITUD text, then get the next sibling div with inputs
            const longitudText = Array.from(document.querySelectorAll('.pt')).find(p => 
                p.textContent.trim().startsWith('LONGITUD')
            );
            
            if (longitudText) {
                // Get the next sibling div that contains the char-inputs
                const inputContainer = longitudText.nextElementSibling;
                if (inputContainer) {
                    const inputs = inputContainer.querySelectorAll('input[name="univers"]');
                    
                    if (inputs.length >= 4) {
                        // Convert checkboxes to text inputs
                        inputs.forEach(input => {
                            if (input.type === 'checkbox') {
                                input.type = 'text';
                                input.setAttribute('maxlength', '1');
                            }
                        });
                        
                        // Fill length digits (e.g., 50.0 -> "0500")
                        for (let i = 0; i < Math.min(lengthStr.length, 4); i++) {
                            inputs[i].value = lengthStr[i];
                        }
                        console.log(`[Form1] ✓ Set length: ${newborn.length}cm`);
                    }
                }
            } else {
                console.warn('[Form1] ✗ LONGITUD section not found');
            }
        }

        // EDAD GESTACIONAL (Gestational Age)
        // GestationalAgeWeeks: integer (e.g., 39)
        // GestationalAgeDays: integer (e.g., 5)
        // GestationalAgeMethod: "FUM", "ECO", "ESTIMADA"
        if (newborn.gestationalAgeWeeks) {
            const weeksStr = newborn.gestationalAgeWeeks.toString().padStart(2, '0');
            const weekInputs = document.querySelectorAll('input[name="sem2"], input[name="sem1"]');
            
            if (weekInputs.length >= 2) {
                // Convert checkboxes to text inputs
                weekInputs.forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                
                // Fill weeks (e.g., 39 -> sem2=3, sem1=9)
                weekInputs[0].value = weeksStr[0]; // sem2 (tens)
                weekInputs[1].value = weeksStr[1]; // sem1 (ones)
                console.log(`[Form1] ✓ Set gestational age weeks: ${newborn.gestationalAgeWeeks}`);
            }
        }

        if (newborn.gestationalAgeDays) {
            const dayInput = document.querySelector('input[name="dias"]');
            if (dayInput) {
                // Convert checkbox to text input
                if (dayInput.type === 'checkbox') {
                    dayInput.type = 'text';
                    dayInput.setAttribute('maxlength', '1');
                }
                dayInput.value = newborn.gestationalAgeDays.toString();
                console.log(`[Form1] ✓ Set gestational age days: ${newborn.gestationalAgeDays}`);
            }
        }

        // Gestational Age Method (FUM, ECO, ESTIMADA)
        if (newborn.gestationalAgeMethod === 'FUM') {
            const radio = document.querySelector('input[name="FUM"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set gestational age method: FUM');
            }
        } else if (newborn.gestationalAgeMethod === 'ECO') {
            const radio = document.querySelector('input[name="ECO"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set gestational age method: ECO');
            }
        } else if (newborn.gestationalAgeMethod === 'ESTIMADA') {
            const radio = document.querySelector('input[name="ESTIMADA"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set gestational age method: ESTIMADA');
            }
        }

        // PESO E.G. (Weight for Gestational Age)
        // WeightForGestationalAge: "adec." (adequate), "peq." (small), "gde." (large)
        if (newborn.weightForGestationalAge === 'adec.') {
            const radio = document.querySelector('input[name="adec"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set weight for gestational age: adec.');
            }
        } else if (newborn.weightForGestationalAge === 'peq.') {
            const radio = document.querySelector('input[name="peq"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set weight for gestational age: peq.');
            }
        } else if (newborn.weightForGestationalAge === 'gde.') {
            const radio = document.querySelector('input[name="gde"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set weight for gestational age: gde.');
            }
        }

        // APGAR (min)
        // ApgarFirstMinute: integer (e.g., 9)
        // ApgarFifthMinute: integer (e.g., 10)
        if (newborn.apgarFirstMinute !== null && newborn.apgarFirstMinute !== undefined) {
            const apgarStr = newborn.apgarFirstMinute.toString().padStart(2, '0');
            const apgar1Inputs = document.querySelectorAll('input[name="APGAR1"], input[name="APGAR2"]');
            
            if (apgar1Inputs.length >= 2) {
                // Convert checkboxes to text inputs
                apgar1Inputs.forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                
                // Fill APGAR 1st minute (e.g., 09 -> APGAR1=0, APGAR2=9)
                apgar1Inputs[0].value = apgarStr[0];
                apgar1Inputs[1].value = apgarStr[1];
                console.log(`[Form1] ✓ Set APGAR 1st minute: ${newborn.apgarFirstMinute}`);
            }
        }

        if (newborn.apgarFifthMinute !== null && newborn.apgarFifthMinute !== undefined) {
            const apgarStr = newborn.apgarFifthMinute.toString().padStart(2, '0');
            const apgar5Inputs = document.querySelectorAll('input[name="APGAR3"], input[name="APGAR4"]');
            
            if (apgar5Inputs.length >= 2) {
                // Convert checkboxes to text inputs
                apgar5Inputs.forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                
                // Fill APGAR 5th minute (e.g., 10 -> APGAR3=1, APGAR4=0)
                apgar5Inputs[0].value = apgarStr[0];
                apgar5Inputs[1].value = apgarStr[1];
                console.log(`[Form1] ✓ Set APGAR 5th minute: ${newborn.apgarFifthMinute}`);
            }
        }

        // Lactancia materna inicio precoz (Early Breastfeeding Initiation)
        // EarlyBreastfeedingInitiation: true/false
        if (newborn.earlyBreastfeedingInitiation === false) {
            const radio = document.querySelector('input[name="Lactancia"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set early breastfeeding initiation: no');
            }
        } else if (newborn.earlyBreastfeedingInitiation === true) {
            const radios = document.querySelectorAll('input[name="Lactancia"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set early breastfeeding initiation: si');
            }
        }

        // REANIMACION (Resuscitation)
        // ResuscitationStimulation: true/false (estimulac.)
        if (newborn.resuscitationStimulation === false) {
            const radio = document.querySelector('input[name="estimulac"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set resuscitation stimulation: no');
            }
        } else if (newborn.resuscitationStimulation === true) {
            const radios = document.querySelectorAll('input[name="estimulac"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set resuscitation stimulation: si');
            }
        }

        // ResuscitationAspiration: true/false (aspiración)
        if (newborn.resuscitationAspiration === false) {
            const radio = document.querySelector('input[name="aspiración"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set resuscitation aspiration: no');
            }
        } else if (newborn.resuscitationAspiration === true) {
            const radios = document.querySelectorAll('input[name="aspiración"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set resuscitation aspiration: si');
            }
        }

        // ResuscitationMask: true/false (máscara)
        if (newborn.resuscitationMask === false) {
            const radio = document.querySelector('input[name="máscara"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set resuscitation mask: no');
            }
        } else if (newborn.resuscitationMask === true) {
            const radios = document.querySelectorAll('input[name="máscara"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set resuscitation mask: si');
            }
        }

        // ResuscitationOxygen: true/false (oxígeno)
        if (newborn.resuscitationOxygen === false) {
            const radio = document.querySelector('input[name="oxígeno"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set resuscitation oxygen: no');
            }
        } else if (newborn.resuscitationOxygen === true) {
            const radios = document.querySelectorAll('input[name="oxígeno"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set resuscitation oxygen: si');
            }
        }

        // ResuscitationMassage: true/false (masaje)
        if (newborn.resuscitationMassage === false) {
            const radio = document.querySelector('input[name="masaje"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set resuscitation massage: no');
            }
        } else if (newborn.resuscitationMassage === true) {
            const radios = document.querySelectorAll('input[name="masaje"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set resuscitation massage: si');
            }
        }

        // ResuscitationIntubation: true/false (intubación)
        if (newborn.resuscitationIntubation === false) {
            const radio = document.querySelector('input[name="intubación"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set resuscitation intubation: no');
            }
        } else if (newborn.resuscitationIntubation === true) {
            const radios = document.querySelectorAll('input[name="intubación"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set resuscitation intubation: si');
            }
        }

        // ATENDIDO - PARTO (Delivery Attendant)
        // DeliveryAttendantType: "medico", "obst", "enf", "auxil", "estud", "empir", "otro"
        // DeliveryAttendantName: string
        if (newborn.deliveryAttendantType) {
            const typeMap = {
                'medico': 'parto_atendido11',
                'obst': 'parto_atendido12',
                'enf': 'parto_atendido13',
                'auxil': 'parto_atendido14',
                'estud': 'parto_atendido15',
                'empir': 'parto_atendido16',
                'otro': 'parto_atendido17'
            };
            
            const fieldName = typeMap[newborn.deliveryAttendantType];
            if (fieldName) {
                const radio = document.querySelector(`input[name="${fieldName}"]`);
                if (radio) {
                    radio.checked = true;
                    console.log(`[Form1] ✓ Set delivery attendant type: ${newborn.deliveryAttendantType}`);
                }
            }
        }

        if (newborn.deliveryAttendantName) {
            // Find the text input in the PARTO row (first row after header in ATENDIDO table)
            const partoRow = Array.from(document.querySelectorAll('td.left')).find(td => td.textContent.trim() === 'PARTO');
            if (partoRow) {
                const nameInput = partoRow.parentElement.querySelector('input[type="text"]');
                if (nameInput) {
                    nameInput.value = newborn.deliveryAttendantName;
                    console.log(`[Form1] ✓ Set delivery attendant name: ${newborn.deliveryAttendantName}`);
                }
            }
        }

        // ATENDIDO - NEONATO (Neonatal Attendant)
        // NeonatalAttendantType: "medico", "obst", "enf", "auxil", "estud", "empir", "otro"
        // NeonatalAttendantName: string
        if (newborn.neonatalAttendantType) {
            const typeMap = {
                'medico': 'parto_atendido1',
                'obst': 'parto_atendido2',
                'enf': 'parto_atendido3',
                'auxil': 'parto_atendido4',
                'estud': 'parto_atendido5',
                'empir': 'parto_atendid6',  // Note: typo in HTML "atendid" not "atendido"
                'otro': 'parto_atendid7'     // Note: typo in HTML "atendid" not "atendido"
            };
            
            const fieldName = typeMap[newborn.neonatalAttendantType];
            if (fieldName) {
                const radio = document.querySelector(`input[name="${fieldName}"]`);
                if (radio) {
                    radio.checked = true;
                    console.log(`[Form1] ✓ Set neonatal attendant type: ${newborn.neonatalAttendantType}`);
                }
            }
        }

        if (newborn.neonatalAttendantName) {
            // Find the text input in the NEONATO row (second row after header in ATENDIDO table)
            const neonatoRow = Array.from(document.querySelectorAll('td.left')).find(td => td.textContent.trim() === 'NEONATO');
            if (neonatoRow) {
                const nameInput = neonatoRow.parentElement.querySelector('input[type="text"]');
                if (nameInput) {
                    nameInput.value = newborn.neonatalAttendantName;
                    console.log(`[Form1] ✓ Set neonatal attendant name: ${newborn.neonatalAttendantName}`);
                }
            }
        }

        // DEFECTOS CONGENITOS (Birth Defects)
        // BirthDefectsType: "no", "menor", "mayor"
        // BirthDefectsCode: string (3 digits)
        if (newborn.birthDefectsType === 'no') {
            const radio = document.querySelector('input[name="defec"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth defects: no');
            }
        } else if (newborn.birthDefectsType === 'menor') {
            const radio = document.querySelector('input[name="menor"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth defects: menor');
            }
        } else if (newborn.birthDefectsType === 'mayor') {
            const radio = document.querySelector('input[name="mayor"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set birth defects: mayor');
            }
        }

        if (newborn.birthDefectsCode) {
            const codeStr = newborn.birthDefectsCode.toString().padStart(3, '0');
            const codeInputs = document.querySelectorAll('input[name="univers11"], input[name="univers22"], input[name="univers33"]');
            
            if (codeInputs.length >= 3) {
                // Convert checkboxes to text inputs
                codeInputs.forEach(input => {
                    if (input.type === 'checkbox') {
                        input.type = 'text';
                        input.setAttribute('maxlength', '1');
                    }
                });
                
                // Fill code digits (e.g., "123" -> univers11=1, univers22=2, univers33=3)
                for (let i = 0; i < Math.min(codeStr.length, 3); i++) {
                    codeInputs[i].value = codeStr[i];
                }
                console.log(`[Form1] ✓ Set birth defects code: ${newborn.birthDefectsCode}`);
            }
        }

        // ENFERMEDADES (Diseases)
        // DiseasesOption: "ninguna", "una_o_mas"
        if (newborn.diseasesOption === 'ninguna') {
            const radio = document.querySelector('input[name="mas"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set diseases: ninguna');
            }
        } else if (newborn.diseasesOption === 'una_o_mas') {
            const radios = document.querySelectorAll('input[name="mas"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set diseases: 1 ó más');
            }
        }

        // Disease Codes (DiseaseCode1 through DiseaseCode6)
        // Each code is a 2-digit value displayed in pairs: univers1/univers2, univers3/univers4, univers5/univers6
        const diseaseCodes = [
            newborn.diseaseCode1,
            newborn.diseaseCode2,
            newborn.diseaseCode3,
            newborn.diseaseCode4,
            newborn.diseaseCode5,
            newborn.diseaseCode6
        ];

        const diseaseInputs = [
            document.querySelector('input[name="univers1"]'),
            document.querySelector('input[name="univers2"]'),
            document.querySelector('input[name="univers3"]'),
            document.querySelector('input[name="univers4"]'),
            document.querySelector('input[name="univers5"]'),
            document.querySelector('input[name="univers6"]')
        ];

        // Convert checkboxes to text inputs and populate
        diseaseInputs.forEach((input, index) => {
            if (input && input.type === 'checkbox') {
                input.type = 'text';
                input.setAttribute('maxlength', '2');
            }
        });

        // Populate disease codes
        diseaseCodes.forEach((code, index) => {
            if (code && diseaseInputs[index]) {
                diseaseInputs[index].value = code.toString();
                console.log(`[Form1] ✓ Set disease code ${index + 1}: ${code}`);
            }
        });

        // TAMIZAJE NEONATAL - VIH en RN
        // HIVExposedStatus: "no", "si", "s/d"
        if (newborn.hivExposedStatus === 'no') {
            const radio = document.querySelector('input[name="Expuesto1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set HIV exposed: no');
            }
        } else if (newborn.hivExposedStatus === 'si') {
            const radio = document.querySelector('input[name="Expuesto2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set HIV exposed: si');
            }
        } else if (newborn.hivExposedStatus === 's/d') {
            const radio = document.querySelector('input[name="Expuesto3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set HIV exposed: s/d');
            }
        }

        // HIVTreatmentStatus: "no", "si", "s/d", "n/c"
        if (newborn.hivTreatmentStatus === 'no') {
            const radio = document.querySelector('input[name="Tto11"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set HIV treatment: no');
            }
        } else if (newborn.hivTreatmentStatus === 'si') {
            const radio = document.querySelector('input[name="Tto22"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set HIV treatment: si');
            }
        } else if (newborn.hivTreatmentStatus === 's/d') {
            const radio = document.querySelector('input[name="Tto33"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set HIV treatment: s/d');
            }
        } else if (newborn.hivTreatmentStatus === 'n/c') {
            const radio = document.querySelector('input[name="Tto44"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set HIV treatment: n/c');
            }
        }

        // VDRL
        // VDRLResult: "-", "+", "no_se_hizo"
        if (newborn.vdrlResult === '-') {
            const radio = document.querySelector('input[name="VDRL1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VDRL: -');
            }
        } else if (newborn.vdrlResult === '+') {
            const radio = document.querySelector('input[name="VDRL2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VDRL: +');
            }
        } else if (newborn.vdrlResult === 'no_se_hizo') {
            const radio = document.querySelector('input[name="VDRL3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VDRL: no se hizo');
            }
        }

        // VDRLTreatment: "no", "si", "n/c", "s/d"
        if (newborn.vdrlTreatment === 'no') {
            const radio = document.querySelector('input[name="Tto1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VDRL treatment: no');
            }
        } else if (newborn.vdrlTreatment === 'si') {
            const radio = document.querySelector('input[name="Tto2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VDRL treatment: si');
            }
        } else if (newborn.vdrlTreatment === 'n/c') {
            const radio = document.querySelector('input[name="Tto3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VDRL treatment: n/c');
            }
        } else if (newborn.vdrlTreatment === 's/d') {
            const radio = document.querySelector('input[name="Tto4"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set VDRL treatment: s/d');
            }
        }

        // Audic (Auditory Screening)
        // ScreeningAudic: "-", "+", "no_se_hizo"
        if (newborn.screeningAudic === '-') {
            const radio = document.querySelector('input[name="Audic1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Audic: -');
            }
        } else if (newborn.screeningAudic === '+') {
            const radio = document.querySelector('input[name="Audic2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Audic: +');
            }
        } else if (newborn.screeningAudic === 'no_se_hizo') {
            const radio = document.querySelector('input[name="Audic3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Audic: no se hizo');
            }
        }

        // Chagas
        // ScreeningChagas: "-", "+", "no_se_hizo"
        if (newborn.screeningChagas === '-') {
            const radio = document.querySelector('input[name="Cha1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Chagas: -');
            }
        } else if (newborn.screeningChagas === '+') {
            const radio = document.querySelector('input[name="Cha2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Chagas: +');
            }
        } else if (newborn.screeningChagas === 'no_se_hizo') {
            const radio = document.querySelector('input[name="Cha3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Chagas: no se hizo');
            }
        }

        // Bilirrub (Bilirubin)
        // ScreeningBilirrub: "-", "+", "no_se_hizo"
        if (newborn.screeningBilirrub === '-') {
            const radio = document.querySelector('input[name="Bili1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Bilirrub: -');
            }
        } else if (newborn.screeningBilirrub === '+') {
            const radio = document.querySelector('input[name="Bili2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Bilirrub: +');
            }
        } else if (newborn.screeningBilirrub === 'no_se_hizo') {
            const radio = document.querySelector('input[name="Bili3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Bilirrub: no se hizo');
            }
        }

        // Toxo IgM (Toxoplasmosis)
        // ScreeningToxoIgM: "-", "+", "no_se_hizo"
        if (newborn.screeningToxoIgM === '-') {
            const radio = document.querySelector('input[name="Toxo1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Toxo IgM: -');
            }
        } else if (newborn.screeningToxoIgM === '+') {
            const radio = document.querySelector('input[name="Toxo2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Toxo IgM: +');
            }
        } else if (newborn.screeningToxoIgM === 'no_se_hizo') {
            const radio = document.querySelector('input[name="Toxo3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Toxo IgM: no se hizo');
            }
        }

        // Hb patía (Hemoglobinopathy)
        // ScreeningHbPatia: "-", "+", "no_se_hizo"
        if (newborn.screeningHbPatia === '-') {
            const radio = document.querySelector('input[name="hb1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Hb patía: -');
            }
        } else if (newborn.screeningHbPatia === '+') {
            const radio = document.querySelector('input[name="hb2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Hb patía: +');
            }
        } else if (newborn.screeningHbPatia === 'no_se_hizo') {
            const radio = document.querySelector('input[name="hb3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Hb patía: no se hizo');
            }
        }

        // Cardiov (Cardiovascular)
        // ScreeningCardiov: "-", "+", "no_se_hizo"
        // NOTE: HTML has inconsistent field names: card, card1, card3
        if (newborn.screeningCardiov === '-') {
            const radio = document.querySelector('input[name="card"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Cardiov: -');
            }
        } else if (newborn.screeningCardiov === '+') {
            const radio = document.querySelector('input[name="card1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Cardiov: +');
            }
        } else if (newborn.screeningCardiov === 'no_se_hizo') {
            const radio = document.querySelector('input[name="card3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Cardiov: no se hizo');
            }
        }

        // Metabólicas (Metabolic Screening)
        // ScreeningMetabolicStatus: "no_realizado", "realizado"
        if (newborn.screeningMetabolicStatus === 'no_realizado') {
            const radio = document.querySelector('input[name="ante1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Metabolic screening: no realizado');
            }
        } else if (newborn.screeningMetabolicStatus === 'realizado') {
            const radios = document.querySelectorAll('input[name="ante1"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set Metabolic screening: realizado');
            }
        }

        // Fellece en sala de parto (Died in Delivery Room)
        // MotherDiedInDeliveryRoom: true/false
        if (newborn.motherDiedInDeliveryRoom === false) {
            const radio = document.querySelector('input[name="madre"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set mother died in delivery room: no');
            }
        } else if (newborn.motherDiedInDeliveryRoom === true) {
            const radios = document.querySelectorAll('input[name="madre"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set mother died in delivery room: si');
            }
        }

        // NewbornDiedInDeliveryRoom: true/false
        if (newborn.newbornDiedInDeliveryRoom === false) {
            const radio = document.querySelector('input[name="rn"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set newborn died in delivery room: no');
            }
        } else if (newborn.newbornDiedInDeliveryRoom === true) {
            const radios = document.querySelectorAll('input[name="rn"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set newborn died in delivery room: si');
            }
        }

        // REFERIDO (Referred To)
        // ReferredTo: "aloj_conj", "neonatolog", "otro_hosp"
        if (newborn.referredTo === 'aloj_conj') {
            const radio = document.querySelector('input[name="refer1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set referred to: aloj. conj.');
            }
        } else if (newborn.referredTo === 'neonatolog') {
            const radio = document.querySelector('input[name="refer3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set referred to: neonatolog.');
            }
        } else if (newborn.referredTo === 'otro_hosp') {
            const radio = document.querySelector('input[name="refer2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set referred to: otro hosp.');
            }
        }

        // EGRESO RN (Newborn Discharge)
        // DischargeStatus: "vivo", "fallece"
        if (newborn.dischargeStatus === 'vivo') {
            const radio = document.querySelector('input[name="vivo"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set discharge status: vivo');
            }
        } else if (newborn.dischargeStatus === 'fallece') {
            const radio = document.querySelector('input[name="fallece"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set discharge status: fallece');
            }
        }

        // Discharge Date and Time (similar to birth date/time handling)
        // DischargeDate and DischargeTime fields
        // Note: Using the same date input structure as birth date
        
        // Transferred (traslado)
        // Transferred: boolean (checkbox)
        if (newborn.transferred === true) {
            const checkbox = document.querySelector('input[name="pre1"]');
            if (checkbox) {
                checkbox.checked = true;
                console.log('[Form1] ✓ Set transferred: yes');
            }
        }

        // Transfer Location (lugar)
        // TransferLocation: string
        // Note: The HTML shows a "lugar" label but I need to find the actual input field
        // Looking at the HTML, there's a vertical line and "lugar" text, but the input might be in the char-inputs below

        // Died During Transfer (fallece durante o en lugar de traslado)
        // DiedDuringTransferStatus: "no", "si", "s/d"
        if (newborn.diedDuringTransferStatus === 'no') {
            const radio = document.querySelector('input[name="cons1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set died during transfer: no');
            }
        } else if (newborn.diedDuringTransferStatus === 'si') {
            const radio = document.querySelector('input[name="cons2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set died during transfer: si');
            }
        } else if (newborn.diedDuringTransferStatus === 's/d') {
            const radio = document.querySelector('input[name="cons3"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set died during transfer: s/d');
            }
        }

        // EDAD AL EGRESO (Age at Discharge)
        // DischargeAge: integer (days)
        // DischargeAgeLessThanOneDay: boolean
        if (newborn.dischargeAgeLessThanOneDay === true) {
            const radio = document.querySelector('input[name="pre"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set age at discharge: < 1 día');
            }
        } else if (newborn.dischargeAge) {
            // Find the 2 checkboxes for age at discharge (in the EDAD AL EGRESO section)
            const ageSection = Array.from(document.querySelectorAll('.pt')).find(p => 
                p.textContent.includes('EDAD AL EGRESO')
            );
            
            if (ageSection) {
                const ageInputs = ageSection.closest('.box-p').querySelectorAll('input[name="univers"]');
                
                if (ageInputs.length >= 2) {
                    const ageStr = newborn.dischargeAge.toString().padStart(2, '0');
                    
                    // Convert checkboxes to text inputs
                    ageInputs.forEach(input => {
                        if (input.type === 'checkbox') {
                            input.type = 'text';
                            input.setAttribute('maxlength', '1');
                        }
                    });
                    
                    // Fill age digits
                    ageInputs[0].value = ageStr[0];
                    ageInputs[1].value = ageStr[1];
                    console.log(`[Form1] ✓ Set age at discharge: ${newborn.dischargeAge} days`);
                }
            }
        }

        // PESO AL EGRESO (Weight at Discharge)
        // DischargeWeight: decimal value in grams
        if (newborn.dischargeWeight) {
            const weightStr = Math.round(newborn.dischargeWeight).toString().padStart(4, '0');
            // Find PESO AL EGRESO section
            const pesoSection = Array.from(document.querySelectorAll('.pt')).find(p => 
                p.textContent.includes('PESO AL EGRESO')
            );
            
            if (pesoSection) {
                const weightInputs = pesoSection.closest('.peso').querySelectorAll('input[name="univers"]');
                
                if (weightInputs.length >= 4) {
                    // Convert checkboxes to text inputs
                    weightInputs.forEach(input => {
                        if (input.type === 'checkbox') {
                            input.type = 'text';
                            input.setAttribute('maxlength', '1');
                        }
                    });
                    
                    // Fill weight digits (e.g., 3500 -> "3500")
                    for (let i = 0; i < Math.min(weightStr.length, 4); i++) {
                        weightInputs[i].value = weightStr[i];
                    }
                    console.log(`[Form1] ✓ Set weight at discharge: ${newborn.dischargeWeight}g`);
                }
            }
        }

        // ALIMENTO AL ALTA (Feeding at Discharge)
        // FeedingAtDischarge: "lact_excl", "parcial", "artificial"
        if (newborn.feedingAtDischarge === 'lact_excl') {
            const radio = document.querySelector('input[name="lact "]'); // Note: has trailing space!
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set feeding at discharge: lact. excl.');
            }
        } else if (newborn.feedingAtDischarge === 'parcial') {
            const radio = document.querySelector('input[name="parcial"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set feeding at discharge: parcial');
            }
        } else if (newborn.feedingAtDischarge === 'artificial') {
            const radio = document.querySelector('input[name="artificial"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set feeding at discharge: artificial');
            }
        }

        // Boca arriba (Face Up)
        // FaceUp: true/false
        if (newborn.faceUp === false) {
            const radio = document.querySelector('input[name="boca1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set face up: no');
            }
        } else if (newborn.faceUp === true) {
            const radios = document.querySelectorAll('input[name="boca1"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set face up: si');
            }
        }

        // BCG Vaccine
        // BCGVaccine: true/false
        if (newborn.bcgVaccine === false) {
            const radio = document.querySelector('input[name="BCG1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set BCG vaccine: no');
            }
        } else if (newborn.bcgVaccine === true) {
            const radios = document.querySelectorAll('input[name="BCG1"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set BCG vaccine: si');
            }
        }

        // INMUN. HEPATITIS B (Hepatitis B Immunization)
        // HepatitisB: true/false
        if (newborn.hepatitisB === false) {
            const radio = document.querySelector('input[name="boca"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set Hepatitis B immunization: no');
            }
        } else if (newborn.hepatitisB === true) {
            const radios = document.querySelectorAll('input[name="boca"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set Hepatitis B immunization: si');
            }
        }

        // Meconio 1er día (Meconium First Day)
        // MeconiumFirstDay: true/false
        if (newborn.meconiumFirstDay === false) {
            const radio = document.querySelector('input[name="BCG"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set meconium first day: no');
            }
        } else if (newborn.meconiumFirstDay === true) {
            const radios = document.querySelectorAll('input[name="BCG"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                console.log('[Form1] ✓ Set meconium first day: si');
            }
        }

        console.log('[Form1] Newborn information populated');
    }

    function populatePostpartumInfo(data) {
        console.log('[Form1] Populating postpartum information...');
        
        const postpartum = data.postpartumInformation;
        if (!postpartum) {
            console.warn('[Form1] No postpartum information data');
            return;
        }

        // POSTPARTO table - populate visits
        if (postpartum.postpartumVisits && postpartum.postpartumVisits.length > 0) {
            const table = document.querySelector('.tenth-table');
            if (table) {
                const rows = table.querySelectorAll('tr.row-height');
                
                postpartum.postpartumVisits.forEach((visit, index) => {
                    if (index < rows.length) {
                        const row = rows[index];
                        const inputs = row.querySelectorAll('input');
                        
                        // The print form has 8 input fields per row:
                        // 0: Tiempo, 1: Temp °C, 2: P.A, 3: Pulso, 4-5: Involución uterina (2 cols), 6: Sangrado, 7: Responsable
                        if (inputs.length >= 8) {
                            // Tiempo (Time) - not in database, skip
                            // inputs[0]
                            
                            // Temp °C (Temperature)
                            if (visit.temperature) {
                                inputs[1].value = visit.temperature;
                            }
                            
                            // P.A (Blood Pressure)
                            if (visit.bloodPressure) {
                                inputs[2].value = visit.bloodPressure;
                            }
                            
                            // Pulso (Pulse)
                            if (visit.pulse) {
                                inputs[3].value = visit.pulse;
                            }
                            
                            // Involución uterina (Uterine Involution) - spans 2 columns
                            if (visit.uterineInvolution) {
                                inputs[4].value = visit.uterineInvolution;
                            }
                            
                            // Sangrado (Bleeding) - Note: might be "lochia" in database
                            if (visit.bleeding) {
                                inputs[6].value = visit.bleeding;
                            } else if (visit.lochia) {
                                inputs[6].value = visit.lochia;
                            }
                            
                            // Responsable (Responsible)
                            if (visit.responsible) {
                                inputs[7].value = visit.responsible;
                            }
                            
                            console.log(`[Form1] ✓ Set postpartum visit ${index + 1}`);
                        }
                    }
                });
            }
        }

        // γ globulina anti D (Anti-D Immunoglobulin)
        // AntiDGlobulin: "no", "si", "n/c"
        if (postpartum.antiDGlobulin === 'no') {
            const radio = document.querySelector('input[name="glo1"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set anti-D globulin: no');
            }
        } else if (postpartum.antiDGlobulin === 'si') {
            const radio = document.querySelector('input[name="glo2"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set anti-D globulin: sí');
            }
        } else if (postpartum.antiDGlobulin === 'n/c') {
            const radio = document.querySelector('input[name="glo"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set anti-D globulin: n/c');
            }
        }

        // Id.RN (Newborn ID)
        // NewbornId: string (up to 18 characters)
        if (postpartum.newbornId) {
            const idSection = document.querySelector('.id-rn-grid');
            if (idSection) {
                const idInputs = idSection.querySelectorAll('.char-inputs input');
                const idStr = postpartum.newbornId.toString().padEnd(18, ' ');
                
                if (idInputs.length >= 18) {
                    // Fill ID characters (up to 18)
                    for (let i = 0; i < Math.min(idStr.length, 18); i++) {
                        if (idStr[i] !== ' ') {
                            idInputs[i].value = idStr[i];
                        }
                    }
                    console.log(`[Form1] ✓ Set newborn ID: ${postpartum.newbornId}`);
                }
            }
        }

        // Nombre RN (Newborn Name)
        // NewbornName: string
        if (postpartum.newbornName) {
            const nameTextarea = document.querySelector('.nombre-condi textarea');
            if (nameTextarea) {
                nameTextarea.value = postpartum.newbornName;
                console.log(`[Form1] ✓ Set newborn name: ${postpartum.newbornName}`);
            }
        }

        // Responsable (Responsible Person for Discharge)
        // DischargeResponsible: string
        if (postpartum.dischargeResponsible) {
            const responsibleTextarea = document.querySelector('.responsable-condi textarea');
            if (responsibleTextarea) {
                responsibleTextarea.value = postpartum.dischargeResponsible;
                console.log(`[Form1] ✓ Set discharge responsible: ${postpartum.dischargeResponsible}`);
            }
        }

        console.log('[Form1] Postpartum information populated');
    }

    // Helper Functions
    function uncheckAllInputs() {
        console.log('[Form1] 🧹 Unchecking all default checked inputs...');
        
        // Count before
        const radiosBefore = document.querySelectorAll('input[type="radio"]:checked').length;
        const checkboxesBefore = document.querySelectorAll('input[type="checkbox"]:checked').length;
        console.log(`[Form1] Before uncheck - Radios: ${radiosBefore}, Checkboxes: ${checkboxesBefore}`);
        
        // Uncheck all radios
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Count after
        const radiosAfter = document.querySelectorAll('input[type="radio"]:checked').length;
        const checkboxesAfter = document.querySelectorAll('input[type="checkbox"]:checked').length;
        console.log(`[Form1] After uncheck - Radios: ${radiosAfter}, Checkboxes: ${checkboxesAfter}`);
        console.log('[Form1] ✓ All inputs unchecked');
    }

    function setYesNoRadio(name, enumValue, isBoolean = false) {
        // Handle different field types:
        // - Enum fields (YesNoNotRecorded): 1=Yes, 2=No, 3=NotRecorded, 0/NULL=not set
        // - Boolean fields (bool?): true/1=Yes, false/0=No, null=not set
        // - String fields: "si"/"+"=Yes, "no"/"-"=No
        
        // Handle string values
        if (typeof enumValue === 'string') {
            const lowerValue = enumValue.toLowerCase().trim();
            if (lowerValue === 'si' || lowerValue === '+' || lowerValue === 'yes') {
                const siRadio = document.querySelector(`input[name="${name}"][value="si"]`);
                if (siRadio) {
                    siRadio.checked = true;
                    console.log(`[Form1] ✓ Set radio ${name} to si (string: "${enumValue}")`);
                }
                return;
            } else if (lowerValue === 'no' || lowerValue === '-') {
                const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
                if (noRadio) {
                    noRadio.checked = true;
                    console.log(`[Form1] ✓ Set radio ${name} to no (string: "${enumValue}")`);
                }
                return;
            }
            console.log(`[Form1] ℹ Skipping ${name} - unhandled string value: "${enumValue}"`);
            return;
        }
        
        // Handle boolean fields
        if (isBoolean) {
            if (enumValue === null || enumValue === undefined) {
                console.log(`[Form1] Skipping ${name} - no value (boolean field)`);
                return;
            }
            
            // For boolean: 0/false = "No", 1/true = "Yes"
            if (enumValue === 0 || enumValue === false) {
                const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
                if (noRadio) {
                    noRadio.checked = true;
                    console.log(`[Form1] ✓ Set radio ${name} to no (boolean: ${enumValue})`);
                }
            } else if (enumValue === 1 || enumValue === true) {
                const siRadio = document.querySelector(`input[name="${name}"][value="si"]`);
                if (siRadio) {
                    siRadio.checked = true;
                    console.log(`[Form1] ✓ Set radio ${name} to si (boolean: ${enumValue})`);
                }
            }
            return;
        }
        
        // Handle enum fields (YesNoNotRecorded)
        if (enumValue === null || enumValue === undefined) {
            console.log(`[Form1] Skipping ${name} - no value (enum field)`);
            return;
        }
        
        // Handle 0 (default/not set) - leave BLANK
        if (enumValue === 0) {
            console.log(`[Form1] Skipping ${name} - value is 0 (not set)`);
            return;
        }
        
        // Handle "No" values (ONLY 2, not false or 0)
        if (enumValue === 2) {
            const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
            if (noRadio) {
                noRadio.checked = true;
                console.log(`[Form1] ✓ Set radio ${name} to no (enum: 2)`);
            } else {
                console.warn(`[Form1] ✗ Radio not found: name="${name}" value="no"`);
            }
            return;
        }
        
        // Handle "Not Recorded" (3) - leave BLANK
        if (enumValue === 3) {
            console.log(`[Form1] Skipping ${name} - not recorded (enum: 3)`);
            return;
        }
        
        // Handle "Yes" values (ONLY 1, not true) - explicitly check "si" radio
        if (enumValue === 1) {
            const siRadio = document.querySelector(`input[name="${name}"][value="si"]`);
            if (siRadio) {
                siRadio.checked = true;
                console.log(`[Form1] ✓ Set radio ${name} to si (enum: 1)`);
            } else {
                // If no "si" radio found, it might be yellow by default (CSS)
                console.log(`[Form1] ℹ Radio ${name} - si radio not found (may be CSS default)`);
            }
        }
    }

    // Special function for boolean fields (like PregnancyPlanned)
    function setYesNoRadioBool(name, boolValue) {
        if (boolValue === null || boolValue === undefined) {
            console.log(`[Form1] Skipping ${name} - no value`);
            return;
        }
        
        if (boolValue === true || boolValue === 1) {
            const siRadio = document.querySelector(`input[name="${name}"][value="si"]`);
            if (siRadio) {
                siRadio.checked = true;
                console.log(`[Form1] ✓ Set radio ${name} to si (boolean true)`);
            }
        } else if (boolValue === false || boolValue === 0 || boolValue === 2) {
            const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
            if (noRadio) {
                noRadio.checked = true;
                console.log(`[Form1] ✓ Set radio ${name} to no (boolean false)`);
            }
        }
    }

    function setNumericInCheckBoxes(baseName, value) {
        if (value === null || value === undefined) {
            console.log(`[Form1] Skipping ${baseName} - no value`);
            return;
        }
        
        const valueStr = value.toString();
        const inputs = document.querySelectorAll(`input.check-box-input[name*="${baseName}"]`);
        
        if (inputs.length === 0) {
            console.warn(`[Form1] ✗ No check-box-input found for: ${baseName}`);
            return;
        }
        
        // Distribute digits across inputs
        for (let i = 0; i < inputs.length && i < valueStr.length; i++) {
            inputs[i].value = valueStr[i];
        }
        
        console.log(`[Form1] ✓ Set numeric value ${baseName} to ${value} (${inputs.length} inputs)`);
    }

    // Public API
    return {
        populate: populate
    };
})();

// Register with PerinatalPrint core if available
if (typeof PerinatalPrint !== 'undefined') {
    console.log('[Form1] Module loaded and registered');
}
