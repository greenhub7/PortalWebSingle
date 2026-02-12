"use strict";


var KTAccountAPIKeys = function () {
    
    var initLicenceCopy = function() {
        KTUtil.each(document.querySelectorAll('#kt_api_keys_table [data-action="copy"]'), function(button) {
            var tr = button.closest('tr');
            var license = KTUtil.find(tr, '[data-bs-target="license"]');

            var clipboard = new ClipboardJS(button, {
                target: license,
                text: function() {
                    return license.innerHTML;
                }                 
            });
        
            clipboard.on('success', function(e) {
                
                var svgIcon = button.querySelector('.svg-icon');                
                var checkIcon = button.querySelector('.bi.bi-check');
                
                
                if (checkIcon) {
                   return;  
                }

                
                checkIcon = document.createElement('i');
                checkIcon.classList.add('bi');
                checkIcon.classList.add('bi-check');
                checkIcon.classList.add('fs-2x');

                
                button.appendChild(checkIcon);

                
                license.classList.add('text-success');

                
                svgIcon.classList.add('d-none');

                
                setTimeout(function() {
                    
                    svgIcon.classList.remove('d-none');
                    
                    button.removeChild(checkIcon);

                    
                    license.classList.remove('text-success');
                }, 3000);
            });
        });
    }

    
    return {
        init: function () {
            initLicenceCopy();
        }
    }
}();


KTUtil.onDOMContentLoaded(function() {
    KTAccountAPIKeys.init();
});
