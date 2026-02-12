"use strict";


var KTSigninGeneral = function() {
    
    var form;
    var submitButton;
    var validator;

    
    var handleValidation = function(e) {
        
        validator = FormValidation.formValidation(
			form,
			{
				fields: {					
					'email': {
                        validators: {
                            regexp: {
                                regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Val Invalid',
                            },
							notEmpty: {
								message: 'Email Req...'
							}
						}
					},
                    'password': {
                        validators: {
                            notEmpty: {
                                message: 'Pass Req...'
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
    
    var handleSubmitAjax = function(e) {
        
        submitButton.addEventListener('click', function (e) {
            
            e.preventDefault();
                    
            submitButton.setAttribute('data-kt-indicator', 'on');

            
            submitButton.disabled = true;
            
            validator.validate().then(function (status) {
                if (status == 'Valid') {
                              
                    
                    axios.post(urlcAction, {
                        email: form.querySelector('[name="email"]').value, 
                        password: form.querySelector('[name="password"]').value 
                    }).then(function (response) {
                        if (response.data) { 
                            if (response.data.success == true) {
                                Swal.fire({
                                    text: "Acceso Concedido!",
                                    icon: "success",
                                    buttonsStyling: false,
                                    confirmButtonText: "Hey!, puedes pasar, Bienvenid@ :D",
                                    customClass: {
                                        confirmButton: "btn btn-primary"
                                    }
                                });
                                setTimeout(function () {
                                    form.querySelector('[name="email"]').value = "";
                                    form.querySelector('[name="password"]').value = "";

                                    const redirectUrl = form.getAttribute('data-kt-redirect-url');

                                    if (redirectUrl) {
                                        location.href = redirectUrl;
                                    } else {
                                        location.href = '/Portal/Index';  
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
                                text: "Usuario o Contrasea incorrectos, intente nuevamente.",
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
        
        init: function() {
            form = document.querySelector('#kt_sign_in_form');
            submitButton = document.querySelector('#kt_sign_in_submit');
            
            handleValidation();
            
             handleSubmitAjax(); 
        }
    };
}();


KTUtil.onDOMContentLoaded(function() {
    KTSigninGeneral.init();
});
