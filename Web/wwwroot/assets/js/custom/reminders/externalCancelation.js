"use strict";

var KTSigninGeneral2 = function () { 
    var form;
    var submitButton;
    var validator;
     
    var handleValidation = function (e) {
          validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'codeConfirmation': {
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
                  codeConfirmation: form.querySelector('[name="codeConfirmation"]').value, 
                  userId2: form.querySelector('[name="UserId2"]').value, 
                  cancelReason: form.querySelector('[name="cancelReason"]').value
                   };
         
            validator.validate().then(function (status) {
                if (status == 'Valid') { 
                    axios.post(urlcAction2, objToPush).then(function (response) {
                        if (response.data) {
                            if (response.data.success == true) {
                                Swal.fire({
                                    text: "Cita Cancelada",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: ":D",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                });
                                setTimeout(function () {
                                    console.log(response.data.randomCode);
                                    window.location.href = '/Portal/ConfirmCancelationDate?code=' + response.data.randomCode;

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
            form = document.querySelector('#kt_sign_in_form2');
            submitButton = document.querySelector('#kt_action-submit2');

            handleValidation();
            handleSubmitAjax(); 
        }
    };
}();
 
KTUtil.onDOMContentLoaded(function () {
    KTSigninGeneral2.init();
});
 
 