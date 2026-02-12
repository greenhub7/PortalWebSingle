

class FHIRIntegrationSystem {
    constructor() {
        this.baseUrl = '/api/fhir/R4';
        this.version = '4.0.1';
        this.conformanceStatement = null;
        
        
        this.supportedResources = [
            'Patient', 'Observation', 'Condition', 'Procedure', 'MedicationRequest',
            'DiagnosticReport', 'Encounter', 'Organization', 'Practitioner',
            'AllergyIntolerance', 'CarePlan', 'Goal', 'RiskAssessment'
        ];
        
        
        this.searchParameters = new Map();
        
        
        this.resourceCache = new Map();
        this.cacheTimeout = 300000; 
        
        this.initializeFHIR();
        this.setupEventHandlers();
    }

    initializeFHIR() {
        
        this.loadConformanceStatement();
        
        
        this.setupSearchParameters();
        
        
        this.initializeTransformers();
        
        console.log('🔗 FHIR R4 Integration System initialized');
        console.log('📊 Supported resources:', this.supportedResources.length);
    }

    setupEventHandlers() {
        
        $(document).on('fhir:sync:requested', (e, data) => {
            this.syncPatientData(data.patientId);
        });

        
        $(document).on('fhir:resource:create', (e, data) => {
            this.createFHIRResource(data.resourceType, data.resource);
        });

        
        $(document).on('fhir:resource:update', (e, data) => {
            this.updateFHIRResource(data.resourceType, data.id, data.resource);
        });

        
        $(document).on('fhir:external:connect', (e, data) => {
            this.connectExternalSystem(data.endpoint, data.credentials);
        });
    }

    async loadConformanceStatement() {
        try {
            const response = await fetch(`${this.baseUrl}/metadata`);
            this.conformanceStatement = await response.json();
            
            console.log('✅ FHIR Conformance Statement loaded');
            console.log('🏥 Server:', this.conformanceStatement.software?.name || 'SolMed FHIR Server');
        } catch (error) {
            console.error('❌ Error loading FHIR conformance:', error);
            
            this.createDefaultConformance();
        }
    }

    createDefaultConformance() {
        this.conformanceStatement = {
            resourceType: "CapabilityStatement",
            id: "solmed-fhir-server",
            url: `${this.baseUrl}/metadata`,
            version: this.version,
            name: "SolMedFHIRServer",
            title: "SolMed FHIR R4 Server",
            status: "active",
            date: new Date().toISOString(),
            publisher: "Centro Policlínico Nacional",
            description: "FHIR R4 server for SolMed perinatal care system",
            kind: "instance",
            software: {
                name: "SolMed",
                version: "2.1.0"
            },
            implementation: {
                description: "SolMed FHIR R4 Implementation",
                url: this.baseUrl
            },
            fhirVersion: "4.0.1",
            format: ["json", "xml"],
            rest: [{
                mode: "server",
                resource: this.supportedResources.map(type => ({
                    type: type,
                    interaction: [
                        { code: "read" },
                        { code: "create" },
                        { code: "update" },
                        { code: "delete" },
                        { code: "search-type" }
                    ],
                    searchParam: this.getSearchParametersForResource(type)
                }))
            }]
        };
    }

    setupSearchParameters() {
        
        this.searchParameters.set('Patient', [
            { name: 'identifier', type: 'token' },
            { name: 'name', type: 'string' },
            { name: 'birthdate', type: 'date' },
            { name: 'gender', type: 'token' },
            { name: 'active', type: 'token' }
        ]);

        
        this.searchParameters.set('Observation', [
            { name: 'patient', type: 'reference' },
            { name: 'code', type: 'token' },
            { name: 'date', type: 'date' },
            { name: 'value-quantity', type: 'quantity' },
            { name: 'status', type: 'token' },
            { name: 'category', type: 'token' }
        ]);

        
        this.searchParameters.set('Condition', [
            { name: 'patient', type: 'reference' },
            { name: 'code', type: 'token' },
            { name: 'clinical-status', type: 'token' },
            { name: 'onset-date', type: 'date' },
            { name: 'category', type: 'token' }
        ]);
    }

