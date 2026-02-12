

class MedicalTooltipsSystem {
    constructor() {
        this.tooltips = new Map();
        this.helpContent = new Map();
        this.currentLanguage = 'es'; 
        
        this.initializeTooltips();
        this.setupEventHandlers();
        this.loadMedicalDefinitions();
    }

    initializeTooltips() {
        
        if ($('#medicalTooltipContainer').length === 0) {
            $('body').append(`
                <div id="medicalTooltipContainer" class="medical-tooltip-container"></div>
            `);
        }

        
        this.setupPerinatalTooltips();
        this.setupGeneralMedicalTooltips();
        this.bindTooltipEvents();
    }

    setupEventHandlers() {
        
        $(document).on('click', '.medical-help-btn', (e) => {
            e.preventDefault();
            this.showHelpModal();
        });

        
        $(document).on('click', '.field-help', (e) => {
            e.preventDefault();
            const fieldId = $(e.target).closest('.field-help').data('field');
            this.showFieldHelp(fieldId);
        });

        
        $(document).on('click', '#toggleQuickReference', () => {
            this.toggleQuickReference();
        });

        
        $(window).on('scroll resize', () => {
            this.repositionActiveTooltips();
        });
    }

    setupPerinatalTooltips() {
        
        const perinatalTooltips = {
            'Age': {
                title: 'Edad Materna',
                content: `
                    <strong>Significado clínico:</strong><br>
                    • <span class="text-success">20-34 años:</span> Rango óptimo<br>
                    • <span class="text-warning">15-19 años:</span> Embarazo adolescente<br>
                    • <span class="text-warning">35-39 años:</span> Edad materna avanzada<br>
                    • <span class="text-danger">≥40 años:</span> Edad muy avanzada<br>
                    • <span class="text-danger"><15 años:</span> Alto riesgo extremo
                `,
                icon: '👩',
                category: 'demographic'
            },
            
            'LastMenstrualPeriod': {
                title: 'Fecha de Última Menstruación (FUM)',
                content: `
                    <strong>Importancia:</strong><br>
                    • Base para calcular edad gestacional<br>
                    • Determina fecha probable de parto<br>
                    • Crítico para seguimiento prenatal<br>
                    <strong>Validación:</strong> Debe ser coherente con ultrasonido
                `,
                icon: '📅',
                category: 'obstetric'
            },

            'BloodPressure': {
                title: 'Presión Arterial',
                content: `
                    <strong>Valores normales en embarazo:</strong><br>
                    • <span class="text-success">Normal:</span> <140/90 mmHg<br>
                    • <span class="text-warning">HTA leve:</span> 140-159/90-109<br>
                    • <span class="text-danger">HTA severa:</span> ≥160/110<br>
                    <strong>¡ALERTA!</strong> HTA severa requiere evaluación inmediata
                `,
                icon: '🩺',
                category: 'vital'
            },

            'Gravida': {
                title: 'Gravida (G)',
                content: `
                    <strong>Definición:</strong> Número total de embarazos<br>
                    • Incluye embarazo actual<br>
                    • Incluye abortos previos<br>
                    • Incluye partos previos<br>
                    <strong>Validación:</strong> G = P + A + embarazo actual
                `,
                icon: '🤰',
                category: 'obstetric'
            },

            'Para': {
                title: 'Para (P)',
                content: `
                    <strong>Definición:</strong> Número de partos ≥20 semanas<br>
                    • Incluye partos a término<br>
                    • Incluye partos prematuros<br>
                    • Incluye mortinatos<br>
                    <strong>No incluye:</strong> Abortos <20 semanas
                `,
                icon: '👶',
                category: 'obstetric'
            },

            'Abortions': {
                title: 'Abortos (A)',
                content: `
                    <strong>Definición:</strong> Pérdidas <20 semanas<br>
                    • Espontáneos o inducidos<br>
                    • <span class="text-warning">≥2 abortos:</span> Investigar causas<br>
                    • <span class="text-danger">≥3 abortos:</span> Aborto recurrente<br>
                    <strong>Requiere:</strong> Estudio especializado
                `,
                icon: '💔',
                category: 'obstetric'
            },

            'GestationalAge': {
                title: 'Edad Gestacional',
                content: `
                    <strong>Clasificación:</strong><br>
                    • <span class="text-info">Pretérmino:</span> <37 semanas<br>
                    • <span class="text-success">A término:</span> 37-41 semanas<br>
                    • <span class="text-warning">Postérmino:</span> ≥42 semanas<br>
                    <strong>Cálculo:</strong> Desde FUM o ultrasonido temprano
                `,
                icon: '📊',
                category: 'obstetric'
            },

            'BloodGroup': {
                title: 'Grupo Sanguíneo y Factor Rh',
                content: `
                    <strong>Importancia crítica:</strong><br>
                    • Prevención incompatibilidad ABO<br>
                    • <span class="text-danger">Rh negativo:</span> Riesgo isoinmunización<br>
                    • Requiere Anti-D si indicado<br>
                    <strong>Seguimiento:</strong> Coombs indirecto en Rh(-)
                `,
                icon: '🩸',
                category: 'laboratory'
            },

            'Hemoglobin': {
                title: 'Hemoglobina',
                content: `
                    <strong>Valores en embarazo:</strong><br>
                    • <span class="text-success">Normal:</span> ≥11 g/dL<br>
                    • <span class="text-warning">Anemia leve:</span> 10-10.9 g/dL<br>
                    • <span class="text-danger">Anemia moderada:</span> 7-9.9 g/dL<br>
                    • <span class="text-danger">Anemia severa:</span> <7 g/dL<br>
                    <strong>Tratamiento:</strong> Hierro + Ácido fólico
                `,
                icon: '🔬',
                category: 'laboratory'
            },

            'Proteinuria': {
                title: 'Proteinuria',
                content: `
                    <strong>Significado clínico:</strong><br>
                    • Normal: Negativa o trazas<br>
                    • <span class="text-warning">+ o ++:</span> Evaluar preeclampsia<br>
                    • <span class="text-danger">+++ o ++++:</span> Preeclampsia severa<br>
                    <strong>Contexto:</strong> Siempre evaluar con PA y síntomas
                `,
                icon: '🧪',
                category: 'laboratory'
            },

            'FetalMovements': {
                title: 'Movimientos Fetales',
                content: `
                    <strong>Evaluación de bienestar fetal:</strong><br>
                    • Inicio: 18-20 semanas (primípara)<br>
                    • Inicio: 16-18 semanas (multípara)<br>
                    • <span class="text-danger">Disminución:</span> Evaluación inmediata<br>
                    <strong>Conteo:</strong> ≥10 movimientos en 12 horas
                `,
                icon: '👶',
                category: 'fetal'
            },

            'FetalHeartRate': {
                title: 'Frecuencia Cardíaca Fetal (FCF)',
                content: `
                    <strong>Valores normales:</strong><br>
                    • <span class="text-success">Normal:</span> 120-160 lpm<br>
                    • <span class="text-warning">Bradicardia:</span> <120 lpm<br>
                    • <span class="text-warning">Taquicardia:</span> >160 lpm<br>
                    <strong>Evaluación:</strong> Considerar contexto materno
                `,
                icon: '💓',
                category: 'fetal'
            },

            'VDRL': {
                title: 'VDRL - Sífilis',
                content: `
                    <strong>Screening obligatorio:</strong><br>
                    • Todas las embarazadas<br>
                    • <span class="text-danger">Positivo:</span> Tratamiento inmediato<br>
                    • Previene sífilis congénita<br>
                    <strong>Tratamiento:</strong> Penicilina benzatínica
                `,
                icon: '🦠',
                category: 'laboratory'
            },

            'HIV': {
                title: 'VIH - Virus de Inmunodeficiencia Humana',
                content: `
                    <strong>Prevención transmisión vertical:</strong><br>
                    • Testing obligatorio (con consentimiento)<br>
                    • <span class="text-info">Positivo:</span> TARV inmediato<br>
                    • Cesárea electiva si CV >1000<br>
                    • <strong>No lactancia materna</strong>
                `,
                icon: '🔬',
                category: 'laboratory'
            },

            'Vaccines': {
                title: 'Vacunas en Embarazo',
                content: `
                    <strong>Vacunas seguras:</strong><br>
                    • <span class="text-success">Tétanos:</span> Obligatoria<br>
                    • <span class="text-success">Influenza:</span> Recomendada<br>
                    • <span class="text-success">COVID-19:</span> Recomendada<br>
                    <strong>Contraindicadas:</strong> Vacunas vivas atenuadas
                `,
                icon: '💉',
                category: 'prevention'
            }
        };

        
        Object.entries(perinatalTooltips).forEach(([key, value]) => {
            this.tooltips.set(key, value);
        });
    }

