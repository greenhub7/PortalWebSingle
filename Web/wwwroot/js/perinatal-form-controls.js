

window.perinatalFormControls = (function() {
    'use strict';

    let isFormDirty = false;
    let saveTimeout = null;
    let floatingButton = null;

    function init() {
        createFloatingButton();
        setupRadioButtonLogic();
        setupFormValidation();
        setupAutoSave();
        bindEventHandlers();
        console.log('✅ Perinatal Form Controls initialized');
    }

    function createFloatingButton() {
        
        return;
    }

    function setupRadioButtonLogic() {
        
        $(document).on('click', 'input[type="radio"]', function() {
            const name = $(this).attr('name');
            const value = $(this).val();
            
            
            if ($(this).data('wasChecked') === true) {
                $(this).prop('checked', false);
                $(this).data('wasChecked', false);
                markFormDirty();
                return;
            }
            
            
            $(`input[name="${name}"]`).data('wasChecked', false);
            
            
            $(this).data('wasChecked', true);
            markFormDirty();
        });

        
        $('input[type="radio"]:checked').each(function() {
            $(this).data('wasChecked', true);
        });
    }

    function setupFormValidation() {
        
        const criticalFields = [
            'input[name*="Name"]',
            'input[name*="BirthDate"]',
            'input[name*="LastMenstrualPeriod"]',
            'input[name*="BloodGroup"]',
            'input[name*="RhFactor"]'
        ];

        criticalFields.forEach(selector => {
            $(document).on('change blur', selector, function() {
                validateField($(this));
            });
        });

        
        cleanInvalidDates();

        
        $(document).on('change', 'input[type="date"]', function() {
            const fieldName = $(this).attr('name');
            const fieldValue = $(this).val();
            
            if (fieldName && fieldName.includes('LastMenstrualPeriod') && fieldValue) {
                calculateEstimatedDueDate(fieldValue);
            }
            
            if (fieldName && fieldName.includes('BirthDate') && fieldValue) {
                calculateAge(fieldValue);
            }
        });

        
        $(document).on('focus', 'input[type="date"]', function() {
            if (!$(this).val()) {
                const today = new Date().toISOString().split('T')[0];
                $(this).val(today);
            }
        });
    }

    function validateField($field) {
        const fieldName = $field.attr('name');
        const fieldValue = $field.val();
        let isValid = true;
        let errorMessage = '';

        
        $field.removeClass('is-invalid is-valid');
        $field.siblings('.invalid-feedback').remove();

        
        if (fieldName && fieldName.includes('Name') && (!fieldValue || fieldValue.trim().length < 2)) {
            isValid = false;
            errorMessage = 'El nombre debe tener al menos 2 caracteres';
        }

        if (fieldName && fieldName.includes('BirthDate') && fieldValue) {
            const birthDate = new Date(fieldValue);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 10 || age > 60) {
                isValid = false;
                errorMessage = 'Verificar fecha de nacimiento (edad fuera del rango normal)';
            }
        }

        
        if (isValid) {
            $field.addClass('is-valid');
        } else {
            $field.addClass('is-invalid');
            $field.after(`<div class="invalid-feedback">${errorMessage}</div>`);
        }

        return isValid;
    }

    function calculateEstimatedDueDate(lmpDate) {
        if (!lmpDate) return;
        
        const lastMenstrualPeriod = new Date(lmpDate);
        const estimatedDueDate = new Date(lastMenstrualPeriod);
        estimatedDueDate.setDate(estimatedDueDate.getDate() + 280); 

        const estimatedDueDateInput = $('input[name*="EstimatedDueDate"]');
        if (estimatedDueDateInput.length && !estimatedDueDateInput.val()) {
            estimatedDueDateInput.val(estimatedDueDate.toISOString().split('T')[0]);
            markFormDirty();
        }
    }

    function calculateAge(birthDate) {
        if (!birthDate) return;
        
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        const ageInput = $('input[name*="Age"]');
        if (ageInput.length) {
            ageInput.val(age);
            markFormDirty();
        }
    }

    function setupAutoSave() {
        
        setInterval(() => {
            if (isFormDirty) {
                autoSaveForm();
            }
        }, 30000);

        
        $(window).on('beforeunload', function(e) {
            if (isFormDirty) {
                return 'Tienes cambios sin guardar. ¿Estás seguro de salir?';
            }
        });
    }

    function bindEventHandlers() {
        
        $(document).on('change input', '.medical-input, .form-control, input[type="radio"], input[type="checkbox"]', function() {
            markFormDirty();
        });

        
        $(document).on('click', '#btnSave', function(e) {
            e.preventDefault();
            saveForm();
        });

        
    }

    function markFormDirty() {
        if (!isFormDirty) {
            isFormDirty = true;
            $('#btnSave').addClass('pulse');
            
            
            if (!document.title.includes('*')) {
                document.title = '* ' + document.title;
            }
        }
    }

    function markFormClean() {
        isFormDirty = false;
        $('#btnSave').removeClass('pulse');
        
        
        document.title = document.title.replace('* ', '');
        
        
        showSaveIndicator('success');
    }

    function saveForm() {
        const saveButton = $('#btnSave');
        const saveIndicator = saveButton.find('.save-indicator');
        
        
        saveButton.prop('disabled', true);
        saveIndicator.show();
        
        
        const formData = gatherFormDataForController();
        
        
        $.ajax({
            url: '/PerinatalHistories/SavePerinatalHistory',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                if (response.success) {
                    markFormClean();
                    showNotification(response.message || 'Historia perinatal guardada exitosamente', 'success');
                } else {
                    showNotification(response.message || 'Error desconocido al guardar', 'error');
                }
                
                saveButton.prop('disabled', false);
                saveIndicator.hide();
            },
            error: function(xhr, status, error) {
                console.error('Save error:', error);
                showNotification('Error de conexión al guardar: ' + error, 'error');
                
                saveButton.prop('disabled', false);
                saveIndicator.hide();
                showSaveIndicator('error');
            }
        });
    }

    function autoSaveForm() {
        console.log('💾 Auto-saving perinatal form...');
        const formData = gatherFormData();
        
        
        
        
        
        setTimeout(() => {
            markFormClean();
        }, 1000);
    }

    function gatherFormData() {
        const formData = {};
        
        
        $('.medical-input, .form-control, input[type="radio"]:checked, input[type="checkbox"]:checked').each(function() {
            const name = $(this).attr('name');
            const value = $(this).val();
            
            if (name && value !== undefined) {
                formData[name] = value;
            }
        });
        
        return formData;
    }

    function gatherFormDataForController() {
        
        const modelInfo = {
            Id: parseInt($('#recordId').val()) || 0,
            Name: $('input[name="Name"]').val() || '',
            LastName: $('input[name="LastName"]').val() || '',
            Address: $('input[name="Address"]').val() || '',
            Locality: $('input[name="Locality"]').val() || '',
            PhoneNumber: $('input[name="PhoneNumber"]').val() || '',
            IdentityNumber: $('input[name="IdentityNumber"]').val() || '',
            BirthDate: $('input[name="BirthDate"]').val() || null,
            Age: parseInt($('input[name="Age"]').val()) || 0,
            Ethnicity: $('select[name="Ethnicity"]').val() || '',
            MaritalStatus: $('select[name="MaritalStatus"]').val() || '',
            LivesAlone: $('input[name="LivesAlone"]:checked').val() === 'true',
            EducationYears: parseInt($('input[name="EducationYears"]').val()) || 0,
            EducationLevel: $('select[name="EducationLevel"]').val() || '',
            PrenatalControlPlace: $('input[name="PrenatalControlPlace"]').val() || '',
            BirthPlace: $('input[name="BirthPlace"]').val() || '',
            
            
            MedicalBackground: gatherMedicalBackgroundData(),
            ObstetricBackground: gatherObstetricBackgroundData(),
            CurrentPregnancy: gatherCurrentPregnancyData(),
            BirthInformation: gatherBirthInformationData(),
            NewbornInformation: gatherNewbornInformationData(),
            PostpartumInformation: gatherPostpartumInformationData(),
            MorbidityInformation: gatherMorbidityInformationData(),
            NearMissVariables: gatherNearMissVariablesData(),
            ContraceptionInformation: gatherContraceptionInformationData(),
            MaternalDischargeInformation: gatherMaternalDischargeInformationData(),
            PrenatalConsultations: []
        };

        
        return {
            ModelInfo: modelInfo
        };
    }

    function gatherCurrentPregnancyData() {
        return {
            Id: parseInt($('#CurrentPregnancy_Id').val()) || 0,
            LastMenstrualPeriod: $('input[name="CurrentPregnancy.LastMenstrualPeriod"]').val() || null,
            EstimatedDueDate: $('input[name="CurrentPregnancy.EstimatedDueDate"]').val() || null,
            PreviousWeight: parseFloat($('input[name="CurrentPregnancy.PreviousWeight"]').val()) || null,
            Height: parseFloat($('input[name="CurrentPregnancy.Height"]').val()) || null,
            GestationalAgeReliabilityMethod: $('input[name="CurrentPregnancy.GestationalAgeReliabilityMethod"]:checked').val() || '',
            OlderThan35: getEnumValue('CurrentPregnancy.OlderThan35'),
            YoungerThan15: getEnumValue('CurrentPregnancy.YoungerThan15'),
            NormalDentalExamination: getEnumValue('CurrentPregnancy.NormalDentalExamination'),
            NormalBreastExamination: getEnumValue('CurrentPregnancy.NormalBreastExamination'),
            BloodGroupType: getEnumValue('CurrentPregnancy.BloodGroupType'),
            RhFactorType: getEnumValue('CurrentPregnancy.RhFactorType'),
            RhSensitization: getEnumValue('CurrentPregnancy.RhSensitization'),
            
        };
    }

    function getEnumValue(fieldName) {
        const checkedValue = $(`input[name="${fieldName}"]:checked`).val();
        return checkedValue ? parseInt(checkedValue) : null;
    }

    
    function gatherMedicalBackgroundData() { return { Id: parseInt($('#MedicalBackground_Id').val()) || 0 }; }
    function gatherObstetricBackgroundData() { return { Id: parseInt($('#ObstetricBackground_Id').val()) || 0 }; }
    function gatherBirthInformationData() { return { Id: parseInt($('#BirthInformation_Id').val()) || 0 }; }
    function gatherNewbornInformationData() { return { Id: parseInt($('#NewbornInformation_Id').val()) || 0 }; }
    function gatherPostpartumInformationData() { return { Id: parseInt($('#PostpartumInformation_Id').val()) || 0 }; }
    function gatherMorbidityInformationData() { return { Id: parseInt($('#MorbidityInformation_Id').val()) || 0 }; }
    function gatherNearMissVariablesData() { return { Id: parseInt($('#NearMissVariables_Id').val()) || 0 }; }
    function gatherContraceptionInformationData() { return { Id: parseInt($('#ContraceptionInformation_Id').val()) || 0 }; }
    function gatherMaternalDischargeInformationData() { return { Id: parseInt($('#MaternalDischargeInformation_Id').val()) || 0 }; }

    function showSaveIndicator(type) {
        const saveButton = $('#btnSave');
        
        if (type === 'success') {
            saveButton.addClass('saved').removeClass('error');
            setTimeout(() => {
                saveButton.removeClass('saved');
            }, 2000);
        } else if (type === 'error') {
            saveButton.addClass('error').removeClass('saved');
            setTimeout(() => {
                saveButton.removeClass('error');
            }, 3000);
        }
    }

    function showNotification(message, type) {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const icon = type === 'success' ? 'check-circle' : 'exclamation-triangle';
        
        const notification = $(`
            <div class="alert ${alertClass} alert-dismissible fade show notification-alert" role="alert">
                <i class="fas fa-${icon}"></i>
                <strong>${type === 'success' ? 'Éxito:' : 'Error:'}</strong> ${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `);
        
        $('#formStatusAlert').html(notification);
        
        
        if (type === 'success') {
            setTimeout(() => {
                notification.alert('close');
            }, 5000);
        }
    }

    function cleanInvalidDates() {
        
        $('input[type="date"]').each(function() {
            const $dateInput = $(this);
            const dateValue = $dateInput.val();
            
            if (!dateValue || dateValue === '0001-01-01' || dateValue.startsWith('0001-')) {
                $dateInput.val('');
            }
        });

        
        $('.consultation-row, .postpartum-visit-row').each(function() {
            $(this).find('td').each(function() {
                const text = $(this).text().trim();
                if (text.includes('01/01/0001') || text.includes('1/1/0001')) {
                    $(this).text('');
                }
            });
        });

        console.log('🗓️ Invalid dates cleaned');
    }

    
    return {
        init: init,
        saveForm: saveForm,
        markFormDirty: markFormDirty,
        markFormClean: markFormClean,
        validateField: validateField,
        gatherFormData: gatherFormData,
        cleanInvalidDates: cleanInvalidDates
    };
})();


$(document).ready(function() {
    if (window.perinatalFormControls) {
        window.perinatalFormControls.init();
    }
});