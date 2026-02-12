

class MotivationalMessagesManagement {
    constructor() {
        this.messages = [];
        this.filteredMessages = [];
        this.init();
    }

    init() {
        console.log('MotivationalMessagesManagement initializing...');
        this.bindEvents();
        this.loadMessages();
    }

    bindEvents() {
        
        $(document).on('click', '#createMessageBtn, #createFirstMessageBtn', () => {
            this.openMessageModal();
        });

        
        $('#refreshBtn').on('click', () => {
            this.loadMessages();
        });

        
        $('#specialtyFilter, #statusFilter, #typeFilter').on('change', () => {
            this.applyFilters();
        });

        
        $(document).on('click', '[data-edit-message]', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const messageId = parseInt($(e.currentTarget).data('edit-message'));
            this.editMessage(messageId);
        });

        $(document).on('click', '[data-delete-message]', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const messageId = parseInt($(e.currentTarget).data('delete-message'));
            this.deleteMessage(messageId);
        });

        $(document).on('click', '[data-toggle-status]', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const messageId = parseInt($(e.currentTarget).data('toggle-status'));
            this.toggleStatus(messageId);
        });

        
        $('#sendWhatsAppMassiveBtn').on('click', () => {
            this.sendMassiveMessages('whatsapp');
        });

        $('#sendSMSMassiveBtn').on('click', () => {
            this.sendMassiveMessages('sms');
        });

        $('#sendEmailMassiveBtn').on('click', () => {
            this.sendMassiveMessages('email');
        });
    }

    async loadMessages() {
        try {
            $('#loadingState').show();
            $('#emptyState, #messagesGrid').hide();

            const response = await $.ajax({
                url: '/Manage/GetMotivationalMessages',
                type: 'GET'
            });

            if (response.success) {
                this.messages = response.data;
                this.updateStats();
                this.applyFilters();
            } else {
                this.showError(response.message || 'Error al cargar los mensajes');
            }
        } catch (error) {
            console.error('Error loading messages:', error);
            this.showError('Error al cargar los mensajes');
        } finally {
            $('#loadingState').hide();
        }
    }

    updateStats() {
        $('#totalMessages').text(this.messages.length);
    }

    applyFilters() {
        const specialtyFilter = $('#specialtyFilter').val();
        const statusFilter = $('#statusFilter').val();
        const typeFilter = $('#typeFilter').val();

        this.filteredMessages = this.messages.filter(message => {
            const specialtyMatch = !specialtyFilter || message.specialty.toString() === specialtyFilter;
            const statusMatch = !statusFilter || message.isActive.toString() === statusFilter;
            const typeMatch = !typeFilter || (message.specialty === 0).toString() === typeFilter;
            
            return specialtyMatch && statusMatch && typeMatch;
        });

        this.renderMessages();
    }

    renderMessages() {
        const $grid = $('#messagesGrid');
        
        if (this.filteredMessages.length === 0) {
            $('#emptyState').show();
            $('#messagesGrid').hide();
            $('#messageCount').text('0');
            return;
        }

        $('#emptyState').hide();
        $('#messagesGrid').show();
        $('#messageCount').text(this.filteredMessages.length);

        $grid.empty();

        this.filteredMessages.forEach(message => {
            const messageCard = this.createMessageCard(message);
            $grid.append(messageCard);
        });
    }

    createMessageCard(message) {
        const specialtyClass = this.getSpecialtyClass(message.specialty);
        const statusIcon = message.isActive ? 'check-circle text-success' : 'times-circle text-danger';
        const statusText = message.isActive ? 'Activo' : 'Inactivo';

        return `
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card motivational-card h-100">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="specialty-badge ${specialtyClass}">${message.specialtyName}</span>
                            <div class="dropdown">
                                <button class="btn btn-sm btn-light" data-bs-toggle="dropdown">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item"   data-edit-message="${message.id}">
                                        <i class="fas fa-edit me-2"></i>Editar
                                    </a></li>
                                    <li><a class="dropdown-item"   data-toggle-status="${message.id}">
                                        <i class="fas fa-toggle-${message.isActive ? 'off' : 'on'} me-2"></i>
                                        ${message.isActive ? 'Desactivar' : 'Activar'}
                                    </a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item text-danger"   data-delete-message="${message.id}">
                                        <i class="fas fa-trash me-2"></i>Eliminar
                                    </a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="message-preview mb-3 flex-grow-1">
                            <p class="mb-0">${message.message}</p>
                        </div>

                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="badge bg-light text-dark">
                                    <i class="fas fa-${statusIcon} me-1"></i>
                                    ${statusText}
                                </span>
                                <span class="badge ${message.specialty === 0 ? 'bg-info' : 'bg-secondary'}">
                                    ${message.specialty === 0 ? 'General' : 'Específico'}
                                </span>
                            </div>

                            <div class="message-stats">
                                <div class="row g-2 text-center">
                                    <div class="col-4">
                                        <small class="d-block fw-bold">${message.timesUsed}</small>
                                        <small>Enviados</small>
                                    </div>
                                    <div class="col-4">
                                        <small class="d-block fw-bold">${message.periodicityDays || 'N/A'}</small>
                                        <small>Días</small>
                                    </div>
                                    <div class="col-4">
                                        <small class="d-block fw-bold">${message.lastUsed}</small>
                                        <small>Último uso</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSpecialtyClass(specialty) {
        switch(specialty) {
            case 1: return 'specialty-gynecology';
            case 2: return 'specialty-psychology';
            case 3: return 'specialty-nutrition';
            case 4: return 'specialty-endocrinology';
            default: return 'specialty-generic';
        }
    }

    async openMessageModal(messageId = null) {
        const isEditMode = messageId !== null;
        let messageData = null;

        if (isEditMode) {
            messageData = this.messages.find(m => m.id === messageId);
            if (!messageData) {
                this.showError('Mensaje no encontrado');
                return;
            }
        }

        const { value: formData } = await Swal.fire({
            title: isEditMode ? '<i class="fas fa-edit text-warning"></i> Editar Mensaje' : '<i class="fas fa-plus text-success"></i> Nuevo Mensaje',
            html: this.getMessageFormHTML(messageData, isEditMode),
            width: 900,
            heightAuto: true,
            customClass: {
                popup: 'swal-message-modal',
                htmlContainer: 'swal-message-content'
            },
            scrollbarPadding: false,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: isEditMode ? '<i class="fas fa-save"></i> Actualizar' : '<i class="fas fa-save"></i> Guardar',
            cancelButtonText: '<i class="fas fa-times"></i> Cancelar',
            confirmButtonColor: isEditMode ? '#17a2b8' : '#28a745',
            didOpen: () => {
                this.setupMessageModalEvents();
                
                const popup = document.querySelector('.swal-message-modal');
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
                return this.validateAndGetMessageFormData(messageId);
            }
        });

        if (formData) {
            await this.saveMessage(formData, isEditMode);
        }
    }

    getMessageFormHTML(messageData = null, isEditMode = false) {
        const data = messageData || {};
        
        return `
            <div class="text-start">
                <div class="row g-3 mb-3">
                    <div class="col-12">
                        <label class="form-label fw-semibold">Mensaje Motivacional</label>
                        <textarea id="messageContent" class="form-control" rows="4" placeholder="Escribe un mensaje orientado a la importancia de la atención médica oportuna..." maxlength="1400" required>${data.fullMessage || ''}</textarea>
                        <div class="d-flex justify-content-between mt-1">
                            <small class="text-muted">Mensaje para envío automático masivo</small>
                            <small class="text-muted"><span id="messageCharCount">0</span>/1400</small>
                        </div>
                    </div>
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Categoría</label>
                        <select id="messageSpecialty" class="form-select" required style="cursor: pointer;">
                            <option value="0" ${data.specialty === 0 ? 'selected' : ''}>General</option>
                            <option value="1" ${data.specialty === 1 ? 'selected' : ''}>Ginecología</option>
                            <option value="2" ${data.specialty === 2 ? 'selected' : ''}>Psicología</option>
                            <option value="3" ${data.specialty === 3 ? 'selected' : ''}>Nutrición</option>
                            <option value="4" ${data.specialty === 4 ? 'selected' : ''}>Endocrinología</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Periodicidad (días)</label>
                        <select id="messagePeriodicityDays" class="form-select">
                            <option value="">Sin periodicidad automática (A demanda)</option>
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

                <div class="row g-3 mb-3">
                    <div class="col-md-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="messageIsActive" ${data.isActive !== false ? 'checked' : ''}>
                            <label class="form-check-label" for="messageIsActive">
                                Mensaje activo
                            </label>
                        </div>
                    </div>
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-md-6">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="messageOnlyIfNoActivity" ${data.onlyIfNoRecentActivity !== false ? 'checked' : ''}>
                            <label class="form-check-label" for="messageOnlyIfNoActivity">
                                Solo enviar si no hay actividad reciente
                            </label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">Días sin actividad</label>
                        <select id="messageDaysWithoutActivity" class="form-select">
                            <option value="3" ${data.daysWithoutActivity === 3 ? 'selected' : ''}>3 días</option>
                            <option value="7" ${data.daysWithoutActivity === 7 ? 'selected' : ''}>1 semana</option>
                            <option value="14" ${data.daysWithoutActivity === 14 ? 'selected' : ''}>2 semanas</option>
                            <option value="21" ${data.daysWithoutActivity === 21 ? 'selected' : ''}>3 semanas</option>
                            <option value="30" ${data.daysWithoutActivity === 30 ? 'selected' : ''}>1 mes</option>
                        </select>
                    </div>
                </div>

                <div class="row g-3 mb-3">
                    <div class="col-12">
                        <label class="form-label fw-semibold">
                            <i class="fas fa-paper-plane text-primary me-1"></i>Canales de envío automático
                        </label>
                        <div class="row g-2">
                            <div class="col-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="messageSendViaWhatsApp" ${data.sendViaWhatsApp !== false ? 'checked' : ''}>
                                    <label class="form-check-label d-flex align-items-center" for="messageSendViaWhatsApp">
                                        <i class="fab fa-whatsapp text-success me-1"></i>WhatsApp
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="messageSendViaSMS" ${data.sendViaSMS === true ? 'checked' : ''}>
                                    <label class="form-check-label d-flex align-items-center" for="messageSendViaSMS">
                                        <i class="fas fa-sms text-info me-1"></i>SMS
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="messageSendViaEmail" ${data.sendViaEmail !== false ? 'checked' : ''}>
                                    <label class="form-check-label d-flex align-items-center" for="messageSendViaEmail">
                                        <i class="fas fa-envelope text-warning me-1"></i>Email
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="alert alert-info">
                    <i class="fas fa-lightbulb me-2"></i>
                    <strong>Consejos:</strong> 
                    Los mensajes se envían automáticamente según la configuración para recordar a los pacientes 
                    la importancia de mantener su atención médica regular y seguir las recomendaciones del especialista.
                </div>
            </div>
        `;
    }

    setupMessageModalEvents() {
        
        const updateCharCounter = () => {
            const content = document.getElementById('messageContent').value;
            document.getElementById('messageCharCount').textContent = content.length;
        };

        document.getElementById('messageContent').addEventListener('input', updateCharCounter);
        updateCharCounter();

        
        const toggleActivitySettings = () => {
            const checkbox = document.getElementById('messageOnlyIfNoActivity');
            const daysSelect = document.getElementById('messageDaysWithoutActivity');
            
            daysSelect.disabled = !checkbox.checked;
            daysSelect.style.opacity = checkbox.checked ? '1' : '0.5';
        };

        document.getElementById('messageOnlyIfNoActivity').addEventListener('change', toggleActivitySettings);
        toggleActivitySettings();
    }

    validateAndGetMessageFormData(messageId = null) {
        const content = document.getElementById('messageContent').value.trim();
        const specialty = parseInt(document.getElementById('messageSpecialty').value);
        const periodicityDays = document.getElementById('messagePeriodicityDays').value;
        const isActive = document.getElementById('messageIsActive').checked;
        const onlyIfNoActivity = document.getElementById('messageOnlyIfNoActivity').checked;
        const daysWithoutActivity = parseInt(document.getElementById('messageDaysWithoutActivity').value);
        const sendViaWhatsApp = document.getElementById('messageSendViaWhatsApp').checked;
        const sendViaSMS = document.getElementById('messageSendViaSMS').checked;
        const sendViaEmail = document.getElementById('messageSendViaEmail').checked;

        if (!content) {
            Swal.showValidationMessage('El mensaje es requerido');
            return false;
        }

        if (content.length < 10) {
            Swal.showValidationMessage('El mensaje debe tener al menos 10 caracteres');
            return false;
        }

        if (content.length > 1400) {
            Swal.showValidationMessage('El mensaje excede el límite de WhatsApp (1400 caracteres)');
            return false;
        }

        if (!sendViaWhatsApp && !sendViaSMS && !sendViaEmail) {
            Swal.showValidationMessage('Debe seleccionar al menos un canal de envío automático');
            return false;
        }

        return {
            MotivationalMessageId: messageId || 0,
            Message: content,
            Specialty: specialty,
            PeriodicityDays: periodicityDays ? parseInt(periodicityDays) : null,
            IsActive: isActive,
            OnlyIfNoRecentActivity: onlyIfNoActivity,
            DaysWithoutActivity: daysWithoutActivity,
            SendViaWhatsApp: sendViaWhatsApp,
            SendViaSMS: sendViaSMS,
            SendViaEmail: sendViaEmail
        };
    }

    async saveMessage(messageData, isEditMode = false) {
        try {
            Swal.fire({
                title: isEditMode ? 'Actualizando...' : 'Guardando...',
                text: isEditMode ? 'Actualizando mensaje' : 'Guardando nuevo mensaje',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const response = await $.ajax({
                url: '/Manage/CreateOrUpdateMotivationalMessage',
                type: 'POST',
                data: messageData
            });

            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: isEditMode ? '¡Actualizado!' : '¡Guardado!',
                    text: response.message,
                    timer: 2000,
                    showConfirmButton: false
                });
                this.loadMessages();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message
                });
            }
        } catch (error) {
            console.error('Error saving message:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error al comunicarse con el servidor'
            });
        }
    }

    async editMessage(messageId) {
        await this.openMessageModal(messageId);
    }

    async deleteMessage(messageId) {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará permanentemente el mensaje motivacional',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: '<i class="fas fa-trash"></i> Sí, eliminar',
            cancelButtonText: '<i class="fas fa-times"></i> Cancelar'
        });

        if (result.isConfirmed) {
            try {
                Swal.fire({
                    title: 'Eliminando...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                const response = await $.ajax({
                    url: '/Manage/DeleteMotivationalMessage',
                    type: 'POST',
                    data: { id: messageId }
                });

                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Eliminado!',
                        text: response.message,
                        timer: 2000,
                        showConfirmButton: false
                    });
                    this.loadMessages();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message
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
    }

    async toggleStatus(messageId) {
        try {
            const response = await $.ajax({
                url: '/Manage/ToggleMotivationalMessageStatus',
                type: 'POST',
                data: { id: messageId }
            });

            if (response.success) {
                this.showSuccess(response.message);
                this.loadMessages();
            } else {
                this.showError(response.message);
            }
        } catch (error) {
            console.error('Error toggling status:', error);
            this.showError('Error al cambiar el estado del mensaje');
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

    showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });
    }

    async sendMassiveMessages(messageType) {
        try {
            
            const calculationResponse = await $.ajax({
                url: '/Manage/GetMassiveMessageRecipients',
                type: 'POST',
                data: { messageType: messageType }
            });

            if (!calculationResponse.success) {
                this.showError(calculationResponse.message);
                return;
            }

            const { recipientCount, costPerMessage, totalCost, availableCredits, hasEnoughCredits } = calculationResponse;

            if (recipientCount === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'Sin destinatarios',
                    text: 'No se encontraron pacientes elegibles para recibir mensajes motivacionales en este momento.',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            
            const messageTypeNames = {
                'whatsapp': 'WhatsApp',
                'sms': 'SMS',
                'email': 'Email'
            };

            const iconNames = {
                'whatsapp': 'fab fa-whatsapp',
                'sms': 'fas fa-sms',
                'email': 'fas fa-envelope'
            };

            
            let confirmationText = `
                <div class="text-start">
                    <div class="alert alert-info">
                        <i class="${iconNames[messageType]} me-2"></i>
                        <strong>Tipo:</strong> ${messageTypeNames[messageType]}<br>
                        <i class="fas fa-users me-2"></i>
                        <strong>Destinatarios:</strong> ${recipientCount} pacientes<br>
            `;

            if (messageType !== 'email') {
                confirmationText += `
                        <i class="fas fa-coins me-2"></i>
                        <strong>Costo por mensaje:</strong> ${costPerMessage} créditos<br>
                        <i class="fas fa-calculator me-2"></i>
                        <strong>Costo total:</strong> ${totalCost} créditos<br>
                        <i class="fas fa-wallet me-2"></i>
                        <strong>Créditos disponibles:</strong> ${availableCredits}
                `;
            }

            confirmationText += `
                    </div>
                    <p class="mb-2">
                        <i class="fas fa-info-circle text-primary me-2"></i>
                        Se enviarán mensajes motivacionales a pacientes según la configuración de periodicidad y especialidad.
                    </p>
            `;

            if (!hasEnoughCredits && messageType !== 'email') {
                confirmationText += `
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        <strong>Créditos insuficientes</strong><br>
                        Necesitas ${totalCost - availableCredits} créditos adicionales para completar este envío.
                    </div>
                `;
            }

            confirmationText += `</div>`;

            const result = await Swal.fire({
                title: `<i class="${iconNames[messageType]} me-2"></i>Envío Masivo por ${messageTypeNames[messageType]}`,
                html: confirmationText,
                icon: hasEnoughCredits || messageType === 'email' ? 'question' : 'warning',
                showCancelButton: true,
                confirmButtonText: hasEnoughCredits || messageType === 'email' ? 
                    '<i class="fas fa-paper-plane me-2"></i>Enviar Ahora' : 
                    '<i class="fas fa-credit-card me-2"></i>Recargar Créditos',
                cancelButtonText: '<i class="fas fa-times me-2"></i>Cancelar',
                confirmButtonColor: hasEnoughCredits || messageType === 'email' ? '#28a745' : '#ffc107',
                cancelButtonColor: '#6c757d',
                allowOutsideClick: false
            });

            if (result.isConfirmed) {
                if (!hasEnoughCredits && messageType !== 'email') {
                    
                    Swal.fire({
                        icon: 'info',
                        title: 'Recarga de Créditos',
                        text: 'Contacta al administrador para recargar créditos y poder realizar el envío masivo.',
                        confirmButtonText: 'Entendido'
                    });
                    return;
                }

                
                this.performMassiveSend(messageType, recipientCount);
            }
        } catch (error) {
            console.error('Error in sendMassiveMessages:', error);
            this.showError('Error al calcular el envío masivo');
        }
    }

    async performMassiveSend(messageType, expectedCount) {
        try {
            const messageTypeNames = {
                'whatsapp': 'WhatsApp',
                'sms': 'SMS',
                'email': 'Email'
            };

            
            Swal.fire({
                title: `Enviando por ${messageTypeNames[messageType]}`,
                html: `
                    <div class="text-center">
                        <div class="spinner-border text-primary mb-3" role="status">
                            <span class="visually-hidden">Enviando...</span>
                        </div>
                        <p class="mb-2">Procesando envío masivo de mensajes motivacionales...</p>
                        <p class="text-muted small mb-0">Este proceso puede tardar algunos minutos</p>
                    </div>
                `,
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                customClass: {
                    popup: 'swal-wide'
                }
            });

            const response = await $.ajax({
                url: '/Manage/SendMassiveMotivationalMessages',
                type: 'POST',
                data: { messageType: messageType },
                timeout: 300000 
            });

            if (response.success) {
                let resultText = `${response.sent} mensajes enviados exitosamente`;
                if (response.errors > 0) {
                    resultText += ` (${response.errors} errores)`;
                }

                Swal.fire({
                    icon: 'success',
                    title: '¡Envío Completado!',
                    html: `
                        <div class="text-center">
                            <div class="alert alert-success">
                                <i class="fas fa-check-circle me-2"></i>
                                ${resultText}
                            </div>
                            <p class="text-muted">Los mensajes han sido procesados y están siendo entregados.</p>
                        </div>
                    `,
                    confirmButtonText: 'Excelente',
                    confirmButtonColor: '#28a745'
                });

                
                this.loadMessages();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el Envío',
                    text: response.message || 'No se pudieron enviar los mensajes',
                    confirmButtonText: 'Entendido'
                });
            }
        } catch (error) {
            console.error('Error in performMassiveSend:', error);
            
            let errorMessage = 'Error al realizar el envío masivo';
            if (error.status === 408 || error.statusText === 'timeout') {
                errorMessage = 'El envío está tomando más tiempo del esperado. Por favor revisa el historial de transacciones.';
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                confirmButtonText: 'Entendido'
            });
        }
    }
}


$(document).ready(() => {
    console.log('Creating MotivationalMessagesManagement instance...');
    window.motivationalMessagesManagement = new MotivationalMessagesManagement();
});


window.MotivationalMessagesManagement = MotivationalMessagesManagement;