    setupGeneralMedicalTooltips() {
        const generalTooltips = {
            'Weight': {
                title: 'Peso Corporal',
                content: `
                    <strong>IMC en embarazo:</strong><br>
                    • <span class="text-info">Bajo peso:</span> <18.5 kg/m²<br>
                    • <span class="text-success">Normal:</span> 18.5-24.9 kg/m²<br>
                    • <span class="text-warning">Sobrepeso:</span> 25-29.9 kg/m²<br>
                    • <span class="text-danger">Obesidad:</span> ≥30 kg/m²<br>
                    <strong>Ganancia recomendada varía según IMC inicial</strong>
                `,
                icon: '⚖️',
                category: 'anthropometric'
            },

            'Height': {
                title: 'Talla',
                content: `
                    <strong>Importancia clínica:</strong><br>
                    • Cálculo de IMC<br>
                    • <span class="text-warning">Talla baja (<150cm):</span> Riesgo desproporción pélvica<br>
                    • Predictor de complicaciones obstétricas<br>
                    <strong>Evaluación:</strong> Considerar en plan de parto
                `,
                icon: '📏',
                category: 'anthropometric'
            }
        };

        Object.entries(generalTooltips).forEach(([key, value]) => {
            this.tooltips.set(key, value);
        });
    }

