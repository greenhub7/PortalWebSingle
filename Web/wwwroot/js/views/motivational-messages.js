

class MotivationalMessagesManager {
    constructor() {
        this.init();
    }

    init() {
        console.log('MotivationalMessagesManager initializing...');
        this.bindEvents();
    }

    bindEvents() {
        
        $(document).on('click', '[data-motivational-create], [data-edit-motivational]', async (e) => {
            e.preventDefault();
            console.log('>>> MOTIVATIONAL MESSAGE HANDLER TRIGGERED <<<');
            
            const isEditMode = $(e.currentTarget).attr('data-edit-motivational') !== undefined;
            const messageId = isEditMode ? parseInt($(e.currentTarget).attr('data-edit-motivational')) : null;
            const patientId = isEditMode ? window.currentPatientId : $(e.currentTarget).data('patient-id');
            
            await this.openModal(patientId, messageId, isEditMode);
        });

        
        $(document).on('click', '[data-delete-motivational]', async (e) => {
            e.preventDefault();
            const messageId = parseInt($(e.currentTarget).attr('data-delete-motivational'));
            await this.confirmDelete(messageId);
        });

        
        $(document).on('click', '[data-toggle-motivational-status]', async (e) => {
            e.preventDefault();
            const messageId = parseInt($(e.currentTarget).attr('data-toggle-motivational-status'));
            await this.togglePatientMessageStatus(messageId);
        });

        $(document).on('click', '[data-send-motivational-now]', async (e) => {
            e.preventDefault();
            const messageId = parseInt($(e.currentTarget).attr('data-send-motivational-now'));
            await this.sendMessageNow(messageId);
        });
    }

    async openModal(patientId, messageId = null, isEditMode = false) {
        try {
            let messageData = null;
            
            
            if (isEditMode) {
                messageData = await this.loadMessageForEdit(messageId);
                if (!messageData) return;
            }

            const { value: formData } = await Swal.fire({
                title: isEditMode ? '<i class="fas fa-edit text-warning"></i> Editar Mensaje Motivacional' : '<i class="fas fa-heart text-success"></i> Nuevo Mensaje Motivacional',
                html: this.getFormHTML(messageData, isEditMode),
                width: 800,
                heightAuto: true,
                customClass: {
                    popup: 'swal-motivational-modal',
                    htmlContainer: 'swal-motivational-content'
                },
                scrollbarPadding: false,
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonText: isEditMode ? '<i class="fas fa-save"></i> Actualizar' : '<i class="fas fa-save"></i> Guardar',
                cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
                confirmButtonColor: isEditMode ? '#17a2b8' : '#28a745',
                didOpen: () => {
                    this.setupModalEvents();
                    
                    const popup = document.querySelector('.swal-motivational-modal');
                    if (popup) {
                        popup.style.maxHeight = '95vh';
                        popup.style.height = 'auto';
                        popup.style.overflow = 'visible';
                    }
                    const htmlContainer = popup?.querySelector('.swal2-html-container');
                    if (htmlContainer) {
                        htmlContainer.style.maxHeight = 'none';
                        htmlContainer.style.overflow = 'visible';
                    }
                },
                preConfirm: () => {
                    return this.validateAndGetFormData(messageId, patientId);
                }
            });

            if (formData) {
                await this.saveMessage(formData, isEditMode);
            }

        } catch (error) {
            console.error('Error opening motivational message modal:', error);
            this.showError('Error al abrir el formulario de mensajes');
        }
    }

