// Fix Yellow Rectangular Input Boxes
// These should be WHITE input fields that stay white and allow text entry

document.addEventListener('DOMContentLoaded', function () {
    console.log('Fixing input boxes to stay white and be editable...');

    // Wait a bit to ensure all other scripts have run
    setTimeout(function() {
        // Find all input elements in the form
        const allInputs = document.querySelectorAll('input[type="text"], input:not([type]), input[maxlength]');
        
        allInputs.forEach(input => {
            // Skip protected yellow elements (radio buttons and checkboxes)
            if (input.hasAttribute('data-protected')) {
                return;
            }
            
            // Skip radio buttons and checkboxes
            if (input.type === 'radio' || input.type === 'checkbox') {
                return;
            }
            
            // Make sure it's editable
            input.removeAttribute('readonly');
            input.removeAttribute('disabled');
            input.disabled = false;
            input.readOnly = false;
            
            // Ensure it's interactive
            input.style.pointerEvents = 'auto';
            input.style.cursor = 'text';
            input.tabIndex = 0;
            
            // Lock white background
            input.style.backgroundColor = '#fff';
            
            // Remove any event listeners that might prevent input
            const newInput = input.cloneNode(true);
            input.parentNode.replaceChild(newInput, input);
            
            // Re-apply white background and editability
            newInput.style.backgroundColor = '#fff';
            newInput.style.pointerEvents = 'auto';
            newInput.style.cursor = 'text';
            newInput.removeAttribute('readonly');
            newInput.removeAttribute('disabled');
            newInput.disabled = false;
            newInput.readOnly = false;
            
            // Add event listeners to maintain white background
            newInput.addEventListener('focus', function() {
                this.style.backgroundColor = '#fff';
            });
            
            newInput.addEventListener('blur', function() {
                this.style.backgroundColor = '#fff';
            });
            
            newInput.addEventListener('click', function() {
                this.style.backgroundColor = '#fff';
            });
        });
        
        console.log(`Made ${allInputs.length} input boxes editable and white`);
    }, 500);

    // Add CSS to ensure input boxes stay white and are editable
    const style = document.createElement('style');
    style.textContent = `
        /* Keep input boxes white and editable */
        input[type="text"],
        input:not([type="radio"]):not([type="checkbox"]),
        input[maxlength],
        .input-box input,
        .input-box1 input,
        .input-box2 input,
        .input-box3 input,
        .large-input,
        .char-inputs input {
            background-color: #fff !important;
            cursor: text !important;
            pointer-events: auto !important;
            user-select: text !important;
        }
        
        input[type="text"]:focus,
        .input-box input:focus,
        .input-box1 input:focus,
        .input-box2 input:focus,
        .input-box3 input:focus,
        .large-input:focus,
        .char-inputs input:focus {
            background-color: #fff !important;
            outline: 2px solid #4CAF50;
        }
        
        /* Override any disabled or readonly styles */
        input[type="text"]:disabled,
        input[type="text"]:read-only {
            opacity: 1 !important;
            cursor: text !important;
            pointer-events: auto !important;
        }
    `;
    document.head.appendChild(style);

    console.log('Input boxes fixed - they will stay white and accept text input');
});
