// Form 1 Data Population Module - Enhanced
const PerinatalPrintForm1 = (function() {
    
    function populate(data) {
        if (!data) {
            console.warn('[Form1] No data provided');
            return;
        }

        console.log('[Form1] Populating form with data:', data);

        // Patient and Person Information
        populatePatientInfo(data);
        
        // Medical Background (Antecedentes)
        populateMedicalBackground(data);
        
        // Obstetric Background
        populateObstetricBackground(data);
        
        // Current Pregnancy (Gestación Actual)
        populateCurrentPregnancy(data);
        
        console.log('[Form1] Population complete!');
    }

    function populatePatientInfo(data) {
        const patient = data.patient;
        if (!patient) return;

        console.log('[Form1] Populating patient info:', patient);

        // Name - try to find NOMBRE field
        const nombreField = document.querySelector('input[type="text"]');
        if (nombreField && patient.fullName) {
            const names = patient.fullName.split(' ');
            nombreField.value = names[0] || '';
        }

        // Surname - APELLIDO field
        const apellidoField = document.querySelectorAll('input[type="text"]')[1];
        if (apellidoField && patient.fullName) {
            const names = patient.fullName.split(' ');
            apellidoField.value = names.slice(1).join(' ') || '';
        }

        // Address - DOMICILIO
        if (patient.address) {
            const addressField = document.querySelectorAll('input[type="text"]')[2];
            if (addressField) addressField.value = patient.address;
        }

        // Phone - TELEF
        if (patient.tel || patient.cel) {
            const phoneField = document.querySelectorAll('input[type="text"]')[4];
            if (phoneField) phoneField.value = patient.tel || patient.cel;
        }

        // Age
        if (patient.age) {
            const ageInput = document.querySelector('.consolidated-age-input');
            if (ageInput) {
                ageInput.value = patient.age.toString();
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
            }
        }

        // Blood Type
        if (patient.bloodType) {
            const bloodTypeInputs = document.querySelectorAll('input[name*="blood"]');
            bloodTypeInputs.forEach(input => {
                if (input.value === patient.bloodType || input.placeholder === 'Blood Type') {
                    input.value = patient.bloodType;
                }
            });
        }
    }

    function populateMedicalBackground(data) {
        const bg = data.medicalBackground;
        if (!bg) return;

        console.log('[Form1] Populating medical background:', bg);

        // Family History - FAMILIARES
        setYesNoRadio('TBC', bg.familyTuberculosis);
        setYesNoRadio('diabetes', bg.familyDiabetes);
        setYesNoRadio('hipertensión', bg.familyHypertension);
        setYesNoRadio('preeclampsia', bg.familyPreeclampsia);
        setYesNoRadio('eclampsia', bg.familyEclampsia);

        // Personal History - PERSONALES
        setYesNoRadio('TBC1', bg.personalTuberculosis);
        setYesNoRadio('diabetes1', bg.personalDiabetes);
        setYesNoRadio('hipertensión1', bg.personalHypertension);
        setYesNoRadio('preeclampsia1', bg.personalPreeclampsia);
        setYesNoRadio('eclampsia1', bg.personalEclampsia);
        setYesNoRadio('cirugía', bg.personalSurgery);
        setYesNoRadio('infertilidad', bg.personalInfertility);
        setYesNoRadio('cardiopatía', bg.personalHeartDisease);
        setYesNoRadio('nefropatía', bg.personalNephropathy);
        setYesNoRadio('violencia', bg.personalViolence);
        setYesNoRadio('VIH+', bg.personalHIVPositive);

        // Habits
        if (bg.currentSmoker !== null) {
            const smokerCheckbox = document.querySelector('input[name*="smoker"]');
            if (smokerCheckbox) smokerCheckbox.checked = bg.currentSmoker;
        }
        
        if (bg.drugUse !== null) {
            const drugCheckbox = document.querySelector('input[name*="drug"]');
            if (drugCheckbox) drugCheckbox.checked = bg.drugUse;
        }
        
        if (bg.alcoholUse !== null) {
            const alcoholCheckbox = document.querySelector('input[name*="alcohol"]');
            if (alcoholCheckbox) alcoholCheckbox.checked = bg.alcoholUse;
        }
    }

    function populateObstetricBackground(data) {
        const obs = data.obstetricBackground;
        if (!obs) return;

        console.log('[Form1] Populating obstetric background:', obs);

        // Numeric values - use check-box-input fields
        setNumericInCheckBoxes('previas', obs.previousPregnancies);
        setNumericInCheckBoxes('abortos', obs.abortions);
        setNumericInCheckBoxes('partos', obs.births);
        setNumericInCheckBoxes('vaginales', obs.vaginalDeliveries);
        setNumericInCheckBoxes('cesareas', obs.cesareans);
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

        // Contraceptive method failure
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
                setYesNoRadio(methodName, 1); // Set to "yes"
            }
        }
    }

    function populateCurrentPregnancy(data) {
        const cp = data.currentPregnancy;
        if (!cp) return;

        console.log('[Form1] Populating current pregnancy:', cp);

        // FUM (Last Menstrual Period)
        if (cp.lastMenstrualPeriod) {
            const date = new Date(cp.lastMenstrualPeriod);
            setDateInInputBox('fumm', date);
        }

        // FPP (Estimated Due Date)
        if (cp.estimatedDueDate) {
            const date = new Date(cp.estimatedDueDate);
            setDateInInputBox('fpp', date);
        }

        // Weight and Height
        if (cp.previousWeight) {
            setNumericInCheckBoxes('peso', cp.previousWeight);
        }
        if (cp.height) {
            setNumericInCheckBoxes('talla', cp.height);
        }

        // Examinations
        setYesNoRadio('ODONT', cp.normalDentalExamination);
        setYesNoRadio('MAMAS', cp.normalBreastExamination);

        // Age risk factors
        setYesNoRadio('menosde1', cp.youngerThan15);
        setYesNoRadio('mayorde35', cp.olderThan35);

        // Vaccines
        setYesNoRadio('tetanus', cp.vaccineTetanusDiphtheria);
        setYesNoRadio('influenza', cp.vaccineInfluenza);
        setYesNoRadio('rubella', cp.vaccineRubella);
        setYesNoRadio('hepatitis-b', cp.vaccineHepatitisB);

        // Lab results
        if (cp.glucoseLessThan20Weeks) {
            setNumericInCheckBoxes('glucose-lt20', cp.glucoseLessThan20Weeks);
        }
        if (cp.hemoglobinLessThan20Weeks) {
            setNumericInCheckBoxes('hb', cp.hemoglobinLessThan20Weeks);
        }

        // HIV and Syphilis tests
        setYesNoRadio('hiv-test', cp.hIVTestResultLessThan20Weeks);
        setYesNoRadio('syphilis', cp.syphilisTestLessThan20Weeks);
    }

    // Helper Functions
    function setYesNoRadio(name, enumValue) {
        // enumValue: 1 = Yes, 2 = No, 3 = Not Recorded, or boolean
        if (enumValue === null || enumValue === undefined) return;
        
        let value = 'no';
        if (enumValue === 1 || enumValue === true) {
            value = 'si';
        } else if (enumValue === 2 || enumValue === false) {
            value = 'no';
        }
        
        const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
        if (radio) {
            radio.checked = true;
            console.log(`[Form1] Set radio ${name} to ${value}`);
        }
    }

    function setNumericInCheckBoxes(baseName, value) {
        if (value === null || value === undefined) return;
        
        const valueStr = value.toString();
        const inputs = document.querySelectorAll(`input.check-box-input[name*="${baseName}"]`);
        
        // Distribute digits across inputs
        for (let i = 0; i < inputs.length && i < valueStr.length; i++) {
            inputs[i].value = valueStr[i];
        }
        
        console.log(`[Form1] Set numeric value ${baseName} to ${value}`);
    }

    function setDateInInputBox(prefix, date) {
        if (!date) return;
        
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        // Find inputs within .input-box containers
        const inputBoxes = document.querySelectorAll('.input-box, .input-box1, .input-box2, .input-box3');
        inputBoxes.forEach(box => {
            const inputs = box.querySelectorAll('input');
            if (inputs.length >= 3) {
                // Assume order: day, month, year
                inputs[0].value = day.toString().padStart(2, '0');
                inputs[1].value = month.toString().padStart(2, '0');
                inputs[2].value = year.toString();
            }
        });
        
        console.log(`[Form1] Set date ${prefix} to ${day}/${month}/${year}`);
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
