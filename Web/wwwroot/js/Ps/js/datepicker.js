"use strict";


let KTAppDatePicker = function () {
 
    const initDateConfig = () => {

        var dateFormat = "d/m/Y";
        $(".PsDates").each(function () {
            var $input = $(this);

            
            $input.attr("type", "text");

            
            $input.removeAttr("placeholder");

            
            var currentValue = $input.val();

            
            var invalidPatterns = [
                /^[_/\s]*$/,                    
                /^_+\/+_+\/+_+$/,                
                /^[\s\-_/]*$/,                   
                /^placeholder$/i,                
                /^dd\/mm\/yyyy$/i,               
                /^mm\/dd\/yyyy$/i                
            ];

            
            var isInvalid = invalidPatterns.some(function(pattern) {
                return pattern.test(currentValue);
            });

            if (isInvalid || !currentValue) {
                $input.val('');
                currentValue = '';
            }

            
            var config = {
                disableMobile: true,
                altInput: true,
                altFormat: "d/m/Y",
                allowInput: true,
                dateFormat: dateFormat,
                locale: {
                    firstDayOfWeek: 1,
                    weekdays: {
                        shorthand: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
                        longhand: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
                    },
                    months: {
                        shorthand: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                        longhand: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
                    }
                },
                
                onParseConfig: function() {
                    
                },
                
                onChange: function(selectedDates, dateStr, instance) {
                    
                    if (dateStr) {
                        $input.val(dateStr);
                    }
                    
                    $input.trigger('change');
                    $input.trigger('focusout');
                },
                onClose: function(selectedDates, dateStr, instance) {
                    
                    if (dateStr) {
                        $input.val(dateStr);
                        $input.trigger('change');
                        $input.trigger('focusout');
                    }
                },
                onValueUpdate: function(selectedDates, dateStr, instance) {
                    
                    if (dateStr && !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) {
                        instance.clear();
                    }
                }
            };

            
            if (currentValue && currentValue.trim() !== "") {
                
                var datePattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

                if (datePattern.test(currentValue.trim())) {
                    try {
                        config.defaultDate = currentValue.trim();
                    } catch (e) {
                        
                        console.warn('No se pudo establecer fecha por defecto:', currentValue);
                        $input.val('');
                    }
                } else {
                    
                    $input.val('');
                }
            }

            
            try {
                $input.flatpickr(config);
            } catch (e) {
                console.error('Error al inicializar flatpickr:', e);
            }
        });
        $(".PsTimes2").flatpickr({
            enableTime: true,
            disableMobile: true,
            noCalendar: true,
            dateFormat: "H:i",
        });
        
        
        $(".PsTimesReminder").flatpickr({
            enableTime: true,
            disableMobile: true,
            noCalendar: true,
            dateFormat: "h:i K", 
            time_24hr: false, 
            minuteIncrement: 15, 
            defaultHour: 9, 
            defaultMinute: 0
        });
        $(".PsTimes3").flatpickr({
            enableTime: true,
            disableMobile: true,
            noCalendar: true,
            dateFormat: "H:i",
            onOpen: function (selectedDates, dateStr, instance) {
                var clearButton = instance._input.nextElementSibling;
                if (!clearButton || !clearButton.classList.contains("clear-time")) {
                    $(instance._input).after('<button type="button" class="clear-time">x</button>');
                    clearButton = instance._input.nextElementSibling;
                    clearButton.addEventListener("click", function () {
                        instance.clear();
                        $(clearButton).hide();
                    });
                }
                if ($(instance._input).val() === "") {
                    $(clearButton).hide();
                } else {
                    $(clearButton).show();
                }
            }
        });

        $(".PsTimes3").flatpickr({
            enableTime: true,
            disableMobile: true,
            noCalendar: true,
            dateFormat: "H:i",
            onOpen: function (selectedDates, dateStr, instance) {
                $(selectedDates).on("init", function () {
                    $(instance._input.nextElementSibling).hide();
                });
                var clearButton = instance._input.nextElementSibling;
                if (!clearButton || !clearButton.classList.contains("clear-time")) {
                    $(instance._input).after('<button type="button" class="clear-time">x</button>');
                    clearButton = instance._input.nextElementSibling;
                    clearButton.addEventListener("click", function () {
                        instance.clear();
                        $(clearButton).hide();
                    });
                }
                if ($(instance._input).val() === "") {
                    $(clearButton).hide();
                } else {
                    $(clearButton).show();
                }
            }
        });

        $(".PsTimes3").on("input", function () {
            var clearButton = $(this).next(".clear-time");
            if ($(this).val() === "") {
                clearButton.hide();
            } else {
                clearButton.show();
            }
        });

        $(".clear-time").on("click", function () {
            var inputField = $(this).prev(".PsTimes3")[0]._flatpickr;
            inputField.clear();
            $(this).hide();
        });
         
        $(".PsReadOnlyDate").each(function () {
            $(this).attr("type", "text");
            $(this).flatpickr({
                disableMobile: true,
                altInput: true,
                allowInput: false,
                dateFormat: "d/m/Y",
                onOpen: function (selectedDates, dateStr, instance) {
                    instance.close();
                }
            });
        });
        $(".PsReadOnlyTime").each(function () {
            $(this).attr("type", "text");
            $(this).flatpickr({
                enableTime: true,
                disableMobile: true,
                noCalendar: true,
                allowInput: false,
                dateFormat: "H:i",
                onOpen: function (selectedDates, dateStr, instance) {
                    instance.close();
                }
            });
        });
    }
      
    return {
        init: function () { 
            initDateConfig();
        }
    };
}();
 
KTUtil.onDOMContentLoaded(function () {
    KTAppDatePicker.init();
});
