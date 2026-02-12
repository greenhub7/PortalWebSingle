document.addEventListener('DOMContentLoaded', function () {

    const appointmentForm = document.getElementById('appointment-form');
    const cancelForm = document.getElementById('cancel-appointment-form');

    const submitAppointmentBtn = document.getElementById('kt_action-submit');
    const submitCancelBtn = document.getElementById('kt_action-submit2');
     
    if (document.getElementById('SelectedDate')) {
        flatpickr("#datepicker", {
            dateFormat: "d/m/Y",
            minDate: "today",
            locale: {
                firstDayOfWeek: 1,
                weekdays: {
                    shorthand: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                    longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
                },
                months: {
                    shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                    longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                }
            },
            onChange: function (selectedDates, dateStr) {
                if (dateStr) {
                    window.location.href = window.location.pathname + "?fec=" + dateStr;
                }
            }
        });
    }
     
    const recordInput = document.getElementById('Record2');
    if (recordInput) {
        recordInput.addEventListener('blur', async function () {
            if (recordInput.value.trim().length > 0) {
                const formData = {
                    record: recordInput.value,
                    doctorId: document.getElementById('UserId').value
                };

                try {
                    const response = await fetch('/Portal/ValidateRecord', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();

                    if (data.success && data.patient) {
                        
                        document.getElementById('PatientName').value = data.patient.name || '';
                        document.getElementById('PatientLastname').value = data.patient.lastName || '';
                        document.getElementById('PatientMail').value = data.patient.email || '';
                        document.getElementById('PatientPhone').value = data.patient.tel || '';
                        document.getElementById('Rnc').value = data.patient.rnc || '';

                        
                        validateFields();
                    }
                } catch (error) {
                    console.error('Error validando récord:', error);
                }
            }
        });
    }

    function validateForm(form) {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return false;
        }
        return true;
    }

    function toggleLoadingIndicator(button, isLoading) {
        const label = button.querySelector('.indicator-label');
        const progress = button.querySelector('.indicator-progress');

        if (isLoading) {
            label.classList.add('d-none');
            progress.classList.remove('d-none');
            button.disabled = true;
        } else {
            label.classList.remove('d-none');
            progress.classList.add('d-none');
            button.disabled = false;
        }
    }

    window.openModal = function (date, timeFrom, timeTo) {
        document.getElementById('SelectedDate').value = date;
        document.getElementById('SelectedTimeFrom').value = timeFrom;
        document.getElementById('SelectedTimeTo').value = timeTo;

        const timeInfoContainer = document.querySelector('.time-selection-info');
        if (timeInfoContainer) {
            if (!timeFrom && !timeTo) {
                timeInfoContainer.classList.remove('d-none');
                document.querySelector('.time-fields').classList.add('opacity-50');
            } else {
                timeInfoContainer.classList.add('d-none');
                document.querySelector('.time-fields').classList.remove('opacity-50');
            }
        }

        
        appointmentForm.reset();
        appointmentForm.classList.remove('was-validated');
        document.getElementById('SelectedDate').value = date;
        document.getElementById('SelectedTimeFrom').value = timeFrom;
        document.getElementById('SelectedTimeTo').value = timeTo;

        
        if (submitAppointmentBtn) {
            submitAppointmentBtn.disabled = false;
        }
    }
     
    function validateFields() {
        const requiredFields = appointmentForm.querySelectorAll('[required]');
        let allValid = true;

        requiredFields.forEach(field => {
            if (!field.checkValidity()) {
                allValid = false;
                field.classList.remove('is-valid');
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });

        
        if (submitAppointmentBtn) {
            submitAppointmentBtn.disabled = !allValid;
        }

        return allValid;
    }
     
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', validateFields);
        field.addEventListener('change', validateFields);
        field.addEventListener('blur', validateFields);
    });

    if (submitAppointmentBtn) {
        submitAppointmentBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (!validateForm(appointmentForm)) {
                Swal.fire({
                    title: 'Formulario incompleto',
                    text: 'Por favor complete todos los campos requeridos.',
                    icon: 'warning',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            toggleLoadingIndicator(submitAppointmentBtn, true);

            const formData = {
                userId: document.getElementById('UserId').value,
                patientName: document.getElementById('PatientName').value,
                patientLastname: document.getElementById('PatientLastname').value,
                patientMail: document.getElementById('PatientMail').value,
                patientPhone: document.getElementById('PatientPhone').value,
                rnc: document.getElementById('Rnc').value,
                visitReason: document.getElementById('VisitReason').value,
                selectedDate: document.getElementById('SelectedDate').value,
                selectedTimeFrom: document.getElementById('SelectedTimeFrom').value,
                selectedTimeTo: document.getElementById('SelectedTimeTo').value,
                record2: document.getElementById('Record2') ? document.getElementById('Record2').value : ''
            };

            fetch(urlcAction, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    toggleLoadingIndicator(submitAppointmentBtn, false);

                    if (data.success) {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('kt_modal_1'));
                        modal.hide();

                        Swal.fire({
                            title: '¡Cita confirmada!',
                            text: 'Su código de confirmación es: ' + data.randomCode + '. Por favor guárdelo para futuras referencias.',
                            icon: 'success',
                            confirmButtonText: 'Entendido'
                        }).then(() => {
                            window.location.href = '/Portal/ConfirmedDate?code=' + data.randomCode;
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: data.errorMessage || 'Ha ocurrido un error al procesar su solicitud.',
                            icon: 'error',
                            confirmButtonText: 'Entendido'
                        });
                    }
                })
                .catch(error => {
                    toggleLoadingIndicator(submitAppointmentBtn, false);

                    Swal.fire({
                        title: 'Error',
                        text: 'Ha ocurrido un error al procesar su solicitud.',
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                    console.error('Error:', error);
                });
        });
    }

    if (submitCancelBtn) {
        submitCancelBtn.addEventListener('click', function (e) {
            e.preventDefault();

            if (!validateForm(cancelForm)) {
                Swal.fire({
                    title: 'Formulario incompleto',
                    text: 'Por favor complete todos los campos requeridos.',
                    icon: 'warning',
                    confirmButtonText: 'Entendido'
                });
                return;
            }

            toggleLoadingIndicator(submitCancelBtn, true);

            const formData = {
                userId2: document.getElementById('UserId2').value,
                codeConfirmation: document.getElementById('CodeConfirmation').value,
                cancelReason: document.getElementById('CancelReason').value,
                patientMail: document.getElementById('PatientMailCancel') ? document.getElementById('PatientMailCancel').value : '',
                patientName: document.getElementById('PatientNameCancel') ? document.getElementById('PatientNameCancel').value : ''
            };

            fetch(urlcAction2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    toggleLoadingIndicator(submitCancelBtn, false);

                    if (data.success) {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('kt_modal_2'));
                        modal.hide();

                        Swal.fire({
                            title: 'Cita cancelada',
                            text: 'Su cita ha sido cancelada exitosamente.',
                            icon: 'success',
                            confirmButtonText: 'Entendido'
                        }).then(() => {
                            window.location.href = '/Portal/ConfirmCancelationDate?code=' + data.randomCode;
                        });
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: data.errorMessage || 'Ha ocurrido un error al procesar su solicitud.',
                            icon: 'error',
                            confirmButtonText: 'Entendido'
                        });
                    }
                })
                .catch(error => {
                    toggleLoadingIndicator(submitCancelBtn, false);

                    Swal.fire({
                        title: 'Error',
                        text: 'Ha ocurrido un error al procesar su solicitud.',
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    });
                    console.error('Error:', error);
                });
        });
    }
});