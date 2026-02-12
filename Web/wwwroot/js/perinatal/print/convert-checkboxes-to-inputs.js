// Convert check-box elements to text inputs
// These white rectangular boxes should be text input fields, not checkboxes

document.addEventListener('DOMContentLoaded', function () {
    console.log('Converting ALL check-box elements to text inputs...');

    // Find ALL checkbox elements with class "check-box" (both checked and unchecked)
    const allCheckboxes = document.querySelectorAll('input.check-box');
    
    let convertedCount = 0;
    
    allCheckboxes.forEach(checkbox => {
        // Create a new text input to replace the checkbox
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.className = 'check-box-input'; // New class for styling
        textInput.name = checkbox.name;
        textInput.value = checkbox.value || '';
        textInput.maxLength = 1; // Usually these are single digit inputs
        
        // Copy any data attributes
        Array.from(checkbox.attributes).forEach(attr => {
            if (attr.name.startsWith('data-')) {
                textInput.setAttribute(attr.name, attr.value);
            }
        });
        
        // Replace the checkbox with the text input
        checkbox.parentNode.replaceChild(textInput, checkbox);
        convertedCount++;
    });
    
    console.log(`Converted ${convertedCount} checkboxes to text inputs`);
    
    // Add CSS for the new text inputs
    const style = document.createElement('style');
    style.textContent = `
        /* Style for converted checkbox inputs - ALL WHITE */
        input.check-box-input {
            width: 30px;
            height: 30px;
            border: 1px solid #333;
            background-color: #fff !important;
            text-align: center;
            font-size: 14px;
            font-family: Arial, sans-serif;
            cursor: text !important;
            pointer-events: auto !important;
            flex-shrink: 0;
        }
        
        input.check-box-input:focus {
            background-color: #fff !important;
            outline: 2px solid #4CAF50;
            border-color: #4CAF50;
        }
        
        input.check-box-input:hover {
            background-color: #f9f9f9 !important;
        }
    `;
    document.head.appendChild(style);
    
    console.log('All checkbox elements are now white editable text inputs!');
});
