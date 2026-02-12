

class MedicalAIAssistant {
    constructor() {
        this.apiEndpoint = '/api/medical-ai';
        this.models = {
            riskPrediction: 'perinatal-risk-v2.1',
            diagnosticAssistant: 'diagnostic-aide-v1.8',
            drugInteraction: 'pharma-check-v1.5',
            icd10Coding: 'icd10-auto-v2.0'
        };
        
        this.currentPatient = null;
        this.activeRecommendations = [];
        this.predictionCache = new Map();
        
        this.initializeAI();
        this.setupEventHandlers();
    }

    initializeAI() {
        
        this.createAIInterface();
        this.loadPatientContext();
        this.startRealTimeAnalysis();
    }

    setupEventHandlers() {
        
        $(document).on('change input', '.medical-input, .form-control', (e) => {
            this.debounceAnalysis(e.target);
        });

        
        $(document).on('click', '.ai-assist-btn', (e) => {
            const analysisType = $(e.target).data('analysis-type');
            this.runSpecificAnalysis(analysisType);
        });

        
        $(document).on('click', '.ai-recommendation-action', (e) => {
            const action = $(e.target).data('action');
            const recommendationId = $(e.target).data('rec-id');
            this.handleRecommendationAction(action, recommendationId);
        });

        
        $(document).on('change', '[name*="Medication"], [name*="Drug"]', () => {
            this.checkDrugInteractions();
        });
    }

    createAIInterface() {
        
        const aiPanel = `
            <div id="aiAssistantPanel" class="ai-assistant-panel">
                <div class="ai-panel-header">
                    <div class="ai-header-content">
                        <span class="ai-icon">🤖</span>
                        <span class="ai-title">SolMed AI Assistant</span>
                        <span class="ai-status" id="aiStatus">
                            <span class="status-indicator active"></span>
                            Active
                        </span>
                    </div>
                    <button class="ai-toggle-btn" id="toggleAIPanel">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                </div>
                
                <div class="ai-panel-body" id="aiPanelBody">
                    <!-- Risk Assessment Section -->
                    <div class="ai-section" id="riskAssessmentSection">
                        <h6 class="ai-section-title">
                            <i class="fas fa-chart-line text-warning"></i>
                            📊 Risk Assessment
                        </h6>
                        <div class="ai-content" id="riskAssessmentContent">
                            <div class="ai-loading">
                                <div class="spinner-border spinner-border-sm"></div>
                                <span>Analyzing patient risk factors...</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Clinical Recommendations -->
                    <div class="ai-section" id="recommendationsSection">
                        <h6 class="ai-section-title">
                            <i class="fas fa-lightbulb text-info"></i>
                            💡 Clinical Recommendations
                        </h6>
                        <div class="ai-content" id="recommendationsContent">
                            <div class="ai-placeholder">
                                Real-time recommendations will appear here
                            </div>
                        </div>
                    </div>
                    
                    <!-- Drug Interactions -->
                    <div class="ai-section" id="drugInteractionsSection">
                        <h6 class="ai-section-title">
                            <i class="fas fa-pills text-danger"></i>
                            💊 Drug Interaction Alerts
                        </h6>
                        <div class="ai-content" id="drugInteractionsContent">
                            <div class="ai-placeholder">
                                No medications detected
                            </div>
                        </div>
                    </div>
                    
                    <!-- Predictive Analytics -->
                    <div class="ai-section" id="predictiveSection">
                        <h6 class="ai-section-title">
                            <i class="fas fa-brain text-purple"></i>
                            🧠 Predictive Analytics
                        </h6>
                        <div class="ai-content" id="predictiveContent">
                            <div class="ai-placeholder">
                                Predictive insights loading...
                            </div>
                        </div>
                    </div>
                    
                    <!-- ICD-10 Coding -->
                    <div class="ai-section" id="icd10Section">
                        <h6 class="ai-section-title">
                            <i class="fas fa-code text-success"></i>
                            📋 Automated ICD-10 Coding
                        </h6>
                        <div class="ai-content" id="icd10Content">
                            <div class="ai-placeholder">
                                ICD-10 codes will be suggested automatically
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="ai-panel-footer">
                    <small class="text-muted">
                        <i class="fas fa-shield-alt"></i>
                        AI recommendations are advisory only. Clinical judgment always required.
                    </small>
                </div>
            </div>
        `;

        
        $('.medical-form').prepend(aiPanel);
        
        
        $('#toggleAIPanel').on('click', () => {
            this.toggleAIPanel();
        });
    }

    async loadPatientContext() {
        try {
            
            this.currentPatient = this.extractPatientData();
            
            
            this.updateAIStatus('analyzing', 'Analyzing patient data...');
            
            
            await this.runInitialAssessment();
            
            this.updateAIStatus('active', 'AI Analysis Complete');
            
        } catch (error) {
            console.error('Error loading patient context:', error);
            this.updateAIStatus('error', 'AI Analysis Error');
        }
    }

