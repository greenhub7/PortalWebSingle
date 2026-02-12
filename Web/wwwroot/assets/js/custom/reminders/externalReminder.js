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
                    'email': {
                        validators: {
                            notEmpty: {
                                message: 'Req...'
                            }
                        }
                    },
                    'lastname': {
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
                submitButton.setAttribute('data-kt-indicator', 'on');

              submitButton.disabled = true;
              var objToPush = {
                  patientName: form.querySelector('[name="name"]').value,
                  patientLastname: form.querySelector('[name="lastname"]').value,
                  patientMail: form.querySelector('[name="email"]').value,
                  patientPhone: form.querySelector('[name="tel"]').value,
                  rnc: form.querySelector('[name="rnc"]').value,
                  selectedDate: form.querySelector('[name="dateStr"]').value,
                  selectedTimeFrom: form.querySelector('[name="timeFromStr"]').value,
                  selectedTimeTo: form.querySelector('[name="timeToStr"]').value,
                  userId: form.querySelector('[name="DoctorUserId"]').value,
                  visitReason: form.querySelector('[name="visitReason"]').value
                   };
         
            validator.validate().then(function (status) {
                if (status == 'Valid') { 
                    axios.post(urlcAction, objToPush).then(function (response) {
                        if (response.data) {
                            if (response.data.success == true) {
                                Swal.fire({
                                    text: "Cita Agendada",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: ":D",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                });
                                setTimeout(function () {
                                    console.log(response.data.randomCode);
                                    window.location.href = '/Portal/ConfirmedDate?code=' + response.data.randomCode;

                                    

                                    
                                    
                                    
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
                                text: "Error intentando guardar, intente nuevamente.",
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
        }
    };
}();
 
KTUtil.onDOMContentLoaded(function () {
    KTSigninGeneral.init();
});
 
function openModal(dateStr, timeFromStr, timeToStr) { 
    var cDate = psFormatDateStr(dateStr); 
    $('[name="dateStr"]').val(cDate); 
    $('input[tabindex="0"]').val(cDate);
    $('[name="timeFromStr"]').val(timeFromStr);
    $('[name="timeToStr"]').val(timeToStr);
 
}

$(document).ready(function () { 
    $('.readonly-date').on('focus', function (e) {
        e.preventDefault();
    });
        $('#fromDate').on('change', function () {
            var selectedValue = $(this).val(); 
            window.location.href = '/' + $('#FriendlyUrl').val() + '?fec=' + selectedValue;
        });
}); 
