// Form 2 Data Population Module - Enhanced
const PerinatalPrintForm2 = (function() {
    
    function populate(data) {
        if (!data) {
            console.warn('[Form2] No data provided');
            return;
        }

        console.log('[Form2] Populating form with data:', data);

        // Prenatal Consultations (Consultas Prenatales)
        populatePrenatalConsultations(data);
        
        // Birth Information (Información del Parto)
        populateBirthInfo(data);
        
        // Newborn Information (Información del Recién Nacido)
        populateNewbornInfo(data);
        
        // Postpartum Information (Información Postparto)
        populatePostpartumInfo(data);
        
        // Morbidity Information (Morbilidad)
        populateMorbidity(data);
        
        // Near Miss Variables
        populateNearMiss(data);
        
        // Puerperium Information (Puerperio)
        populatePuerperiumInfo(data);
        
        // Contraception Information (Anticoncepción)
        populateContraceptionInfo(data);
        
        // Maternal Discharge Information (Alta Materna)
        populateMaternalDischargeInfo(data);
        
        console.log('[Form2] Population complete!');
    }

    function populatePrenatalConsultations(data) {
        const consultations = data.prenatalConsultations;
        if (!consultations || consultations.length === 0) return;

        console.log('[Form2] Populating prenatal consultations:', consultations);

        // Populate consultation table rows
        consultations.forEach((consultation, index) => {
            if (index >= 10) return; // Limit to available rows in form

            // Date
            if (consultation.consultationDate) {
                const date = new Date(consultation.consultationDate);
                setTableCell(`consultation-${index}-date`, date.toLocaleDateString());
            }

            // Gestational Age
            if (consultation.gestationalAgeWeeks) {
                setTableCell(`consultation-${index}-weeks`, consultation.gestationalAgeWeeks);
            }

            // Weight
            if (consultation.weight) {
                setTableCell(`consultation-${index}-weight`, consultation.weight);
            }

            // Blood Pressure
            if (consultation.bloodPressure) {
                setTableCell(`consultation-${index}-bp`, consultation.bloodPressure);
            }

            // Uterine Height
            if (consultation.uterineHeight) {
                setTableCell(`consultation-${index}-height`, consultation.uterineHeight);
            }

            // Presentation
            if (consultation.presentation) {
                setTableCell(`consultation-${index}-presentation`, consultation.presentation);
            }

            // Fetal Heart Rate
            if (consultation.fetalHeartRate) {
                setTableCell(`consultation-${index}-fhr`, consultation.fetalHeartRate);
            }

            // Fetal Movements
            setCheckboxInTable(`consultation-${index}-movements`, consultation.fetalMovements);

            // Proteinuria
            setCheckboxInTable(`consultation-${index}-proteinuria`, consultation.proteinuria);

            // Control Location
            if (consultation.controlLocation) {
                setTableCell(`consultation-${index}-location`, consultation.controlLocation);
            }

            // Warning Signs/Exams/Treatments
            if (consultation.warningSignsExamsAndTreatments) {
                setTableCell(`consultation-${index}-warnings`, consultation.warningSignsExamsAndTreatments);
            }

            // Technician Initials
            if (consultation.technicianInitials) {
                setTableCell(`consultation-${index}-initials`, consultation.technicianInitials);
            }
        });
    }

    function populateBirthInfo(data) {
        const birth = data.birthInformation;
        if (!birth) return;

        console.log('[Form2] Populating birth information:', birth);

        // Admission Date
        if (birth.admissionDate) {
            const date = new Date(birth.admissionDate);
            setDateInInputBox('admission-date', date);
        }

        // Prenatal Consultations Total
        if (birth.prenatalConsultationsTotal) {
            setNumericInCheckBoxes('prenatal-total', birth.prenatalConsultationsTotal);
        }

        // Has Prenatal Card
        setYesNoRadio('prenatal-card', birth.hasPrenatalCard);

        // First Consultation Gestational Age
        if (birth.firstConsultationGestationalAgeWeeks) {
            setNumericInCheckBoxes('first-consultation-weeks', birth.firstConsultationGestationalAgeWeeks);
        }

        // Hospitalized During Pregnancy
        setYesNoRadio('hospitalized', birth.hospitalizedDuringPregnancy);

        // Hospitalization Days
        if (birth.hospitalizationDays) {
            setNumericInCheckBoxes('hospitalization-days', birth.hospitalizationDays);
        }

        // Companion
        if (birth.companion) {
            setInputValue('companion', birth.companion);
        }

        // Corticosteroids
        setCheckbox('corticosteroids-complete', birth.corticosteroidsComplete);
        setCheckbox('corticosteroids-incomplete', birth.corticosteroidsIncomplete);
        setCheckbox('corticosteroids-none', birth.corticosteroidsNone);

        // Gestational Age at Birth
        if (birth.gestationalAgeAtBirthWeeks) {
            setNumericInCheckBoxes('birth-weeks', birth.gestationalAgeAtBirthWeeks);
        }
        if (birth.gestationalAgeAtBirthDays) {
            setNumericInCheckBoxes('birth-days', birth.gestationalAgeAtBirthDays);
        }

        // Presentation
        setCheckbox('cephalic', birth.cephalicPresentation);
        setCheckbox('pelvic', birth.pelvicPresentation);
        setCheckbox('transverse', birth.transverseSituation);

        // Onset of Labor
        setCheckbox('spontaneous-onset', birth.spontaneousOnset);
        setCheckbox('induced-onset', birth.inducedOnset);
        setCheckbox('elective-cesarean', birth.electiveCesareanOnset);

        // Membrane Rupture
        setYesNoRadio('membrane-rupture', birth.membraneRupture);
        if (birth.membraneRuptureDate) {
            const date = new Date(birth.membraneRuptureDate);
            setDateInInputBox('membrane-rupture-date', date);
        }
        if (birth.membraneRuptureTime) {
            setInputValue('membrane-rupture-time', birth.membraneRuptureTime);
        }

        // Fever During Labor
        setYesNoRadio('fever', birth.feverDuringLabor);
        if (birth.feverTemperature) {
            setNumericInCheckBoxes('fever-temp', birth.feverTemperature);
        }

        // Birth Type
        setCheckbox('spontaneous-birth', birth.spontaneousBirth);
        setCheckbox('forceps-birth', birth.forcepsBirth);
        setCheckbox('vacuum-birth', birth.vacuumBirth);
        setCheckbox('cesarean-birth', birth.cesareanBirth);

        // Birth Date and Time
        if (birth.birthDate) {
            const date = new Date(birth.birthDate);
            setDateInInputBox('birth-date', date);
        }
        if (birth.birthTime) {
            setInputValue('birth-time', birth.birthTime);
        }

        // Multiple Birth
        setYesNoRadio('multiple-birth', birth.multipleBirth);
        if (birth.birthOrder) {
            setInputValue('birth-order', birth.birthOrder);
        }

        // Live Birth
        setYesNoRadio('live-birth', birth.isLiveBirth);

        // Episiotomy and Tear
        setCheckbox('episiotomy', birth.episiotomy);
        setCheckbox('tear', birth.tear);
        if (birth.tearGrade) {
            setNumericInCheckBoxes('tear-grade', birth.tearGrade);
        }

        // Placenta
        setCheckbox('manual-removal', birth.manualRemovalOfPlacenta);
        setCheckbox('retained-placenta', birth.retainedPlacenta);
        setCheckbox('complete-placenta', birth.completePlacenta);

        // Anesthesia
        setCheckbox('local-anesthesia', birth.localAnesthesia);
        setCheckbox('regional-anesthesia', birth.regionalAnesthesia);
        setCheckbox('general-anesthesia', birth.generalAnesthesia);

        // Medications
        setCheckbox('oxytocics', birth.oxytocicsInLabor);
        setCheckbox('antibiotics', birth.antibioticsTreatment);
        setCheckbox('analgesia', birth.analgesiaTreatment);

        // Attendant
        setCheckbox('attended-doctor', birth.attendedByDoctor);
        setCheckbox('attended-nurse', birth.attendedByNurse);
        setCheckbox('attended-student', birth.attendedByStudent);
        setCheckbox('attended-midwife', birth.attendedByMidwife);
        if (birth.attendantName) {
            setInputValue('attendant-name', birth.attendantName);
        }
    }

    function populateNewbornInfo(data) {
        const newborn = data.newbornInformation;
        if (!newborn) return;

        console.log('[Form2] Populating newborn information:', newborn);

        // Sex
        if (newborn.sex) {
            setRadioByValue('sex', newborn.sex);
        }

        // Birth Weight
        if (newborn.birthWeight) {
            setNumericInCheckBoxes('birth-weight', newborn.birthWeight);
        }

        // Head Circumference
        if (newborn.headCircumference) {
            setNumericInCheckBoxes('head-circumference', newborn.headCircumference);
        }

        // Length
        if (newborn.length) {
            setNumericInCheckBoxes('length', newborn.length);
        }

        // Gestational Age
        if (newborn.gestationalAgeWeeks) {
            setNumericInCheckBoxes('newborn-weeks', newborn.gestationalAgeWeeks);
        }
        if (newborn.gestationalAgeDays) {
            setNumericInCheckBoxes('newborn-days', newborn.gestationalAgeDays);
        }

        // Apgar Scores
        if (newborn.apgarFirstMinute) {
            setNumericInCheckBoxes('apgar-1', newborn.apgarFirstMinute);
        }
        if (newborn.apgarFifthMinute) {
            setNumericInCheckBoxes('apgar-5', newborn.apgarFifthMinute);
        }

        // Early Breastfeeding
        setYesNoRadio('early-breastfeeding', newborn.earlyBreastfeedingInitiation);

        // Resuscitation
        setCheckbox('resuscitation-stimulation', newborn.resuscitationStimulation);
        setCheckbox('resuscitation-aspiration', newborn.resuscitationAspiration);
        setCheckbox('resuscitation-mask', newborn.resuscitationMask);
        setCheckbox('resuscitation-oxygen', newborn.resuscitationOxygen);
        setCheckbox('resuscitation-massage', newborn.resuscitationMassage);
        setCheckbox('resuscitation-intubation', newborn.resuscitationIntubation);
        setCheckbox('resuscitation-medication', newborn.resuscitationMedication);

        // Birth Defects
        if (newborn.birthDefectsType) {
            setInputValue('birth-defects-type', newborn.birthDefectsType);
        }
        if (newborn.birthDefectsCode) {
            setInputValue('birth-defects-code', newborn.birthDefectsCode);
        }

        // HIV Exposed
        setYesNoRadio('hiv-exposed', newborn.hIVExposedStatus);
        setYesNoRadio('hiv-treatment', newborn.hIVTreatmentStatus);

        // VDRL
        setYesNoRadio('vdrl-result', newborn.vDRLResult);
        setYesNoRadio('vdrl-treatment', newborn.vDRLTreatment);

        // Screenings
        setYesNoRadio('screening-audic', newborn.screeningAudic);
        setYesNoRadio('screening-chagas', newborn.screeningChagas);
        setYesNoRadio('screening-bilirrub', newborn.screeningBilirrub);
        setYesNoRadio('screening-toxo', newborn.screeningToxoIgM);
        setYesNoRadio('screening-hbpatia', newborn.screeningHbPatia);
        setYesNoRadio('screening-cardiov', newborn.screeningCardiov);
        setYesNoRadio('screening-metabolic', newborn.screeningMetabolicStatus);

        // Vaccines
        setCheckbox('bcg-vaccine', newborn.bCGVaccine);
        setCheckbox('hepatitis-b-vaccine', newborn.hepatitisB);

        // Discharge Status
        if (newborn.dischargeStatus) {
            setInputValue('discharge-status', newborn.dischargeStatus);
        }
        if (newborn.dischargeTime) {
            setInputValue('discharge-time', newborn.dischargeTime);
        }
    }

    function populatePostpartumInfo(data) {
        const postpartum = data.postpartumInformation;
        if (!postpartum) return;

        console.log('[Form2] Populating postpartum information:', postpartum);
        // Add postpartum-specific population logic here
    }

    function populateMorbidity(data) {
        const morb = data.morbidityInformation;
        if (!morb) return;

        console.log('[Form2] Populating morbidity information:', morb);

        // Hypertensive Disorders
        setYesNoRadio('chronic-hypertension', morb.chronicHypertension);
        setYesNoRadio('mild-preeclampsia', morb.mildPreeclampsia);
        setYesNoRadio('severe-preeclampsia', morb.severePreeclampsia);
        setYesNoRadio('eclampsia', morb.eclampsia);
        setYesNoRadio('hellp', morb.hellp);
        setYesNoRadio('gestational-hypertension', morb.gestationalHypertension);

        // Infections
        setYesNoRadio('sepsis', morb.sepsis);
        setYesNoRadio('pyelonephritis', morb.pyelonephritis);
        setYesNoRadio('chorioamnionitis', morb.chorioamnionitis);

        // Metabolic Disorders
        setYesNoRadio('gestational-diabetes', morb.gestationalDiabetes);
        setYesNoRadio('anemia', morb.anemia);

        // Hemorrhagic Complications
        setYesNoRadio('postpartum-hemorrhage', morb.postpartumHemorrhage);
        setYesNoRadio('placenta-previa', morb.placentaPrevia);
        setYesNoRadio('placental-abruption', morb.placentalAbruption);
    }

    function populateNearMiss(data) {
        const nm = data.nearMissVariables;
        if (!nm) return;

        console.log('[Form2] Populating near miss variables:', nm);

        // Near Miss Criteria
        setYesNoRadio('shock', nm.shock);
        setYesNoRadio('cardiac-arrest', nm.cardiacArrest);
        setYesNoRadio('coma', nm.coma);
        setYesNoRadio('stroke', nm.strokeOrCVA);
        setYesNoRadio('respiratory-failure', nm.respiratoryFailure);
        setYesNoRadio('acute-renal-failure', nm.acuteRenalFailure);
        setYesNoRadio('coagulopathy', nm.coagulopathy);
        setYesNoRadio('hysterectomy', nm.hysterectomy);
        setYesNoRadio('icu-admission', nm.icuAdmission);
        setYesNoRadio('transfusion', nm.transfusion);
    }

    function populatePuerperiumInfo(data) {
        const puerperium = data.puerperiumInformation;
        if (!puerperium) return;

        console.log('[Form2] Populating puerperium information:', puerperium);
        // Add puerperium-specific population logic here
    }

    function populateContraceptionInfo(data) {
        const contraception = data.contraceptionInformation;
        if (!contraception) return;

        console.log('[Form2] Populating contraception information:', contraception);
        // Add contraception-specific population logic here
    }

    function populateMaternalDischargeInfo(data) {
        const discharge = data.maternalDischargeInformation;
        if (!discharge) return;

        console.log('[Form2] Populating maternal discharge information:', discharge);
        // Add discharge-specific population logic here
    }

    // Helper Functions
    function setYesNoRadio(name, value) {
        // value can be boolean or enum (1=Yes, 2=No, 3=NotRecorded)
        if (value === null || value === undefined) return;
        
        let radioValue = 'no';
        if (value === true || value === 1) {
            radioValue = 'si';
        }
        
        const radio = document.querySelector(`input[name="${name}"][value="${radioValue}"]`);
        if (radio) {
            radio.checked = true;
            console.log(`[Form2] Set radio ${name} to ${radioValue}`);
        }
    }

    function setCheckbox(name, value) {
        if (value === null || value === undefined) return;
        
        const checkbox = document.querySelector(`input[name="${name}"]`);
        if (checkbox && value) {
            checkbox.checked = true;
            console.log(`[Form2] Set checkbox ${name} to checked`);
        }
    }

    function setInputValue(name, value) {
        if (!value) return;
        
        const input = document.querySelector(`input[name="${name}"]`);
        if (input) {
            input.value = value;
            console.log(`[Form2] Set input ${name} to ${value}`);
        }
    }

    function setRadioByValue(name, value) {
        if (!value) return;
        
        const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
        if (radio) {
            radio.checked = true;
            console.log(`[Form2] Set radio ${name} to ${value}`);
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
        
        console.log(`[Form2] Set numeric value ${baseName} to ${value}`);
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
                inputs[0].value = day.toString().padStart(2, '0');
                inputs[1].value = month.toString().padStart(2, '0');
                inputs[2].value = year.toString();
            }
        });
        
        console.log(`[Form2] Set date ${prefix} to ${day}/${month}/${year}`);
    }

    function setTableCell(id, value) {
        const cell = document.getElementById(id) || document.querySelector(`[data-id="${id}"]`);
        if (cell) {
            cell.textContent = value;
        }
    }

    function setCheckboxInTable(id, value) {
        const checkbox = document.getElementById(id) || document.querySelector(`[data-id="${id}"]`);
        if (checkbox && value) {
            checkbox.checked = true;
        }
    }

    // Public API
    return {
        populate: populate
    };
})();

// Register with PerinatalPrint core if available
if (typeof PerinatalPrint !== 'undefined') {
    console.log('[Form2] Module loaded and registered');
}
