

class SolMedButtonManager {
    constructor() {
        this.loadingButtons = new Map();
        this.init();
    }

    init() {
        
        $(document).ready(() => {
            this.attachEventListeners();
        });
    }

    attachEventListeners() {
        
        $(document).on('click', '[data-loading]', (e) => {
            const button = e.currentTarget;
            const loadingText = button.getAttribute('data-loading');
            if (loadingText) {
                this.setLoading(button, true, loadingText);
            }
        });

        
        $(document).on('submit', 'form', (e) => {
            const form = e.currentTarget;
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]') || 
                             form.querySelector('#btnSave');
            
            if (submitBtn && this.isLoading(submitBtn.id || submitBtn)) {
                
                setTimeout(() => {
                    if (!form.checkValidity()) {
                        this.setLoading(submitBtn, false);
                    }
                }, 100);
            }
        });
    }

    
    setLoading(button, loading, loadingText = 'Guardando...') {
        const btn = typeof button === 'string' ? 
                   (button.startsWith('#') ? $(button)[0] : $(`#${button}`)[0]) : button;
        
        if (!btn) {
            console.warn('SolMedButtonManager: Button not found', button);
            return;
        }

        const btnId = btn.id || `btn_${Date.now()}`;
        if (!btn.id) btn.id = btnId;

        if (loading) {
            
            if (!this.loadingButtons.has(btnId)) {
                const originalData = {
                    disabled: btn.disabled,
                    innerHTML: btn.innerHTML,
                    className: btn.className
                };
                this.loadingButtons.set(btnId, originalData);
            }

            
            btn.disabled = true;
            btn.classList.add('loading');
            
            
            const spinner = '<svg class="loading-spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>';
            
            
            const existingIcons = btn.querySelectorAll('svg:not(.loading-spinner), i[class*="fa"]');
            const iconHtml = existingIcons.length > 0 ? existingIcons[0].outerHTML : '';
            
            btn.innerHTML = `${spinner} <span>${loadingText}</span>`;
            
        } else {
            
            const originalData = this.loadingButtons.get(btnId);
            if (originalData) {
                btn.disabled = originalData.disabled;
                btn.innerHTML = originalData.innerHTML;
                btn.className = originalData.className;
                this.loadingButtons.delete(btnId);
            } else {
                
                btn.disabled = false;
                btn.classList.remove('loading');
                
                
                const spinner = btn.querySelector('.loading-spinner');
                if (spinner) {
                    spinner.remove();
                }
            }
        }
    }

    
    isLoading(button) {
        const btn = typeof button === 'string' ? 
                   (button.startsWith('#') ? $(button)[0] : $(`#${button}`)[0]) : button;
        
        if (!btn) return false;
        
        const btnId = btn.id;
        return btnId && this.loadingButtons.has(btnId);
    }

    
    resetAll() {
        this.loadingButtons.forEach((originalData, btnId) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.disabled = originalData.disabled;
                btn.innerHTML = originalData.innerHTML;
                btn.className = originalData.className;
            }
        });
        this.loadingButtons.clear();
    }

    
    handleAjaxError(buttonSelector, errorCallback = null) {
        this.setLoading(buttonSelector, false);
        
        if (typeof errorCallback === 'function') {
            errorCallback();
        }
    }

    
    handleAjaxSuccess(buttonSelector, successCallback = null) {
        
        
        if (typeof successCallback === 'function') {
            successCallback();
        }
    }
}


window.SolMedButtons = new SolMedButtonManager();


const loadingStyles = `
<style>
.loading {
    position: relative;
    pointer-events: none;
    opacity: 0.7;
}

.loading-spinner {
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-right: 0.5rem;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.medical-floating-btn.loading {
    transform: none !important;
    box-shadow: var(--shadow-medical-md) !important;
}

.medical-floating-btn.loading:hover {
    transform: none !important;
}
</style>`;


if (document.head) {
    document.head.insertAdjacentHTML('beforeend', loadingStyles);
} else {
    $(document).ready(() => {
        document.head.insertAdjacentHTML('beforeend', loadingStyles);
    });
}


window.setButtonLoading = (button, loading, text) => window.SolMedButtons.setLoading(button, loading, text);
window.isButtonLoading = (button) => window.SolMedButtons.isLoading(button);
window.handleButtonError = (button, callback) => window.SolMedButtons.handleAjaxError(button, callback);
window.handleButtonSuccess = (button, callback) => window.SolMedButtons.handleAjaxSuccess(button, callback);