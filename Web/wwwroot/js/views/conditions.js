

class ConditionsManager {
    constructor() {
        this.init();
    }

    init() {
        console.log('ConditionsManager initializing...');
        this.bindEvents();
    }

    bindEvents() {
        
        $(document).on('click', '[data-condition-create], [data-edit-condition]', async (e) => {
            e.preventDefault();
            console.log('>>> CONDITION HANDLER TRIGGERED <<<');
            
            const isEditMode = $(e.currentTarget).attr('data-edit-condition') !== undefined;
            const conditionId = isEditMode ? parseInt($(e.currentTarget).attr('data-edit-condition')) : null;
            const patientId = isEditMode ? window.currentPatientId : $(e.currentTarget).data('patient-id');
            
            await this.openModal(patientId, conditionId, isEditMode);
        });

        
        $(document).on('click', '[data-delete-condition]', async (e) => {
            e.preventDefault();
            const conditionId = parseInt($(e.currentTarget).attr('data-delete-condition'));
            await this.confirmDelete(conditionId);
        });
    }

    async openModal(patientId, conditionId = null, isEditMode = false) {
        try {
            let conditionData = null;
            
            
            if (isEditMode) {
                conditionData = await this.loadConditionForEdit(conditionId);
                if (!conditionData) return;
            }

            const { value: formData } = await Swal.fire({
                title: isEditMode ? '<i class="fas fa-edit text-warning"></i> Editar Condición Médica' : '<i class="fas fa-stethoscope text-info"></i> Nueva Condición Médica',
                html: this.getFormHTML(conditionData, isEditMode),
                width: 750,
                customClass: {
                    popup: 'swal-condition-modal',
                    htmlContainer: 'swal-condition-content'
                },
                showCancelButton: true,
                confirmButtonText: isEditMode ? '<i class="fas fa-save"></i> Actualizar' : '<i class="fas fa-save"></i> Guardar',
                cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
                confirmButtonColor: isEditMode ? '#17a2b8' : '#007bff',
                didOpen: () => {
                    this.setupModalEvents();
                },
                preConfirm: () => {
                    return this.validateAndGetFormData(conditionId);
                }
            });

            if (formData) {
                await this.saveCondition(formData, isEditMode);
            }

        } catch (error) {
            console.error('Error opening condition modal:', error);
            this.showError('Error al abrir el formulario de condiciones');
        }
    }

