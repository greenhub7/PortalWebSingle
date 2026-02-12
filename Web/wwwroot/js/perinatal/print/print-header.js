

const PerinatalPrintHeader = (function() {

    function populate(fullData) {
        const patient = fullData.patient;
        const person = patient ? patient.person : null;

        if (!person) return;

        console.log('[PerinatalPrintHeader] Llenando encabezado...');

        
        setText('header_patientName', `${person.firstName} ${person.lastName}`.toUpperCase());
        
        
        setText('header_address', person.address);
        
        
        setText('header_phone', person.cel || person.tel);
        
        
        if (person.bornDate) {
            const dateObj = new Date(person.bornDate);
            setText('header_birthDay', dateObj.getDate().toString().padStart(2, '0'));
            setText('header_birthMonth', (dateObj.getMonth() + 1).toString().padStart(2, '0'));
            setText('header_birthYear', dateObj.getFullYear());
            
            
            const age = calculateAge(dateObj);
            setText('header_age', age < 15 ? '< 15' : (age > 35 ? '> 35' : age));
        }

        
        

        
        if (person.schoolLevel) {
            const level = person.schoolLevel.name.toLowerCase();
            
            if (level.includes('univ')) check('header_edu_university');
            else if (level.includes('sec')) check('header_edu_secondary');
            else if (level.includes('prim')) check('header_edu_primary');
            else check('header_edu_none');
        }

        
        if (person.maritalSituation) {
            const status = person.maritalSituation.name.toLowerCase();
            if (status.includes('casad') || status.includes('uni')) check('header_marital_married');
            else check('header_marital_single');
        }

        
        setText('header_historyId', fullData.id); 
    }

    

    function setText(id, value) {
        if (!value) return;
        const el = document.getElementById(id);
        if (el) el.innerText = value;
    }

    function check(id) {
        const el = document.getElementById(id);
        
        
        if (el && el.tagName === 'INPUT') el.checked = true;
        
        else if (el) el.innerText = 'X'; 
    }

    function calculateAge(birthday) { 
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return {
        populate: populate
    };

})();
