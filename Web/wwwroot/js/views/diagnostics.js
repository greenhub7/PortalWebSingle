

class DiagnosticsManager {
    constructor() {
        this.init();
    }

    init() {
        console.log('DiagnosticsManager initializing...');
        this.bindEvents();
    }

    bindEvents() {
        
        $(document).on('click', '[data-diagnosis-create], [data-edit-diagnosis]', async (e) => {
            e.preventDefault();
            console.log('>>> DIAGNOSTIC HANDLER TRIGGERED <<<');
            
            const isEditMode = $(e.currentTarget).attr('data-edit-diagnosis') !== undefined;
            const diagnosticId = isEditMode ? parseInt($(e.currentTarget).attr('data-edit-diagnosis')) : null;
            const patientId = isEditMode ? window.currentPatientId : $(e.currentTarget).data('patient-id');
            
            await this.openModal(patientId, diagnosticId, isEditMode);
        });

        
        $(document).on('click', '[data-delete-diagnosis]', async (e) => {
            e.preventDefault();
            const diagnosticId = parseInt($(e.currentTarget).attr('data-delete-diagnosis'));
            await this.confirmDelete(diagnosticId);
        });
    }

    async openModal(patientId, diagnosticId = null, isEditMode = false) {
        try {
            let diagnosticData = null;
            let availableDiagnoses = [];
            
            
            try {
                const diagnosesResponse = await $.ajax({
                    url: '/DiagnosticPatients/GetAvailableDiagnoses',
                    type: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                availableDiagnoses = diagnosesResponse || [];
            } catch (error) {
                console.error('Error loading available diagnoses:', error);
                this.showError('Error al cargar los diagnósticos disponibles');
                return;
            }
            
            
            if (isEditMode) {
                diagnosticData = await this.loadDiagnosticForEdit(diagnosticId);
                if (!diagnosticData) return;
            }

            const { value: formData } = await Swal.fire({
                title: isEditMode ? '<i class="fas fa-edit text-warning"></i> Editar Diagnóstico CIE-10' : '<i class="fas fa-diagnoses text-primary"></i> Nuevo Diagnóstico CIE-10',
                html: this.getFormHTML(diagnosticData, isEditMode, availableDiagnoses),
                width: 1200,
                height: '90vh',
                customClass: {
                    popup: 'swal-diagnostic-modal',
                    htmlContainer: 'swal-diagnostic-content'
                },
                scrollbarPadding: false,
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: isEditMode ? '<i class="fas fa-save"></i> Actualizar' : '<i class="fas fa-save"></i> Guardar',
                cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
                confirmButtonColor: isEditMode ? '#17a2b8' : '#007bff',
                didOpen: () => {
                    this.setupModalEvents();
                    
                    const popup = document.querySelector('.swal-diagnostic-modal');
                    if (popup) {
                        popup.style.maxHeight = '90vh';
                        popup.style.height = '90vh';
                    }
                    const htmlContainer = document.querySelector('.swal-diagnostic-content');
                    if (htmlContainer) {
                        htmlContainer.style.maxHeight = 'none';
                        htmlContainer.style.overflow = 'visible';
                    }
                },
                preConfirm: () => {
                    return this.validateAndGetFormData(diagnosticId);
                }
            });

            if (formData) {
                await this.saveDiagnostic(formData, isEditMode);
            }

        } catch (error) {
            console.error('Error opening diagnostic modal:', error);
            this.showError('Error al abrir el formulario de diagnósticos');
        }
    }

    async loadDiagnosticForEdit(diagnosticId) {
        try {
            const response = await $.ajax({
                url: '/DiagnosticPatients/GetDiagnosisForEdit',
                type: 'GET',
                data: { id: diagnosticId },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (!response.success) {
                this.showError(response.message || 'Error al cargar el diagnóstico');
                return null;
            }
            
            return response.data;
        } catch (error) {
            console.error('Error loading diagnostic:', error);
            this.showError('Error al cargar el diagnóstico');
            return null;
        }
    }

    getFormHTML(diagnosticData = null, isEditMode = false, availableDiagnoses = []) {
        const data = diagnosticData || {};
        
        return `
            <div class="text-start swal-diagnostic-form">
                <div class="row g-1 mb-2">
                    <div class="col-12">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Diagnóstico CIE-10</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-diagnoses text-muted" style="font-size: 0.75rem;"></i></span>
                            <select id="diagnosisId" class="form-select form-select-sm" required style="font-size: 0.85rem;">
                                <option value="">-- Seleccione o busque diagnóstico --</option>
                                ${availableDiagnoses.map(d => `<option value="${d.id}" ${data.diagnosticId === d.id ? 'selected' : ''}>[${d.code}] ${d.name} - ${d.category}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row g-1 mb-1">
                    <div class="col-4">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Fecha de diagnóstico</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-calendar text-muted" style="font-size: 0.75rem;"></i></span>
                            <input type="date" id="diagnosticDate" class="form-control form-control-sm" style="font-size: 0.85rem;" value="${data.diagnosisDate || new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                    <div class="col-4">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Severidad</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-exclamation-triangle text-muted" style="font-size: 0.75rem;"></i></span>
                            <select id="diagnosticSeverity" class="form-select form-select-sm" style="font-size: 0.85rem;">
                                <option value="0" ${data.severity === 0 ? 'selected' : ''}>Desconocida</option>
                                <option value="1" ${data.severity === 1 ? 'selected' : ''}>Leve</option>
                                <option value="2" ${data.severity === 2 ? 'selected' : ''}>Moderado</option>
                                <option value="3" ${data.severity === 3 ? 'selected' : ''}>Grave</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-4">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Estado</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-heartbeat text-muted" style="font-size: 0.75rem;"></i></span>
                            <select id="diagnosticStatus" class="form-select form-select-sm" style="font-size: 0.85rem;">
                                <option value="0" ${data.status === 0 ? 'selected' : ''}>Activo</option>
                                <option value="1" ${data.status === 1 ? 'selected' : ''}>Resuelto</option>
                                <option value="2" ${data.status === 2 ? 'selected' : ''}>En tratamiento</option>
                                <option value="3" ${data.status === 3 ? 'selected' : ''}>Crónico</option>
                                <option value="4" ${data.status === 4 ? 'selected' : ''}>En observación</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row g-1 mb-1">
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Notas clínicas (requerido)</label>
                        <div class="position-relative">
                            <textarea id="diagnosticNotes" class="form-control form-control-sm" rows="1" placeholder="Notas clínicas del diagnóstico..." maxlength="500" required style="resize: none; font-size: 0.85rem; height: 40px;">${data.notes || ''}</textarea>
                            <small class="text-muted position-absolute" style="bottom: 2px; right: 6px; font-size: 0.7rem;">
                                <span id="diagnosticNotesCount">0</span>/500
                            </small>
                        </div>
                    </div>
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Descripción detallada</label>
                        <div class="position-relative">
                            <textarea id="diagnosticDescription" class="form-control form-control-sm" rows="1" placeholder="Descripción detallada del diagnóstico..." maxlength="500" style="resize: none; font-size: 0.85rem; height: 40px;">${data.description || ''}</textarea>
                            <small class="text-muted position-absolute" style="bottom: 2px; right: 6px; font-size: 0.7rem;">
                                <span id="diagnosticDescCount">0</span>/500
                            </small>
                        </div>
                    </div>
                </div>

                <div class="row g-1 mb-1">
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Tratamiento prescrito</label>
                        <div class="position-relative">
                            <textarea id="diagnosticTreatment" class="form-control form-control-sm" rows="1" placeholder="Detalles del tratamiento prescrito..." maxlength="1000" style="resize: none; font-size: 0.85rem; height: 40px;">${data.treatment || ''}</textarea>
                            <small class="text-muted position-absolute" style="bottom: 2px; right: 6px; font-size: 0.7rem;">
                                <span id="diagnosticTreatmentCount">0</span>/1000
                            </small>
                        </div>
                    </div>
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Observaciones médicas</label>
                        <div class="position-relative">
                            <textarea id="medicalObservations" class="form-control form-control-sm" rows="1" placeholder="Observaciones médicas adicionales..." maxlength="500" style="resize: none; font-size: 0.85rem; height: 40px;">${data.medicalObservations || ''}</textarea>
                            <small class="text-muted position-absolute" style="bottom: 2px; right: 6px; font-size: 0.7rem;">
                                <span id="medicalObsCount">0</span>/500
                            </small>
                        </div>
                    </div>
                </div>

                <div class="row g-1 mb-1">
                    <div class="col-3">
                        <div class="form-check form-check-sm" style="margin-top: 1.5rem;">
                            <input class="form-check-input" type="checkbox" id="requiresFollowUp" ${data.requiresFollowUp ? 'checked' : ''}>
                            <label class="form-check-label" for="requiresFollowUp" style="font-size: 0.8rem;">
                                <i class="fas fa-calendar-alt text-info me-1" style="font-size: 0.75rem;"></i>Requiere seguimiento
                            </label>
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Próximo seguimiento</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-calendar-week text-muted" style="font-size: 0.75rem;"></i></span>
                            <input type="date" id="nextFollowUpDate" class="form-control form-control-sm" style="font-size: 0.85rem;" value="${data.nextFollowUpDate || ''}">
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Inicio tratamiento</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-calendar-plus text-muted" style="font-size: 0.75rem;"></i></span>
                            <input type="date" id="treatmentStartDate" class="form-control form-control-sm" style="font-size: 0.85rem;" value="${data.treatmentStartDate || ''}">
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.8rem;">Fecha de resolución</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text px-1"><i class="fas fa-calendar-check text-muted" style="font-size: 0.75rem;"></i></span>
                            <input type="date" id="resolutionDate" class="form-control form-control-sm" style="font-size: 0.85rem;" value="${data.resolutionDate || ''}">
                        </div>
                    </div>
                </div>

                <div class="bg-light py-1 px-2 rounded text-end" style="font-size: 0.7rem;">
                    <i class="fas fa-${isEditMode ? 'edit text-warning' : 'plus text-primary'} me-1"></i>
                    ${isEditMode ? 'Editando' : 'Creando'} • ${new Date().toLocaleDateString('es-ES')}
                </div>
            </div>
        `;
    }

    setupModalEvents() {
        
        $('#diagnosisId').select2({
            placeholder: 'Busque y seleccione un diagnóstico CIE-10',
            allowClear: true,
            dropdownParent: $('.swal2-container'),
            language: {
                noResults: function() {
                    return "No se encontraron diagnósticos";
                },
                searching: function() {
                    return "Buscando...";
                }
            },
            width: '100%'
        });
        
        
        const textAreas = [
            { id: 'diagnosticNotes', countId: 'diagnosticNotesCount', maxLength: 500 },
            { id: 'diagnosticDescription', countId: 'diagnosticDescCount', maxLength: 500 },
            { id: 'diagnosticTreatment', countId: 'diagnosticTreatmentCount', maxLength: 1000 },
            { id: 'medicalObservations', countId: 'medicalObsCount', maxLength: 500 }
        ];
        
        const updateCounter = (textAreaId, counterId, maxLength) => {
            const textArea = document.getElementById(textAreaId);
            const counter = document.getElementById(counterId);
            if (textArea && counter) {
                const currentLength = textArea.value.length;
                counter.textContent = currentLength;
                
                
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = '#dc3545'; 
                } else if (currentLength > maxLength * 0.7) {
                    counter.style.color = '#fd7e14'; 
                } else {
                    counter.style.color = '#6c757d'; 
                }
            }
        };
        
        
        textAreas.forEach(({ id, countId, maxLength }) => {
            updateCounter(id, countId, maxLength);
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => updateCounter(id, countId, maxLength));
            }
        });
    }


    validateAndGetFormData(diagnosticId = null) {
        const selectedDiagnosisId = document.getElementById('diagnosisId').value;
        const severity = document.getElementById('diagnosticSeverity').value;
        const status = document.getElementById('diagnosticStatus').value;
        const notes = document.getElementById('diagnosticNotes').value;
        const description = document.getElementById('diagnosticDescription').value;
        const treatment = document.getElementById('diagnosticTreatment').value;
        const medicalObservations = document.getElementById('medicalObservations').value;
        const diagnosisDate = document.getElementById('diagnosticDate').value;
        const treatmentStartDate = document.getElementById('treatmentStartDate').value;
        const resolutionDate = document.getElementById('resolutionDate').value;
        const requiresFollowUp = document.getElementById('requiresFollowUp').checked;
        const nextFollowUpDate = document.getElementById('nextFollowUpDate').value;

        if (!selectedDiagnosisId) {
            Swal.showValidationMessage('Debe seleccionar un diagnóstico');
            return false;
        }

        if (!notes.trim()) {
            Swal.showValidationMessage('Las notas clínicas son requeridas');
            return false;
        }

        return {
            DiagnosticPatientId: diagnosticId,
            DiagnosticId: parseInt(selectedDiagnosisId),
            Notes: notes.trim(),
            Description: description.trim() || '',
            Treatment: treatment.trim() || '',
            MedicalObservations: medicalObservations.trim() || '',
            Severity: parseInt(severity),
            Status: parseInt(status),
            DiagnosisDate: diagnosisDate || null,
            TreatmentStartDate: treatmentStartDate || null,
            ResolutionDate: resolutionDate || null,
            RequiresFollowUp: requiresFollowUp,
            NextFollowUpDate: nextFollowUpDate || null,
            Date: diagnosisDate || new Date().toISOString(),
            PatientId: window.currentPatientId
        };
    }

    async saveDiagnostic(diagnosticData, isEditMode = false) {
        try {
            Swal.fire({
                title: isEditMode ? 'Actualizando...' : 'Guardando...',
                text: isEditMode ? 'Actualizando diagnóstico' : 'Guardando diagnóstico',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await $.ajax({
                url: '/DiagnosticPatients/Create',
                type: 'POST',
                data: diagnosticData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: isEditMode ? '¡Actualizado!' : '¡Guardado!',
                    text: response.message || (isEditMode ? 'Diagnóstico actualizado exitosamente' : 'Diagnóstico guardado exitosamente'),
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'Error al guardar el diagnóstico'
                });
            }
        } catch (error) {
            console.error('Error saving diagnostic:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al comunicarse con el servidor'
            });
        }
    }

    async confirmDelete(diagnosticId) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará permanentemente el diagnóstico',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '<i class="fas fa-trash"></i> Sí, eliminar',
            cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            await this.deleteDiagnostic(diagnosticId);
        }
    }

    async deleteDiagnostic(diagnosticId) {
        try {
            Swal.fire({
                title: 'Eliminando...',
                text: 'Eliminando diagnóstico',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await $.ajax({
                url: '/DiagnosticPatients/Delete',
                type: 'POST',
                data: { id: diagnosticId },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    text: 'Diagnóstico eliminado exitosamente',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'Error al eliminar el diagnóstico'
                });
            }
        } catch (error) {
            console.error('Error deleting diagnostic:', error);
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
    console.log('Creating DiagnosticsManager instance...');
    window.diagnosticsManager = new DiagnosticsManager();
    console.log('DiagnosticsManager instance created');
});


window.DiagnosticsManager = DiagnosticsManager;