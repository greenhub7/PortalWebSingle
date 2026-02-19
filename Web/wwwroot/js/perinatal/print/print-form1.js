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

        // Birth Date - skip for now (not critical for Form 1)

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
        // Marital Situation
        if (patient.person && patient.person.maritalSituation) {
            const input = document.querySelector('input[placeholder*="Estado Civil"], input[placeholder*="Marital"]');
            if (input) {
                input.value = patient.person.maritalSituation.name || patient.person.maritalSituation;
                console.log('[Form1] ✓ Set marital situation');
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
        if (birth.prenatalConsultationsTotal) {
            const inputs = document.querySelectorAll('input.check-box[name="NATALES"]');
            const valueStr = birth.prenatalConsultationsTotal.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set prenatal consultations total: ${birth.prenatalConsultationsTotal}`);
            }
        }

        // EDAD GEST. 1ra CONSULTA (semanas)
        if (birth.firstConsultationGestationalAgeWeeks) {
            const inputs = document.querySelectorAll('input.check-box[name="CONSULTA"]');
            const valueStr = birth.firstConsultationGestationalAgeWeeks.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set first consultation gestational age: ${birth.firstConsultationGestationalAgeWeeks}`);
            }
        }

        // HOSPITALIZ. EN EMBARAZO
        setYesNoRadio('HOSPITALIZ', birth.hospitalizedDuringPregnancy, true);

        // Hospitalization days
        if (birth.hospitalizationDays) {
            const inputs = document.querySelectorAll('input.check-box[name="hos1"], input.check-box[name="hos2"]');
            const valueStr = birth.hospitalizationDays.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set hospitalization days: ${birth.hospitalizationDays}`);
            }
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
        if (birth.corticosteroidsStartWeek) {
            const inputs = document.querySelectorAll('input.check-box[name="corti1"], input.check-box[name="corti2"]');
            const valueStr = birth.corticosteroidsStartWeek.toString().padStart(2, '0');
            if (inputs.length >= 2) {
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set corticosteroids start week: ${birth.corticosteroidsStartWeek}`);
            }
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
                inputs[0].value = valueStr[0];
                inputs[1].value = valueStr[1];
                console.log(`[Form1] ✓ Set gestational age at birth weeks: ${birth.gestationalAgeAtBirthWeeks}`);
            }
        }
        if (birth.gestationalAgeAtBirthDays) {
            const input = document.querySelector('input.check-box[name="GEST3"]');
            if (input) {
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

        console.log('[Form1] Birth information populated');
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
