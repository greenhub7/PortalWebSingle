"use strict";


var KTAuthI18nDemo = function() {
    
    var menu;
	
	var menuObj;

	var translationStrings = {
		
		"general-progress" : {
			"English" : "Please wait...",
			"Spanish" : "Espere...", 
		},
		"general-desc" : {
			"English": "Fast, Efficient and Productive Solution",
			"Spanish" : "Solución Rapida, Eficiente y Productiva",
			
			
			
		},
		"name-general-desc": {
			"English": "Digital Solution for Medicians",
			"Spanish": "Solución Médica Digital",
			
			
			
		},
		"general-or" : {
			"English" : "Or",
			"Spanish" : "O", 
		},

		
		"sign-in-head-desc" : {
			"English" : "Not a Member yet?",
			"Spanish" : "¿No eres miembro todavía?",
			
			
			
		},	
		 
		"sign-in-head-link" : {
			"English" : "Sign Up",
			"Spanish" : "Registrate",
			
			
			
		},	 

		"sign-in-title" : {
			"English" : "Sign In",
			"Spanish" : "Iniciar Sesión",
			
			
			
		},

		"sign-in-input-email" : {
			"English" : "Email",
			"Spanish" : "Email",
			
			
			
		},
		 
		"sign-in-forgot-password" : {
			"English" : "Forgot Password ?",
			"Spanish" : "Has olvidado tu contraseña ?",
			
			
			
		},

		"sign-in-submit" : {
			"English" : "Sign In",
			"Spanish" : "Acceder",
			
			
			
		},

		
		"sign-up-head-desc" : {
			"English" : "Already a member ?",
			"Spanish" : "Ya eres usuario ?",
			
			
			
		},	

	 
		
		"sign-up-title" : {
			"English" : "Sign Up",
			"Spanish" : "Inscribirse",
			
			
			
		},	

		"sign-up-input-first-name" : {
			"English" : "First Name",
			"Spanish" : "Primer nombre",
			
			
			
		},

		"sign-up-input-last-name" : {
			"English" : "Last Name",
			"Spanish" : "Apellido",
			
			
			
		},

		"sign-up-input-email" : {
			"English" : "Email",
			"Spanish" : "Correo electrónico",
			
			
			
		},

		"input-password" : {
			"English" : "Password",
			"Spanish" : "Clave",
		},

		"input-confirm-password" : {
			"English" : "Password",
			"Spanish" : "Clave", 
		},

		"sign-up-submit" : {
			"English" : "Submit",
			"Spanish" : "Registrarme",
		},

		"sign-up-hint" : {
			"English" : "Use 8 or more characters with a mix of letters, numbers & symbols.",
			"Spanish" : "Utilice 8 o más caracteres con una combinación de letras, números y símbolos.",
			
			
			
		},

		
		"new-password-head-desc" : {
			"English" : "Already a member ?",
			"Spanish" : "Ya eres usuario ?",
			
			
			
		},

	 

		"new-password-title" : {
			"English" : "Setup New Password",
			"Spanish" : "Configurar nueva contraseña",
			
			
			
		},

		"new-password-desc" : {
			"English" : "Have you already reset the password ?",
			"Spanish" : "¿Ya has restablecido la contraseña?",
			
			
			
		},
		 
		"new-password-hint" : {
			"English" : "Use 8 or more characters with a mix of letters, numbers & symbols.",
			"Spanish" : "Utilice 8 o más caracteres con una combinación de letras, números y símbolos.",
		 		},

		"new-password-confirm-password" : {
			"English" : "Confirm Password",
			"Spanish" : "Confirmar contraseña", 
		},

		"new-password-submit" : {
			"English" : "Submit",
			"Spanish" : "Cambiar Contraseña", 
		},

		
		"password-reset-head-desc" : {
			"English" : "Already a member ?",
			"Spanish" : "Ya eres usuario ?", 
		},

		 

		"password-reset-title" : {
			"English" : "Forgot Password ?",
			"Spanish" : "Has olvidado tu contraseña ?", 
		},

		"password-reset-desc" : {
			"English" : "Enter your email to reset your password.",
			"Spanish" : "Ingrese su correo electrónico para restablecer su contraseña.", 
		},

	 

		"password-reset-submit" : {
			"English" : "Submit",
			"Spanish" : "Reiniciar Contraseña", 
		},

		"password-reset-cancel" : {
			"English" : "Cancel",
			"Spanish" : "Cancelar", 
		},

		
		"two-step-head-desc" : {
			"English" : "Didn’t get the code ?",
			"Spanish" : "¿No recibiste el código?", 
		},	

		"two-step-head-resend" : {
			"English" : "Resend",
			"Spanish" : "Reenviar", 
		},
		  
		"two-step-head-call-us" : {
			"English" : "Call Us",
			"Spanish" : "Llámenos", 
		},

		"two-step-submit" : {
			"English" : "Submit",
			"Spanish" : "Acceder", 
		},

		"two-step-title" : {
			"English" : "Two Step Verification",
			"Spanish" : "Verificación de dos pasos", 
		},

		"two-step-deck" : {
			"English" : "Enter the verification code we sent to",
			"Spanish" : "Ingresa el código de verificación que enviamos a", 
		},

		"two-step-label" : {
			"English" : "Type your 6 digit security code",
			"Spanish" : "Escriba su código de seguridad de 6 dígitos", 
		}
	}

    
    var translate = function(lang) {
        for (var label in translationStrings) {
			if (translationStrings.hasOwnProperty(label)) {
				if (translationStrings[label][lang]) {
					let labelElement = document.querySelector('[data-kt-translate=' + label + ']');

					if (labelElement !== null) {
						if (labelElement.tagName === "INPUT") {
							labelElement.setAttribute("placeholder", translationStrings[label][lang]);
						} else {
							labelElement.innerHTML = translationStrings[label][lang];
						}						
					}
				}
			}
		}
    }

	var setLanguage = function(lang) {
		const selectedLang = menu.querySelector('[data-kt-lang="' + lang + '"]');

		if (selectedLang !== null) {
			const currentLangName = document.querySelector('[data-kt-element="current-lang-name"]'); 
			const currentLangFlag = document.querySelector('[data-kt-element="current-lang-flag"]'); 

			const selectedLangName = selectedLang.querySelector('[data-kt-element="lang-name"]');
			const selectedLangFlag = selectedLang.querySelector('[data-kt-element="lang-flag"]');

			currentLangName.innerText = selectedLangName.innerText;
			currentLangFlag.setAttribute("src", selectedLangFlag.getAttribute("src"));

			localStorage.setItem("kt_auth_lang", lang);
		}
	}

	var init = function() {
		if ( localStorage.getItem("kt_auth_lang") !== null ) {
			let lang = localStorage.getItem("kt_auth_lang");
			
			setLanguage(lang);
			translate(lang);
		}

		menuObj.on("kt.menu.link.click", function(element) {
			let lang = element.getAttribute("data-kt-lang");

			setLanguage(lang);
			translate(lang);
		});
	}

    
    return {
        
        init: function() {
            menu = document.querySelector('#kt_auth_lang_menu');

			if (menu === null) {
				return;
			} 

			menuObj = KTMenu.getInstance(menu);
            
            init();
        }
    };
}();


KTUtil.onDOMContentLoaded(function() {
    KTAuthI18nDemo.init();
});
