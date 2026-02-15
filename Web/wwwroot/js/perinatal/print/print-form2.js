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
        if (!morb) {
            console.log('[Form2] No morbidity information data');
            return;
        }

        console.log('[Form2] Populating morbidity information:', morb);

        // First, uncheck all morbidity radios (they're all checked="checked" by default in HTML)
        document.querySelectorAll('.container input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

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
        
        // First, uncheck all contraception radios to clear defaults
        document.querySelectorAll('.anticoncepcion-cell input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        document.querySelectorAll('.consejeria-cell input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
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
    function setYesNoRadio(name, value) {
        // "si" radios are always yellow (CSS handles this), so we only need to handle "no" radios
        // value can be boolean or enum (1=Yes, 2=No, 3=NotRecorded)
        
        // Only set "no" radio if the value is explicitly No (false or 2)
        if (value === false || value === 2) {
            const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
            if (noRadio) {
                noRadio.checked = true;
                // Add checkmark to "no" radio
                noRadio.setAttribute('data-mark-state', 'check');
                console.log(`[Form2] ✓ Set radio ${name} to no`);
            }
        }
        // If value is Yes (true or 1) or NotRecorded (null/undefined/3), do nothing
        // The "si" radio is already yellow by default (CSS)
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
