"use strict";

var KTSigninGeneral = function () {
    var form;
    var submitButton;
    var validator;

    var handleValidation = function (e) {
        validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'name': {
                        validators: {
                            notEmpty: {
                                message: 'Req...'
                            }
                        }
                    }, 
                    'dateStr': {
                        validators: {
                            notEmpty: {
                                message: 'Req...'
                            }
                        }
                    },
                    'description': {
                        validators: {
                            notEmpty: {
                                message: 'Req...'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',  
                        eleValidClass: ''  
                    })
                }
            }
        );
    }

    var handleSubmitAjax = function (e) {
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation(); 
             
            if (!validateReminderTimes()) { 
                
                return false;
            }
            
            submitButton.setAttribute('data-kt-indicator', 'on');
            submitButton.disabled = true;
            
            validator.validate().then(function (status) { 
                if (status == 'Valid') {
                    
                    if (!validateReminderTimes()) { 
                        enableButton();
                        return false;
                    }
                      
                    
                    var timeFromStr = form.querySelector('[name="timeFromStr"]').value || document.getElementById('Reminder_TimeFromStr').value;
                    var timeToStr = form.querySelector('[name="timeToStr"]').value || document.getElementById('Reminder_TimeToStr').value;
                    
                    axios.post(urlcAction, {
                        name: form.querySelector('[name="name"]').value,
                        description: form.querySelector('[name="description"]').value,
                        reminderTypeId: form.querySelector('[name="ReminderTypeId"]').value,   
                        userToId: form.querySelector('[name="UserToId"]').value,   
                        dateStr: form.querySelector('[name="dateStr"]').value,
                        timeFromStr: convertAMPMToMilitary(timeFromStr),
                        timeToStr: convertAMPMToMilitary(timeToStr),
                        showAll: form.querySelector('[name="Reminder.ShowAll"]').checked
                    }).then(function (response) {
                        if (response.data) {
                            if (response.data.success == true) {
                                Swal.fire({
                                    text: "Recordatorio Guardado",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: ":D",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                });
                                setTimeout(function () {
                                    
                                    form.querySelector('[name="name"]').value = "";
                                    form.querySelector('[name="description"]').value = "";
                                    form.querySelector('[name="timeFromStr"]').value = "";
                                    form.querySelector('[name="timeToStr"]').value = "";
                                    
                                    
                                    $('#kt_modal_1').modal('hide');

                                    const redirectUrl = form.getAttribute('data-kt-redirect-url');

                                    if (redirectUrl) {
                                        location.href = redirectUrl;
                                    }
                                }, 1000);
                            }
                            else {
                                Swal.fire({
                                    text: response.data.errorMessage,
                                    icon: "error",
                                    buttonsStyling: false,
                                    confirmButtonText: "Ok, :D",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                });
                                enableButton();
                            }
                        } else {
                            Swal.fire({
                                text: "Usuario o Contrase�a incorrectos, intente nuevamente.",
                                icon: "error",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, :D",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            });
                            enableButton();
                        }
                    }).catch(function (error) {
                        Swal.fire({
                            text: "mmmm, parece que hay algunos errores detectados, intenta nuevamente.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, :D",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                        enableButton();
                    });
                } else {
                    Swal.fire({
                        text: "mmmm, parece que hay algunos errores detectados, intenta nuevamente.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, :D",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                    enableButton();
                }
            });

            function enableButton() {
                submitButton.removeAttribute('data-kt-indicator');
                submitButton.disabled = false;
            }
        });
    }

    return {
        init: function () {
            form = document.querySelector('#kt_sign_in_form');
            submitButton = document.querySelector('#kt_action-submit');

            handleValidation();
            handleSubmitAjax();
            
            
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); 
                    
                    if (!validateReminderTimes()) { 
                        return false;
                    }
                    
                    
                    submitButton.click();
                    return false;
                });
            }
        }
    };
}();

KTUtil.onDOMContentLoaded(function () {
    KTSigninGeneral.init();
});

 
    $(document).ready(function () {
        $('#fromDate').on('change', function () {
            var selectedValue = $(this).val();
            window.location.href = '/Portal/Web?dateFrom=' + selectedValue;
        });
});


window.openReminderModal = function(type) {
    if (type === 'reminder') {
        $('#modalTitle').text('Agregar Recordatorio');
        
        
        
        setTimeout(function() {
            $(".PsTimesReminder").each(function() {
                
                if (this._flatpickr) {
                    this._flatpickr.destroy();
                }
                
                $(this).flatpickr({
                    enableTime: true,
                    disableMobile: true,
                    noCalendar: true,
                    dateFormat: "h:i K", 
                    time_24hr: false, 
                    minuteIncrement: 15, 
                    defaultHour: 9, 
                    defaultMinute: 0
                });
            });
        }, 100);
    } else if (type === 'appointment') {
        $('#modalTitle').text('Programar Cita');
        
    }
}