    async loadConditionForEdit(conditionId) {
        try {
            const response = await $.ajax({
                url: `/Patients/GetConditionForEdit/${conditionId}`,
                type: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (!response.success) {
                this.showError(response.message || 'Error al cargar la condición');
                return null;
            }
            
            console.log('Condition data loaded for edit:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error loading condition:', error);
            this.showError('Error al cargar la condición');
            return null;
        }
    }

    getFormHTML(conditionData = null, isEditMode = false) {
        const data = conditionData || {};
        
        return `
            <div class="text-start swal-condition-form">
                <div class="row g-1 mb-2">
                    <div class="col-8">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Condición Médica</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-stethoscope text-muted" style="font-size: 0.75rem;"></i></span>
                            <input type="text" id="conditionTitle" class="form-control form-control-sm" placeholder="Ej: Hipertensión arterial..." maxlength="200" required style="font-size: 0.85rem;" value="${data.title || ''}">
                        </div>
                    </div>
                    <div class="col-4">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Severidad</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-exclamation-triangle text-muted" style="font-size: 0.75rem;"></i></span>
                            <select id="conditionSeverity" class="form-select form-select-sm" style="font-size: 0.85rem;">
                                <option value="1" ${data.severity === 1 ? 'selected' : ''}>Leve</option>
                                <option value="2" ${data.severity === 2 ? 'selected' : ''}>Moderada</option>
                                <option value="3" ${data.severity === 3 ? 'selected' : ''}>Severa</option>
                                <option value="4" ${data.severity === 4 ? 'selected' : ''}>Crítica</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="row g-1 mb-2">
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Estado</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-heartbeat text-muted" style="font-size: 0.75rem;"></i></span>
                            <select id="conditionStatus" class="form-select form-select-sm" style="font-size: 0.85rem;">
                                <option value="1" ${data.status === 1 ? 'selected' : ''}>Activa</option>
                                <option value="2" ${data.status === 2 ? 'selected' : ''}>Controlada</option>
                                <option value="3" ${data.status === 3 ? 'selected' : ''}>En Seguimiento</option>
                                <option value="4" ${data.status === 4 ? 'selected' : ''}>Resuelta</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Fecha de inicio</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-calendar text-muted" style="font-size: 0.75rem;"></i></span>
                            <input type="date" id="conditionOnsetDate" class="form-control form-control-sm" style="font-size: 0.85rem;" value="${data.onsetDate || ''}">
                        </div>
                    </div>
                </div>

                <div class="mb-2">
                    <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Descripción</label>
                    <div class="position-relative">
                        <textarea id="conditionDescription" class="form-control form-control-sm" rows="2" placeholder="Descripción detallada de la condición..." maxlength="2000" required style="resize: none; font-size: 0.85rem; height: 60px;">${data.conditions || ''}</textarea>
                        <small class="text-muted position-absolute" style="bottom: 2px; right: 6px; font-size: 0.7rem;">
                            <span id="conditionCharCount">0</span>/2000
                        </small>
                    </div>
                </div>

                <div class="row g-1 align-items-center">
                    <div class="col-6">
                        <div class="form-check form-check-sm mb-0">
                            <input class="form-check-input" type="checkbox" id="conditionIsChronic" ${data.isChronic ? 'checked' : ''}>
                            <label class="form-check-label" for="conditionIsChronic" style="font-size: 0.8rem;">
                                <i class="fas fa-infinity text-warning me-1" style="font-size: 0.75rem;"></i>Es condición crónica
                            </label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="bg-light py-1 px-2 rounded text-end" style="font-size: 0.7rem;">
                            <i class="fas fa-${isEditMode ? 'edit text-warning' : 'plus text-info'} me-1"></i>
                            ${isEditMode ? 'Editando' : 'Creando'} • ${new Date().toLocaleDateString('es-ES')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupModalEvents() {
        
        const updateCounter = () => {
            const description = document.getElementById('conditionDescription');
            const counter = document.getElementById('conditionCharCount');
            if (description && counter) {
                counter.textContent = description.value.length;
                
                
                const currentLength = description.value.length;
                const maxLength = 2000;
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
        document.getElementById('conditionDescription').addEventListener('input', updateCounter);
    }

    validateAndGetFormData(conditionId = null) {
        const title = document.getElementById('conditionTitle').value;
        const description = document.getElementById('conditionDescription').value;
        const severity = document.getElementById('conditionSeverity').value;
        const status = document.getElementById('conditionStatus').value;
        const isChronic = document.getElementById('conditionIsChronic').checked;
        const onsetDate = document.getElementById('conditionOnsetDate').value;

        if (!title.trim()) {
            Swal.showValidationMessage('La condición médica es requerida');
            return false;
        }

        if (!description.trim()) {
            Swal.showValidationMessage('La descripción es requerida');
            return false;
        }

        return {
            ConditionPatientId: conditionId,
            Title: title.trim(),
            Conditions: description.trim(),
            Severity: parseInt(severity),
            Status: parseInt(status),
            IsChronic: isChronic,
            OnsetDate: onsetDate || null,
            PatientId: window.currentPatientId
        };
    }

    async saveCondition(conditionData, isEditMode = false) {
        try {
            Swal.fire({
                title: isEditMode ? 'Actualizando...' : 'Guardando...',
                text: isEditMode ? 'Actualizando condición médica' : 'Guardando condición médica',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await $.ajax({
                url: '/Conditions/Create',
                type: 'POST',
                data: conditionData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: isEditMode ? '¡Actualizada!' : '¡Guardada!',
                    text: response.message || (isEditMode ? 'Condición actualizada exitosamente' : 'Condición guardada exitosamente'),
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'Error al guardar la condición'
                });
            }
        } catch (error) {
            console.error('Error saving condition:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al comunicarse con el servidor'
            });
        }
    }

    async confirmDelete(conditionId) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará permanentemente la condición médica',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '<i class="fas fa-trash"></i> Sí, eliminar',
            cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            await this.deleteCondition(conditionId);
        }
    }

    async deleteCondition(conditionId) {
        try {
            Swal.fire({
                title: 'Eliminando...',
                text: 'Eliminando condición médica',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await $.ajax({
                url: '/Conditions/Delete',
                type: 'POST',
                data: { id: conditionId },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Eliminada!',
                    text: 'Condición eliminada exitosamente',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'Error al eliminar la condición'
                });
            }
        } catch (error) {
            console.error('Error deleting condition:', error);
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
    console.log('Creating ConditionsManager instance...');
    window.conditionsManager = new ConditionsManager();
    console.log('ConditionsManager instance created');
});


window.ConditionsManager = ConditionsManager;