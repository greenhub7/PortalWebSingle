

const PerinatalPrintCurrentPregnancy = (function() {

    function populate(fullData) {
        const data = fullData.currentPregnancy;
        if (!data) return;

        console.log('[PerinatalPrintCurrentPregnancy] Llenando datos del embarazo actual...');

        
        setText('curr_weight_prev', data.prePregnancyWeight);
        setText('curr_height', data.height);
        
        
        if (data.lastMenstrualPeriod) {
            const fum = new Date(data.lastMenstrualPeriod);
            setText('curr_fum_dia', fum.getDate().toString().padStart(2, '0'));
            setText('curr_fum_mes', (fum.getMonth() + 1).toString().padStart(2, '0'));
            setText('curr_fum_ano', fum.getFullYear());
        }
        
        if (data.estimatedDueDate) {
            const fpp = new Date(data.estimatedDueDate);
            setText('curr_fpp_dia', fpp.getDate().toString().padStart(2, '0'));
            setText('curr_fpp_mes', (fpp.getMonth() + 1).toString().padStart(2, '0'));
            setText('curr_fpp_ano', fpp.getFullYear());
        }

        
        mapYesNo('curr_reliable_fum', data.reliableGestationalAge); 
        

        
        mapYesNo('curr_smoke', data.smoker);
        mapYesNo('curr_drugs', data.drugs);
        mapYesNo('curr_alcohol', data.alcohol);
        

        
        mapYesNo('curr_odont', data.dentalExam);
        mapYesNo('curr_mamas', data.breastExam);

        
        
        
        mapYesNo('curr_rh_sensitized', data.rhSensitized);

        
        
        if (data.tetanusVaccine) {
            const v = data.tetanusVaccine.toLowerCase();
            if (v.includes('previa')) check('curr_vac_tetanus_prev');
            else if (v.includes('durante')) check('curr_vac_tetanus_curr');
        }

        
        
        
        
        mapYesNo('curr_hiv', data.hiv);
        
        
        
        
        
        
        setText('curr_hb_1', data.hemoglobin1);
        setText('curr_hb_2', data.hemoglobin2);
        
        
        setText('curr_glycemia', data.glycemia);

        
        mapYesNo('curr_pap', data.papSmear);
        mapYesNo('curr_colp', data.colposcopy);
    }

    

    function mapYesNo(baseId, value) {
        if (value === 1 || value === true || value === 'Yes') check(`${baseId}_yes`);
        else if (value === 2 || value === false || value === 'No') check(`${baseId}_no`);
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
