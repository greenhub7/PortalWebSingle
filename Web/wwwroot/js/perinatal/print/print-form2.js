// Form 2 Data Population Module - Enhanced
const PerinatalPrintForm2 = (function() {
    
    function populate(data) {
        if (!data) {
            console.error('[Form2] ❌ No data provided to populate function');
            return;
        }

        console.log('[Form2] ========================================');
        console.log('[Form2] 🚀 Starting Form 2 population');
        console.log('[Form2] Data received:', data);
        console.log('[Form2] ========================================');

        // CRITICAL: Uncheck ALL radios and checkboxes first to clear HTML defaults
        uncheckAllInputs();

        // NOTE: Prenatal Consultations table is in Form 1, not Form 2
        // populatePrenatalConsultations(data);
        
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
        
        console.log('[Form2] ========================================');
        console.log('[Form2] ✅ Form 2 population complete!');
        
        // Final count
        const radiosChecked = document.querySelectorAll('input[type="radio"]:checked').length;
        const checkboxesChecked = document.querySelectorAll('input[type="checkbox"]:checked').length;
        console.log(`[Form2] Final state - Radios checked: ${radiosChecked}, Checkboxes checked: ${checkboxesChecked}`);
        console.log('[Form2] ========================================');
    }

    // NOTE: Prenatal Consultations are in Form 1, not Form 2
    // This function is not used for Form 2
    /*
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
    */

    function populateBirthInfo(data) {
        const birth = data.birthInformation;
        if (!birth) return;

        console.log('[Form2] Populating birth information:', birth);

        // Admission Date - set directly with formatted date
        if (birth.admissionDate) {
            const date = new Date(birth.admissionDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            // Try to find admission date input by context (first date input in form)
            const dateInputs = document.querySelectorAll('input.large-input[type="text"]');
            if (dateInputs.length > 0) {
                dateInputs[0].value = formattedDate;
                console.log(`[Form2] ✓ Set admission date: ${formattedDate}`);
            }
        }

        // Prenatal Consultations Total
        if (birth.prenatalConsultationsTotal) {
            setNumericInCheckBoxes('prenatal-total', birth.prenatalConsultationsTotal);
        }

        // Has Prenatal Card (boolean)
        setYesNoRadio('prenatal-card', birth.hasPrenatalCard, true);

        // First Consultation Gestational Age
        if (birth.firstConsultationGestationalAgeWeeks) {
            setNumericInCheckBoxes('first-consultation-weeks', birth.firstConsultationGestationalAgeWeeks);
        }

        // Hospitalized During Pregnancy (boolean)
        setYesNoRadio('hospitalized', birth.hospitalizedDuringPregnancy, true);

        // Hospitalization Days
        if (birth.hospitalizationDays) {
            setNumericInCheckBoxes('hospitalization-days', birth.hospitalizationDays);
        }

        // Companion (Acompañante TDP)
        if (birth.companion) {
            setRadioByValue('Companion', birth.companion);
        }

        // CompanionP (Acompañante P)
        if (birth.companionP) {
            setRadioByValue('CompanionP', birth.companionP);
        }

        // Fetal Size Appropriate (boolean)
        setYesNoRadio('fetal-size-appropriate', birth.fetalSizeAppropriate, true);

        // Partogram Details (boolean)
        if (birth.partogramDetails !== null && birth.partogramDetails !== undefined) {
            const radio = document.querySelector(`input[name="PartogramDetails"][value="${birth.partogramDetails}"]`);
            if (radio) {
                radio.checked = true;
                console.log(`[Form2] ✓ Set partogram details: ${birth.partogramDetails}`);
            }
        }

        // Meconium Stained Liquor (enum: 1=Yes, 2=No, 3=NC)
        if (birth.meconiumStainedLiquor) {
            const radio = document.querySelector(`input[name="MeconiumStainedLiquor"][value="${birth.meconiumStainedLiquor}"]`);
            if (radio) {
                radio.checked = true;
                console.log(`[Form2] ✓ Set meconium stained liquor: ${birth.meconiumStainedLiquor}`);
            }
        }

        // Chorioamnionitis (enum: 1=Yes, 2=No, 3=NC) - in birth section
        if (birth.chorioamnionitis) {
            const radio = document.querySelector(`input[name="Chorioamnionitis"][value="${birth.chorioamnionitis}"]`);
            if (radio) {
                radio.checked = true;
                console.log(`[Form2] ✓ Set chorioamnionitis: ${birth.chorioamnionitis}`);
            }
        }

        // Gestational Age Method Checkboxes
        if (birth.gestationalAgeByLMP === true || birth.gestationalAgeByLMP === 1) {
            const checkbox = document.querySelector('input[name="GestationalAgeByLMP"]');
            if (checkbox) {
                checkbox.checked = true;
                console.log('[Form2] ✓ Set gestational age by LMP');
            }
        }
        if (birth.gestationalAgeByUltrasound === true || birth.gestationalAgeByUltrasound === 1) {
            const checkbox = document.querySelector('input[name="GestationalAgeByUltrasound"]');
            if (checkbox) {
                checkbox.checked = true;
                console.log('[Form2] ✓ Set gestational age by ultrasound');
            }
        }

        // Membrane Rupture Additional Checkboxes
        if (birth.membraneRuptureBefore37Weeks === true || birth.membraneRuptureBefore37Weeks === 1) {
            const checkbox = document.querySelector('input[name="MembraneRuptureBefore37Weeks"]');
            if (checkbox) {
                checkbox.checked = true;
                console.log('[Form2] ✓ Set membrane rupture before 37 weeks');
            }
        }
        if (birth.membraneRuptureMoreThan18Hours === true || birth.membraneRuptureMoreThan18Hours === 1) {
            const checkbox = document.querySelector('input[name="MembraneRuptureMoreThan18Hours"]');
            if (checkbox) {
                checkbox.checked = true;
                console.log('[Form2] ✓ Set membrane rupture more than 18 hours');
            }
        }

        // Fever Temperature
        if (birth.feverTemperature) {
            const input = document.querySelector('input[name="FeverTemperature"]');
            if (input) {
                input.value = birth.feverTemperature;
                console.log(`[Form2] ✓ Set fever temperature: ${birth.feverTemperature}`);
            }
        }

        // Corticosteroids
        setCheckbox('corticosteroids-complete', birth.corticosteroidsComplete);
        setCheckbox('corticosteroids-incomplete', birth.corticosteroidsIncomplete);
        setCheckbox('corticosteroids-none', birth.corticosteroidsNone);
        setCheckbox('corticosteroids-na', birth.corticosteroidsNA);

        // Corticosteroids Start Week
        if (birth.corticosteroidsStartWeek) {
            const input = document.querySelector('input[name="CorticosteroidsStartWeek"]');
            if (input) {
                input.value = birth.corticosteroidsStartWeek;
                console.log(`[Form2] ✓ Set corticosteroids start week: ${birth.corticosteroidsStartWeek}`);
            }
        }

        // Birth Test Fields (Syphilis, HIV, TARV)
        if (birth.birthSyphilisTest) {
            const radio = document.querySelector(`input[name="BirthSyphilisTest"][value="${birth.birthSyphilisTest}"]`);
            if (radio) {
                radio.checked = true;
                console.log(`[Form2] ✓ Set birth syphilis test: ${birth.birthSyphilisTest}`);
            }
        }
        if (birth.birthHIVTest) {
            const radio = document.querySelector(`input[name="BirthHIVTest"][value="${birth.birthHIVTest}"]`);
            if (radio) {
                radio.checked = true;
                console.log(`[Form2] ✓ Set birth HIV test: ${birth.birthHIVTest}`);
            }
        }
        if (birth.birthTARV) {
            const radio = document.querySelector(`input[name="BirthTARV"][value="${birth.birthTARV}"]`);
            if (radio) {
                radio.checked = true;
                console.log(`[Form2] ✓ Set birth TARV: ${birth.birthTARV}`);
            }
        }

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

        // Membrane Rupture (boolean)
        setYesNoRadio('membrane-rupture', birth.membraneRupture, true);
        if (birth.membraneRuptureDate) {
            const date = new Date(birth.membraneRuptureDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            // Find membrane rupture date input (look for inputs near membrane rupture field)
            const dateInputs = document.querySelectorAll('input.large-input[type="text"]');
            if (dateInputs.length > 1) {
                dateInputs[1].value = formattedDate; // Second date input
                console.log(`[Form2] ✓ Set membrane rupture date: ${formattedDate}`);
            }
        }
        if (birth.membraneRuptureTime) {
            setInputValue('membrane-rupture-time', birth.membraneRuptureTime);
        }

        // Fever During Labor (boolean)
        setYesNoRadio('fever', birth.feverDuringLabor, true);
        if (birth.feverTemperature) {
            setNumericInCheckBoxes('fever-temp', birth.feverTemperature);
        }

        // Birth Type
        setCheckbox('spontaneous-birth', birth.spontaneousBirth);
        setCheckbox('forceps-birth', birth.forcepsBirth);
        setCheckbox('vacuum-birth', birth.vacuumBirth);
        setCheckbox('cesarean-birth', birth.cesareanBirth);

        // Birth Date and Time - set directly with formatted date
        if (birth.birthDate) {
            const date = new Date(birth.birthDate);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            
            // Find birth date input (look for inputs in birth section, likely 3rd or 4th date input)
            const dateInputs = document.querySelectorAll('input.large-input[type="text"]');
            if (dateInputs.length > 2) {
                dateInputs[2].value = formattedDate; // Third date input
                console.log(`[Form2] ✓ Set birth date: ${formattedDate}`);
            }
        }
        if (birth.birthTime) {
            setInputValue('birth-time', birth.birthTime);
        }

        // Multiple Birth (boolean)
        setYesNoRadio('multiple-birth', birth.multipleBirth, true);
        if (birth.birthOrder) {
            setInputValue('birth-order', birth.birthOrder);
        }

        // Live Birth (boolean)
        setYesNoRadio('live-birth', birth.isLiveBirth, true);

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
            setRadioByValue('Sex', newborn.sex);
        }

        // Gestational Age Method (FUM/ECO/ESTIMADA)
        if (newborn.gestationalAgeMethod) {
            setRadioByValue('GestationalAgeMethod', newborn.gestationalAgeMethod);
        }

        // Weight For Gestational Age (adec./peq./gde.)
        if (newborn.weightForGestationalAge) {
            setRadioByValue('WeightForGestationalAge', newborn.weightForGestationalAge);
        }

        // Birth Weight
        if (newborn.birthWeight) {
            setNumericInCheckBoxes('birth-weight', newborn.birthWeight);
            
            // Birth Weight Category radios
            if (newborn.birthWeight < 2500) {
                const radio = document.querySelector('input[name="BirthWeightCategory"][value="low"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form2] ✓ Set birth weight category: low');
                }
            } else if (newborn.birthWeight >= 4000) {
                const radio = document.querySelector('input[name="BirthWeightCategory"][value="high"]');
                if (radio) {
                    radio.checked = true;
                    console.log('[Form2] ✓ Set birth weight category: high');
                }
            }
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

        // Early Breastfeeding (boolean)
        setYesNoRadio('early-breastfeeding', newborn.earlyBreastfeedingInitiation, true);

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
            setRadioByValue('BirthDefectsType', newborn.birthDefectsType);
        }
        if (newborn.birthDefectsCode) {
            setInputValue('birth-defects-code', newborn.birthDefectsCode);
        }

        // Diseases Option and Codes
        if (newborn.diseasesOption) {
            setRadioByValue('DiseasesOption', newborn.diseasesOption);
        }
        if (newborn.diseaseCode1) {
            const input = document.querySelector('input[name="DiseaseCode1"]');
            if (input) input.value = newborn.diseaseCode1;
        }
        if (newborn.diseaseCode2) {
            const input = document.querySelector('input[name="DiseaseCode2"]');
            if (input) input.value = newborn.diseaseCode2;
        }
        if (newborn.diseaseCode3) {
            const input = document.querySelector('input[name="DiseaseCode3"]');
            if (input) input.value = newborn.diseaseCode3;
        }
        if (newborn.diseaseCode4) {
            const input = document.querySelector('input[name="DiseaseCode4"]');
            if (input) input.value = newborn.diseaseCode4;
        }
        if (newborn.diseaseCode5) {
            const input = document.querySelector('input[name="DiseaseCode5"]');
            if (input) input.value = newborn.diseaseCode5;
        }
        if (newborn.diseaseCode6) {
            const input = document.querySelector('input[name="DiseaseCode6"]');
            if (input) input.value = newborn.diseaseCode6;
        }

        // Delivery Attendant (ATENDIO PARTO)
        if (newborn.deliveryAttendantType) {
            setRadioByValue('DeliveryAttendantType', newborn.deliveryAttendantType);
        }
        if (newborn.deliveryAttendantName) {
            const input = document.querySelector('input[name="DeliveryAttendantName"]');
            if (input) {
                input.value = newborn.deliveryAttendantName;
                console.log(`[Form2] ✓ Set delivery attendant name: ${newborn.deliveryAttendantName}`);
            }
        }

        // Neonatal Attendant (ATENDIO NEONATO)
        if (newborn.neonatalAttendantType) {
            setRadioByValue('NeonatalAttendantType', newborn.neonatalAttendantType);
        }
        if (newborn.neonatalAttendantName) {
            const input = document.querySelector('input[name="NeonatalAttendantName"]');
            if (input) {
                input.value = newborn.neonatalAttendantName;
                console.log(`[Form2] ✓ Set neonatal attendant name: ${newborn.neonatalAttendantName}`);
            }
        }

        // HIV Exposed (string: "si"/"no")
        setYesNoRadio('hiv-exposed', newborn.hIVExposedStatus);
        setYesNoRadio('hiv-treatment', newborn.hIVTreatmentStatus);

        // VDRL (string: "+"/"−")
        setYesNoRadio('vdrl-result', newborn.vDRLResult);
        setYesNoRadio('vdrl-treatment', newborn.vDRLTreatment);

        // Screenings (string: "+"/"−")
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
        if (!morb) {
            console.log('[Form2] No morbidity information data');
            return;
        }

        console.log('[Form2] Populating morbidity information:', morb);

        // Hypertensive Disorders (TRASTORNOS HIPERTENSIVOS)
        setYesNoRadio('hipertension_cronica', morb.chronicHypertension);
        setYesNoRadio('preeclampsia_leve', morb.mildPreeclampsia);
        setYesNoRadio('preeclampsia_severa', morb.severePreeclampsia);
        setYesNoRadio('eclampsia', morb.eclampsia);
        setYesNoRadio('hellp', morb.hellp);
        setYesNoRadio('hipertension_gestacional', morb.gestationalHypertension);
        setYesNoRadio('hipertension_cronica_pe', morb.chronicHypertensionWithSuperimposedPreeclampsia);

        // Infections (INFECCIONES)
        setYesNoRadio('sepsis', morb.sepsis);
        setYesNoRadio('endometritis', morb.endometritis);
        setYesNoRadio('corioamnionitis', morb.chorioamnionitis);
        setYesNoRadio('bacteriuria', morb.asymptomaticBacteriuria);
        setYesNoRadio('pielonefritis', morb.pyelonephritis);
        setYesNoRadio('neumonia', morb.pneumonia);
        setYesNoRadio('infeccion_cesarea', morb.cesareanWoundInfection);
        setYesNoRadio('infeccion_episiorrafia', morb.episiotomyInfection);
        setYesNoRadio('otra_infeccion', morb.otherInfection);

        // Hemorrhage (HEMORRAGIA) - by trimester
        setYesNoRadio('post_aborto', morb.postAbortionHemorrhage);
        setYesNoRadio('mola_hidatiforme', morb.hydatidiformMole);
        setYesNoRadio('embarazo_ectopico', morb.ectopicPregnancy);
        setYesNoRadio('placenta_previa', morb.placentaPrevia);
        setYesNoRadio('acretismo_placentario', morb.accretaPlacentaPP);
        setYesNoRadio('dppni', morb.abruptioPlacentae);
        setYesNoRadio('rotura_uterina', morb.uterineRupture);
        setYesNoRadio('hemorragia_postparto', morb.postpartumHemorrhage);
        setYesNoRadio('atonia_uterina', morb.uterineAtony);
        setYesNoRadio('desgarros', morb.placentalTears);
        setYesNoRadio('restos', morb.retainedPlacenta);
        setYesNoRadio('defecto_coagulacion', morb.coagulationDefect);

        // Metabolic Disorders (TRASTORNOS METABOLICOS)
        // Diabetes
        setYesNoRadio('glucosa-anormal', morb.abnormalOralGlucoseTolerance);
        setYesNoRadio('diabetes-gestacional', morb.gestationalDiabetes);
        setYesNoRadio('diabetes-pregestacional', morb.preexistingInsulinDependentDM || morb.preexistingNonInsulinDependentDM);
        
        // Thyroid
        setYesNoRadio('hipotiroidismo', morb.hypothyroidism);
        setYesNoRadio('hipertiroidismo', morb.hyperthyroidism);
        setYesNoRadio('crisis-tiroidea', morb.thyroidCrisis);
        setYesNoRadio('otro-metabolico', morb.otherMetabolicDisorder);

        // Other Disorders (OTROS TRASTORNOS)
        setYesNoRadio('hiperemesis_gravidica', morb.hyperemesisGravidarum);
        setYesNoRadio('trombosis_venosa_profunda', morb.deepVeinThrombosis);
        setYesNoRadio('tromboembolismo_pulmonar', morb.pulmonaryThromboembolism);
        setYesNoRadio('embolia_la', morb.amniocEmbolism);
        setYesNoRadio('cardiopatia', morb.cardiopathy);
        setYesNoRadio('valvulopatia', morb.valvulopathy);
        setYesNoRadio('convulsiones', morb.convulsions);
        setYesNoRadio('alteracion_conciencia', morb.consciousnessAlteration);
        setYesNoRadio('oliguria', morb.oliguria);
        setYesNoRadio('anemia', morb.anemia);
        setYesNoRadio('anemia_falciforme', morb.sickleCellAnemia);
        setYesNoRadio('enfermedad_renal', morb.renalDisease);
        setYesNoRadio('neoplasia_maligna', morb.malignantNeoplasia);
        setYesNoRadio('trastorno_psiquiatrico', morb.psychiatricDisorder);
        setYesNoRadio('colestasis', morb.cholestasis);
        setYesNoRadio('otros_enfermedades', morb.otherDisorder);

        // Obstetric Complications (COMPLICACIONES OBSTÉTRICAS)
        setYesNoRadio('parto_obstruido', morb.obstructedLabor);
        setYesNoRadio('rotura_prematura_membranas', morb.prolongedRuptureOfMembranes);
        setYesNoRadio('polihidramnios', morb.polyhydramnios);
        setYesNoRadio('oligohidramnios', morb.oligohydramnios);
        setYesNoRadio('restriccion_crecimiento', morb.intrauterineGrowthRestriction);
        setYesNoRadio('sufrimiento_fetal', morb.acuteFetalDistress);
        setYesNoRadio('otra_complicacion', morb.otherObstetricComplication);

        console.log('[Form2] Morbidity information populated');
    }

    function populateNearMiss(data) {
        const nm = data.nearMissVariables;
        if (!nm) {
            console.log('[Form2] No near miss variables data');
            return;
        }

        console.log('[Form2] Populating near miss variables:', nm);

        // Near Miss Criteria - Clinical
        setYesNoRadio('shock', nm.shock);
        setYesNoRadio('cardiac-arrest', nm.cardiacArrest);
        setYesNoRadio('coma', nm.coma);
        setYesNoRadio('stroke', nm.strokeOrCVA);
        setYesNoRadio('respiratory-failure', nm.respiratoryFailure);
        setYesNoRadio('acute-renal-failure', nm.acuteRenalFailure);
        setYesNoRadio('coagulopathy', nm.coagulopathy);
        
        // Near Miss Criteria - Management
        setYesNoRadio('hysterectomy', nm.hysterectomy);
        setYesNoRadio('icu-admission', nm.icuAdmission);
        setYesNoRadio('transfusion', nm.transfusion);
        setYesNoRadio('laparotomy', nm.laparotomy);
        setYesNoRadio('intubation', nm.intubation);
        setYesNoRadio('dialysis', nm.dialysis);
        setYesNoRadio('cardiopulmonary-resuscitation', nm.cardiopulmonaryResuscitation);
        
        // Laboratory criteria
        setYesNoRadio('severe-acidosis', nm.severeAcidosis);
        setYesNoRadio('severe-hypoxemia', nm.severeHypoxemia);
        setYesNoRadio('severe-thrombocytopenia', nm.severeThrombocytopenia);
        setYesNoRadio('severe-hyperlactatemia', nm.severeHyperlactatemia);

        console.log('[Form2] Near miss variables populated');
    }

    function populatePuerperiumInfo(data) {
        const puerperium = data.puerperiumInformation;
        if (!puerperium) return;

        console.log('[Form2] Populating puerperium information:', puerperium);
        
        // Populate puerperium days table
        if (puerperium.days && puerperium.days.length > 0) {
            const table = document.querySelector('.puerperio-table tbody');
            if (!table) {
                console.warn('[Form2] Puerperio table not found');
                return;
            }
            
            const rows = table.querySelectorAll('tr');
            
            puerperium.days.forEach((day, index) => {
                if (index >= rows.length) return;
                
                const row = rows[index];
                const inputs = row.querySelectorAll('input[type="text"]');
                
                // Column order: Temp, P.A., pulso, invol.úter, loquios, periné, lactancia, observaciones, Responsable
                if (inputs.length >= 9) {
                    if (day.temperature) inputs[0].value = day.temperature;
                    if (day.bloodPressure) inputs[1].value = day.bloodPressure;
                    if (day.pulse) inputs[2].value = day.pulse;
                    if (day.uterineInvolution) inputs[3].value = day.uterineInvolution;
                    if (day.lochia) inputs[4].value = day.lochia;
                    if (day.perineum) inputs[5].value = day.perineum;
                    if (day.breastfeeding) inputs[6].value = day.breastfeeding;
                    if (day.observations) inputs[7].value = day.observations;
                    if (day.responsible) inputs[8].value = day.responsible;
                    
                    console.log(`[Form2] ✓ Populated puerperium day ${day.dayNumber || index + 1}`);
                }
            });
        }
    }

    function populateContraceptionInfo(data) {
        const contraception = data.contraceptionInformation;
        if (!contraception) {
            console.log('[Form2] No contraception information data');
            return;
        }

        console.log('[Form2] Populating contraception information:', contraception);
        console.log('[Form2] OralCounseling value:', contraception.oralCounseling, 'Type:', typeof contraception.oralCounseling);
        console.log('[Form2] IUDPreferred value:', contraception.iudPreferred, 'Type:', typeof contraception.iudPreferred);
        console.log('[Form2] IUDAccepted value:', contraception.iudAccepted, 'Type:', typeof contraception.iudAccepted);
        
        // Counseling radios - set based on data
        if (contraception.oralCounseling === true || contraception.oralCounseling === 1) {
            const radio = document.querySelector('input[name="consejeria"][value="oral"]');
            console.log('[Form2] Found oral counseling radio:', radio);
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set counseling to oral, checked:', radio.checked);
            }
        } else if (contraception.writtenCounseling === true || contraception.writtenCounseling === 1) {
            const radio = document.querySelector('input[name="consejeria"][value="escrita"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set counseling to written');
            }
        } else if (contraception.noCounseling === true || contraception.noCounseling === 1) {
            const radio = document.querySelector('input[name="consejeria"][value="ninguna"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set counseling to none');
            }
        }
        
        // DIU (IUD) - check if preferred or accepted
        if (contraception.iudPreferred === true || contraception.iudPreferred === 1 || contraception.iud === true) {
            const radio = document.querySelector('input[name="diu"][value="pref"]');
            console.log('[Form2] Found DIU pref radio:', radio);
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set DIU to preferred, checked:', radio.checked);
            }
        }
        if (contraception.iudAccepted === true || contraception.iudAccepted === 1) {
            const radio = document.querySelector('input[name="diu"][value="acced"]');
            console.log('[Form2] Found DIU acced radio:', radio);
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set DIU to accepted, checked:', radio.checked);
            }
        }
        
        // Injectable (inyectable)
        if (contraception.injectablePreferred === true || contraception.injectablePreferred === 1) {
            const radio = document.querySelector('input[name="inyectable"][value="pref"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set injectable to preferred');
            }
        }
        if (contraception.injectableAccepted === true || contraception.injectableAccepted === 1) {
            const radio = document.querySelector('input[name="inyectable"][value="acced"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set injectable to accepted');
            }
        }
        
        // Implant (implante)
        if (contraception.implantPreferred === true || contraception.implantPreferred === 1) {
            const radio = document.querySelector('input[name="implante"][value="pref"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set implant to preferred');
            }
        }
        if (contraception.implantAccepted === true || contraception.implantAccepted === 1) {
            const radio = document.querySelector('input[name="implante"][value="acced"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set implant to accepted');
            }
        }
        
        // Barrier (barrera-fem)
        if (contraception.barrierPreferred === true || contraception.barrierPreferred === 1) {
            const radio = document.querySelector('input[name="barrera-fem"][value="pref"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set barrier to preferred');
            }
        }
        if (contraception.barrierAccepted === true || contraception.barrierAccepted === 1) {
            const radio = document.querySelector('input[name="barrera-fem"][value="acced"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set barrier to accepted');
            }
        }
        
        // Condom (condon)
        if (contraception.condomPreferred === true || contraception.condomPreferred === 1) {
            const radio = document.querySelector('input[name="condon"][value="pref"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set condom to preferred');
            }
        }
        if (contraception.condomAccepted === true || contraception.condomAccepted === 1) {
            const radio = document.querySelector('input[name="condon"][value="acced"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set condom to accepted');
            }
        }
        
        // ACO "píldora"
        if (contraception.oralContraceptivesPreferred === true || contraception.oralContraceptivesPreferred === 1) {
            const radio = document.querySelector('input[name="aco"][value="pref"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set ACO to preferred');
            }
        }
        if (contraception.oralContraceptivesAccepted === true || contraception.oralContraceptivesAccepted === 1) {
            const radio = document.querySelector('input[name="aco"][value="acced"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set ACO to accepted');
            }
        }
        
        // EOV fem (Female Sterilization)
        if (contraception.femaleSterilizationPreferred === true || contraception.femaleSterilizationPreferred === 1) {
            const radio = document.querySelector('input[name="eov-fem"][value="pref"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set EOV fem to preferred');
            }
        }
        if (contraception.femaleSterilizationAccepted === true || contraception.femaleSterilizationAccepted === 1) {
            const radio = document.querySelector('input[name="eov-fem"][value="acced"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set EOV fem to accepted');
            }
        }
        
        // EOV masc (Male Sterilization)
        if (contraception.maleSterilizationPreferred === true || contraception.maleSterilizationPreferred === 1) {
            const radio = document.querySelector('input[name="eov-masc"][value="pref"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set EOV masc to preferred');
            }
        }
        if (contraception.maleSterilizationAccepted === true || contraception.maleSterilizationAccepted === 1) {
            const radio = document.querySelector('input[name="eov-masc"][value="acced"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set EOV masc to accepted');
            }
        }
        
        // Abstinencia (Natural Method)
        if (contraception.naturalMethodPreferred === true || contraception.naturalMethodPreferred === 1) {
            const radio = document.querySelector('input[name="abstinencia"][value="pref"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set abstinencia to preferred');
            }
        }
        if (contraception.naturalMethodAccepted === true || contraception.naturalMethodAccepted === 1) {
            const radio = document.querySelector('input[name="abstinencia"][value="acced"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set abstinencia to accepted');
            }
        }
        
        // Otro hormonal (Other Hormonal Methods)
        if (contraception.otherHormonalMethodsPreferred === true || contraception.otherHormonalMethodsPreferred === 1) {
            const radio = document.querySelector('input[name="otro-hormonal"][value="pref"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set otro hormonal to preferred');
            }
        }
        if (contraception.otherHormonalMethodsAccepted === true || contraception.otherHormonalMethodsAccepted === 1) {
            const radio = document.querySelector('input[name="otro-hormonal"][value="acced"]');
            if (radio) {
                radio.checked = true;
                console.log('[Form2] ✓ Set otro hormonal to accepted');
            }
        }
        
        // Verify radios are checked after setting
        setTimeout(() => {
            const checkedRadios = document.querySelectorAll('.anticoncepcion-cell input[type="radio"]:checked, .consejeria-cell input[type="radio"]:checked');
            console.log('[Form2] Total checked radios after population:', checkedRadios.length);
            checkedRadios.forEach(radio => {
                console.log('[Form2] Checked radio:', radio.name, '=', radio.value);
            });
        }, 100);
    }

    function populateMaternalDischargeInfo(data) {
        const discharge = data.maternalDischargeInformation;
        if (!discharge) return;

        console.log('[Form2] Populating maternal discharge information:', discharge);
        
        // Discharge date - find the date input in EGRESO MATERNO section
        if (discharge.dischargeDate) {
            const date = new Date(discharge.dischargeDate);
            const dateInputs = document.querySelectorAll('.egreso-wrapper .date-grid .input-box.large input.large-input');
            if (dateInputs.length > 0) {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                dateInputs[0].value = `${day}/${month}/${year}`;
                console.log(`[Form2] ✓ Set discharge date: ${day}/${month}/${year}`);
            }
        }
        
        // Discharge time - find the time input (second large-input in date-grid)
        if (discharge.dischargeTime) {
            const timeInputs = document.querySelectorAll('.egreso-wrapper .date-grid .input-box.small input.large-input');
            if (timeInputs.length > 0) {
                const timeParts = discharge.dischargeTime.split(':');
                if (timeParts.length >= 2) {
                    timeInputs[0].value = `${timeParts[0]}:${timeParts[1]}`;
                    console.log(`[Form2] ✓ Set discharge time: ${discharge.dischargeTime}`);
                }
            }
        }
        
        // Discharge condition/type radios - check for "sana" (healthy)
        if (discharge.dischargeType) {
            if (discharge.dischargeType.toLowerCase().includes('sana') || discharge.dischargeType.toLowerCase().includes('alta')) {
                const radio = document.querySelector('input[name="sana"]');
                if (radio) {
                    radio.checked = true;
                    console.log(`[Form2] ✓ Set discharge condition to sana`);
                }
            }
        }
        
        // Egreso medico radio
        const egresoRadio = document.querySelector('input[name="egreso-medico"]');
        if (egresoRadio) {
            egresoRadio.checked = true;
            console.log(`[Form2] ✓ Set egreso medico`);
        }
    }

    // Helper Functions
    function uncheckAllInputs() {
        console.log('[Form2] 🧹 Unchecking all default checked inputs...');
        
        // Count before
        const radiosBefore = document.querySelectorAll('input[type="radio"]:checked').length;
        const checkboxesBefore = document.querySelectorAll('input[type="checkbox"]:checked').length;
        console.log(`[Form2] Before uncheck - Radios: ${radiosBefore}, Checkboxes: ${checkboxesBefore}`);
        
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
        console.log(`[Form2] After uncheck - Radios: ${radiosAfter}, Checkboxes: ${checkboxesAfter}`);
        console.log('[Form2] ✓ All inputs unchecked');
    }

    function setYesNoRadio(name, value, isBoolean = false) {
        // Handle different field types:
        // - Enum fields (YesNoNotRecorded): 1=Yes, 2=No, 3=NotRecorded, 0/NULL=not set
        // - Boolean fields (bool?): true/1=Yes, false/0=No, null=not set
        // - String fields: "si"/"+"=Yes, "no"/"-"=No
        
        // Handle string values (for HIV, VDRL, Screening fields)
        if (typeof value === 'string') {
            const lowerValue = value.toLowerCase().trim();
            if (lowerValue === 'si' || lowerValue === '+' || lowerValue === 'yes') {
                const siRadio = document.querySelector(`input[name="${name}"][value="si"]`);
                if (siRadio) {
                    siRadio.checked = true;
                    console.log(`[Form2] ✓ Set radio ${name} to si (string: "${value}")`);
                }
                return;
            } else if (lowerValue === 'no' || lowerValue === '-' || lowerValue === 'no') {
                const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
                if (noRadio) {
                    noRadio.checked = true;
                    noRadio.setAttribute('data-mark-state', 'check');
                    console.log(`[Form2] ✓ Set radio ${name} to no (string: "${value}")`);
                }
                return;
            }
            // For other string values (like "realizado"), just log and skip
            console.log(`[Form2] ℹ Skipping ${name} - unhandled string value: "${value}"`);
            return;
        }
        
        // Handle boolean fields
        if (isBoolean) {
            if (value === null || value === undefined) {
                console.log(`[Form2] Skipping ${name} - no value (boolean field)`);
                return;
            }
            
            // For boolean: 0/false = "No", 1/true = "Yes"
            if (value === 0 || value === false) {
                const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
                if (noRadio) {
                    noRadio.checked = true;
                    noRadio.setAttribute('data-mark-state', 'check');
                    console.log(`[Form2] ✓ Set radio ${name} to no (boolean: ${value})`);
                }
            } else if (value === 1 || value === true) {
                const siRadio = document.querySelector(`input[name="${name}"][value="si"]`);
                if (siRadio) {
                    siRadio.checked = true;
                    console.log(`[Form2] ✓ Set radio ${name} to si (boolean: ${value})`);
                }
            }
            return;
        }
        
        // Handle enum fields (YesNoNotRecorded)
        if (value === null || value === undefined) {
            console.log(`[Form2] Skipping ${name} - no value (enum field)`);
            return;
        }
        
        // For enum: 0 = not set (BLANK)
        if (value === 0) {
            console.log(`[Form2] Skipping ${name} - value is 0 (not set)`);
            return;
        }
        
        // For enum: 2 = No (explicit)
        if (value === 2) {
            const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
            if (noRadio) {
                noRadio.checked = true;
                noRadio.setAttribute('data-mark-state', 'check');
                console.log(`[Form2] ✓ Set radio ${name} to no (enum: 2)`);
            }
            return;
        }
        
        // For enum: 3 = NotRecorded (BLANK)
        if (value === 3) {
            console.log(`[Form2] Skipping ${name} - not recorded (enum: 3)`);
            return;
        }
        
        // For enum: 1 = Yes (explicit)
        if (value === 1) {
            const siRadio = document.querySelector(`input[name="${name}"][value="si"]`);
            if (siRadio) {
                siRadio.checked = true;
                console.log(`[Form2] ✓ Set radio ${name} to si (enum: 1)`);
            }
        }
    }

    function setCheckbox(name, value) {
        if (value === null || value === undefined) return;
        
        const checkbox = document.querySelector(`input[name="${name}"]`);
        if (checkbox && value) {
            checkbox.checked = true;
            console.log(`[Form2] ✓ Set checkbox ${name} to checked`);
        }
        // Don't log warning if field doesn't exist
    }

    function setInputValue(name, value) {
        if (!value) return;
        
        const input = document.querySelector(`input[name="${name}"]`);
        if (input) {
            input.value = value;
            console.log(`[Form2] ✓ Set input ${name} to ${value}`);
        }
        // Don't log warning if field doesn't exist
    }

    function setRadioByValue(name, value) {
        if (!value) return;
        
        const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
        if (radio) {
            radio.checked = true;
            console.log(`[Form2] ✓ Set radio ${name} to ${value}`);
        }
        // Don't log warning if field doesn't exist
    }

    function setNumericInCheckBoxes(baseName, value) {
        if (value === null || value === undefined) {
            return; // Skip silently
        }
        
        const valueStr = value.toString();
        const inputs = document.querySelectorAll(`input.check-box-input[name*="${baseName}"]`);
        
        if (inputs.length === 0) {
            return; // Skip silently if field doesn't exist
        }
        
        // Distribute digits across inputs
        for (let i = 0; i < inputs.length && i < valueStr.length; i++) {
            inputs[i].value = valueStr[i];
        }
        
        console.log(`[Form2] ✓ Set numeric value ${baseName} to ${value} (${inputs.length} inputs)`);
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
