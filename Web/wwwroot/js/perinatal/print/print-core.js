

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
        if (PerinatalPrintForm1 && typeof PerinatalPrintForm1.populate === 'function') {
            PerinatalPrintForm1.populate(state.data);
        }

        // Populate Form 2 (Back Side)
        if (PerinatalPrintForm2 && typeof PerinatalPrintForm2.populate === 'function') {
            PerinatalPrintForm2.populate(state.data);
        }

        
        if (PerinatalPrintHeader && typeof PerinatalPrintHeader.populate === 'function') {
            PerinatalPrintHeader.populate(state.data);
        }

        
        if (PerinatalPrintMedicalBackground && typeof PerinatalPrintMedicalBackground.populate === 'function') {
            PerinatalPrintMedicalBackground.populate(state.data);
        }

        
        if (PerinatalPrintObstetric && typeof PerinatalPrintObstetric.populate === 'function') {
            PerinatalPrintObstetric.populate(state.data);
        }

        
        if (PerinatalPrintCurrentPregnancy && typeof PerinatalPrintCurrentPregnancy.populate === 'function') {
            PerinatalPrintCurrentPregnancy.populate(state.data);
        }

        
        if (PerinatalPrintPrenatal && typeof PerinatalPrintPrenatal.populate === 'function') {
            PerinatalPrintPrenatal.populate(state.data);
        }

        
        if (PerinatalPrintBirth && typeof PerinatalPrintBirth.populate === 'function') {
            PerinatalPrintBirth.populate(state.data);
        }

        
        if (PerinatalPrintScreeningPuerperium && typeof PerinatalPrintScreeningPuerperium.populate === 'function') {
            PerinatalPrintScreeningPuerperium.populate(state.data);
        }

        
        if (PerinatalPrintMorbidityNearMiss && typeof PerinatalPrintMorbidityNearMiss.populate === 'function') {
            PerinatalPrintMorbidityNearMiss.populate(state.data);
        }
        
        // Auto-print disabled for testing - uncomment when ready
        // setTimeout(function() {
        //     window.print();
        // }, 1000); 
    }

    
    return {
        init: init
    };

})();
