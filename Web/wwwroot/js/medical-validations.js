

class MedicalValidations {
    constructor() {
        this.alerts = [];
        this.warnings = [];
        this.info = [];
        this.riskFactors = [];
        
        this.initializeValidations();
    }

    initializeValidations() {
        
        this.setupDateValidations();
        this.setupAgeValidations();
        this.setupGestationalAgeValidations();
        this.setupRiskFactorValidations();
        this.setupObstetricValidations();
        this.setupVitalSignsValidations();
    }

    setupDateValidations() {
        
        $(document).on('change', '#LastMenstrualPeriod', () => {
            this.validateLMP();
        });

        
        $(document).on('change', '#BirthDate, #LastMenstrualPeriod', () => {
            this.validatePregnancyDates();
        });
    }

    setupAgeValidations() {
        $(document).on('change', '#Age, #BirthDate', () => {
            this.validateMaternalAge();
        });
    }

    setupGestationalAgeValidations() {
        $(document).on('change', '#GestationalAge, #LastMenstrualPeriod', () => {
            this.validateGestationalAge();
        });
    }

    setupRiskFactorValidations() {
        
        $(document).on('change', '[data-risk-factor="true"]', () => {
            this.assessRiskFactors();
        });
    }

    setupObstetricValidations() {
        $(document).on('change', '#Gravida, #Para, #Abortions, #LivingChildren', () => {
            this.validateObstetricHistory();
        });
    }

    setupVitalSignsValidations() {
        $(document).on('change', '[data-vital-sign="true"]', () => {
            this.validateVitalSigns();
        });
    }

    

    validateLMP() {
        const lmpDate = new Date($('#LastMenstrualPeriod').val());
        const today = new Date();
        
        if (lmpDate > today) {
            this.addAlert('critical', 'La fecha de último período menstrual no puede ser futura', 'LastMenstrualPeriod');
            return false;
        }

        const daysDiff = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
        const weeksDiff = Math.floor(daysDiff / 7);

        if (weeksDiff > 44) {
            this.addAlert('warning', `Embarazo de ${weeksDiff} semanas - Revise fecha de LMP`, 'LastMenstrualPeriod');
        }

        if (weeksDiff < 4) {
            this.addAlert('info', 'Embarazo muy temprano - Confirme con ultrasonido', 'LastMenstrualPeriod');
        }

        return true;
    }

    validatePregnancyDates() {
        const birthDate = new Date($('#BirthDate').val());
        const lmpDate = new Date($('#LastMenstrualPeriod').val());

        if (birthDate && lmpDate) {
            const ageAtLMP = Math.floor((lmpDate - birthDate) / (1000 * 60 * 60 * 24 * 365.25));
            
            if (ageAtLMP < 15) {
                this.addAlert('critical', '⚠️ EMBARAZO ADOLESCENTE TEMPRANO - Protocolo especial requerido', 'BirthDate');
            } else if (ageAtLMP < 18) {
                this.addAlert('warning', '⚠️ Embarazo adolescente - Seguimiento estrecho recomendado', 'BirthDate');
            } else if (ageAtLMP >= 35) {
                this.addAlert('warning', '⚠️ Embarazo después de 35 años - Riesgo aumentado', 'BirthDate');
            }
        }
    }

    validateMaternalAge() {
        const age = parseInt($('#Age').val());
        
        if (age < 15) {
            this.addAlert('critical', '🚨 EMBARAZO ADOLESCENTE EXTREMO - Intervención multidisciplinaria inmediata', 'Age');
            this.riskFactors.push('Embarazo adolescente extremo');
        } else if (age < 18) {
            this.addAlert('warning', '⚠️ Embarazo adolescente - Seguimiento prenatal intensivo', 'Age');
            this.riskFactors.push('Embarazo adolescente');
        } else if (age >= 35 && age < 40) {
            this.addAlert('warning', '⚠️ Edad materna avanzada - Considerar screening genético', 'Age');
            this.riskFactors.push('Edad materna avanzada');
        } else if (age >= 40) {
            this.addAlert('critical', '🚨 EDAD MATERNA MUY AVANZADA - Alto riesgo obstétrico', 'Age');
            this.riskFactors.push('Edad materna muy avanzada');
        }
    }