    getSearchParametersForResource(resourceType) {
        return this.searchParameters.get(resourceType) || [];
    }

    initializeTransformers() {
        this.transformers = {
            Patient: new PatientTransformer(),
            Observation: new ObservationTransformer(),
            Condition: new ConditionTransformer(),
            Procedure: new ProcedureTransformer(),
            DiagnosticReport: new DiagnosticReportTransformer(),
            Encounter: new EncounterTransformer()
        };
    }

    
    async createFHIRResource(resourceType, resource) {
        try {
            
            const validatedResource = await this.validateResource(resourceType, resource);
            
            
            const fhirResource = await this.transformToFHIR(resourceType, validatedResource);
            
            
            const response = await fetch(`${this.baseUrl}/${resourceType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/fhir+json',
                    'Accept': 'application/fhir+json'
                },
                body: JSON.stringify(fhirResource)
            });

            if (response.ok) {
                const createdResource = await response.json();
                console.log(`✅ Created FHIR ${resourceType}:`, createdResource.id);
                
                
                this.updateCache(resourceType, createdResource.id, createdResource);
                
                
                $(document).trigger('fhir:resource:created', {
                    resourceType,
                    resource: createdResource
                });
                
                return createdResource;
            } else {
                throw new Error(`Failed to create ${resourceType}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`❌ Error creating FHIR ${resourceType}:`, error);
            throw error;
        }
    }

    async readFHIRResource(resourceType, id) {
        try {
            
            const cached = this.getFromCache(resourceType, id);
            if (cached) {
                return cached;
            }

            const response = await fetch(`${this.baseUrl}/${resourceType}/${id}`, {
                headers: {
                    'Accept': 'application/fhir+json'
                }
            });

            if (response.ok) {
                const resource = await response.json();
                
                
                this.updateCache(resourceType, id, resource);
                
                return resource;
            } else if (response.status === 404) {
                return null;
            } else {
                throw new Error(`Failed to read ${resourceType}/${id}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`❌ Error reading FHIR ${resourceType}/${id}:`, error);
            throw error;
        }
    }

    async updateFHIRResource(resourceType, id, resource) {
        try {
            
            const validatedResource = await this.validateResource(resourceType, resource);
            
            
            validatedResource.id = id;
            
            
            const fhirResource = await this.transformToFHIR(resourceType, validatedResource);
            
            const response = await fetch(`${this.baseUrl}/${resourceType}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/fhir+json',
                    'Accept': 'application/fhir+json'
                },
                body: JSON.stringify(fhirResource)
            });

            if (response.ok) {
                const updatedResource = await response.json();
                console.log(`✅ Updated FHIR ${resourceType}:`, id);
                
                
                this.updateCache(resourceType, id, updatedResource);
                
                
                $(document).trigger('fhir:resource:updated', {
                    resourceType,
                    resource: updatedResource
                });
                
                return updatedResource;
            } else {
                throw new Error(`Failed to update ${resourceType}/${id}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`❌ Error updating FHIR ${resourceType}/${id}:`, error);
            throw error;
        }
    }

    async searchFHIRResources(resourceType, searchParams = {}) {
        try {
            const queryString = new URLSearchParams(searchParams).toString();
            const url = `${this.baseUrl}/${resourceType}${queryString ? '?' + queryString : ''}`;
            
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/fhir+json'
                }
            });

            if (response.ok) {
                const bundle = await response.json();
                
                console.log(`🔍 Found ${bundle.total || 0} ${resourceType} resources`);
                
                return bundle;
            } else {
                throw new Error(`Failed to search ${resourceType}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`❌ Error searching FHIR ${resourceType}:`, error);
            throw error;
        }
    }

    
    async syncPatientData(patientId) {
        try {
            console.log(`🔄 Syncing patient data for ID: ${patientId}`);
            
            
            const patient = await this.readFHIRResource('Patient', patientId);
            if (!patient) {
                throw new Error(`Patient ${patientId} not found`);
            }

            
            const relatedResources = await Promise.all([
                this.searchFHIRResources('Observation', { patient: patientId }),
                this.searchFHIRResources('Condition', { patient: patientId }),
                this.searchFHIRResources('Procedure', { patient: patientId }),
                this.searchFHIRResources('DiagnosticReport', { patient: patientId }),
                this.searchFHIRResources('Encounter', { patient: patientId })
            ]);

            const syncData = {
                patient,
                observations: relatedResources[0]?.entry || [],
                conditions: relatedResources[1]?.entry || [],
                procedures: relatedResources[2]?.entry || [],
                diagnosticReports: relatedResources[3]?.entry || [],
                encounters: relatedResources[4]?.entry || []
            };

            
            $(document).trigger('fhir:sync:completed', {
                patientId,
                data: syncData
            });

            console.log(`✅ Patient data sync completed for ${patientId}`);
            return syncData;

        } catch (error) {
            console.error(`❌ Error syncing patient data:`, error);
            
            
            $(document).trigger('fhir:sync:error', {
                patientId,
                error: error.message
            });
            
            throw error;
        }
    }

    
    async transformToFHIR(resourceType, data) {
        const transformer = this.transformers[resourceType];
        if (!transformer) {
            throw new Error(`No transformer available for ${resourceType}`);
        }

        return await transformer.toFHIR(data);
    }

