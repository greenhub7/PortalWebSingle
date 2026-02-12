

const PerinatalPrintScreeningPuerperium = (function() {

    function populate(fullData) {
        
        
        
        const newborn = fullData.newbornInformation; 
        

        if (newborn) {
            console.log('[PerinatalPrintScreeningPuerperium] Llenando tamizajes...');

            
            
            
            

            
            

            
            

            
            

            
            
        }

        
        const puerperium = fullData.puerperiumInformation;
        if (puerperium && puerperium.days) {
            console.log('[PerinatalPrintScreeningPuerperium] Llenando tabla de puerperio...');
            
            
            
            
            puerperium.days.forEach(day => {
                const col = day.dayNumber; 
                if (col >= 1 && col <= 4) {
                    fillPuerperiumColumn(col, day);
                }
            });
        }
        
        
        const discharge = fullData.maternalDischargeInformation;
        if (discharge) {
             
             if (discharge.dischargeDate) {
                const d = new Date(discharge.dischargeDate);
                setText('mat_dis_dia', d.getDate().toString().padStart(2, '0'));
                setText('mat_dis_mes', (d.getMonth() + 1).toString().padStart(2, '0'));
                setText('mat_dis_ano', d.getFullYear().toString().substr(-2));
                setText('mat_dis_hora', discharge.dischargeTime);
             }
             
             
             if (discharge.dischargeCondition === 'Healthy') check('mat_dis_cond_sana');
             else if (discharge.dischargeCondition === 'WithPathology') check('mat_dis_cond_path');
             else if (discharge.dischargeCondition === 'Death') check('mat_dis_cond_death');
             
             
             const contra = fullData.contraceptionInformation;
             if (contra) {
                 if (contra.contraceptionMethodInitiated) check('mat_contra_inicio_yes');
                 else check('mat_contra_inicio_no');
                 
                 
                 
                 
                 
             }
        }
    }

    function fillPuerperiumColumn(colIndex, data) {
        
        setText(`puerp_c${colIndex}_temp`, data.temperature);
        
        setText(`puerp_c${colIndex}_pulse`, data.pulse);
        
        setText(`puerp_c${colIndex}_pa`, data.bloodPressure);
        
        setText(`puerp_c${colIndex}_inv`, data.uterineInvolution);
        
        setText(`puerp_c${colIndex}_lochia`, data.lochia);
        
        setText(`puerp_c${colIndex}_perine`, data.perineum); 
        
        
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