    validateGestationalAge() {
        const gestationalWeeks = this.calculateGestationalAge();
        
        if (gestationalWeeks < 24) {
            this.addAlert('info', `Edad gestacional: ${gestationalWeeks} semanas - Embarazo prematuro si parto`, 'GestationalAge');
        } else if (gestationalWeeks >= 24 && gestationalWeeks < 28) {
            this.addAlert('warning', '⚠️ Zona de viabilidad límite - Plan de contingencia neonatal', 'GestationalAge');
        } else if (gestationalWeeks >= 42) {
            this.addAlert('critical', '🚨 EMBARAZO POSTÉRMINO - Evaluación inmediata requerida', 'GestationalAge');
        } else if (gestationalWeeks >= 40) {
            this.addAlert('warning', '⚠️ Embarazo a término tardío - Monitoreo estrecho', 'GestationalAge');
        }
    }

    validateObstetricHistory() {
        const gravida = parseInt($('#Gravida').val()) || 0;
        const para = parseInt($('#Para').val()) || 0;
        const abortions = parseInt($('#Abortions').val()) || 0;
        const living = parseInt($('#LivingChildren').val()) || 0;

        
        if (para + abortions > gravida) {
            this.addAlert('critical', '❌ Error matemático: Para + Abortos no puede ser mayor que Gravida', 'Gravida');
        }

        if (living > para) {
            this.addAlert('critical', '❌ Error: Hijos vivos no puede ser mayor que Para', 'LivingChildren');
        }

        
        if (gravida >= 5) {
            this.addAlert('warning', '⚠️ Gran multípara - Riesgo aumentado de complicaciones', 'Gravida');
            this.riskFactors.push('Gran multiparidad');
        }

        if (abortions >= 3) {
            this.addAlert('warning', '⚠️ Abortos recurrentes - Estudio etiológico recomendado', 'Abortions');
            this.riskFactors.push('Abortos recurrentes');
        }

        if (para - living >= 2) {
            this.addAlert('warning', '⚠️ Pérdidas perinatales previas - Protocolo alto riesgo', 'LivingChildren');
            this.riskFactors.push('Pérdidas perinatales previas');
        }

        
        if (para > 0 && living === 0) {
            this.addAlert('info', 'ℹ️ Considere especificar número de hijos vivos', 'LivingChildren');
        }
    }

    validateVitalSigns() {
        
        const systolic = parseInt($('[name="BloodPressureSystolic"]').val());
        const diastolic = parseInt($('[name="BloodPressureDiastolic"]').val());

        if (systolic && diastolic) {
            if (systolic >= 160 || diastolic >= 110) {
                this.addAlert('critical', '🚨 HIPERTENSIÓN SEVERA - Evaluación inmediata requerida', 'BloodPressure');
                this.riskFactors.push('Hipertensión severa');
            } else if (systolic >= 140 || diastolic >= 90) {
                this.addAlert('warning', '⚠️ Hipertensión gestacional - Monitoreo frecuente', 'BloodPressure');
                this.riskFactors.push('Hipertensión gestacional');
            }
        }

        
        const weight = parseFloat($('#Weight').val());
        const height = parseFloat($('#Height').val());

        if (weight && height) {
            const bmi = weight / ((height / 100) ** 2);
            
            if (bmi < 18.5) {
                this.addAlert('warning', '⚠️ Bajo peso materno - Riesgo nutricional', 'Weight');
                this.riskFactors.push('Bajo peso materno');
            } else if (bmi >= 30) {
                this.addAlert('warning', '⚠️ Obesidad materna - Riesgo metabólico aumentado', 'Weight');
                this.riskFactors.push('Obesidad materna');
            } else if (bmi >= 25) {
                this.addAlert('info', 'ℹ️ Sobrepeso materno - Control nutricional recomendado', 'Weight');
            }
        }
    }