    async transformFromFHIR(resourceType, fhirResource) {
        const transformer = this.transformers[resourceType];
        if (!transformer) {
            throw new Error(`No transformer available for ${resourceType}`);
        }

        return await transformer.fromFHIR(fhirResource);
    }

    
    async validateResource(resourceType, resource) {
        
        if (!resource.resourceType) {
            resource.resourceType = resourceType;
        }

        if (resource.resourceType !== resourceType) {
            throw new Error(`Resource type mismatch: expected ${resourceType}, got ${resource.resourceType}`);
        }

        
        resource.meta = resource.meta || {};
        resource.meta.lastUpdated = new Date().toISOString();
        resource.meta.versionId = resource.meta.versionId || '1';

        return resource;
    }

    
    updateCache(resourceType, id, resource) {
        const cacheKey = `${resourceType}/${id}`;
        this.resourceCache.set(cacheKey, {
            resource,
            timestamp: Date.now()
        });
    }

    getFromCache(resourceType, id) {
        const cacheKey = `${resourceType}/${id}`;
        const cached = this.resourceCache.get(cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.resource;
        }
        
        
        if (cached) {
            this.resourceCache.delete(cacheKey);
        }
        
        return null;
    }

    clearCache() {
        this.resourceCache.clear();
        console.log('🗑️ FHIR resource cache cleared');
    }

    
    async connectExternalSystem(endpoint, credentials) {
        try {
            console.log(`🔗 Connecting to external FHIR system: ${endpoint}`);
            
            
            const response = await fetch(`${endpoint}/metadata`, {
                headers: {
                    'Authorization': credentials ? `Bearer ${credentials.token}` : '',
                    'Accept': 'application/fhir+json'
                }
            });

            if (response.ok) {
                const conformance = await response.json();
                
                console.log(`✅ Connected to ${conformance.software?.name || 'External FHIR Server'}`);
                
                
                this.externalSystems = this.externalSystems || [];
                this.externalSystems.push({
                    endpoint,
                    credentials,
                    conformance,
                    connected: true,
                    lastSync: new Date().toISOString()
                });

                
                $(document).trigger('fhir:external:connected', {
                    endpoint,
                    conformance
                });

                return conformance;
            } else {
                throw new Error(`Failed to connect to ${endpoint}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`❌ Error connecting to external system:`, error);
            
            
            $(document).trigger('fhir:external:error', {
                endpoint,
                error: error.message
            });
            
            throw error;
        }
    }

    
    async createPerinatalEncounter(patientId, encounterData) {
        const encounter = {
            resourceType: 'Encounter',
            status: 'in-progress',
            class: {
                system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                code: 'AMB',
                display: 'ambulatory'
            },
            type: [{
                coding: [{
                    system: 'http://snomed.info/sct',
                    code: '424441002',
                    display: 'Prenatal initial visit'
                }]
            }],
            subject: {
                reference: `Patient/${patientId}`
            },
            period: {
                start: encounterData.startTime || new Date().toISOString()
            },
            reasonCode: [{
                coding: [{
                    system: 'http://snomed.info/sct',
                    code: '77386006',
                    display: 'Pregnancy'
                }]
            }]
        };

        return await this.createFHIRResource('Encounter', encounter);
    }

    async createObservation(patientId, encounterId, observationData) {
        const observation = {
            resourceType: 'Observation',
            status: 'final',
            category: [{
                coding: [{
                    system: 'http://terminology.hl7.org/CodeSystem/observation-category',
                    code: 'vital-signs',
                    display: 'Vital Signs'
                }]
            }],
            code: observationData.code,
            subject: {
                reference: `Patient/${patientId}`
            },
            encounter: {
                reference: `Encounter/${encounterId}`
            },
            effectiveDateTime: observationData.effectiveDateTime || new Date().toISOString(),
            valueQuantity: observationData.value,
            interpretation: observationData.interpretation
        };

        return await this.createFHIRResource('Observation', observation);
    }

    
    getCapabilityStatement() {
        return this.conformanceStatement;
    }

    getSupportedResources() {
        return this.supportedResources;
    }

    getSearchParameters(resourceType) {
        return this.searchParameters.get(resourceType) || [];
    }

    
    async exportPatientBundle(patientId) {
        try {
            const syncData = await this.syncPatientData(patientId);
            
            const bundle = {
                resourceType: 'Bundle',
                id: `patient-bundle-${patientId}`,
                type: 'collection',
                timestamp: new Date().toISOString(),
                entry: []
            };

            
            bundle.entry.push({
                resource: syncData.patient
            });

            
            [...syncData.observations, ...syncData.conditions, 
             ...syncData.procedures, ...syncData.diagnosticReports, 
             ...syncData.encounters].forEach(item => {
                bundle.entry.push({
                    resource: item.resource
                });
            });

            console.log(`📦 Exported bundle with ${bundle.entry.length} resources`);
            return bundle;

        } catch (error) {
            console.error('❌ Error exporting patient bundle:', error);
            throw error;
        }
    }

    async importBundle(bundle) {
        try {
            console.log(`📥 Importing bundle with ${bundle.entry?.length || 0} resources`);
            
            const results = [];
            
            for (const entry of bundle.entry || []) {
                try {
                    const resource = entry.resource;
                    const created = await this.createFHIRResource(resource.resourceType, resource);
                    results.push({ success: true, resource: created });
                } catch (error) {
                    results.push({ success: false, error: error.message, resource: entry.resource });
                }
            }

            const successful = results.filter(r => r.success).length;
            const failed = results.filter(r => !r.success).length;

            console.log(`✅ Import completed: ${successful} successful, ${failed} failed`);
            
            return {
                total: bundle.entry?.length || 0,
                successful,
                failed,
                results
            };

        } catch (error) {
            console.error('❌ Error importing bundle:', error);
            throw error;
        }
    }
}


class PatientTransformer {
    async toFHIR(patientData) {
        return {
            resourceType: 'Patient',
            id: patientData.id,
            identifier: [{
                use: 'usual',
                type: {
                    coding: [{
                        system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                        code: 'MR'
                    }]
                },
                value: patientData.medicalRecordNumber
            }],
            name: [{
                use: 'official',
                family: patientData.lastName,
                given: [patientData.firstName]
            }],
            gender: patientData.gender?.toLowerCase(),
            birthDate: patientData.birthDate,
            address: [{
                use: 'home',
                line: [patientData.address],
                city: patientData.city,
                state: patientData.state,
                postalCode: patientData.postalCode,
                country: patientData.country
            }],
            telecom: [{
                system: 'phone',
                value: patientData.phoneNumber,
                use: 'mobile'
            }],
            active: true
        };
    }

    async fromFHIR(fhirPatient) {
        return {
            id: fhirPatient.id,
            medicalRecordNumber: fhirPatient.identifier?.[0]?.value,
            firstName: fhirPatient.name?.[0]?.given?.[0],
            lastName: fhirPatient.name?.[0]?.family,
            gender: fhirPatient.gender,
            birthDate: fhirPatient.birthDate,
            address: fhirPatient.address?.[0]?.line?.[0],
            city: fhirPatient.address?.[0]?.city,
            state: fhirPatient.address?.[0]?.state,
            postalCode: fhirPatient.address?.[0]?.postalCode,
            country: fhirPatient.address?.[0]?.country,
            phoneNumber: fhirPatient.telecom?.find(t => t.system === 'phone')?.value
        };
    }
}

class ObservationTransformer {
    async toFHIR(observationData) {
        return {
            resourceType: 'Observation',
            id: observationData.id,
            status: observationData.status || 'final',
            category: [{
                coding: [{
                    system: 'http://terminology.hl7.org/CodeSystem/observation-category',
                    code: observationData.category || 'vital-signs'
                }]
            }],
            code: {
                coding: [{
                    system: 'http://loinc.org',
                    code: observationData.loincCode,
                    display: observationData.name
                }]
            },
            subject: {
                reference: `Patient/${observationData.patientId}`
            },
            effectiveDateTime: observationData.observedDate,
            valueQuantity: {
                value: observationData.value,
                unit: observationData.unit,
                system: 'http://unitsofmeasure.org'
            }
        };
    }

    async fromFHIR(fhirObservation) {
        return {
            id: fhirObservation.id,
            patientId: fhirObservation.subject?.reference?.replace('Patient/', ''),
            name: fhirObservation.code?.coding?.[0]?.display,
            loincCode: fhirObservation.code?.coding?.[0]?.code,
            value: fhirObservation.valueQuantity?.value,
            unit: fhirObservation.valueQuantity?.unit,
            observedDate: fhirObservation.effectiveDateTime,
            status: fhirObservation.status,
            category: fhirObservation.category?.[0]?.coding?.[0]?.code
        };
    }
}

class ConditionTransformer {
    async toFHIR(conditionData) {
        return {
            resourceType: 'Condition',
            id: conditionData.id,
            clinicalStatus: {
                coding: [{
                    system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                    code: conditionData.clinicalStatus || 'active'
                }]
            },
            verificationStatus: {
                coding: [{
                    system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                    code: 'confirmed'
                }]
            },
            category: [{
                coding: [{
                    system: 'http://terminology.hl7.org/CodeSystem/condition-category',
                    code: 'problem-list-item'
                }]
            }],
            code: {
                coding: [{
                    system: 'http://snomed.info/sct',
                    code: conditionData.snomedCode,
                    display: conditionData.name
                }]
            },
            subject: {
                reference: `Patient/${conditionData.patientId}`
            },
            onsetDateTime: conditionData.onsetDate
        };
    }

    async fromFHIR(fhirCondition) {
        return {
            id: fhirCondition.id,
            patientId: fhirCondition.subject?.reference?.replace('Patient/', ''),
            name: fhirCondition.code?.coding?.[0]?.display,
            snomedCode: fhirCondition.code?.coding?.[0]?.code,
            clinicalStatus: fhirCondition.clinicalStatus?.coding?.[0]?.code,
            onsetDate: fhirCondition.onsetDateTime
        };
    }
}


class ProcedureTransformer {
    async toFHIR(procedureData) {
        return {
            resourceType: 'Procedure',
            id: procedureData.id,
            status: procedureData.status || 'completed',
            code: {
                coding: [{
                    system: 'http://snomed.info/sct',
                    code: procedureData.snomedCode,
                    display: procedureData.name
                }]
            },
            subject: {
                reference: `Patient/${procedureData.patientId}`
            },
            performedDateTime: procedureData.performedDate
        };
    }

    async fromFHIR(fhirProcedure) {
        return {
            id: fhirProcedure.id,
            patientId: fhirProcedure.subject?.reference?.replace('Patient/', ''),
            name: fhirProcedure.code?.coding?.[0]?.display,
            snomedCode: fhirProcedure.code?.coding?.[0]?.code,
            status: fhirProcedure.status,
            performedDate: fhirProcedure.performedDateTime
        };
    }
}

class DiagnosticReportTransformer {
    async toFHIR(reportData) {
        return {
            resourceType: 'DiagnosticReport',
            id: reportData.id,
            status: reportData.status || 'final',
            category: [{
                coding: [{
                    system: 'http://terminology.hl7.org/CodeSystem/v2-0074',
                    code: 'LAB'
                }]
            }],
            code: {
                coding: [{
                    system: 'http://loinc.org',
                    code: reportData.loincCode,
                    display: reportData.name
                }]
            },
            subject: {
                reference: `Patient/${reportData.patientId}`
            },
            effectiveDateTime: reportData.reportDate,
            result: reportData.observations?.map(obs => ({
                reference: `Observation/${obs.id}`
            })) || []
        };
    }

    async fromFHIR(fhirReport) {
        return {
            id: fhirReport.id,
            patientId: fhirReport.subject?.reference?.replace('Patient/', ''),
            name: fhirReport.code?.coding?.[0]?.display,
            loincCode: fhirReport.code?.coding?.[0]?.code,
            status: fhirReport.status,
            reportDate: fhirReport.effectiveDateTime,
            observations: fhirReport.result?.map(ref => ({
                id: ref.reference?.replace('Observation/', '')
            })) || []
        };
    }
}

class EncounterTransformer {
    async toFHIR(encounterData) {
        return {
            resourceType: 'Encounter',
            id: encounterData.id,
            status: encounterData.status || 'finished',
            class: {
                system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                code: encounterData.class || 'AMB',
                display: encounterData.classDisplay || 'ambulatory'
            },
            type: [{
                coding: [{
                    system: 'http://snomed.info/sct',
                    code: encounterData.typeCode,
                    display: encounterData.typeName
                }]
            }],
            subject: {
                reference: `Patient/${encounterData.patientId}`
            },
            period: {
                start: encounterData.startTime,
                end: encounterData.endTime
            }
        };
    }

    async fromFHIR(fhirEncounter) {
        return {
            id: fhirEncounter.id,
            patientId: fhirEncounter.subject?.reference?.replace('Patient/', ''),
            status: fhirEncounter.status,
            class: fhirEncounter.class?.code,
            classDisplay: fhirEncounter.class?.display,
            typeCode: fhirEncounter.type?.[0]?.coding?.[0]?.code,
            typeName: fhirEncounter.type?.[0]?.coding?.[0]?.display,
            startTime: fhirEncounter.period?.start,
            endTime: fhirEncounter.period?.end
        };
    }
}


$(document).ready(function() {
    window.fhirIntegration = new FHIRIntegrationSystem();
    
    
    if ($('.fhir-status-indicator').length === 0) {
        $('.medical-form, .form-section').first().prepend(`
            <div class="fhir-status-indicator mb-3">
                <div class="alert alert-info">
                    <i class="fas fa-network-wired"></i>
                    <strong>FHIR R4 Integration:</strong> 
                    <span class="text-success">Active</span> |
                    <small>Interoperabilidad habilitada con estándares HL7 FHIR R4</small>
                </div>
            </div>
        `);
    }
    
    console.log('🔗 FHIR R4 Integration System ready for healthcare interoperability');
});