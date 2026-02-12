

const PerinatalPrintObstetric = (function() {

    function populate(fullData) {
        const data = fullData.obstetricBackground;
        if (!data) return;

        console.log('[PerinatalPrintObstetric] Llenando antecedentes obstétricos...');

        
        setText('obs_gestas', data.previousPregnancies);
        
        
        setText('obs_abortos', data.abortions);
        
        setText('obs_vaginales', data.vaginalDeliveries); 
        
        setText('obs_cesareas', data.cesareanDeliveries);
        
        
        setText('obs_nacidos_vivos', data.totalDeliveries); 
        
        
        setText('obs_viven', data.livingChildren);
        
        
        setText('obs_muertos_1sem', data.deadFirstWeek);
        
        setText('obs_muertos_despues', data.deadAfterFirstWeek);
        
        
        if (data.lastPregnancyEndDate) {
            const dateObj = new Date(data.lastPregnancyEndDate);
            setText('obs_fin_dia', dateObj.getDate().toString().padStart(2, '0'));
            setText('obs_fin_mes', (dateObj.getMonth() + 1).toString().padStart(2, '0'));
            setText('obs_fin_ano', dateObj.getFullYear());
            
            
            
        }

        
        

        
        
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
