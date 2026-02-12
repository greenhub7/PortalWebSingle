"use strict";


var KTCareersApply = function () {
	var submitButton;
	var validator;
	var form;

	
	var initForm = function() {
		
        $(form.querySelector('[name="position"]')).on('change', function() {
            
            validator.revalidateField('position');
        });

		
		var startDate = $(form.querySelector('[name="start_date"]'));
		startDate.flatpickr({
			enableTime: false,
			dateFormat: "d/m/Y", 
		});
	}

	
	var handleForm = function() {
		

		
		validator = FormValidation.formValidation(
			form,
			{
				fields: {
					'first_name': {
						validators: {
							notEmpty: {
								message: 'First name is required'
							}
						}
					},
					'last_name': {
						validators: {
							notEmpty: {
								message: 'Last name is required'
							}
						}
					},
					'age': {
                        validators: {
							notEmpty: {
								message: 'Age is required'
							}
						}
					},
					'city': {
                        validators: {
							notEmpty: {
								message: 'City is required'
							}
						}
					},
					'email': {
                        validators: {
							notEmpty: {
								message: 'Email req...'
							},
                            emailAddress: {
								message: 'Val Invalid'
							}
						}
					},
					'salary': {
						validators: {
							notEmpty: {
								message: 'Expected salary is required'
							}
						}
					},
					'position': {
						validators: {
							notEmpty: {
								message: 'Position is required'
							}
						}
					},
					'start_date': {
						validators: {
							notEmpty: {
								message: 'Start date is required'
							}
						}
					},
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

			
			if (validator) {
				validator.validate().then(function (status) {
					console.log('validated!');

					if (status == 'Valid') {
						submitButton.setAttribute('data-kt-indicator', 'on');

						
						submitButton.disabled = true;

						setTimeout(function() {
							submitButton.removeAttribute('data-kt-indicator');

							
							submitButton.disabled = false;
							
							Swal.fire({
								text: "Form has been successfully submitted!",
								icon: "success",
								buttonsStyling: false,
								confirmButtonText: "Ok, got it!",
								customClass: {
									confirmButton: "btn btn-primary"
								}
							}).then(function (result) {
								if (result.isConfirmed) {
									
								}
							});

							
						}, 2000);   						
					} else {
						

						
						Swal.fire({
							text: "Sorry, looks like there are some errors detected, please try again.",
							icon: "error",
							buttonsStyling: false,
							confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn btn-primary"
							}
						}).then(function (result) {
							KTUtil.scrollTop();
						});
					}
				});
			}
		});
	}

	return {
		
		init: function () {
			
			form = document.querySelector('#kt_careers_form');
			submitButton = document.getElementById('kt_careers_submit_button');

			initForm();
			handleForm();
		}
	};
}();


KTUtil.onDOMContentLoaded(function () {
	KTCareersApply.init();
});