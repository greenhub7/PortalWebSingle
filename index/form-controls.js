// Form Controls for Radio Button Sections

document.addEventListener('DOMContentLoaded', function () {

    // Helper function to set radios to specific value
    function setRadios(container, valueToSet) {
        if (!container) return;
        const radios = container.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            if (radio.value === valueToSet) {
                radio.checked = true;
            }
        });
    }

    function setSpecificRadios(names, valueToSet) {
        names.forEach(name => {
            const radio = document.querySelector(`input[name="${name}"][value="${valueToSet}"]`);
            if (radio) {
                radio.checked = true;
            }
        });
    }

    // ========================================
    // TRASTORNOS HIPERTENSIVOS Section
    // ========================================
    const trashiperRadios = document.querySelectorAll('input[name="trashiper"]');

    if (trashiperRadios.length > 0) {
        trashiperRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                const container = this.closest('.section-one');
                const body = container ? container.querySelector('.section-one-body') : document.querySelector('.section-one-body');

                if (body) {
                    if (this.value === 'no') {
                        setRadios(body, 'no');
                    } else if (this.value === 'si') {
                        setRadios(body, 'si');
                    }
                }
            });
        });
    }

    // ========================================
    // INFECCIONES Section
    // ========================================
    const infeccRadios = document.querySelectorAll('input[name="infecc"]');

    if (infeccRadios.length > 0) {
        infeccRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                const container = this.closest('.section-two');
                const body = container ? container.querySelector('.section-two-body') : document.querySelector('.section-two-body');

                if (body) {
                    if (this.value === 'no') {
                        setRadios(body, 'no');
                    } else if (this.value === 'si') {
                        setRadios(body, 'si');
                    }
                }
            });
        });
    }

    // ========================================
    // TRASTORNOS METABOLICOS (Parent Section)
    // ========================================
    const trasmetaRadios = document.querySelectorAll('input[name="trasmeta"]');
    if (trasmetaRadios.length > 0) {
        trasmetaRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                // Determine the main container for this section
                const container = this.closest('.second-section');
                if (container) {
                    const dmBody = container.querySelector('.dm-body');
                    const metaBody = container.querySelector('.metabollic-body');

                    if (this.value === 'no') {
                        setRadios(dmBody, 'no');
                        setRadios(metaBody, 'no');
                    } else if (this.value === 'si') {
                        setRadios(dmBody, 'si');
                        setRadios(metaBody, 'si');
                    }
                }
            });
        });
    }

    // ========================================
    // DIABETES MELLITUS (Sub-section)
    // ========================================
    const diaRadios = document.querySelectorAll('input[name="dia"]');
    if (diaRadios.length > 0) {
        diaRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                const container = this.closest('.metabolic-column');
                const body = container ? container.querySelector('.dm-body') : null;

                if (body) {
                    if (this.value === 'no') {
                        setRadios(body, 'no');
                    } else if (this.value === 'si') {
                        setRadios(body, 'si');
                    }
                }
            });
        });
    }

    // ========================================
    // TRASTORNOS TIROIDEOS (Sub-section)
    // ========================================
    const trasRadios = document.querySelectorAll('input[name="tras"]');
    if (trasRadios.length > 0) {
        trasRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                const container = this.closest('.metabolic-column');
                const body = container ? container.querySelector('.metabollic-body') : null;

                if (body) {
                    if (this.value === 'no') {
                        setRadios(body, 'no');
                    } else if (this.value === 'si') {
                        setRadios(body, 'si');
                    }
                }
            });
        });
    }

    // ========================================
    // OTROS TRASTORNOS Section
    // ========================================
    const otrostraRadios = document.querySelectorAll('input[name="otrostra"]');
    if (otrostraRadios.length > 0) {
        otrostraRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                const container = this.closest('.other-disorders-section');
                const body = container ? container.querySelector('.section-two-body') : null;

                if (body) {
                    if (this.value === 'no') {
                        setRadios(body, 'no');
                    } else if (this.value === 'si') {
                        setRadios(body, 'si');
                    }
                }
            });
        });
    }

    // ========================================
    // COMPLICACIONES OBSTÉTRICAS Section
    // ========================================
    const complicaRadios = document.querySelectorAll('input[name="complica"]');
    if (complicaRadios.length > 0) {
        complicaRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                const container = this.closest('.complications-section');
                const body = container ? container.querySelector('.complications-body') : null;

                if (body) {
                    if (this.value === 'no') {
                        setRadios(body, 'no');
                    } else if (this.value === 'si') {
                        setRadios(body, 'si');
                    }
                }
            });
        });
    }

    // ========================================
    // VARIABLES PARA IDENTIFICAR CASOS DE NEAR MISS Section
    // ========================================
    const variablesRadios = document.querySelectorAll('input[name="variables"]');
    if (variablesRadios.length > 0) {
        variablesRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                // The structure is slightly different, parent is fourth-section
                const container = this.closest('.fourth-section');
                const body = container ? container.querySelector('.near-miss-body') : null;

                if (body) {
                    if (this.value === 'no') {
                        setRadios(body, 'no');
                    } else if (this.value === 'si') {
                        setRadios(body, 'si');
                    }
                }
            });
        });
    }

    // ========================================
    // TRIMESTER Sections
    // ========================================

    const firstColumnItems = [
        'post_aborto',
        'mola_hidatiforme',
        'embarazo_ectopico',
        'placenta_previa',
        'acretismo_placentario',
        'dppni'
    ];

    const secondColumnItems = [
        'rotura_uterina',
        'hemorragia_postparto',
        'atonia_uterina',
        'desgarros',
        'restos',
        'defecto_coagulacion'
    ];

    // 1er TRIMESTRE - affects first column only
    const firstTrimesterRadios = document.querySelectorAll('input[name="1tri"]');
    if (firstTrimesterRadios.length > 0) {
        firstTrimesterRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.value === 'no') {
                    setSpecificRadios(firstColumnItems, 'no');
                } else if (this.value === 'si') {
                    setSpecificRadios(firstColumnItems, 'si');
                }
            });
        });
    }

    // 2° TRIMESTRE - affects second column only
    const secondTrimesterRadios = document.querySelectorAll('input[name="2tri"]');
    if (secondTrimesterRadios.length > 0) {
        secondTrimesterRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.value === 'no') {
                    setSpecificRadios(secondColumnItems, 'no');
                } else if (this.value === 'si') {
                    setSpecificRadios(secondColumnItems, 'si');
                }
            });
        });
    }

    // 3er TRIMESTRE / POSPARTO - affects both columns
    const thirdTrimesterRadios = document.querySelectorAll('input[name="3tri"]');
    const allTrimesterItems = [...firstColumnItems, ...secondColumnItems];

    if (thirdTrimesterRadios.length > 0) {
        thirdTrimesterRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.value === 'no') {
                    setSpecificRadios(allTrimesterItems, 'no');
                } else if (this.value === 'si') {
                    setSpecificRadios(allTrimesterItems, 'si');
                }
            });
        });
    }

});
