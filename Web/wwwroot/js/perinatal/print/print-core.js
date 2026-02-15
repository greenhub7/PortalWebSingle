

const PerinatalPrint = (function() {
    
    const config = {
        recordId: 0,
        endpoints: {
            getData: '/PerinatalHistories/GetPrintData'
        }
    };

    
    const state = {
        data: null,
        loading: false
    };

    
    function init(id) {
        config.recordId = id;
        console.log(`[PerinatalPrint] Iniciando para registro #${id}`);
        loadData();
    }

    
    function loadData() {
        state.loading = true;
        
        $.ajax({
            url: `${config.endpoints.getData}/${config.recordId}`,
            method: 'GET',
            success: function(response) {
                state.data = response;
                console.log('[PerinatalPrint] Datos cargados correctamente', state.data);
                populateAllSections();
            },
            error: function(err) {
                console.error('[PerinatalPrint] Error de red:', err);
                alert('Error de comunicación con el servidor.');
            },
            complete: function() {
                state.loading = false;
            }
        });
    }

    
    function populateAllSections() {
        if (!state.data) return;

        // Populate Form 1 (Front Side)
        if (typeof PerinatalPrintForm1 !== 'undefined' && typeof PerinatalPrintForm1.populate === 'function') {
            PerinatalPrintForm1.populate(state.data);
        }

        // Populate Form 2 (Back Side)
        if (typeof PerinatalPrintForm2 !== 'undefined' && typeof PerinatalPrintForm2.populate === 'function') {
            PerinatalPrintForm2.populate(state.data);
        }

        
        if (typeof PerinatalPrintHeader !== 'undefined' && typeof PerinatalPrintHeader.populate === 'function') {
            PerinatalPrintHeader.populate(state.data);
        }

        
        if (typeof PerinatalPrintMedicalBackground !== 'undefined' && typeof PerinatalPrintMedicalBackground.populate === 'function') {
            PerinatalPrintMedicalBackground.populate(state.data);
        }

        
        if (typeof PerinatalPrintObstetric !== 'undefined' && typeof PerinatalPrintObstetric.populate === 'function') {
            PerinatalPrintObstetric.populate(state.data);
        }

        
        if (typeof PerinatalPrintCurrentPregnancy !== 'undefined' && typeof PerinatalPrintCurrentPregnancy.populate === 'function') {
            PerinatalPrintCurrentPregnancy.populate(state.data);
        }

        
        if (typeof PerinatalPrintPrenatal !== 'undefined' && typeof PerinatalPrintPrenatal.populate === 'function') {
            PerinatalPrintPrenatal.populate(state.data);
        }

        
        if (typeof PerinatalPrintBirth !== 'undefined' && typeof PerinatalPrintBirth.populate === 'function') {
            PerinatalPrintBirth.populate(state.data);
        }

        
        if (typeof PerinatalPrintScreeningPuerperium !== 'undefined' && typeof PerinatalPrintScreeningPuerperium.populate === 'function') {
            PerinatalPrintScreeningPuerperium.populate(state.data);
        }

        
        if (typeof PerinatalPrintMorbidityNearMiss !== 'undefined' && typeof PerinatalPrintMorbidityNearMiss.populate === 'function') {
            PerinatalPrintMorbidityNearMiss.populate(state.data);
        }
        
        // After all data is populated, protect yellow elements
        setTimeout(function() {
            if (typeof window.protectYellowElements === 'function') {
                window.protectYellowElements();
                console.log('[PerinatalPrint] Yellow elements protected after data population');
            }
        }, 500);
        
        // Auto-print disabled for testing - uncomment when ready
        // setTimeout(function() {
        //     window.print();
        // }, 1000); 
    }

    
    return {
        init: init
    };

})();
