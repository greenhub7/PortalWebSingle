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
        
        console.log('[Form1] ========================================');
        console.log('[Form1] ✅ Form 1 population complete!');
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

        // Birth Date
        if (patient.bornDate) {
            const date = new Date(patient.bornDate);
            setDateInInputBox('birth-date', date);
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
        setNumericInCheckBoxes('viven', obs.living);

        // Last pregnancy end date
        if (obs.lastPregnancyEndDate) {
            const date = new Date(obs.lastPregnancyEndDate);
            setDateInInputBox('fin-embarazo', date);
        }

        // Pregnancy planned
        setYesNoRadio('PLANEADO', obs.pregnancyPlanned);

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

        // FUM (Last Menstrual Period)
        if (cp.lastMenstrualPeriod) {
            const date = new Date(cp.lastMenstrualPeriod);
            setDateInInputBox('fumm', date);
            console.log('[Form1] Set FUM date:', date);
        }

        // FPP (Estimated Due Date)
        if (cp.estimatedDueDate) {
            const date = new Date(cp.estimatedDueDate);
            setDateInInputBox('fpp', date);
            console.log('[Form1] Set FPP date:', date);
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

        // Vaccines - these have 4 options: no, si previa, si durante, si postparto
        // For now, just set "si durante embarazo" (option 2) if vaccine is yes (1)
        if (cp.vaccineTetanusDiphtheria === 1) {
            const radio = document.querySelector('input[name="difteria2"][value="si"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set radio difteria to si');
            }
        }
        if (cp.vaccineInfluenza === 1) {
            const radio = document.querySelector('input[name="influenza2"][value="si"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set radio influenza to si');
            }
        }
        if (cp.vaccineRubella === 1) {
            const radio = document.querySelector('input[name="rubeolla2"][value="si"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set radio rubella to si');
            }
        }
        if (cp.vaccineHepatitisB === 1) {
            const radio = document.querySelector('input[name="hepatitisb2"][value="si"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form1] ✓ Set radio hepatitisB to si');
            }
        }

        // Lab results - these use text inputs, not checkboxes
        // TODO: Implement proper text input population for lab values
        // if (cp.glucoseLessThan20Weeks) {
        //     setNumericInCheckBoxes('glucose-lt20', cp.glucoseLessThan20Weeks);
        // }
        // if (cp.hemoglobinLessThan20Weeks) {
        //     setNumericInCheckBoxes('hb', cp.hemoglobinLessThan20Weeks);
        // }

        // HIV and Syphilis tests - check if these fields exist
        // setYesNoRadio('hiv-test', cp.hIVTestResultLessThan20Weeks);
        // setYesNoRadio('syphilis', cp.syphilisTestLessThan20Weeks);

        console.log('[Form1] Current pregnancy populated');
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

    // Helper Functions
    function setYesNoRadio(name, enumValue) {
        // "si" radios are always yellow (CSS handles this), so we only need to handle "no" radios
        // enumValue: 1 = Yes, 2 = No, 3 = Not Recorded, or boolean
        
        if (enumValue === null || enumValue === undefined) {
            console.log(`[Form1] Skipping ${name} - no value`);
            return;
        }
        
        // Only set "no" radio if the value is explicitly No (2 or false)
        if (enumValue === 2 || enumValue === false) {
            const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
            if (noRadio) {
                noRadio.checked = true;
                console.log(`[Form1] ✓ Set radio ${name} to no`);
            } else {
                console.warn(`[Form1] ✗ Radio not found: name="${name}" value="no"`);
            }
        } else if (enumValue === 3) {
            console.log(`[Form1] Skipping ${name} - not recorded`);
            return;
        }
        // If value is Yes (1 or true), do nothing - the "si" radio is already yellow by default (CSS)
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

    function setDateInInputBox(prefix, date) {
        if (!date) {
            console.log(`[Form1] Skipping date ${prefix} - no value`);
            return;
        }
        
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
        
        // Strategy 1: Find by looking for .input-box.large1 containers near FUM/FPP text
        if (prefix === 'fumm' || prefix === 'fpp') {
            // Find all .input-box.large1 containers
            const inputBoxes = document.querySelectorAll('.input-box.large1');
            if (prefix === 'fumm' && inputBoxes.length > 0) {
                // FUM is the first one
                const input = inputBoxes[0].querySelector('input.large-input');
                if (input) {
                    input.value = formattedDate;
                    console.log(`[Form1] ✓ Set FUM date to ${formattedDate}`);
                    return;
                }
            } else if (prefix === 'fpp' && inputBoxes.length > 1) {
                // FPP is the second one
                const input = inputBoxes[1].querySelector('input.large-input');
                if (input) {
                    input.value = formattedDate;
                    console.log(`[Form1] ✓ Set FPP date to ${formattedDate}`);
                    return;
                }
            }
        }
        
        // Strategy 2: Try to find inputs with name containing the prefix
        let dateInputs = document.querySelectorAll(`input[name*="${prefix}"]`);
        
        // Strategy 3: Look for inputs in .input-box containers (for other dates)
        if (dateInputs.length === 0) {
            const inputBoxes = document.querySelectorAll('.input-box, .input-box1, .input-box2, .input-box3');
            inputBoxes.forEach(box => {
                const inputs = box.querySelectorAll('input');
                if (inputs.length >= 3) {
                    // Assume order: day, month, year
                    inputs[0].value = day.toString().padStart(2, '0');
                    inputs[1].value = month.toString().padStart(2, '0');
                    inputs[2].value = year.toString();
                    console.log(`[Form1] ✓ Set date in input-box to ${day}/${month}/${year}`);
                }
            });
        } else if (dateInputs.length >= 3) {
            // Set the first 3 inputs found
            dateInputs[0].value = day.toString().padStart(2, '0');
            dateInputs[1].value = month.toString().padStart(2, '0');
            dateInputs[2].value = year.toString();
            console.log(`[Form1] ✓ Set date ${prefix} to ${day}/${month}/${year}`);
        } else {
            console.warn(`[Form1] ✗ Could not find date inputs for ${prefix}`);
        }
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
