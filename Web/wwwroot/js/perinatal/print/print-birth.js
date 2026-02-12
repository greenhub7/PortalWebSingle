

const PerinatalPrintBirth = (function() {

    function populate(fullData) {
        
        const birth = fullData.birthInformation;
        if (birth) {
            console.log('[PerinatalPrintBirth] Llenando datos de parto...');
            
            
            if (birth.admissionDate) {
                const adm = new Date(birth.admissionDate);
                setText('birth_adm_dia', adm.getDate().toString().padStart(2, '0'));
                setText('birth_adm_mes', (adm.getMonth() + 1).toString().padStart(2, '0'));
                setText('birth_adm_ano', adm.getFullYear().toString().substr(-2));
            }
            
            
            

            
            

            
            

            
            
            
            
            if (birth.spontaneousOnset) check('birth_onset_spont');
            if (birth.inducedOnset) check('birth_onset_induced');
            

            
            if (birth.membraneRupture) {
                
                
                
                
            }

            
            setText('birth_ga_weeks', birth.gestationalAgeAtBirthWeeks);
            setText('birth_ga_days', birth.gestationalAgeAtBirthDays);
            
            
            if (birth.cephalicPresentation) check('birth_pres_cephalic');
            if (birth.pelvicPresentation) check('birth_pres_pelvic');
            if (birth.transverseSituation) check('birth_pres_transverse');

            
            
            if (birth.spontaneousBirth) check('birth_term_spont');
            if (birth.forcepsBirth) check('birth_term_forceps');
            if (birth.vacuumBirth) check('birth_term_vacuum');
            if (birth.cesareanBirth) check('birth_term_cesarean');

            
            if (birth.episiotomy === true) check('birth_epi_yes');
            else if (birth.episiotomy === false) check('birth_epi_no');
            
            
            

            
            
            
            
            if (birth.cordClampingTime === 1) check('birth_cord_1'); 
            else if (birth.cordClampingTime === 2) check('birth_cord_2'); 

            
            if (birth.oxytocicsInLabor) check('birth_med_oxy_yes'); 
        }

        
        const newborn = fullData.newbornInformation;
        if (newborn) {
            console.log('[PerinatalPrintBirth] Llenando datos del recién nacido...');

            
            if (newborn.sex === 'F') check('nb_sex_f');
            else if (newborn.sex === 'M') check('nb_sex_m');

            
            setText('nb_weight', newborn.birthWeight);
            if (newborn.birthWeight < 2500) check('nb_weight_low');
            else if (newborn.birthWeight >= 4000) check('nb_weight_high');

            
            setText('nb_length', newborn.length);
            setText('nb_head_circ', newborn.headCircumference);

            
            setText('nb_ga_weeks', newborn.gestationalAgeWeeks);
            
            if (newborn.gestationalAgeMethod) {
                const method = newborn.gestationalAgeMethod.toUpperCase();
                if (method.includes('FUM')) check('nb_ga_fum');
                else if (method.includes('ECO')) check('nb_ga_eco');
                else if (method.includes('EST')) check('nb_ga_est');
            }

            
            setText('nb_apgar_1', newborn.apgarFirstMinute);
            setText('nb_apgar_5', newborn.apgarFifthMinute);

            
            if (newborn.resuscitationStimulation) check('nb_res_stim');
            if (newborn.resuscitationAspiration) check('nb_res_asp');
            if (newborn.resuscitationMask) check('nb_res_mask');
            if (newborn.resuscitationOxygen) check('nb_res_oxy');
            if (newborn.resuscitationMassage) check('nb_res_massage');
            if (newborn.resuscitationIntubation) check('nb_res_tube');
            if (newborn.resuscitationMedication) check('nb_res_med');

            
            
            
            

            
            mapYesNo('nb_breastfeed_early', newborn.earlyBreastfeedingInitiation);
        }
    }

    

    function mapYesNo(baseId, value) {
        if (value === true || value === 1 || value === 'si') check(`${baseId}_yes`);
        else if (value === false || value === 2 || value === 'no') check(`${baseId}_no`);
    }

    function check(id) {
        const el = document.getElementById(id);
        if (el) el.innerText = 'X'; 
    }

    function setText(id, value) {
        if (value === null || value === undefined) return;
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    }

    return {
        populate: populate
    };

})();
