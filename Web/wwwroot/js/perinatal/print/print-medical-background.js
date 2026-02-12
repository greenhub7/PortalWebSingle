

const PerinatalPrintMedicalBackground = (function() {

    function populate(fullData) {
        const data = fullData.medicalBackground;
        if (!data) return;

        console.log('[PerinatalPrintMedicalBackground] Llenando antecedentes médicos...');

        
        
        mapYesNo('med_fam_tbc', data.familyTuberculosis);
        
        mapYesNo('med_fam_diabetes', data.familyDiabetes);
        
        mapYesNo('med_fam_htn', data.familyHypertension);
        
        mapYesNo('med_fam_preeclampsia', data.familyPreeclampsia);
        
        mapYesNo('med_fam_eclampsia', data.familyEclampsia);
        
        mapYesNo('med_fam_other', data.familyOther);


        
        
        mapYesNo('med_pers_tbc', data.personalTuberculosis);
        
        mapYesNo('med_pers_diabetes', data.personalDiabetes); 
        
        mapYesNo('med_pers_htn', data.personalHypertension);
        
        mapYesNo('med_pers_preeclampsia', data.personalPreeclampsia);
        
        mapYesNo('med_pers_eclampsia', data.personalEclampsia);
        
        
        mapYesNo('med_pers_surgery', data.personalGenitourinarySurgery);
        
        mapYesNo('med_pers_infertility', data.personalInfertility);
        
        mapYesNo('med_pers_heart', data.personalHeartDisease);
        
        mapYesNo('med_pers_nephropathy', data.personalKidneyDisease);
        
        mapYesNo('med_pers_violence', data.personalViolence);
        
        mapYesNo('med_pers_hiv', data.personalHIV);

    }

    
    
    
    function mapYesNo(baseId, value) {
        if (value === 1) check(`${baseId}_yes`);
        else if (value === 2) check(`${baseId}_no`);
        
    }

    function check(id) {
        const el = document.getElementById(id);
        if (el) el.innerText = 'X'; 
    }

    return {
        populate: populate
    };

})();
