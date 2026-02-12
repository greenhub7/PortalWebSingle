

const PerinatalPrintMorbidityNearMiss = (function() {

    function populate(fullData) {
        
        
        const morb = fullData.morbidityInformation;
        if (morb) {
            console.log('[PerinatalPrintMorbidityNearMiss] Llenando morbilidad...');

            
            if (morb.chronicHypertension) check('morb_htn_chronic');
            if (morb.gestationalHypertension) check('morb_htn_gest');
            if (morb.mildPreeclampsia) check('morb_preecl_mild');
            if (morb.severePreeclampsia) check('morb_preecl_severe');
            if (morb.eclampsia) check('morb_eclampsia');
            if (morb.hellp) check('morb_hellp');
            

            
            if (morb.sepsis) check('morb_inf_sepsis');
            if (morb.pyelonephritis) check('morb_inf_pyelo');
            

            
            
            
            
            
            
            if (morb.postpartumHemorrhage) check('morb_pp_hemorrhage');
            

            
            if (morb.gestationalDiabetes) check('morb_met_gdm');
            if (morb.anemia) check('morb_other_anemia');
            
            
            if (morb.polyhydramnios) check('morb_obs_poly');
            if (morb.oligohydramnios) check('morb_obs_oligo');
            if (morb.intrauterineGrowthRestriction) check('morb_obs_iugr');
            if (morb.prolongedRuptureOfMembranes) check('morb_obs_prom'); 
        }

        
        const nm = fullData.nearMissVariables;
        if (nm) {
            console.log('[PerinatalPrintMorbidityNearMiss] Llenando Near Miss...');

            
            if (nm.shock) check('nm_cardio_shock');
            if (nm.cardiacArrest) check('nm_cardio_arrest');

            
            if (nm.oliguriaUnresponsiveToFluidsOrDiuretics) check('nm_renal_oliguria');

            
            if (nm.acuteCyanosis) check('nm_resp_cyanosis');
            if (nm.gasping) check('nm_resp_gasping');
            if (nm.severeTachypnea) check('nm_resp_tachypnea');
            if (nm.severeBradypnea) check('nm_resp_bradypnea');

            
            if (nm.jaundiceInPreeclampsia) check('nm_hep_jaundice');

            
            if (nm.coma) check('nm_neuro_coma');
            if (nm.prolongedUnconsciousness) check('nm_neuro_unconsc'); 
            if (nm.strokeOrCVA) check('nm_neuro_stroke');
            if (nm.uncontrollableSeizuresOrStatusEpilepticus) check('nm_neuro_seizures');
            if (nm.generalizedParalysis) check('nm_neuro_paralysis');

            
            if (nm.coagulationDisorders) check('nm_coag_disorders');

            
            if (nm.plateletsLessThan50000) check('nm_lab_plat');
            if (nm.creatinineGreaterOrEqual300) check('nm_lab_creat');
            if (nm.bilirubinGreaterThan100) check('nm_lab_bili');
            if (nm.pHLessThan7_1) check('nm_lab_ph');
            if (nm.hemoglobinSaturationLessThan90PercentForOverOneHour) check('nm_lab_sat');
            if (nm.lactateGreaterThan5) check('nm_lab_lact');

            
            if (nm.continuousVasoactiveAgentsAdministration) check('nm_int_vaso');
            if (nm.intubationAndVentilationNotRelatedToAnesthesia) check('nm_int_vent');
            if (nm.bloodProductsAdministrationGreaterOrEqualThreeUnits) check('nm_int_blood');
            if (nm.iCUAdmissionLessThanSevenDays) check('nm_int_icu'); 
            if (nm.hysterectomy) check('nm_int_hyst');
            if (nm.dialysisForAcuteRenalFailure) check('nm_int_dialysis');
            if (nm.cardiopulmonaryResuscitation) check('nm_int_cpr');
        }
    }

    function check(id) {
        const el = document.getElementById(id);
        if (el) el.innerText = 'X'; 
    }

    return {
        populate: populate
    };

})();