    assessRiskFactors() {
        
        if ($('#FamilyDiabetes_1').is(':checked') || $('#PersonalDiabetes_1').is(':checked')) {
            this.addAlert('warning', '⚠️ Diabetes - Protocolo de seguimiento metabólico', 'Diabetes');
            this.riskFactors.push('Diabetes');
        }

        
        if ($('#FamilyHypertension_1').is(':checked') || $('#PersonalHypertension_1').is(':checked')) {
            this.addAlert('warning', '⚠️ Hipertensión - Monitoreo cardiovascular estrecho', 'Hypertension');
            this.riskFactors.push('Hipertensión');
        }

        
        if ($('#PreviousPreeclampsia_1').is(':checked')) {
            this.addAlert('critical', '🚨 ANTECEDENTE DE PREECLAMPSIA - Alto riesgo de recurrencia', 'Preeclampsia');
            this.riskFactors.push('Antecedente de preeclampsia');
        }

        
        if ($('#MultiplePregnancy_1').is(':checked')) {
            this.addAlert('warning', '⚠️ Embarazo múltiple - Protocolo especializado requerido', 'MultiplePregnancy');
            this.riskFactors.push('Embarazo múltiple');
        }

        this.updateRiskClassification();
    }

    

    calculateGestationalAge() {
        const lmpDate = new Date($('#LastMenstrualPeriod').val());
        const today = new Date();
        
        if (!lmpDate || isNaN(lmpDate.getTime())) return 0;
        
        const daysDiff = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));
        return Math.floor(daysDiff / 7);
    }

    addAlert(type, message, fieldId) {
        const alert = {
            type: type, 
            message: message,
            fieldId: fieldId,
            timestamp: new Date()
        };

        
        this.alerts = this.alerts.filter(a => a.fieldId !== fieldId);
        
        
        this.alerts.push(alert);
        
        
        this.displayAlert(alert);
        
        
        this.updateFieldStyling(fieldId, type);
    }

    displayAlert(alert) {
        const alertContainer = $('#medicalAlertsContainer');
        if (alertContainer.length === 0) {
            
            $('.medical-form').prepend(`
                <div id="medicalAlertsContainer" class="medical-alerts-container mb-3"></div>
            `);
        }

        const alertClass = this.getAlertClass(alert.type);
        const alertIcon = this.getAlertIcon(alert.type);
        
        const alertHtml = `
            <div class="alert ${alertClass} alert-dismissible fade show medical-alert" data-field="${alert.fieldId}">
                <div class="d-flex align-items-center">
                    <div class="alert-icon me-2">${alertIcon}</div>
                    <div class="alert-content">
                        <strong>${this.getAlertTitle(alert.type)}</strong>
                        <div>${alert.message}</div>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            </div>
        `;

        $(`#medicalAlertsContainer .medical-alert[data-field="${alert.fieldId}"]`).remove();
        $('#medicalAlertsContainer').append(alertHtml);

        
        if (alert.type === 'info') {
            setTimeout(() => {
                $(`#medicalAlertsContainer .medical-alert[data-field="${alert.fieldId}"]`).fadeOut();
            }, 5000);
        }
    }

    getAlertClass(type) {
        switch (type) {
            case 'critical': return 'alert-danger';
            case 'warning': return 'alert-warning';
            case 'info': return 'alert-info';
            default: return 'alert-secondary';
        }
    }

    getAlertIcon(type) {
        switch (type) {
            case 'critical': return '🚨';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '📋';
        }
    }

    getAlertTitle(type) {
        switch (type) {
            case 'critical': return 'ALERTA CRÍTICA';
            case 'warning': return 'ADVERTENCIA CLÍNICA';
            case 'info': return 'INFORMACIÓN';
            default: return 'NOTA';
        }
    }

    updateFieldStyling(fieldId, type) {
        const field = $(`#${fieldId}`);
        
        
        field.removeClass('field-critical field-warning field-info');
        
        
        if (type === 'critical') {
            field.addClass('field-critical');
        } else if (type === 'warning') {
            field.addClass('field-warning');
        } else if (type === 'info') {
            field.addClass('field-info');
        }
    }

    updateRiskClassification() {
        const riskLevel = this.calculateOverallRisk();
        const riskContainer = $('#riskClassificationContainer');
        
        if (riskContainer.length === 0) {
            $('.medical-form').prepend(`
                <div id="riskClassificationContainer" class="risk-classification-container mb-3"></div>
            `);
        }

        const riskHtml = this.generateRiskHTML(riskLevel);
        $('#riskClassificationContainer').html(riskHtml);
    }

    calculateOverallRisk() {
        const criticalAlerts = this.alerts.filter(a => a.type === 'critical').length;
        const warningAlerts = this.alerts.filter(a => a.type === 'warning').length;
        
        if (criticalAlerts > 0) return 'high';
        if (warningAlerts >= 3) return 'high';
        if (warningAlerts >= 1) return 'medium';
        return 'low';
    }

    generateRiskHTML(riskLevel) {
        const riskConfig = {
            high: {
                class: 'risk-high',
                icon: '🚨',
                title: 'ALTO RIESGO OBSTÉTRICO',
                description: 'Requiere seguimiento especializado y protocolo de alto riesgo',
                color: '#dc3545'
            },
            medium: {
                class: 'risk-medium',
                icon: '⚠️',
                title: 'RIESGO MODERADO',
                description: 'Monitoreo frecuente y seguimiento cercano recomendado',
                color: '#ffc107'
            },
            low: {
                class: 'risk-low',
                icon: '✅',
                title: 'BAJO RIESGO',
                description: 'Seguimiento prenatal rutinario',
                color: '#28a745'
            }
        };

        const config = riskConfig[riskLevel];
        
        return `
            <div class="risk-classification ${config.class}">
                <div class="risk-header" style="background-color: ${config.color}; color: white; padding: 10px; border-radius: 5px 5px 0 0;">
                    <h5 class="mb-0">
                        <span class="risk-icon">${config.icon}</span>
                        ${config.title}
                    </h5>
                </div>
                <div class="risk-body" style="border: 2px solid ${config.color}; border-top: none; padding: 10px; border-radius: 0 0 5px 5px;">
                    <p class="mb-2">${config.description}</p>
                    ${this.riskFactors.length > 0 ? `
                        <div class="risk-factors">
                            <strong>Factores de riesgo identificados:</strong>
                            <ul class="mb-0 mt-1">
                                ${this.riskFactors.map(factor => `<li>${factor}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    

    validateAll() {
        this.alerts = [];
        this.warnings = [];
        this.info = [];
        this.riskFactors = [];

        this.validateLMP();
        this.validatePregnancyDates();
        this.validateMaternalAge();
        this.validateGestationalAge();
        this.validateObstetricHistory();
        this.validateVitalSigns();
        this.assessRiskFactors();

        return this.alerts.filter(a => a.type === 'critical').length === 0;
    }

    getCriticalAlerts() {
        return this.alerts.filter(a => a.type === 'critical');
    }

    getWarningAlerts() {
        return this.alerts.filter(a => a.type === 'warning');
    }

    clearAlerts() {
        this.alerts = [];
        this.warnings = [];
        this.info = [];
        this.riskFactors = [];
        $('#medicalAlertsContainer').empty();
        $('#riskClassificationContainer').empty();
        $('.field-critical, .field-warning, .field-info').removeClass('field-critical field-warning field-info');
    }

    generateMedicalReport() {
        return {
            riskLevel: this.calculateOverallRisk(),
            riskFactors: this.riskFactors,
            criticalAlerts: this.getCriticalAlerts(),
            warningAlerts: this.getWarningAlerts(),
            gestationalAge: this.calculateGestationalAge(),
            timestamp: new Date()
        };
    }
}


$(document).ready(function() {
    window.medicalValidations = new MedicalValidations();
    
    
    $('form').on('submit', function(e) {
        const isValid = window.medicalValidations.validateAll();
        const criticalAlerts = window.medicalValidations.getCriticalAlerts();
        
        if (criticalAlerts.length > 0) {
            e.preventDefault();
            
            const proceed = confirm(
                `ATENCIÓN: Se han detectado ${criticalAlerts.length} alertas críticas.\n\n` +
                criticalAlerts.map(a => `• ${a.message}`).join('\n') +
                '\n\n¿Desea continuar de todos modos?'
            );
            
            if (proceed) {
                $(this).off('submit').submit();
            }
        }
    });
});