    bindTooltipEvents() {
        
        this.tooltips.forEach((tooltip, fieldId) => {
            const field = $(`#${fieldId}, [name="${fieldId}"], [id*="${fieldId}"]`);
            
            if (field.length > 0) {
                
                this.addHelpIcon(field, fieldId);
                
                
                field.on('mouseenter focus', (e) => {
                    this.showTooltip(e.target, fieldId);
                });
                
                field.on('mouseleave blur', (e) => {
                    this.hideTooltip(fieldId);
                });
            }
        });
    }

    addHelpIcon(field, fieldId) {
        const existingIcon = field.siblings('.medical-help-icon');
        if (existingIcon.length === 0) {
            const tooltip = this.tooltips.get(fieldId);
            const helpIcon = $(`
                <span class="medical-help-icon" data-field="${fieldId}" title="Ayuda médica">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </span>
            `);
            
            
            const container = field.closest('.form-group, .medical-form-group, .form-control');
            if (container.length > 0) {
                container.css('position', 'relative');
                container.append(helpIcon);
            } else {
                field.after(helpIcon);
            }
            
            
            helpIcon.on('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showTooltip(field[0], fieldId, true);
            });
        }
    }

    showTooltip(element, fieldId, persistent = false) {
        const tooltip = this.tooltips.get(fieldId);
        if (!tooltip) return;

        const tooltipId = `tooltip-${fieldId}`;
        
        
        this.hideTooltip(fieldId);

        const tooltipHtml = `
            <div id="${tooltipId}" class="medical-tooltip ${persistent ? 'persistent' : ''}" data-field="${fieldId}">
                <div class="tooltip-header">
                    <span class="tooltip-icon">${tooltip.icon}</span>
                    <span class="tooltip-title">${tooltip.title}</span>
                    ${persistent ? '<button class="tooltip-close">&times;</button>' : ''}
                </div>
                <div class="tooltip-content">
                    ${tooltip.content}
                </div>
                <div class="tooltip-footer">
                    <small class="text-muted">Categoría: ${this.getCategoryName(tooltip.category)}</small>
                </div>
                <div class="tooltip-arrow"></div>
            </div>
        `;

        $('#medicalTooltipContainer').append(tooltipHtml);
        
        
        this.positionTooltip(tooltipId, element);
        
        
        $(`#${tooltipId}`).fadeIn(200);
        
        
        if (!persistent) {
            setTimeout(() => {
                this.hideTooltip(fieldId);
            }, 5000);
        }

        
        if (persistent) {
            $(`#${tooltipId} .tooltip-close`).on('click', () => {
                this.hideTooltip(fieldId);
            });
        }
    }

    hideTooltip(fieldId) {
        const tooltipId = `tooltip-${fieldId}`;
        $(`#${tooltipId}`).fadeOut(150, function() {
            $(this).remove();
        });
    }

    positionTooltip(tooltipId, element) {
        const $tooltip = $(`#${tooltipId}`);
        const $element = $(element);
        
        const elementRect = element.getBoundingClientRect();
        const tooltipWidth = $tooltip.outerWidth();
        const tooltipHeight = $tooltip.outerHeight();
        
        let top = elementRect.top - tooltipHeight - 10;
        let left = elementRect.left + (elementRect.width / 2) - (tooltipWidth / 2);
        
        
        if (top < 10) {
            top = elementRect.bottom + 10;
            $tooltip.addClass('below');
        }
        
        if (left < 10) {
            left = 10;
        } else if (left + tooltipWidth > window.innerWidth - 10) {
            left = window.innerWidth - tooltipWidth - 10;
        }
        
        $tooltip.css({
            position: 'fixed',
            top: top + 'px',
            left: left + 'px',
            zIndex: 10000
        });
    }

    repositionActiveTooltips() {
        $('.medical-tooltip').each((index, element) => {
            const fieldId = $(element).data('field');
            const field = $(`#${fieldId}, [name="${fieldId}"]`).first();
            
            if (field.length > 0) {
                this.positionTooltip(element.id, field[0]);
            }
        });
    }

    getCategoryName(category) {
        const categories = {
            'demographic': 'Demografía',
            'obstetric': 'Obstétrico',
            'vital': 'Signos Vitales',
            'laboratory': 'Laboratorio',
            'fetal': 'Bienestar Fetal',
            'prevention': 'Prevención',
            'anthropometric': 'Antropométrico'
        };
        
        return categories[category] || 'General';
    }

    showHelpModal() {
        const modalHtml = `
            <div class="modal fade" id="medicalHelpModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-question-circle"></i>
                                📚 Ayuda Médica - SolMed
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${this.generateHelpContent()}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" onclick="window.medicalTooltips.showQuickReference()">
                                Guía Rápida
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        
        $('#medicalHelpModal').remove();
        
        
        $('body').append(modalHtml);
        $('#medicalHelpModal').modal('show');
    }

    generateHelpContent() {
        const categories = {};
        
        
        this.tooltips.forEach((tooltip, fieldId) => {
            const categoryName = this.getCategoryName(tooltip.category);
            if (!categories[categoryName]) {
                categories[categoryName] = [];
            }
            categories[categoryName].push({ fieldId, ...tooltip });
        });

        let content = `
            <div class="help-introduction mb-4">
                <div class="alert alert-info">
                    <h6><i class="fas fa-info-circle"></i> Sistema de Ayuda Médica</h6>
                    <p class="mb-0">Este sistema proporciona información médica contextual para todos los campos del formulario perinatal. 
                    Pase el cursor sobre cualquier campo o haga clic en el ícono de ayuda <i class="fas fa-question-circle text-primary"></i> 
                    para obtener información detallada.</p>
                </div>
            </div>
            
            <div class="help-categories">
        `;

        Object.entries(categories).forEach(([categoryName, fields]) => {
            content += `
                <div class="category-section mb-4">
                    <h6 class="category-title text-primary">
                        <i class="fas fa-folder-open"></i> ${categoryName}
                    </h6>
                    <div class="row">
            `;
            
            fields.forEach(field => {
                content += `
                    <div class="col-md-6 mb-2">
                        <div class="help-field-item">
                            <strong>${field.icon} ${field.title}</strong>
                            <div class="help-field-summary">
                                ${this.extractSummary(field.content)}
                            </div>
                        </div>
                    </div>
                `;
            });
            
            content += `
                    </div>
                </div>
            `;
        });

        content += `
            </div>
            
            <div class="help-footer mt-4">
                <div class="alert alert-warning">
                    <h6><i class="fas fa-exclamation-triangle"></i> Importante</h6>
                    <p class="mb-0">Esta información es de referencia clínica. Siempre consulte las guías clínicas institucionales 
                    y considere el contexto específico de cada paciente para la toma de decisiones médicas.</p>
                </div>
            </div>
        `;

        return content;
    }

    extractSummary(content) {
        
        const lines = content.split('<br>');
        let summary = lines[0];
        
        
        summary = summary.replace(/<[^>]*>/g, '');
        
        if (summary.length > 100) {
            summary = summary.substring(0, 100) + '...';
        }
        
        return summary;
    }

    showQuickReference() {
        const quickRefHtml = `
            <div class="modal fade" id="quickReferenceModal" tabindex="-1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-tachometer-alt"></i>
                                ⚡ Guía Rápida de Referencia Médica
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${this.generateQuickReferenceContent()}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-success" onclick="window.print()">
                                <i class="fas fa-print"></i> Imprimir Guía
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('#quickReferenceModal').remove();
        $('body').append(quickRefHtml);
        $('#medicalHelpModal').modal('hide');
        $('#quickReferenceModal').modal('show');
    }

    generateQuickReferenceContent() {
        return `
            <div class="quick-reference">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header bg-danger text-white">
                                <h6 class="mb-0">🚨 Valores de Alerta Crítica</h6>
                            </div>
                            <div class="card-body">
                                <ul class="list-unstyled">
                                    <li><strong>PA:</strong> ≥160/110 mmHg</li>
                                    <li><strong>Proteinuria:</strong> +++ o ++++</li>
                                    <li><strong>Edad:</strong> <15 o ≥40 años</li>
                                    <li><strong>Hemoglobina:</strong> <7 g/dL</li>
                                    <li><strong>FCF:</strong> <120 o >160 lpm</li>
                                    <li><strong>Gestacional:</strong> ≥42 semanas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header bg-warning text-dark">
                                <h6 class="mb-0">⚠️ Valores de Precaución</h6>
                            </div>
                            <div class="card-body">
                                <ul class="list-unstyled">
                                    <li><strong>PA:</strong> 140-159/90-109 mmHg</li>
                                    <li><strong>Proteinuria:</strong> + o ++</li>
                                    <li><strong>Edad:</strong> 15-19 o 35-39 años</li>
                                    <li><strong>Hemoglobina:</strong> 7-10.9 g/dL</li>
                                    <li><strong>IMC:</strong> <18.5 o ≥30 kg/m²</li>
                                    <li><strong>Abortos previos:</strong> ≥2</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header bg-info text-white">
                                <h6 class="mb-0">📊 Edad Gestacional</h6>
                            </div>
                            <div class="card-body">
                                <ul class="list-unstyled small">
                                    <li><strong>Pretérmino:</strong> <37 semanas</li>
                                    <li><strong>A término:</strong> 37-41 semanas</li>
                                    <li><strong>Postérmino:</strong> ≥42 semanas</li>
                                    <li><strong>Viabilidad:</strong> ≥24 semanas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header bg-success text-white">
                                <h6 class="mb-0">🩸 Grupo Sanguíneo</h6>
                            </div>
                            <div class="card-body">
                                <ul class="list-unstyled small">
                                    <li><strong>Rh(-):</strong> Coombs indirecto</li>
                                    <li><strong>Anti-D:</strong> 28 sem y postparto</li>
                                    <li><strong>Incompatibilidad:</strong> Vigilar ictericia</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header bg-primary text-white">
                                <h6 class="mb-0">💉 Vacunas Seguras</h6>
                            </div>
                            <div class="card-body">
                                <ul class="list-unstyled small">
                                    <li><strong>Tétanos:</strong> Obligatoria</li>
                                    <li><strong>Influenza:</strong> Recomendada</li>
                                    <li><strong>COVID-19:</strong> Recomendada</li>
                                    <li><strong>Contraindicadas:</strong> Vivas atenuadas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    loadMedicalDefinitions() {
        
        
        console.log('Medical definitions loaded:', this.tooltips.size, 'tooltips available');
    }

    
    addCustomTooltip(fieldId, tooltip) {
        this.tooltips.set(fieldId, tooltip);
        this.bindTooltipEvents();
    }

    removeTooltip(fieldId) {
        this.tooltips.delete(fieldId);
        this.hideTooltip(fieldId);
    }

    updateTooltip(fieldId, newTooltip) {
        if (this.tooltips.has(fieldId)) {
            this.tooltips.set(fieldId, { ...this.tooltips.get(fieldId), ...newTooltip });
        }
    }

    getTooltip(fieldId) {
        return this.tooltips.get(fieldId);
    }

    getAllTooltips() {
        return Array.from(this.tooltips.entries());
    }
}


$(document).ready(function() {
    window.medicalTooltips = new MedicalTooltipsSystem();
    
    
    if ($('.medical-help-btn').length === 0) {
        $('.medical-form, .form-section').first().prepend(`
            <button type="button" class="btn btn-link medical-help-btn p-0 mb-3" title="Ayuda médica">
                <i class="fas fa-question-circle text-primary"></i>
                <span class="ms-1">Ayuda Médica</span>
            </button>
        `);
    }
});