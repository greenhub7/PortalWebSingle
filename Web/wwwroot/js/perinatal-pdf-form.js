

class PerinatalPDFForm {
    constructor() {
        this.pdfDoc = null;
        this.scale = 1.2;
        this.canvas = null;
        this.ctx = null;
        this.data = null;
        this.formFields = [];
        this.isDebugMode = false;
    }

    
    async init(pdfUrl, canvasId, data) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.data = data;
        
        
        pdfjsLib.GlobalWorkerOptions.workerSrc = 
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        try {
            
            this.pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
            console.log('PDF cargado correctamente:', this.pdfDoc.numPages, 'páginas');
            
            
            await this.renderPage(1);
            
            
            this.defineFormFields();
            
            return true;
        } catch (error) {
            console.error('Error cargando PDF:', error);
            throw error;
        }
    }

    
    async renderPage(pageNumber) {
        try {
            const page = await this.pdfDoc.getPage(pageNumber);
            const viewport = page.getViewport({ scale: this.scale });
            
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;

            const renderContext = {
                canvasContext: this.ctx,
                viewport: viewport
            };

            await page.render(renderContext).promise;
            
            
            this.setupFormOverlay(viewport);
            
            console.log('Página renderizada correctamente');
        } catch (error) {
            console.error('Error renderizando página:', error);
            throw error;
        }
    }

    
    setupFormOverlay(viewport) {
        let overlay = document.getElementById('formOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'formOverlay';
            overlay.style.position = 'absolute';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.pointerEvents = 'none';
            this.canvas.parentElement.appendChild(overlay);
        }
        
        overlay.style.width = viewport.width + 'px';
        overlay.style.height = viewport.height + 'px';
        overlay.innerHTML = ''; 
    }

    
    defineFormFields() {
        this.formFields = [
            
            {
                id: 'apellido_nombre',
                dataPath: ['Patient', 'Person', 'LastName'],
                x: 120, y: 185, width: 250, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'text',
                transform: (value, data) => {
                    const lastName = this.getNestedValue(data, ['Patient', 'Person', 'LastName']) || '';
                    const firstName = this.getNestedValue(data, ['Patient', 'Person', 'Name']) || '';
                    return `${lastName}, ${firstName}`.trim();
                }
            },
            {
                id: 'edad',
                dataPath: ['Patient', 'Age'],
                x: 450, y: 185, width: 40, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'text'
            },
            {
                id: 'identidad',
                dataPath: ['Patient', 'Person', 'Rnc'],
                x: 520, y: 185, width: 100, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'text'
            },
            {
                id: 'domicilio',
                dataPath: ['Patient', 'Person', 'Address'],
                x: 120, y: 205, width: 300, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'text'
            },
            {
                id: 'telefono',
                dataPath: ['Patient', 'Person', 'Cel'],
                x: 520, y: 205, width: 100, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'text'
            },

            
            {
                id: 'diabetes_familiar_si',
                dataPath: ['MedicalBackground', 'FamilyDiabetes'],
                x: 145, y: 285, width: 12, height: 12,
                fontSize: 12, fontFamily: 'Arial',
                type: 'checkbox',
                checkValue: 1 
            },
            {
                id: 'diabetes_familiar_no',
                dataPath: ['MedicalBackground', 'FamilyDiabetes'],
                x: 170, y: 285, width: 12, height: 12,
                fontSize: 12, fontFamily: 'Arial',
                type: 'checkbox',
                checkValue: 2 
            },

            
            {
                id: 'diabetes_personal_si',
                dataPath: ['MedicalBackground', 'PersonalDiabetes'],
                x: 145, y: 340, width: 12, height: 12,
                fontSize: 12, fontFamily: 'Arial',
                type: 'checkbox',
                checkValue: 1
            },

            
            {
                id: 'fumadora_activa',
                dataPath: ['MedicalBackground', 'CurrentSmoker'],
                x: 145, y: 420, width: 12, height: 12,
                fontSize: 12, fontFamily: 'Arial',
                type: 'boolean_checkbox'
            },
            {
                id: 'fumadora_pasiva',
                dataPath: ['MedicalBackground', 'PassiveSmoker'],
                x: 350, y: 420, width: 12, height: 12,
                fontSize: 12, fontFamily: 'Arial',
                type: 'boolean_checkbox'
            },

            
            {
                id: 'gestas_previas',
                dataPath: ['ObstetricBackground', 'PreviousPregnancies'],
                x: 145, y: 480, width: 30, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'number'
            },
            {
                id: 'partos_vaginales',
                dataPath: ['ObstetricBackground', 'VaginalDeliveries'],
                x: 250, y: 480, width: 30, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'number'
            },
            {
                id: 'cesareas',
                dataPath: ['ObstetricBackground', 'Cesareans'],
                x: 320, y: 480, width: 30, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'number'
            },

            
            {
                id: 'ultima_menstruacion',
                dataPath: ['CurrentPregnancy', 'LastMenstrualPeriod'],
                x: 200, y: 540, width: 80, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'date'
            },
            {
                id: 'fecha_probable_parto',
                dataPath: ['CurrentPregnancy', 'EstimatedDueDate'],
                x: 400, y: 540, width: 80, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'date'
            },
            {
                id: 'peso_anterior',
                dataPath: ['CurrentPregnancy', 'PreviousWeight'],
                x: 200, y: 565, width: 40, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'number'
            },
            {
                id: 'talla',
                dataPath: ['CurrentPregnancy', 'Height'],
                x: 320, y: 565, width: 40, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'number'
            },
            {
                id: 'grupo_sanguineo',
                dataPath: ['CurrentPregnancy', 'BloodGroupType'],
                x: 200, y: 590, width: 30, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'text'
            },
            {
                id: 'rh_factor',
                dataPath: ['CurrentPregnancy', 'RhFactorType'],
                x: 250, y: 590, width: 30, height: 12,
                fontSize: 8, fontFamily: 'Arial',
                type: 'text'
            }

            
            
        ];
    }

    
    fillForm() {
        if (!this.data) {
            console.error('No hay datos para llenar el formulario');
            return;
        }

        console.log('Llenando formulario con datos:', this.data);
        
        
        const overlay = document.getElementById('formOverlay');
        if (overlay) {
            overlay.innerHTML = '';
        }

        
        this.formFields.forEach(field => {
            try {
                let value = this.getFieldValue(field);
                if (value !== null && value !== undefined) {
                    this.renderField(field, value);
                }
            } catch (error) {
                console.error(`Error procesando campo ${field.id}:`, error);
            }
        });
    }

    
    getFieldValue(field) {
        
        if (field.transform && typeof field.transform === 'function') {
            return field.transform(null, this.data);
        }

        
        let value = this.getNestedValue(this.data, field.dataPath);

        
        switch (field.type) {
            case 'date':
                return value ? this.formatDate(value) : null;
            case 'number':
                return value !== null && value !== undefined ? value.toString() : null;
            case 'checkbox':
                return value === field.checkValue;
            case 'boolean_checkbox':
                return value === true;
            default:
                return value;
        }
    }

    
    getNestedValue(obj, path) {
        if (!obj || !path || !Array.isArray(path)) return null;
        
        let current = obj;
        for (let key of path) {
            if (current && current.hasOwnProperty(key)) {
                current = current[key];
            } else {
                return null;
            }
        }
        return current;
    }

    
    renderField(field, value) {
        const overlay = document.getElementById('formOverlay');
        if (!overlay) return;

        const fieldElement = document.createElement('div');
        fieldElement.className = 'form-field';
        fieldElement.style.position = 'absolute';
        fieldElement.style.left = (field.x * this.scale) + 'px';
        fieldElement.style.top = (field.y * this.scale) + 'px';
        fieldElement.style.width = (field.width * this.scale) + 'px';
        fieldElement.style.height = (field.height * this.scale) + 'px';
        fieldElement.style.fontSize = (field.fontSize * this.scale) + 'px';
        fieldElement.style.fontFamily = field.fontFamily;
        fieldElement.style.color = '#000';
        fieldElement.style.display = 'flex';
        fieldElement.style.alignItems = 'center';
        fieldElement.style.pointerEvents = 'none';

        
        let displayValue = '';
        if (field.type === 'checkbox' || field.type === 'boolean_checkbox') {
            displayValue = value ? '☑' : '';
            fieldElement.style.justifyContent = 'center';
            fieldElement.style.fontWeight = 'bold';
        } else {
            displayValue = value ? value.toString() : '';
        }

        fieldElement.textContent = displayValue;
        
        
        if (this.isDebugMode) {
            fieldElement.title = field.id;
            fieldElement.style.border = '1px solid red';
            fieldElement.style.backgroundColor = 'rgba(255,0,0,0.1)';
        }

        overlay.appendChild(fieldElement);
    }

    
    formatDate(dateValue) {
        if (!dateValue) return '';
        
        try {
            const date = new Date(dateValue);
            return date.toLocaleDateString('es-ES');
        } catch (error) {
            console.error('Error formateando fecha:', error);
            return '';
        }
    }

    
    enableDebugMode() {
        this.isDebugMode = true;
        
        
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = Math.round((e.clientX - rect.left) / this.scale);
            const y = Math.round((e.clientY - rect.top) / this.scale);
            
            console.log(`Coordenadas: x: ${x}, y: ${y}`);
            
            
            this.showDebugPoint(x, y);
        });
        
        console.log('Modo debug activado. Haz click en el PDF para obtener coordenadas.');
    }

    
    showDebugPoint(x, y) {
        const overlay = document.getElementById('formOverlay');
        if (!overlay) return;

        const point = document.createElement('div');
        point.style.position = 'absolute';
        point.style.left = (x * this.scale - 3) + 'px';
        point.style.top = (y * this.scale - 3) + 'px';
        point.style.width = '6px';
        point.style.height = '6px';
        point.style.backgroundColor = 'red';
        point.style.borderRadius = '50%';
        point.style.zIndex = '1000';
        point.title = `${x}, ${y}`;
        
        overlay.appendChild(point);
        
        
        setTimeout(() => {
            if (point.parentElement) {
                point.parentElement.removeChild(point);
            }
        }, 3000);
    }

    
    clearForm() {
        const overlay = document.getElementById('formOverlay');
        if (overlay) {
            overlay.innerHTML = '';
        }
    }

    
    getCanvas() {
        return this.canvas;
    }
}


window.perinatalPDFForm = new PerinatalPDFForm();