window.showTimelineTab = function(day) {
    
    $('.timeline-day').removeClass('active');
    $('.timeline-date-btn').removeClass('btn-primary').addClass('btn-outline-primary');
    
    
    $('#timeline_day_' + day).addClass('active');
    $('[data-date="' + day + '"]').removeClass('btn-outline-primary').addClass('btn-primary');
    
    
    var currentDate = $('#fromDate').val();
    var selectedBtn = $('[data-date="' + day + '"]');
    if (selectedBtn.length > 0) {
        var selectedDateTitle = selectedBtn.attr('title'); 
    }
}


function validateReminderTimes() {
    
    var timeFromInput = document.querySelector('input[name="timeFromStr"]') || document.getElementById('Reminder_TimeFromStr');
    var timeToInput = document.querySelector('input[name="timeToStr"]') || document.getElementById('Reminder_TimeToStr');
    
    if (!timeFromInput || !timeToInput) {
        console.error('No se encontraron los campos de hora');
        console.error('timeFromInput:', timeFromInput);
        console.error('timeToInput:', timeToInput);
        return false;
    }
    
    var timeFrom = timeFromInput.value;
    var timeTo = timeToInput.value;
      
    
    if (!timeFrom || timeFrom.trim() === '') {
        Swal.fire({
            title: 'Campo Requerido',
            text: 'Debe seleccionar una hora de inicio para el recordatorio.',
            icon: 'warning',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#3085d6'
        });
        return false;
    }
    
    
    if (timeFrom && timeTo && timeTo.trim() !== '') {
        try {
            
            var startTime = convertTimeToMinutes(timeFrom);
            var endTime = convertTimeToMinutes(timeTo);
                  
            if (startTime >= endTime) {
                Swal.fire({
                    title: '❌ Error de Validación',
                    html: '<p>La hora de inicio <strong>(' + timeFrom + ')</strong> debe ser menor que la hora de finalización <strong>(' + timeTo + ')</strong>.</p>' +
                          '<p class="text-muted mt-2">Por ejemplo: Inicio 9:00 AM, Fin 10:00 AM</p>',
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#d33'
                });
                return false;
            }
             
        } catch (error) {
            console.error('Error al procesar horas:', error);
            Swal.fire({
                title: 'Error de Formato',
                text: 'Por favor verifique que las horas estén en formato correcto (ej: 2:30 PM).',
                icon: 'error', 
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#d33'
            });
            return false;
        }
    }
    
    return true;
}


function convertTimeToMinutes(timeStr) {
    if (!timeStr) return null;
      
    
    timeStr = timeStr.trim();
    
    
    var match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/i);
    if (!match) {
        
        var time24 = timeStr.match(/^(\d{1,2}):(\d{2})$/);
        if (time24) {
            var h24 = parseInt(time24[1]);
            var m24 = parseInt(time24[2]); 
            return h24 * 60 + m24;
        }
        console.error('Formato no reconocido:', timeStr);
        throw new Error('Formato de hora no válido: ' + timeStr);
    }
    
    var hours = parseInt(match[1]);
    var minutes = parseInt(match[2]);
    var meridian = match[3].toUpperCase();
         
    
    if (meridian === 'PM' && hours !== 12) {
        hours += 12;
    } else if (meridian === 'AM' && hours === 12) {
        hours = 0;
    }
    
    var totalMinutes = hours * 60 + minutes; 
    
    return totalMinutes;
}


function convertAMPMToMilitary(timeStr) {
    if (!timeStr || timeStr.trim() === '') {
        return '';
    }
    
    
    var militaryMatch = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (militaryMatch) {
        var hours = parseInt(militaryMatch[1]);
        var minutes = parseInt(militaryMatch[2]);
        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
            return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
        }
    }
    
    
    var match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) {
        console.warn('Formato de hora no reconocido:', timeStr);
        return timeStr; 
    }
    
    var hours = parseInt(match[1]);
    var minutes = parseInt(match[2]);
    var meridian = match[3].toUpperCase();
    
    
    if (meridian === 'PM' && hours !== 12) {
        hours += 12;
    } else if (meridian === 'AM' && hours === 12) {
        hours = 0;
    }
    
    
    return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
}