    async loadMessageForEdit(messageId) {
        try {
            const response = await $.ajax({
                url: `/PatientMotivationalMessages/GetForEdit/${messageId}`,
                type: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            
            if (!response.success) {
                this.showError(response.message || 'Error al cargar el mensaje');
                return null;
            }
            
            return response.data;
        } catch (error) {
            console.error('Error loading message:', error);
            this.showError('Error al cargar el mensaje');
            return null;
        }
    }

    getFormHTML(messageData = null, isEditMode = false) {
        const data = messageData || {};
        
        return `
            <div class="text-start swal-motivational-form">
                <div class="row g-2 mb-3">
                    <div class="col-12">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.9rem;">Mensaje Motivacional</label>
                        <div class="position-relative">
                            <textarea id="motivationalMessage" class="form-control" rows="4" placeholder="Escribe un mensaje orientado a la importancia de la atención médica oportuna..." maxlength="1400" required style="resize: none; font-size: 0.9rem; height: 100px;">${data.customMessage || ''}</textarea>
                            <small class="text-muted position-absolute" style="bottom: 8px; right: 10px; font-size: 0.75rem;">
                                <span id="messageCharCount">0</span>/1400
                            </small>
                        </div>
                        <small class="text-muted">Enfócate en la importancia del cuidado médico regular y el seguimiento</small>
                    </div>
                </div>

                <div class="row g-2 mb-3">
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.9rem;">Periodicidad</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-calendar-alt text-muted"></i></span>
                            <select id="periodicityDays" class="form-select" style="font-size: 0.9rem;">
                                <option value="1" ${data.periodicityDays === 1 ? 'selected' : ''}>Diario</option>
                                <option value="3" ${data.periodicityDays === 3 ? 'selected' : ''}>Cada 3 días</option>
                                <option value="7" ${data.periodicityDays === 7 ? 'selected' : ''}>Semanal</option>
                                <option value="14" ${data.periodicityDays === 14 ? 'selected' : ''}>Quincenal</option>
                                <option value="21" ${data.periodicityDays === 21 ? 'selected' : ''}>Cada 3 semanas</option>
                                <option value="30" ${(data.periodicityDays === 30 || (!data.periodicityDays && isEditMode === false)) ? 'selected' : ''}>Mensual</option>
                                <option value="60" ${data.periodicityDays === 60 ? 'selected' : ''}>Cada 2 meses</option>
                                <option value="90" ${data.periodicityDays === 90 ? 'selected' : ''}>Trimestral</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.9rem;">Próximo envío</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-clock text-muted"></i></span>
                            <input type="date" id="nextSendDate" class="form-control" style="font-size: 0.9rem;" value="${data.nextSendDate || new Date(Date.now() + 86400000).toISOString().split('T')[0]}">
                        </div>
                    </div>
                </div>

                <div class="row g-2 mb-3">
                    <div class="col-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="onlyIfNoActivity" ${data.onlyIfNoRecentActivity !== false ? 'checked' : ''}>
                            <label class="form-check-label" for="onlyIfNoActivity" style="font-size: 0.9rem;">
                                <i class="fas fa-user-clock text-info me-1"></i>Solo enviar si no hay actividad reciente
                            </label>
                        </div>
                    </div>
                    <div class="col-6">
                        <label class="form-label fw-semibold mb-1" style="font-size: 0.9rem;">Días sin actividad</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-calendar-times text-muted"></i></span>
                            <select id="daysWithoutActivity" class="form-select" style="font-size: 0.9rem;">
                                <option value="3" ${data.daysWithoutActivity === 3 ? 'selected' : ''}>3 días</option>
                                <option value="7" ${data.daysWithoutActivity === 7 ? 'selected' : ''}>1 semana</option>
                                <option value="14" ${data.daysWithoutActivity === 14 ? 'selected' : ''}>2 semanas</option>
                                <option value="21" ${data.daysWithoutActivity === 21 ? 'selected' : ''}>3 semanas</option>
                                <option value="30" ${data.daysWithoutActivity === 30 ? 'selected' : ''}>1 mes</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="row g-2 mb-3">
                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="isActive" ${data.isActive !== false ? 'checked' : ''}>
                            <label class="form-check-label" for="isActive" style="font-size: 0.9rem;">
                                <i class="fas fa-toggle-on text-success me-1"></i>Mensaje activo
                            </label>
                        </div>
                        <small class="text-muted">Los mensajes inactivos no se enviarán automáticamente</small>
                    </div>
                </div>

                <div class="row g-2 mb-3">
                    <div class="col-12">
                        <label class="form-label fw-semibold mb-2" style="font-size: 0.9rem;">
                            <i class="fas fa-paper-plane text-primary me-1"></i>Canales de envío automático
                        </label>
                        <div class="row g-2">
                            <div class="col-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="sendViaWhatsApp" ${data.sendViaWhatsApp !== false ? 'checked' : ''}>
                                    <label class="form-check-label d-flex align-items-center" for="sendViaWhatsApp" style="font-size: 0.85rem;">
                                        <i class="fab fa-whatsapp text-success me-1"></i>WhatsApp
                                    </label>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="sendViaSMS" ${data.sendViaSMS === true ? 'checked' : ''}>
                                    <label class="form-check-label d-flex align-items-center" for="sendViaSMS" style="font-size: 0.85rem;">
                                        <i class="fas fa-sms text-info me-1"></i>SMS
                                    </label>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="sendViaEmail" ${data.sendViaEmail !== false ? 'checked' : ''}>
                                    <label class="form-check-label d-flex align-items-center" for="sendViaEmail" style="font-size: 0.85rem;">
                                        <i class="fas fa-envelope text-warning me-1"></i>Email
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="alert alert-info py-2 px-3" style="font-size: 0.85rem;">
                    <i class="fas fa-lightbulb me-2"></i>
                    <strong>Consejo:</strong> Los mensajes ayudan a recordar al paciente la importancia de mantener su atención médica regular y seguir las recomendaciones del especialista.
                </div>
            </div>
        `;
    }

    setupModalEvents() {
        
        const updateCounter = () => {
            const messageTextarea = document.getElementById('motivationalMessage');
            const counter = document.getElementById('messageCharCount');
            if (messageTextarea && counter) {
                const currentLength = messageTextarea.value.length;
                counter.textContent = currentLength;
                
                
                const maxLength = 1000;
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
        document.getElementById('motivationalMessage').addEventListener('input', updateCounter);

        
        const toggleActivityFields = () => {
            const checkbox = document.getElementById('onlyIfNoActivity');
            const daysSelect = document.getElementById('daysWithoutActivity');
            
            if (checkbox && daysSelect) {
                daysSelect.disabled = !checkbox.checked;
                if (!checkbox.checked) {
                    daysSelect.style.opacity = '0.5';
                } else {
                    daysSelect.style.opacity = '1';
                }
            }
        };

        document.getElementById('onlyIfNoActivity').addEventListener('change', toggleActivityFields);
        toggleActivityFields(); 
    }

    validateAndGetFormData(messageId = null, patientId) {
        const message = document.getElementById('motivationalMessage').value;
        const periodicityDays = document.getElementById('periodicityDays').value;
        const nextSendDate = document.getElementById('nextSendDate').value;
        const onlyIfNoActivity = document.getElementById('onlyIfNoActivity').checked;
        const daysWithoutActivity = document.getElementById('daysWithoutActivity').value;
        const isActive = document.getElementById('isActive').checked;
        const sendViaWhatsApp = document.getElementById('sendViaWhatsApp').checked;
        const sendViaSMS = document.getElementById('sendViaSMS').checked;
        const sendViaEmail = document.getElementById('sendViaEmail').checked;

        if (!message.trim()) {
            Swal.showValidationMessage('El mensaje motivacional es requerido');
            return false;
        }

        if (message.trim().length < 10) {
            Swal.showValidationMessage('El mensaje debe tener al menos 10 caracteres');
            return false;
        }
        
        if (message.trim().length > 1400) {
            Swal.showValidationMessage('El mensaje excede el límite de WhatsApp (1400 caracteres máximo)');
            return false;
        }

        if (!nextSendDate) {
            Swal.showValidationMessage('Debe seleccionar la fecha del próximo envío');
            return false;
        }

        if (!sendViaWhatsApp && !sendViaSMS && !sendViaEmail) {
            Swal.showValidationMessage('Debe seleccionar al menos un canal de envío automático');
            return false;
        }

        return {
            PatientMotivationalMessageId: messageId,
            PatientId: patientId,
            CustomMessage: message.trim(),
            PeriodicityDays: parseInt(periodicityDays),
            NextSendDate: nextSendDate,
            OnlyIfNoRecentActivity: onlyIfNoActivity,
            DaysWithoutActivity: parseInt(daysWithoutActivity),
            IsActive: isActive,
            SendViaWhatsApp: sendViaWhatsApp,
            SendViaSMS: sendViaSMS,
            SendViaEmail: sendViaEmail
        };
    }

    async saveMessage(messageData, isEditMode = false) {
        try {
            Swal.fire({
                title: isEditMode ? 'Actualizando...' : 'Guardando...',
                text: isEditMode ? 'Actualizando mensaje motivacional' : 'Guardando mensaje motivacional',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await $.ajax({
                url: '/PatientMotivationalMessages/Create',
                type: 'POST',
                data: messageData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: isEditMode ? '¡Actualizado!' : '¡Guardado!',
                    text: response.message || (isEditMode ? 'Mensaje actualizado exitosamente' : 'Mensaje guardado exitosamente'),
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'Error al guardar el mensaje'
                });
            }
        } catch (error) {
            console.error('Error saving motivational message:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al comunicarse con el servidor'
            });
        }
    }

    async confirmDelete(messageId) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará permanentemente el mensaje motivacional',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '<i class="fas fa-trash"></i> Sí, eliminar',
            cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            await this.deleteMessage(messageId);
        }
    }

    async deleteMessage(messageId) {
        try {
            Swal.fire({
                title: 'Eliminando...',
                text: 'Eliminando mensaje motivacional',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await $.ajax({
                url: '/PatientMotivationalMessages/Delete',
                type: 'POST',
                data: { id: messageId },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Eliminado!',
                    text: 'Mensaje eliminado exitosamente',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message || 'Error al eliminar el mensaje'
                });
            }
        } catch (error) {
            console.error('Error deleting message:', error);
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

    async togglePatientMessageStatus(messageId) {
        try {
            const response = await $.ajax({
                url: '/PatientMotivationalMessages/ToggleStatus',
                type: 'POST',
                data: { id: messageId }
            });

            if (response.success) {
                this.showSuccess(response.message);
                
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                this.showError(response.message);
            }
        } catch (error) {
            console.error('Error toggling patient message status:', error);
            this.showError('Error al cambiar el estado del mensaje');
        }
    }

    async sendMessageNow(messageId) {
        const result = await Swal.fire({
            title: '¿Enviar mensaje ahora?',
            text: 'El mensaje se enviará inmediatamente por WhatsApp al paciente',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '<i class="fas fa-paper-plane"></i> Sí, enviar',
            cancelButtonText: '<i class="fas fa-times"></i> Cancelar'
        });

        if (result.isConfirmed) {
            try {
                Swal.fire({
                    title: 'Enviando...',
                    text: 'Enviando mensaje motivacional',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const response = await $.ajax({
                    url: '/PatientMotivationalMessages/SendNow',
                    type: 'POST',
                    data: { id: messageId }
                });

                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Enviado!',
                        text: response.message,
                        timer: 3000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message
                    });
                }
            } catch (error) {
                console.error('Error sending message now:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error al enviar el mensaje'
                });
            }
        }
    }

    showSuccess(message) {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: message,
            timer: 2000,
            showConfirmButton: false
        });
    }
}


$(document).ready(() => {
    console.log('Creating MotivationalMessagesManager instance...');
    window.motivationalMessagesManager = new MotivationalMessagesManager();
    console.log('MotivationalMessagesManager instance created');
});


window.MotivationalMessagesManager = MotivationalMessagesManager;