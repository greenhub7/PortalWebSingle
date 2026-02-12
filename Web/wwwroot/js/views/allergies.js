

class AllergiesManager {
    constructor() {
        this.init();
    }

    init() {
        console.log('AllergiesManager initializing...');
        this.bindEvents();
    }

    bindEvents() {
        
        $(document).on('click', '[data-allergy-create], [data-edit-allergy]', async (e) => {
            e.preventDefault();
            console.log('>>> ALLERGY HANDLER TRIGGERED <<<');
            
            const isEditMode = $(e.currentTarget).attr('data-edit-allergy') !== undefined;
            const allergyId = isEditMode ? parseInt($(e.currentTarget).attr('data-edit-allergy')) : null;
            const patientId = isEditMode ? window.currentPatientId : $(e.currentTarget).data('patient-id');
            
            await this.openModal(patientId, allergyId, isEditMode);
        });

        
        $(document).on('click', '[data-delete-allergy]', async (e) => {
            e.preventDefault();
            const allergyId = parseInt($(e.currentTarget).attr('data-delete-allergy'));
            await this.confirmDelete(allergyId);
        });
    }

    async openModal(patientId, allergyId = null, isEditMode = false) {
        try {
            let allergyData = null;
            let availableAllergies = [];
            
            
            try {
                const allergiesResponse = await $.ajax({
                    url: '/AllergyPatients/GetAvailableAllergies',
                    type: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                availableAllergies = allergiesResponse || [];
            } catch (error) {
                console.error('Error loading available allergies:', error);
                this.showError('Error al cargar las alergias disponibles');
                return;
            }
            
            
            if (isEditMode) {
                allergyData = await this.loadAllergyForEdit(allergyId);
                if (!allergyData) return;
            }

            const { value: formData } = await Swal.fire({
                title: isEditMode ? '<i class="fas fa-edit text-warning"></i> Editar Alergia' : '<i class="fas fa-allergies text-danger"></i> Nueva Alergia',
                html: this.getFormHTML(allergyData, isEditMode, availableAllergies),
                width: 750,
                customClass: {
                    popup: 'swal-allergy-modal',
                    htmlContainer: 'swal-allergy-content'
                },
                showCancelButton: true,
                confirmButtonText: isEditMode ? '<i class="fas fa-save"></i> Actualizar' : '<i class="fas fa-save"></i> Guardar',
                cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
                confirmButtonColor: isEditMode ? '#17a2b8' : '#dc3545',
                didOpen: () => {
                    this.setupModalEvents();
                },
                preConfirm: () => {
                    return this.validateAndGetFormData(allergyId);
                }
            });

            if (formData) {
                await this.saveAllergy(formData, isEditMode);
            }

        } catch (error) {
            console.error('Error opening allergy modal:', error);
            this.showError('Error al abrir el formulario de alergias');
        }
    }

    async loadAllergyForEdit(allergyId) {
        try {
            const response = await $.ajax({
                url: `/Patients/GetAllergyForEdit/${allergyId}`,
                type: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (!response.success) {
                this.showError(response.message || 'Error al cargar la alergia');
                return null;
            }
            
            return response.data;
        } catch (error) {
            console.error('Error loading allergy:', error);
            this.showError('Error al cargar la alergia');
            return null;
        }
    }

    getFormHTML(allergyData = null, isEditMode = false, availableAllergies = []) {
        const data = allergyData || {};
        
        return `
            <div class="text-start swal-allergy-form">
                <div class="row g-1 mb-2">
                    <div class="col-8">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Sustancia/Alérgeno</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-allergies text-muted" style="font-size: 0.75rem;"></i></span>
                            <select id="allergyId" class="form-select form-select-sm" required style="font-size: 0.85rem;">
                                <option value="">-- Seleccione una alergia --</option>
                                ${availableAllergies.map(a => `<option value="${a.id}" ${data.allergyId === a.id ? 'selected' : ''}>${a.name} (${a.category})</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="col-4">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Severidad</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-exclamation-triangle text-muted" style="font-size: 0.75rem;"></i></span>
                            <select id="allergySeverity" class="form-select form-select-sm" style="font-size: 0.85rem;">
                                <option value="1" ${data.severity === 1 ? 'selected' : ''}>Leve</option>
                                <option value="2" ${data.severity === 2 ? 'selected' : ''}>Moderada</option>
                                <option value="3" ${data.severity === 3 ? 'selected' : ''}>Severa</option>
                                <option value="4" ${data.severity === 4 ? 'selected' : ''}>Crítica/Anafilaxis</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="row g-1 mb-2">
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Tipo de Reacción</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-thermometer-half text-muted" style="font-size: 0.75rem;"></i></span>
                            <select id="allergyType" class="form-select form-select-sm" style="font-size: 0.85rem;">
                                <option value="1" ${data.type === 1 ? 'selected' : ''}>Cutánea</option>
                                <option value="2" ${data.type === 2 ? 'selected' : ''}>Respiratoria</option>
                                <option value="3" ${data.type === 3 ? 'selected' : ''}>Gastrointestinal</option>
                                <option value="4" ${data.type === 4 ? 'selected' : ''}>Sistémica</option>
                                <option value="5" ${data.type === 5 ? 'selected' : ''}>Otro</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Primer episodio</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-calendar text-muted" style="font-size: 0.75rem;"></i></span>
                            <input type="date" id="allergyFirstEpisodeDate" class="form-control form-control-sm" style="font-size: 0.85rem;" value="${data.firstEpisodeDate || ''}">
                        </div>
                    </div>
                </div>

                <div class="mb-2">
                    <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Notas sobre la alergia</label>
                    <div class="position-relative">
                        <textarea id="allergyNotes" class="form-control form-control-sm" rows="2" placeholder="Describa los síntomas, reacciones y observaciones importantes..." maxlength="500" required style="resize: none; font-size: 0.85rem; height: 60px;">${data.notes || ''}</textarea>
                        <small class="text-muted position-absolute" style="bottom: 2px; right: 6px; font-size: 0.7rem;">
                            <span id="allergyCharCount">0</span>/500
                        </small>
                    </div>
                </div>

                <div class="mb-2">
                    <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Tratamiento/Medicación</label>
                    <div class="input-group input-group-sm">
                        <span class="input-group-text px-1"><i class="fas fa-pills text-muted" style="font-size: 0.75rem;"></i></span>
                        <input type="text" id="allergyTreatment" class="form-control form-control-sm" placeholder="Ej: Antihistamínicos, Epinefrina, Evitar exposición..." maxlength="500" style="font-size: 0.85rem;" value="${data.treatment || ''}">
                    </div>
                </div>

                <div class="row g-1 align-items-center">
                    <div class="col-6">
                        <div class="form-check form-check-sm mb-0">
                            <input class="form-check-input" type="checkbox" id="allergyIsActive" ${data.isActive !== false ? 'checked' : ''}>
                            <label class="form-check-label" for="allergyIsActive" style="font-size: 0.8rem;">
                                <i class="fas fa-shield-alt text-danger me-1" style="font-size: 0.75rem;"></i>Alergia activa
                            </label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="bg-light py-1 px-2 rounded text-end" style="font-size: 0.7rem;">
                            <i class="fas fa-${isEditMode ? 'edit text-warning' : 'plus text-danger'} me-1"></i>
                            ${isEditMode ? 'Editando' : 'Creando'} • ${new Date().toLocaleDateString('es-ES')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupModalEvents() {
        
        const updateCounter = () => {
            const notes = document.getElementById('allergyNotes');
            const counter = document.getElementById('allergyCharCount');
            if (notes && counter) {
                counter.textContent = notes.value.length;
                
                
                const currentLength = notes.value.length;
                const maxLength = 500;
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = '#dc3545'; 
                } else if (currentLength > maxLength * 0.7) {
                    counter.style.color = '#fd7e14'; 
                } else {
                    counter.style.color = '#6c757d'; 
                }
            }
        };
        
        updateCounter();
        document.getElementById('allergyNotes').addEventListener('input', updateCounter);
    }

    validateAndGetFormData(allergyId = null) {
        const selectedAllergyId = document.getElementById('allergyId').value;
        const notes = document.getElementById('allergyNotes').value;
        const severity = document.getElementById('allergySeverity').value;
        const type = document.getElementById('allergyType').value;
        const treatment = document.getElementById('allergyTreatment').value;
        const isActive = document.getElementById('allergyIsActive').checked;
        const firstEpisodeDate = document.getElementById('allergyFirstEpisodeDate').value;

        if (!selectedAllergyId) {
            Swal.showValidationMessage('Debe seleccionar una alergia');
            return false;
        }

        if (!notes.trim()) {
            Swal.showValidationMessage('Las notas son requeridas');
            return false;
        }

        return {
            AllergyPatientId: allergyId,
            AllergyId: parseInt(selectedAllergyId),
            Notes: notes.trim(),
            Severity: parseInt(severity),
            Status: parseInt(type), 
            FirstEpisodeDate: firstEpisodeDate || null,
            PatientId: window.currentPatientId
        };
    }

    async saveAllergy(allergyData, isEditMode = false) {
        try {
            Swal.fire({
                title: isEditMode ? 'Actualizando...' : 'Guardando...',
                text: isEditMode ? 'Actualizando alergia' : 'Guardando alergia',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await $.ajax({
                url: '/AllergyPatients/Create',
                type: 'POST',
                data: allergyData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: isEditMode ? '¡Actualizada!' : '¡Guardada!',
                    text: response.message || (isEditMode ? 'Alergia actualizada exitosamente' : 'Alergia guardada exitosamente'),
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'Error al guardar la alergia'
                });
            }
        } catch (error) {
            console.error('Error saving allergy:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al comunicarse con el servidor'
            });
        }
    }

    async confirmDelete(allergyId) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará permanentemente la alergia',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '<i class="fas fa-trash"></i> Sí, eliminar',
            cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            await this.deleteAllergy(allergyId);
        }
    }

    async deleteAllergy(allergyId) {
        try {
            Swal.fire({
                title: 'Eliminando...',
                text: 'Eliminando alergia',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await $.ajax({
                url: '/AllergyPatients/Delete',
                type: 'POST',
                data: { id: allergyId },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Eliminada!',
                    text: 'Alergia eliminada exitosamente',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'Error al eliminar la alergia'
                });
            }
        } catch (error) {
            console.error('Error deleting allergy:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al comunicarse con el servidor'
            });
        }
    }

    showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonText: 'Entendido'
        });
    }
}


$(document).ready(() => {
    console.log('Creating AllergiesManager instance...');
    window.allergiesManager = new AllergiesManager();
    console.log('AllergiesManager instance created');
});


window.AllergiesManager = AllergiesManager;