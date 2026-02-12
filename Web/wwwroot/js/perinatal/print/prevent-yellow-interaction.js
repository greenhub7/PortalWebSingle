// Prevent Yellow Elements from Being Interactive
// Yellow backgrounds represent "YES" or "ALERT" and should be static visual indicators only

document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing yellow element protection...');

    // ========================================
    // 1. MAKE YELLOW RADIO BUTTONS NON-INTERACTIVE (Keep as inputs but disable)
    // ========================================
    const yellowRadios = document.querySelectorAll('input[type="radio"][value="si"]');
    
    yellowRadios.forEach(radio => {
        // Disable the radio button so it can't be clicked
        radio.disabled = true;
        radio.style.pointerEvents = 'none';
        radio.style.cursor = 'default';
        radio.style.opacity = '1'; // Keep full opacity even when disabled
        
        // Force it to stay checked
        radio.checked = true;
        
        // Mark as protected
        radio.setAttribute('data-protected', 'true');
    });
    
    console.log(`Protected ${yellowRadios.length} yellow radio buttons`);

    // ========================================
    // 2. MAKE YELLOW CHECKBOXES NON-INTERACTIVE
    // ========================================
    const yellowCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked, input[type="checkbox"][checked]');
    
    yellowCheckboxes.forEach(checkbox => {
        // Disable the checkbox so it can't be clicked
        checkbox.disabled = true;
        checkbox.style.pointerEvents = 'none';
        checkbox.style.cursor = 'default';
        checkbox.style.opacity = '1'; // Keep full opacity even when disabled
        
        // Force it to stay checked
        checkbox.checked = true;
        
        // Mark as protected
        checkbox.setAttribute('data-protected', 'true');
    });
    
    console.log(`Protected ${yellowCheckboxes.length} yellow checkboxes`);

    // ========================================
    // 3. DISABLE ALL YELLOW INDICATOR DIVS
    // ========================================
    const yellowIndicators = document.querySelectorAll('.indicator-yellow, .obs-yellow-box');
    yellowIndicators.forEach(indicator => {
        indicator.style.pointerEvents = 'none';
        indicator.style.cursor = 'default';
        indicator.setAttribute('data-protected', 'true');
    });
    console.log(`Protected ${yellowIndicators.length} yellow indicator divs`);

    // ========================================
    // 4. CONVERT "NO" RADIOS TO TOGGLE BUTTONS (✓ / X)
    // ========================================
    const noRadios = document.querySelectorAll('input[type="radio"][value="no"]');
    
    noRadios.forEach(radio => {
        // Keep the radio white (not yellow)
        radio.style.background = '#fff';
        radio.style.pointerEvents = 'auto';
        radio.style.cursor = 'pointer';
        
        // Initialize state tracking
        radio.setAttribute('data-mark-state', 'none'); // none, check, x
        
        // Wrap the radio in a container for positioning the mark
        if (!radio.parentElement.classList.contains('no-radio-wrapper')) {
            const wrapper = document.createElement('span');
            wrapper.className = 'no-radio-wrapper';
            wrapper.style.cssText = 'position: relative; display: inline-block;';
            radio.parentNode.insertBefore(wrapper, radio);
            wrapper.appendChild(radio);
        }
        
        // Prevent default radio behavior (we want toggle, not radio)
        radio.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle between states: none -> check -> x -> check -> x ...
            const currentState = this.getAttribute('data-mark-state');
            
            if (currentState === 'none') {
                this.setAttribute('data-mark-state', 'check');
                updateNoIndicator(this, 'check');
            } else if (currentState === 'check') {
                this.setAttribute('data-mark-state', 'x');
                updateNoIndicator(this, 'x');
            } else if (currentState === 'x') {
                this.setAttribute('data-mark-state', 'check');
                updateNoIndicator(this, 'check');
            }
            
            return false;
        });
        
        // If already checked, initialize with checkmark
        if (radio.checked) {
            radio.setAttribute('data-mark-state', 'check');
            updateNoIndicator(radio, 'check');
        }
    });

    console.log(`Made ${noRadios.length} "NO" radio buttons into toggle buttons`);

    // ========================================
    // 5. UPDATE VISUAL INDICATOR (✓ or X)
    // ========================================
    function updateNoIndicator(radioElement, markType) {
        const wrapper = radioElement.parentElement;
        if (!wrapper || !wrapper.classList.contains('no-radio-wrapper')) return;
        
        // Remove existing indicator
        const existingIndicator = wrapper.querySelector('.no-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // If markType is none, don't add anything
        if (markType === 'none') return;
        
        // Create new indicator
        const indicator = document.createElement('span');
        indicator.className = 'no-indicator';
        indicator.innerHTML = markType === 'check' ? '✓' : '❌';
        indicator.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #000;
            font-size: ${markType === 'check' ? '14px' : '12px'};
            font-weight: bold;
            pointer-events: none;
            z-index: 10;
            line-height: 1;
        `;
        
        wrapper.appendChild(indicator);
    }

    // ========================================
    // 6. PREVENT FORM CONTROLS FROM AFFECTING YELLOW ELEMENTS
    // ========================================
    const originalSetRadios = window.setRadios;
    
    window.setRadios = function(container, valueToSet) {
        if (!container) return;
        const radios = container.querySelectorAll('input[type="radio"]:not([data-protected])');
        
        radios.forEach(radio => {
            if (radio.value === valueToSet) {
                // For "no" radios, set to check state
                if (valueToSet === 'no') {
                    radio.setAttribute('data-mark-state', 'check');
                    updateNoIndicator(radio, 'check');
                }
            }
        });
    };

    // ========================================
    // 7. ADD CSS TO KEEP DISABLED INPUTS STYLED CORRECTLY
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        input[type="radio"][data-protected]:disabled,
        input[type="checkbox"][data-protected]:disabled {
            opacity: 1 !important;
            background: #ffd700 !important;
            cursor: default !important;
        }
        
        input[type="radio"][value="no"] {
            background: #fff !important;
        }
        
        input[type="radio"][value="no"]:checked {
            background: #fff !important;
        }
        
        .no-radio-wrapper {
            position: relative;
            display: inline-block;
        }
    `;
    document.head.appendChild(style);

    console.log('Yellow element protection initialized successfully!');
    console.log('White "NO" elements toggle between ✓ and ✕');
});
