

const PerinatalPrintPrenatal = (function() {

    const MAX_ROWS = 6; 

    function populate(fullData) {
        const consultations = fullData.prenatalConsultations;
        if (!consultations || !consultations.length) return;

        console.log(`[PerinatalPrintPrenatal] Llenando ${consultations.length} consultas...`);

        
        for (let i = 0; i < Math.min(consultations.length, MAX_ROWS); i++) {
            const rowData = consultations[i];
            const rowNum = i + 1; 

            fillRow(rowNum, rowData);
        }
    }

    function fillRow(rowNum, data) {
        
        if (data.date) {
            const d = new Date(data.date);
            setText(`prenatal_r${rowNum}_dia`, d.getDate().toString().padStart(2, '0'));
            setText(`prenatal_r${rowNum}_mes`, (d.getMonth() + 1).toString().padStart(2, '0'));
            setText(`prenatal_r${rowNum}_ano`, d.getFullYear().toString().substr(-2)); 
        }

        
        setText(`prenatal_r${rowNum}_eg`, data.gestationalAge);

        
        setText(`prenatal_r${rowNum}_peso`, data.weight);

        
        setText(`prenatal_r${rowNum}_pa`, data.bloodPressure);

        
        setText(`prenatal_r${rowNum}_au`, data.uterineHeight);

        
        setText(`prenatal_r${rowNum}_pres`, data.presentation ? data.presentation.substring(0, 3) : ''); 

        
        setText(`prenatal_r${rowNum}_fcf`, data.fetalHeartRate);

        
        if (data.fetalMovements === true) setText(`prenatal_r${rowNum}_mov`, '+');
        else if (data.fetalMovements === false) setText(`prenatal_r${rowNum}_mov`, '-');

        
        if (data.proteinuria === true) setText(`prenatal_r${rowNum}_prot`, '+');
        else if (data.proteinuria === false) setText(`prenatal_r${rowNum}_prot`, '-');

        
        setText(`prenatal_r${rowNum}_init`, data.initials);
        
        
        
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
