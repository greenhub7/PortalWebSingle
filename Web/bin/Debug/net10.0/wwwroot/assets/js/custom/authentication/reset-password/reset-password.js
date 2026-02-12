"use strict";


var KTAuthResetPassword = function() {
    
    var form;
    var submitButton;
	var validator;

    var handleForm = function(e) {
        
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

        submitButton.addEventListener('click', function (e) {
            e.preventDefault();

            
            validator.validate().then(function (status) {
                if (status == 'Valid') {
                    
                    submitButton.setAttribute('data-kt-indicator', 'on');

                    
                    submitButton.disabled = true;

                    
                    setTimeout(function() {
                        
                        submitButton.removeAttribute('data-kt-indicator');

                        
                        submitButton.disabled = false;

                        
                        Swal.fire({
                            text: "We have send a password reset link to your email.",
                            icon: "success",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        }).then(function (result) {
                            if (result.isConfirmed) { 
                                form.querySelector('[name="email"]').value= "";                          
                                

                                var redirectUrl = form.getAttribute('data-kt-redirect-url');
                                if (redirectUrl) {
                                    location.href = redirectUrl;
                                }
                            }
                        });
                    }, 1500);   						
                } else {
                    
                    Swal.fire({
                        text: "Sorry, looks like there are some errors detected, please try again.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary"
                        }
                    });
                }
            });  
		});
    }

    
    return {
        
        init: function() {
            form = document.querySelector('#kt_password_reset_form');
            submitButton = document.querySelector('#kt_password_reset_submit');

            handleForm();
        }
    };
}();


KTUtil.onDOMContentLoaded(function() {
    KTAuthResetPassword.init();
});
