

class QuickNotesModal {
    constructor() {
        this.modal = null;
        this.form = null;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        
        $(document).ready(() => {
            console.log('QuickNotes initializing...');
            this.bindEvents();
        });
    }

    bindEvents() {
        
        $(document).on('click', '[data-quicknote-create], [data-edit-quicknote]', (e) => {
            e.preventDefault();
            console.log('QuickNote handler triggered:', e.currentTarget);
            
            
            const isEditMode = $(e.currentTarget).attr('data-edit-quicknote') !== undefined;
            
            if (isEditMode) {
                const quickNoteId = parseInt($(e.currentTarget).attr('data-edit-quicknote'));
                this.openModal(null, quickNoteId);
            } else {
                const patientId = $(e.currentTarget).data('patient-id');
                this.openModal(patientId);
            }
        });

        
        $(document).on('shown.bs.modal', '#quickNoteModal', () => {
            this.onModalShown();
        });

        $(document).on('hidden.bs.modal', '#quickNoteModal', () => {
            this.onModalHidden();
        });

        
        $(document).on('submit', '#quickNoteForm', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        
        $(document).on('input', '#Note', (e) => {
            this.updateCharacterCount(e.target);
        });

        
        $(document).on('input', '#quickNoteForm input, #quickNoteForm textarea', (e) => {
            this.validateField(e.target);
        });
    }

    async openModal(patientId, quickNoteId = null) {
        try {
            this.showLoading();

            
            let url, data;
            
            if (quickNoteId) {
                
                url = `/QuickNotes/Create/0`; 
                data = { isModal: true, quickNoteId: quickNoteId };
            } else {
                
                url = `/QuickNotes/Create/${patientId}`;
                data = { isModal: true };
            }

            
            const response = await $.ajax({
                url: url,
                type: 'GET',
                data: data,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            
            if ($('#quickNoteModal').length) {
                $('#quickNoteModal').remove();
            }
            
            $('body').append(response);
            
            
            this.modal = new bootstrap.Modal(document.getElementById('quickNoteModal'), {
                backdrop: 'static',
                keyboard: false
            });

            this.form = document.getElementById('quickNoteForm');
            
            
            this.modal.show();

        } catch (error) {
            this.hideLoading();
            this.showError('Error al cargar el formulario de nota rápida');
            console.error('Error loading quick note modal:', error);
        }
    }

    onModalShown() {
        this.hideLoading();
        
        
        $('#Title').focus();
        
        
        this.updateCharacterCount(document.getElementById('Note'));
        
        
        this.setupValidation();

        
        this.optimizeForMobile();
    }

    onModalHidden() {
        
        setTimeout(() => {
            $('#quickNoteModal').remove();
        }, 300);
    }

    async handleSubmit() {
        if (this.isSubmitting) return;

        
        if (!this.validateForm()) {
            return;
        }

        this.isSubmitting = true;
        this.setSubmitButtonLoading(true);
        this.hideAlert();

        try {
            const formData = new FormData(this.form);
            
            const response = await $.ajax({
                url: this.form.action,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.success) {
                
                this.showSuccessToast(response.message);
                
                
                this.modal.hide();
                
                
                this.refreshNotesSection(response.patientId);
                
            } else {
                this.showAlert(response.message, 'danger');
                if (response.errors && response.errors.length > 0) {
                    this.showValidationErrors(response.errors);
                }
            }

        } catch (error) {
            this.showAlert('Error al guardar la nota. Por favor intente nuevamente.', 'danger');
            console.error('Error saving quick note:', error);
        } finally {
            this.isSubmitting = false;
            this.setSubmitButtonLoading(false);
        }
    }

    validateForm() {
        const title = document.getElementById('Title');
        const note = document.getElementById('Note');
        let isValid = true;

        
        if (!title.value.trim()) {
            this.showFieldError(title, 'El título es requerido');
            isValid = false;
        } else {
            this.hideFieldError(title);
        }

        
        if (!note.value.trim()) {
            this.showFieldError(note, 'El contenido de la nota es requerido');
            isValid = false;
        } else if (note.value.length > 2000) {
            this.showFieldError(note, 'La nota no puede exceder 2000 caracteres');
            isValid = false;
        } else {
            this.hideFieldError(note);
        }

        return isValid;
    }

    validateField(field) {
        const $field = $(field);
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showFieldError(field, 'Este campo es requerido');
        } else if (field.hasAttribute('maxlength') && field.value.length > parseInt(field.getAttribute('maxlength'))) {
            this.showFieldError(field, `Máximo ${field.getAttribute('maxlength')} caracteres`);
        } else {
            this.hideFieldError(field);
        }
    }

    showFieldError(field, message) {
        const $field = $(field);
        $field.addClass('is-invalid');
        
        let feedback = $field.siblings('.invalid-feedback');
        if (feedback.length === 0) {
            feedback = $('<div class="invalid-feedback"></div>');
            $field.after(feedback);
        }
        feedback.text(message);
    }

    hideFieldError(field) {
        const $field = $(field);
        $field.removeClass('is-invalid');
        $field.siblings('.invalid-feedback').empty();
    }

    updateCharacterCount(textarea) {
        const currentLength = textarea.value.length;
        const maxLength = 2000;
        const counter = document.getElementById('noteCharCount');
        
        if (counter) {
            counter.textContent = currentLength;
            
            
            if (currentLength > maxLength * 0.9) {
                counter.style.color = '#dc3545'; 
            } else if (currentLength > maxLength * 0.7) {
                counter.style.color = '#fd7e14'; 
            } else {
                counter.style.color = '#6c757d'; 
            }
        }
    }

    setupValidation() {
        
        const form = document.getElementById('quickNoteForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        }
    }

    optimizeForMobile() {
        
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            
            $('#quickNoteModal').on('show.bs.modal', function() {
                $('body').addClass('modal-open-mobile');
            });
            
            $('#quickNoteModal').on('hidden.bs.modal', function() {
                $('body').removeClass('modal-open-mobile');
            });

            
            $('#quickNoteForm input, #quickNoteForm textarea').on('focus', function() {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        }
    }

    async refreshNotesSection(patientId) {
        try {
            
            const response = await $.ajax({
                url: `/Patients/GetQuickNotes/${patientId}`,
                type: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            const notesContainer = $('#quickNotesContainer');
            if (notesContainer.length && response) {
                notesContainer.html(response);
                this.animateNewNote();
            } else {
                
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }

        } catch (error) {
            console.warn('Could not refresh notes section, reloading page:', error);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    animateNewNote() {
        
        const firstNote = $('#quickNotesContainer .note-item:first-child');
        if (firstNote.length) {
            firstNote.addClass('note-just-added');
            setTimeout(() => {
                firstNote.removeClass('note-just-added');
            }, 2000);
        }
    }

    showAlert(message, type = 'danger') {
        const alert = document.getElementById('quickNoteAlert');
        const alertMessage = document.getElementById('quickNoteAlertMessage');
        
        if (alert && alertMessage) {
            alertMessage.textContent = message;
            alert.className = `alert alert-${type}`;
            alert.classList.remove('d-none');
            
            
            if (type === 'success') {
                setTimeout(() => {
                    this.hideAlert();
                }, 5000);
            }
        }
    }

    hideAlert() {
        const alert = document.getElementById('quickNoteAlert');
        if (alert) {
            alert.classList.add('d-none');
        }
    }

    showValidationErrors(errors) {
        if (errors && errors.length > 0) {
            const errorList = errors.map(error => `• ${error}`).join('<br>');
            this.showAlert(errorList, 'danger');
        }
    }

    setSubmitButtonLoading(loading) {
        const btn = document.getElementById('saveQuickNoteBtn');
        const spinner = btn.querySelector('.spinner-border');
        const text = btn.querySelector('i.fas');
        
        if (loading) {
            btn.disabled = true;
            spinner.classList.remove('d-none');
            text.style.display = 'none';
        } else {
            btn.disabled = false;
            spinner.classList.add('d-none');
            text.style.display = 'inline';
        }
    }

    showLoading() {
        
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Cargando...',
                text: 'Preparando formulario de nota rápida',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        }
    }

    hideLoading() {
        if (typeof Swal !== 'undefined') {
            Swal.close();
        }
    }

    showError(message) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                confirmButtonText: 'Entendido'
            });
        } else {
            alert(message);
        }
    }

    showSuccessToast(message) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        } else {
            
            this.createCustomToast(message, 'success');
        }
    }

    createCustomToast(message, type) {
        const toast = $(`
            <div class="toast-custom toast-${type}" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
                color: ${type === 'success' ? '#155724' : '#721c24'};
                padding: 12px 20px;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                z-index: 9999;
                max-width: 300px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            ">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                ${message}
            </div>
        `);

        $('body').append(toast);
        
        
        setTimeout(() => {
            toast.css({ opacity: 1, transform: 'translateX(0)' });
        }, 100);

        
        setTimeout(() => {
            toast.css({ opacity: 0, transform: 'translateX(100%)' });
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}


const mobileCSS = `
<style>
    .modal-open-mobile {
        padding-right: 0 !important;
    }
    
    .modal-open-mobile .modal {
        padding-right: 0 !important;
    }
    
    .note-just-added {
        animation: slideInFromTop 0.5s ease-out;
        background-color: #d4edda !important;
        border-left: 4px solid #28a745 !important;
    }
    
    @keyframes slideInFromTop {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 768px) {
        .modal-open-mobile {
            overflow: hidden !important;
        }
        
        .modal-open-mobile .modal {
            padding-right: 0 !important;
        }
    }
</style>
`;


$(document).ready(() => {
    $('head').append(mobileCSS);
});


console.log('Creating QuickNotesModal instance...');
const quickNotesModal = new QuickNotesModal();
console.log('QuickNotesModal instance created:', quickNotesModal);


window.QuickNotesModal = QuickNotesModal;