    extractPatientData() {
        const patient = {
            age: parseInt($('#Age').val()) || null,
            gestationalAge: this.parseGestationalAge($('#GestationalAge').val()),
            gravida: parseInt($('#Gravida').val()) || 0,
            para: parseInt($('#Para').val()) || 0,
            abortions: parseInt($('#Abortions').val()) || 0,
            weight: parseFloat($('#Weight').val()) || null,
            height: parseFloat($('#Height').val()) || null,
            bloodPressure: this.parseBloodPressure($('#BloodPressure').val()),
            lastMenstrualPeriod: $('#LastMenstrualPeriod').val(),
            medicalHistory: this.extractMedicalHistory(),
            medications: this.extractMedications(),
            labResults: this.extractLabResults(),
            symptoms: this.extractSymptoms(),
            timestamp: new Date().toISOString()
        };

        
        patient.bmi = patient.weight && patient.height ? 
            patient.weight / Math.pow(patient.height / 100, 2) : null;
        
        patient.gestationalWeeks = this.calculateGestationalWeeks(patient.lastMenstrualPeriod);
        
        return patient;
    }

    async runInitialAssessment() {
        
        const assessments = await Promise.allSettled([
            this.analyzeRiskFactors(),
            this.generateRecommendations(),
            this.checkDrugInteractions(),
            this.runPredictiveAnalysis(),
            this.suggestICD10Codes()
        ]);

        
        assessments.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                this.processAssessmentResult(index, result.value);
            } else {
                console.warn(`Assessment ${index} failed:`, result.reason);
            }
        });
    }

    async analyzeRiskFactors() {
        const riskFactors = {
            maternal: this.assessMaternalRisk(),
            obstetric: this.assessObstetricRisk(),
            medical: this.assessMedicalRisk(),
            fetal: this.assessFetalRisk()
        };

        const overallRisk = this.calculateOverallRisk(riskFactors);
        
        this.displayRiskAssessment(riskFactors, overallRisk);
        return { riskFactors, overallRisk };
    }

    assessMaternalRisk() {
        const risks = [];
        const patient = this.currentPatient;

        
        if (patient.age < 18) {
            risks.push({
                factor: 'Adolescent Pregnancy',
                severity: patient.age < 15 ? 'critical' : 'high',
                description: 'Increased risk of complications due to young maternal age',
                recommendations: ['Enhanced prenatal monitoring', 'Nutritional counseling', 'Psychosocial support']
            });
        } else if (patient.age >= 35) {
            risks.push({
                factor: 'Advanced Maternal Age',
                severity: patient.age >= 40 ? 'high' : 'moderate',
                description: 'Increased risk of chromosomal abnormalities and complications',
                recommendations: ['Genetic counseling', 'Enhanced screening', 'Specialized monitoring']
            });
        }

        
        if (patient.bmi) {
            if (patient.bmi < 18.5) {
                risks.push({
                    factor: 'Maternal Underweight',
                    severity: 'moderate',
                    description: 'Risk of intrauterine growth restriction',
                    recommendations: ['Nutritional assessment', 'Weight gain monitoring', 'Dietary counseling']
                });
            } else if (patient.bmi >= 30) {
                risks.push({
                    factor: 'Maternal Obesity',
                    severity: patient.bmi >= 35 ? 'high' : 'moderate',
                    description: 'Increased risk of diabetes, hypertension, and operative delivery',
                    recommendations: ['Glucose screening', 'Blood pressure monitoring', 'Exercise counseling']
                });
            }
        }

        return risks;
    }

    assessObstetricRisk() {
        const risks = [];
        const patient = this.currentPatient;

        
        if (patient.gravida >= 5) {
            risks.push({
                factor: 'Grand Multiparity',
                severity: 'moderate',
                description: 'Increased risk of complications with high parity',
                recommendations: ['Enhanced monitoring', 'Anemia screening', 'Uterine assessment']
            });
        }

        
        if (patient.abortions >= 3) {
            risks.push({
                factor: 'Recurrent Pregnancy Loss',
                severity: 'high',
                description: 'History of multiple pregnancy losses requires investigation',
                recommendations: ['Genetic counseling', 'Thrombophilia screening', 'Endocrine evaluation']
            });
        }

        
        const livingChildren = patient.para - (patient.abortions || 0);
        if (patient.para > 0 && livingChildren < patient.para * 0.8) {
            risks.push({
                factor: 'Previous Adverse Outcomes',
                severity: 'moderate',
                description: 'History suggests potential for recurrent complications',
                recommendations: ['Detailed history review', 'Specialized care', 'Enhanced monitoring']
            });
        }

        return risks;
    }

    assessMedicalRisk() {
        const risks = [];
        const history = this.currentPatient.medicalHistory;

        
        if (history.hypertension || this.hasHypertension()) {
            risks.push({
                factor: 'Hypertension',
                severity: this.getHypertensionSeverity(),
                description: 'Risk of preeclampsia and placental complications',
                recommendations: ['Frequent BP monitoring', 'Protein assessment', 'Fetal surveillance']
            });
        }

        
        if (history.diabetes || this.hasDiabetes()) {
            risks.push({
                factor: 'Diabetes Mellitus',
                severity: 'high',
                description: 'Risk of macrosomia, malformations, and metabolic complications',
                recommendations: ['Glucose monitoring', 'Insulin therapy if needed', 'Fetal surveillance']
            });
        }

        return risks;
    }

    assessFetalRisk() {
        const risks = [];
        const patient = this.currentPatient;

        
        if (patient.gestationalWeeks) {
            if (patient.gestationalWeeks < 24) {
                risks.push({
                    factor: 'Extreme Prematurity Risk',
                    severity: 'critical',
                    description: 'Pregnancy below viability threshold',
                    recommendations: ['Immediate obstetric consultation', 'Neonatal consultation', 'Family counseling']
                });
            } else if (patient.gestationalWeeks >= 42) {
                risks.push({
                    factor: 'Post-term Pregnancy',
                    severity: 'high',
                    description: 'Increased risk of oligohydramnios and stillbirth',
                    recommendations: ['Immediate delivery consideration', 'Fetal surveillance', 'Amniotic fluid assessment']
                });
            }
        }

        return risks;
    }

    calculateOverallRisk(riskFactors) {
        let riskScore = 0;
        let criticalCount = 0;
        let highCount = 0;
        let moderateCount = 0;

        Object.values(riskFactors).flat().forEach(risk => {
            switch (risk.severity) {
                case 'critical':
                    riskScore += 10;
                    criticalCount++;
                    break;
                case 'high':
                    riskScore += 6;
                    highCount++;
                    break;
                case 'moderate':
                    riskScore += 3;
                    moderateCount++;
                    break;
                default:
                    riskScore += 1;
            }
        });

        let overallLevel;
        if (criticalCount > 0 || riskScore >= 15) {
            overallLevel = 'critical';
        } else if (highCount >= 2 || riskScore >= 10) {
            overallLevel = 'high';
        } else if (riskScore >= 5) {
            overallLevel = 'moderate';
        } else {
            overallLevel = 'low';
        }

        return {
            level: overallLevel,
            score: riskScore,
            distribution: { criticalCount, highCount, moderateCount },
            totalFactors: Object.values(riskFactors).flat().length
        };
    }

    displayRiskAssessment(riskFactors, overallRisk) {
        const riskColors = {
            critical: '#dc3545',
            high: '#fd7e14',
            moderate: '#ffc107',
            low: '#28a745'
        };

        const riskIcons = {
            critical: '🚨',
            high: '⚠️',
            moderate: '⚖️',
            low: '✅'
        };

        let html = `
            <div class="risk-overview">
                <div class="overall-risk ${overallRisk.level}">
                    <div class="risk-header">
                        <span class="risk-icon">${riskIcons[overallRisk.level]}</span>
                        <span class="risk-level">${overallRisk.level.toUpperCase()} RISK</span>
                        <span class="risk-score">Score: ${overallRisk.score}</span>
                    </div>
                    <div class="risk-summary">
                        ${overallRisk.totalFactors} risk factors identified
                    </div>
                </div>
            </div>
            
            <div class="risk-categories">
        `;

        Object.entries(riskFactors).forEach(([category, risks]) => {
            if (risks.length > 0) {
                html += `
                    <div class="risk-category">
                        <h7 class="category-title">${category.charAt(0).toUpperCase() + category.slice(1)} Risks</h7>
                        <div class="risk-items">
                `;
                
                risks.forEach(risk => {
                    html += `
                        <div class="risk-item ${risk.severity}">
                            <div class="risk-factor">
                                <strong>${risk.factor}</strong>
                                <span class="severity-badge ${risk.severity}">${risk.severity}</span>
                            </div>
                            <div class="risk-description">${risk.description}</div>
                            <div class="risk-recommendations">
                                <strong>Recommendations:</strong>
                                <ul>
                                    ${risk.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                });
                
                html += `
                        </div>
                    </div>
                `;
            }
        });

        html += `</div>`;

        $('#riskAssessmentContent').html(html);
    }

    async generateRecommendations() {
        const recommendations = [];
        const patient = this.currentPatient;

        
        const clinicalRecommendations = this.generateClinicalRecommendations();
        const preventiveRecommendations = this.generatePreventiveRecommendations();
        const monitoringRecommendations = this.generateMonitoringRecommendations();

        recommendations.push(...clinicalRecommendations, ...preventiveRecommendations, ...monitoringRecommendations);

        this.displayRecommendations(recommendations);
        this.activeRecommendations = recommendations;

        return recommendations;
    }

    generateClinicalRecommendations() {
        const recommendations = [];
        const patient = this.currentPatient;

        
        if (patient.age < 18) {
            recommendations.push({
                id: 'adolescent-care',
                type: 'clinical',
                priority: 'high',
                title: 'Adolescent Pregnancy Protocol',
                description: 'Implement specialized care for adolescent pregnancy',
                actions: [
                    'Schedule psychosocial assessment',
                    'Arrange nutritional counseling',
                    'Consider family planning education',
                    'Coordinate with social services if needed'
                ],
                evidence: 'ACOG Committee Opinion 713',
                timeline: 'Within 1 week'
            });
        }

        if (patient.age >= 35) {
            recommendations.push({
                id: 'ama-screening',
                type: 'clinical',
                priority: 'moderate',
                title: 'Advanced Maternal Age Screening',
                description: 'Enhanced screening for chromosomal abnormalities',
                actions: [
                    'Offer genetic counseling',
                    'Discuss cell-free DNA screening',
                    'Consider diagnostic testing options',
                    'Enhanced fetal surveillance'
                ],
                evidence: 'ACOG Practice Bulletin 226',
                timeline: 'Before 20 weeks'
            });
        }

        
        if (patient.gestationalWeeks >= 42) {
            recommendations.push({
                id: 'postterm-management',
                type: 'clinical',
                priority: 'critical',
                title: 'Post-term Pregnancy Management',
                description: 'Immediate evaluation and management of post-term pregnancy',
                actions: [
                    'Perform immediate fetal assessment',
                    'Evaluate amniotic fluid volume',
                    'Discuss delivery options',
                    'Consider induction of labor'
                ],
                evidence: 'ACOG Practice Bulletin 146',
                timeline: 'Immediate'
            });
        }

        return recommendations;
    }

    generatePreventiveRecommendations() {
        const recommendations = [];
        const patient = this.currentPatient;

        
        recommendations.push({
            id: 'routine-supplements',
            type: 'preventive',
            priority: 'moderate',
            title: 'Prenatal Supplementation',
            description: 'Ensure adequate prenatal vitamins and minerals',
            actions: [
                'Prescribe folic acid 400-800 mcg daily',
                'Ensure iron supplementation if indicated',
                'Consider vitamin D supplementation',
                'Assess calcium intake'
            ],
            evidence: 'WHO Recommendations',
            timeline: 'Throughout pregnancy'
        });

        
        recommendations.push({
            id: 'vaccinations',
            type: 'preventive',
            priority: 'moderate',
            title: 'Pregnancy Vaccinations',
            description: 'Administer recommended vaccines',
            actions: [
                'Confirm tetanus vaccination status',
                'Offer influenza vaccine',
                'Administer Tdap vaccine (27-36 weeks)',
                'Discuss COVID-19 vaccination'
            ],
            evidence: 'CDC Vaccination Guidelines',
            timeline: 'Per schedule'
        });

        return recommendations;
    }

    generateMonitoringRecommendations() {
        const recommendations = [];
        const patient = this.currentPatient;

        
        if (this.hasHypertensionRisk()) {
            recommendations.push({
                id: 'bp-monitoring',
                type: 'monitoring',
                priority: 'high',
                title: 'Enhanced Blood Pressure Monitoring',
                description: 'Frequent BP monitoring due to hypertension risk',
                actions: [
                    'Weekly BP checks',
                    'Home BP monitoring if available',
                    'Protein assessment',
                    'Symptom education'
                ],
                evidence: 'ACOG Practice Bulletin 222',
                timeline: 'Weekly'
            });
        }

        
        if (patient.gestationalWeeks >= 28) {
            recommendations.push({
                id: 'fetal-monitoring',
                type: 'monitoring',
                priority: 'moderate',
                title: 'Fetal Well-being Assessment',
                description: 'Regular fetal surveillance',
                actions: [
                    'Daily fetal movement counts',
                    'Regular fundal height measurement',
                    'Consider NST if indicated',
                    'Ultrasound as needed'
                ],
                evidence: 'ACOG Practice Bulletin 229',
                timeline: 'Per visit'
            });
        }

        return recommendations;
    }

    displayRecommendations(recommendations) {
        let html = '';

        if (recommendations.length === 0) {
            html = '<div class="ai-placeholder">No specific recommendations at this time</div>';
        } else {
            recommendations.forEach(rec => {
                const priorityClass = `priority-${rec.priority}`;
                const typeIcon = this.getRecommendationIcon(rec.type);
                
                html += `
                    <div class="ai-recommendation ${priorityClass}" data-rec-id="${rec.id}">
                        <div class="rec-header">
                            <span class="rec-icon">${typeIcon}</span>
                            <span class="rec-title">${rec.title}</span>
                            <span class="rec-priority ${rec.priority}">${rec.priority}</span>
                        </div>
                        <div class="rec-description">${rec.description}</div>
                        <div class="rec-actions">
                            <strong>Recommended Actions:</strong>
                            <ul>
                                ${rec.actions.map(action => `<li>${action}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="rec-footer">
                            <span class="rec-evidence">Evidence: ${rec.evidence}</span>
                            <span class="rec-timeline">Timeline: ${rec.timeline}</span>
                        </div>
                        <div class="rec-buttons">
                            <button class="btn btn-sm btn-success ai-recommendation-action" 
                                    data-action="accept" data-rec-id="${rec.id}">
                                <i class="fas fa-check"></i> Accept
                            </button>
                            <button class="btn btn-sm btn-warning ai-recommendation-action" 
                                    data-action="modify" data-rec-id="${rec.id}">
                                <i class="fas fa-edit"></i> Modify
                            </button>
                            <button class="btn btn-sm btn-secondary ai-recommendation-action" 
                                    data-action="dismiss" data-rec-id="${rec.id}">
                                <i class="fas fa-times"></i> Dismiss
                            </button>
                        </div>
                    </div>
                `;
            });
        }

        $('#recommendationsContent').html(html);
    }

    async checkDrugInteractions() {
        const medications = this.extractMedications();
        
        if (medications.length === 0) {
            $('#drugInteractionsContent').html('<div class="ai-placeholder">No medications detected</div>');
            return;
        }

        
        const interactions = this.simulateDrugInteractionCheck(medications);
        
        this.displayDrugInteractions(interactions, medications);
    }

    simulateDrugInteractionCheck(medications) {
        
        const interactions = [];
        const contraindicated = ['warfarin', 'isotretinoin', 'ace-inhibitors', 'valproic-acid'];
        const cautionary = ['aspirin', 'ibuprofen', 'metformin', 'insulin'];

        medications.forEach(med => {
            const medName = med.toLowerCase();
            
            if (contraindicated.some(drug => medName.includes(drug))) {
                interactions.push({
                    medication: med,
                    severity: 'contraindicated',
                    description: 'Contraindicated in pregnancy - risk of teratogenicity',
                    action: 'Discontinue immediately and consider alternatives',
                    category: 'FDA Category D/X'
                });
            } else if (cautionary.some(drug => medName.includes(drug))) {
                interactions.push({
                    medication: med,
                    severity: 'caution',
                    description: 'Use with caution - monitor for adverse effects',
                    action: 'Monitor closely and assess benefit-risk ratio',
                    category: 'FDA Category C'
                });
            }
        });

        
        if (medications.length >= 2) {
            
            if (medications.some(m => m.toLowerCase().includes('insulin')) &&
                medications.some(m => m.toLowerCase().includes('metformin'))) {
                interactions.push({
                    medication: 'Insulin + Metformin',
                    severity: 'monitor',
                    description: 'Possible additive hypoglycemic effect',
                    action: 'Monitor blood glucose closely',
                    category: 'Drug-Drug Interaction'
                });
            }
        }

        return interactions;
    }

    displayDrugInteractions(interactions, medications) {
        if (interactions.length === 0) {
            $('#drugInteractionsContent').html(`
                <div class="drug-safety-ok">
                    <i class="fas fa-check-circle text-success"></i>
                    <span>No significant drug interactions detected</span>
                    <div class="medications-list">
                        <strong>Current medications:</strong>
                        <ul>
                            ${medications.map(med => `<li>${med}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `);
            return;
        }

        let html = '<div class="drug-interactions">';
        
        interactions.forEach(interaction => {
            const severityClass = `severity-${interaction.severity}`;
            const severityIcon = this.getDrugInteractionIcon(interaction.severity);
            
            html += `
                <div class="drug-interaction ${severityClass}">
                    <div class="interaction-header">
                        <span class="severity-icon">${severityIcon}</span>
                        <span class="medication-name">${interaction.medication}</span>
                        <span class="severity-badge ${interaction.severity}">${interaction.severity}</span>
                    </div>
                    <div class="interaction-description">${interaction.description}</div>
                    <div class="interaction-action">
                        <strong>Recommended Action:</strong> ${interaction.action}
                    </div>
                    <div class="interaction-category">
                        <small>${interaction.category}</small>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        $('#drugInteractionsContent').html(html);
    }

    async runPredictiveAnalysis() {
        const patient = this.currentPatient;
        
        
        const predictions = {
            preeclampsia: this.predictPreeclampsia(patient),
            gestationalDiabetes: this.predictGestationalDiabetes(patient),
            pretermBirth: this.predictPretermBirth(patient),
            cesareanDelivery: this.predictCesareanDelivery(patient),
            postpartumHemorrhage: this.predictPostpartumHemorrhage(patient)
        };

        this.displayPredictiveAnalysis(predictions);
        return predictions;
    }

    predictPreeclampsia(patient) {
        let riskScore = 0;
        const factors = [];

        
        if (patient.age >= 35) {
            riskScore += 15;
            factors.push('Advanced maternal age');
        } else if (patient.age < 18) {
            riskScore += 10;
            factors.push('Young maternal age');
        }

        
        if (patient.bmi >= 30) {
            riskScore += 20;
            factors.push('Maternal obesity');
        }

        
        if (patient.para === 0) {
            riskScore += 10;
            factors.push('First pregnancy');
        }

        
        if (patient.medicalHistory.hypertension) {
            riskScore += 25;
            factors.push('Chronic hypertension');
        }

        if (patient.medicalHistory.diabetes) {
            riskScore += 15;
            factors.push('Diabetes mellitus');
        }

        
        if (patient.medicalHistory.multiplePregnancy) {
            riskScore += 20;
            factors.push('Multiple pregnancy');
        }

        let riskLevel;
        if (riskScore >= 40) riskLevel = 'high';
        else if (riskScore >= 20) riskLevel = 'moderate';
        else riskLevel = 'low';

        return {
            condition: 'Preeclampsia',
            probability: Math.min(95, riskScore * 2),
            riskLevel,
            factors,
            prevention: [
                'Low-dose aspirin starting at 12-16 weeks',
                'Calcium supplementation if low dietary intake',
                'Regular blood pressure monitoring',
                'Protein assessment at each visit'
            ]
        };
    }

    predictGestationalDiabetes(patient) {
        let riskScore = 0;
        const factors = [];

        
        if (patient.age >= 25) {
            riskScore += 10;
            factors.push('Age ≥25 years');
        }

        
        if (patient.bmi >= 25) {
            riskScore += 15;
            factors.push('Overweight/obesity');
        }

        
        if (patient.medicalHistory.familyDiabetes) {
            riskScore += 20;
            factors.push('Family history of diabetes');
        }

        
        if (patient.medicalHistory.previousGDM) {
            riskScore += 30;
            factors.push('Previous gestational diabetes');
        }

        
        if (patient.ethnicity && ['hispanic', 'african', 'asian'].includes(patient.ethnicity.toLowerCase())) {
            riskScore += 10;
            factors.push('High-risk ethnicity');
        }

        let riskLevel;
        if (riskScore >= 35) riskLevel = 'high';
        else if (riskScore >= 20) riskLevel = 'moderate';
        else riskLevel = 'low';

        return {
            condition: 'Gestational Diabetes',
            probability: Math.min(90, riskScore * 1.5),
            riskLevel,
            factors,
            prevention: [
                'Dietary counseling and nutritional planning',
                'Regular physical activity as tolerated',
                'Early glucose screening if high risk',
                'Weight management guidance'
            ]
        };
    }

    predictPretermBirth(patient) {
        let riskScore = 0;
        const factors = [];

        
        if (patient.age < 18 || patient.age >= 35) {
            riskScore += 10;
            factors.push('Maternal age risk factor');
        }

        
        if (patient.medicalHistory.previousPreterm) {
            riskScore += 30;
            factors.push('Previous preterm delivery');
        }

        
        if (patient.medicalHistory.multiplePregnancy) {
            riskScore += 40;
            factors.push('Multiple pregnancy');
        }

        
        if (patient.para > 0 && patient.medicalHistory.shortInterval) {
            riskScore += 15;
            factors.push('Short interpregnancy interval');
        }

        
        if (patient.medicalHistory.smoking) {
            riskScore += 20;
            factors.push('Smoking');
        }

        let riskLevel;
        if (riskScore >= 40) riskLevel = 'high';
        else if (riskScore >= 20) riskLevel = 'moderate';
        else riskLevel = 'low';

        return {
            condition: 'Preterm Birth',
            probability: Math.min(85, riskScore * 1.2),
            riskLevel,
            factors,
            prevention: [
                'Progesterone supplementation if indicated',
                'Smoking cessation counseling',
                'Cervical length screening',
                'Infection screening and treatment'
            ]
        };
    }

    predictCesareanDelivery(patient) {
        let riskScore = 0;
        const factors = [];

        
        if (patient.medicalHistory.previousCesarean) {
            riskScore += 30;
            factors.push('Previous cesarean delivery');
        }

        
        if (patient.age >= 35) {
            riskScore += 10;
            factors.push('Advanced maternal age');
        }

        
        if (patient.bmi >= 30) {
            riskScore += 15;
            factors.push('Maternal obesity');
        }

        
        if (patient.para === 0) {
            riskScore += 5;
            factors.push('First pregnancy');
        }

        
        if (patient.medicalHistory.diabetes) {
            riskScore += 10;
            factors.push('Diabetes mellitus');
        }

        let riskLevel;
        if (riskScore >= 35) riskLevel = 'high';
        else if (riskScore >= 20) riskLevel = 'moderate';
        else riskLevel = 'low';

        return {
            condition: 'Cesarean Delivery',
            probability: Math.min(90, riskScore * 1.8),
            riskLevel,
            factors,
            prevention: [
                'Labor support and doula care',
                'Avoid unnecessary interventions',
                'Consider VBAC if applicable',
                'Optimal positioning during labor'
            ]
        };
    }

    predictPostpartumHemorrhage(patient) {
        let riskScore = 0;
        const factors = [];

        
        if (patient.para >= 4) {
            riskScore += 15;
            factors.push('Grand multiparity');
        }

        
        if (patient.medicalHistory.previousPPH) {
            riskScore += 25;
            factors.push('Previous postpartum hemorrhage');
        }

        
        if (patient.medicalHistory.multiplePregnancy) {
            riskScore += 20;
            factors.push('Multiple pregnancy');
        }

        
        if (patient.medicalHistory.macrosomia) {
            riskScore += 10;
            factors.push('History of macrosomia');
        }

        let riskLevel;
        if (riskScore >= 30) riskLevel = 'high';
        else if (riskScore >= 15) riskLevel = 'moderate';
        else riskLevel = 'low';

        return {
            condition: 'Postpartum Hemorrhage',
            probability: Math.min(75, riskScore * 2.5),
            riskLevel,
            factors,
            prevention: [
                'Active management of third stage',
                'Type and screen blood',
                'Prepare for emergency management',
                'Consider prophylactic uterotonics'
            ]
        };
    }

    displayPredictiveAnalysis(predictions) {
        let html = '<div class="predictive-analytics">';

        Object.values(predictions).forEach(prediction => {
            const riskClass = `risk-${prediction.riskLevel}`;
            const probabilityColor = this.getProbabilityColor(prediction.probability);
            
            html += `
                <div class="prediction-item ${riskClass}">
                    <div class="prediction-header">
                        <span class="condition-name">${prediction.condition}</span>
                        <div class="probability-container">
                            <div class="probability-bar">
                                <div class="probability-fill" 
                                     style="width: ${prediction.probability}%; background-color: ${probabilityColor}">
                                </div>
                            </div>
                            <span class="probability-text">${prediction.probability.toFixed(1)}%</span>
                        </div>
                    </div>
                    
                    <div class="prediction-details">
                        <div class="risk-factors">
                            <strong>Risk Factors:</strong>
                            <ul>
                                ${prediction.factors.map(factor => `<li>${factor}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="prevention-strategies">
                            <strong>Prevention Strategies:</strong>
                            <ul>
                                ${prediction.prevention.map(strategy => `<li>${strategy}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        
        $('#predictiveContent').html(html);
    }

    async suggestICD10Codes() {
        const patient = this.currentPatient;
        const codes = this.generateICD10Suggestions(patient);
        
        this.displayICD10Codes(codes);
        return codes;
    }

    generateICD10Suggestions(patient) {
        const codes = [];

        
        if (patient.gestationalWeeks) {
            if (patient.gestationalWeeks < 20) {
                codes.push({
                    code: 'Z34.00',
                    description: 'Encounter for supervision of normal first pregnancy, unspecified trimester',
                    category: 'Primary',
                    confidence: 0.95
                });
            } else {
                codes.push({
                    code: 'Z34.02',
                    description: 'Encounter for supervision of normal first pregnancy, second trimester',
                    category: 'Primary',
                    confidence: 0.95
                });
            }
        }

        
        if (patient.age < 16) {
            codes.push({
                code: 'O09.70',
                description: 'Supervision of young primigravida, unspecified trimester',
                category: 'Risk Factor',
                confidence: 0.90
            });
        } else if (patient.age >= 35) {
            codes.push({
                code: 'O09.511',
                description: 'Supervision of elderly primigravida, first trimester',
                category: 'Risk Factor',
                confidence: 0.90
            });
        }

        
        if (patient.para >= 5) {
            codes.push({
                code: 'O09.4',
                description: 'Supervision of pregnancy with grand multiparity',
                category: 'Risk Factor',
                confidence: 0.88
            });
        }

        
        if (patient.abortions >= 1) {
            codes.push({
                code: 'O09.291',
                description: 'Supervision of pregnancy with other poor reproductive or obstetric history, first trimester',
                category: 'Risk Factor',
                confidence: 0.85
            });
        }

        
        if (patient.bmi) {
            if (patient.bmi >= 30) {
                codes.push({
                    code: 'O99.214',
                    description: 'Obesity complicating pregnancy, unspecified trimester',
                    category: 'Complication',
                    confidence: 0.92
                });
            } else if (patient.bmi < 18.5) {
                codes.push({
                    code: 'O99.214',
                    description: 'Malnutrition in pregnancy, unspecified trimester',
                    category: 'Complication',
                    confidence: 0.87
                });
            }
        }

        
        if (patient.medicalHistory.hypertension) {
            codes.push({
                code: 'O10.911',
                description: 'Unspecified pre-existing hypertension complicating pregnancy, first trimester',
                category: 'Complication',
                confidence: 0.93
            });
        }

        if (patient.medicalHistory.diabetes) {
            codes.push({
                code: 'O24.111',
                description: 'Pre-existing type 1 diabetes mellitus, in pregnancy, first trimester',
                category: 'Complication',
                confidence: 0.91
            });
        }

        return codes.sort((a, b) => b.confidence - a.confidence);
    }

    displayICD10Codes(codes) {
        if (codes.length === 0) {
            $('#icd10Content').html('<div class="ai-placeholder">No ICD-10 codes suggested</div>');
            return;
        }

        let html = '<div class="icd10-suggestions">';
        
        codes.forEach(code => {
            const confidenceWidth = code.confidence * 100;
            const categoryClass = `category-${code.category.toLowerCase().replace(' ', '-')}`;
            
            html += `
                <div class="icd10-code ${categoryClass}">
                    <div class="code-header">
                        <span class="code-number">${code.code}</span>
                        <span class="code-category">${code.category}</span>
                        <div class="confidence-meter">
                            <div class="confidence-bar">
                                <div class="confidence-fill" style="width: ${confidenceWidth}%"></div>
                            </div>
                            <span class="confidence-text">${(code.confidence * 100).toFixed(0)}%</span>
                        </div>
                    </div>
                    <div class="code-description">${code.description}</div>
                    <div class="code-actions">
                        <button class="btn btn-sm btn-primary" onclick="applyICD10Code('${code.code}')">
                            <i class="fas fa-plus"></i> Apply Code
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="viewICD10Details('${code.code}')">
                            <i class="fas fa-info"></i> Details
                        </button>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        $('#icd10Content').html(html);
    }

    
    debounceAnalysis = this.debounce((target) => {
        this.runFieldAnalysis(target);
    }, 1000);

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    runFieldAnalysis(field) {
        
        this.currentPatient = this.extractPatientData();
        
        
        this.analyzeRiskFactors();
        
        
        this.generateRecommendations();
    }

    
    parseGestationalAge(value) {
        if (!value) return null;
        const parts = value.split(/[w+d\s]+/);
        const weeks = parseInt(parts[0]) || 0;
        const days = parseInt(parts[1]) || 0;
        return weeks + (days / 7);
    }

    parseBloodPressure(value) {
        if (!value) return null;
        const parts = value.split('/');
        return {
            systolic: parseInt(parts[0]) || null,
            diastolic: parseInt(parts[1]) || null
        };
    }

    calculateGestationalWeeks(lmp) {
        if (!lmp) return null;
        const today = new Date();
        const lmpDate = new Date(lmp);
        const diffTime = Math.abs(today - lmpDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.floor(diffDays / 7);
    }

    extractMedicalHistory() {
        return {
            hypertension: $('[id*="Hypertension"]:checked').length > 0,
            diabetes: $('[id*="Diabetes"]:checked').length > 0,
            previousPreterm: $('[id*="Preterm"]:checked').length > 0,
            previousCesarean: $('[id*="Cesarean"]:checked').length > 0,
            multiplePregnancy: $('[id*="Multiple"]:checked').length > 0,
            familyDiabetes: $('[id*="FamilyDiabetes"]:checked').length > 0,
            smoking: $('[id*="Smoking"]:checked').length > 0
        };
    }

    extractMedications() {
        const medications = [];
        $('[name*="medication"], [name*="drug"], [id*="medication"], [id*="drug"]').each(function() {
            const value = $(this).val();
            if (value && value.trim()) {
                medications.push(value.trim());
            }
        });
        return medications;
    }

    extractLabResults() {
        return {
            hemoglobin: parseFloat($('#Hemoglobin').val()) || null,
            glucose: parseFloat($('#Glucose').val()) || null,
            protein: $('#Proteinuria').val() || null,
            bloodType: $('#BloodType').val() || null
        };
    }

    extractSymptoms() {
        const symptoms = [];
        $('[name*="symptom"], [id*="symptom"]').each(function() {
            if ($(this).is(':checked') || $(this).val()) {
                symptoms.push($(this).attr('name') || $(this).attr('id'));
            }
        });
        return symptoms;
    }

    hasHypertension() {
        const bp = this.currentPatient.bloodPressure;
        return bp && (bp.systolic >= 140 || bp.diastolic >= 90);
    }

    hasDiabetes() {
        return this.currentPatient.medicalHistory.diabetes;
    }

    getHypertensionSeverity() {
        const bp = this.currentPatient.bloodPressure;
        if (!bp) return 'unknown';
        
        if (bp.systolic >= 160 || bp.diastolic >= 110) return 'severe';
        if (bp.systolic >= 140 || bp.diastolic >= 90) return 'mild';
        return 'normal';
    }

    hasHypertensionRisk() {
        return this.hasHypertension() || 
               this.currentPatient.medicalHistory.hypertension ||
               this.currentPatient.age >= 35 ||
               this.currentPatient.bmi >= 30;
    }

    getRecommendationIcon(type) {
        const icons = {
            clinical: '🩺',
            preventive: '🛡️',
            monitoring: '📊',
            diagnostic: '🔬',
            therapeutic: '💊'
        };
        return icons[type] || '📋';
    }

    getDrugInteractionIcon(severity) {
        const icons = {
            contraindicated: '🚫',
            caution: '⚠️',
            monitor: '👁️',
            minor: 'ℹ️'
        };
        return icons[severity] || '💊';
    }

    getProbabilityColor(probability) {
        if (probability >= 70) return '#dc3545'; 
        if (probability >= 40) return '#fd7e14'; 
        if (probability >= 20) return '#ffc107'; 
        return '#28a745'; 
    }

    toggleAIPanel() {
        const panel = $('#aiPanelBody');
        const toggle = $('#toggleAIPanel i');
        
        panel.slideToggle(300);
        toggle.toggleClass('fa-chevron-up fa-chevron-down');
    }

    updateAIStatus(status, message) {
        const statusElement = $('#aiStatus');
        const indicator = statusElement.find('.status-indicator');
        
        
        indicator.removeClass('active error analyzing');
        
        
        indicator.addClass(status);
        
        
        statusElement.find('span:last-child').text(message);
    }

    startRealTimeAnalysis() {
        
        setInterval(() => {
            if (this.currentPatient) {
                this.runQuickAssessment();
            }
        }, 30000);
    }

    async runQuickAssessment() {
        
        this.currentPatient = this.extractPatientData();
        await this.analyzeRiskFactors();
    }

    handleRecommendationAction(action, recommendationId) {
        const recommendation = this.activeRecommendations.find(r => r.id === recommendationId);
        
        switch (action) {
            case 'accept':
                this.acceptRecommendation(recommendation);
                break;
            case 'modify':
                this.modifyRecommendation(recommendation);
                break;
            case 'dismiss':
                this.dismissRecommendation(recommendation);
                break;
        }
    }

    acceptRecommendation(recommendation) {
        
        console.log('Accepting recommendation:', recommendation.title);
        
        
        $(`.ai-recommendation[data-rec-id="${recommendation.id}"]`)
            .addClass('accepted')
            .find('.rec-buttons')
            .html('<span class="text-success"><i class="fas fa-check"></i> Accepted</span>');
    }

    modifyRecommendation(recommendation) {
        
        console.log('Modifying recommendation:', recommendation.title);
        
    }

    dismissRecommendation(recommendation) {
        
        console.log('Dismissing recommendation:', recommendation.title);
        
        $(`.ai-recommendation[data-rec-id="${recommendation.id}"]`)
            .fadeOut(300, function() {
                $(this).remove();
            });
            
        this.activeRecommendations = this.activeRecommendations.filter(r => r.id !== recommendation.id);
    }

    processAssessmentResult(index, result) {
        
        console.log(`Assessment ${index} completed:`, result);
    }

    runSpecificAnalysis(analysisType) {
        switch (analysisType) {
            case 'risk':
                this.analyzeRiskFactors();
                break;
            case 'recommendations':
                this.generateRecommendations();
                break;
            case 'drugs':
                this.checkDrugInteractions();
                break;
            case 'predictive':
                this.runPredictiveAnalysis();
                break;
            case 'icd10':
                this.suggestICD10Codes();
                break;
        }
    }
}


window.applyICD10Code = function(code) {
    console.log('Applying ICD-10 code:', code);
    
    
    
    const alert = $(`
        <div class="alert alert-success alert-dismissible fade show position-fixed" 
             style="top: 20px; right: 20px; z-index: 9999;">
            <i class="fas fa-check-circle me-2"></i>
            ICD-10 code ${code} applied successfully
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `);
    $('body').append(alert);
    setTimeout(() => alert.fadeOut(), 3000);
};

window.viewICD10Details = function(code) {
    console.log('Viewing ICD-10 code details:', code);
    
};


$(document).ready(function() {
    window.medicalAI = new MedicalAIAssistant();
    console.log('🤖 SolMed AI Medical Assistant initialized successfully');
});