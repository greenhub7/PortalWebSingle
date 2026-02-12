


const medicalRecordPrint = {
    
    urls: {
        printA4: "/Print/GeneralNoteA4",
        generatePdf: "/Print/GeneralNotePdf",
        sendEmail: "/Print/SendGeneralNoteByEmail"
    },

    
    messageContainer: null,

    
    init: function (options) {
        
        if (options) {
            if (options.urls) {
                this.urls = { ...this.urls, ...options.urls };
            }

            if (options.messageContainer) {
                this.messageContainer = options.messageContainer;
            }
        }

        
        this.setupEventListeners();
    },

    
    setupEventListeners: function () {
        
        const printFullBtn = document.getElementById('printFullBtn');
        if (printFullBtn) {
            printFullBtn.addEventListener('click', function () {
                medicalRecordPrint.printDocument(false);
            });
        }

        
        const printNoVisitsBtn = document.getElementById('printNoVisitsBtn');
        if (printNoVisitsBtn) {
            printNoVisitsBtn.addEventListener('click', function () {
                medicalRecordPrint.printDocument(true);
            });
        }

        
        const generatePdfBtn = document.getElementById('generatePdfBtn');
        if (generatePdfBtn) {
            generatePdfBtn.addEventListener('click', function () {
                medicalRecordPrint.generatePdf(false);
            });
        }

        
        const generatePdfNoVisitsBtn = document.getElementById('generatePdfNoVisitsBtn');
        if (generatePdfNoVisitsBtn) {
            generatePdfNoVisitsBtn.addEventListener('click', function () {
                medicalRecordPrint.generatePdf(true);
            });
        }

        
        const sendEmailBtn = document.getElementById('sendEmailBtn');
        if (sendEmailBtn) {
            sendEmailBtn.addEventListener('click', function () {
                medicalRecordPrint.sendByEmail(false);
            });
        }
    },

    
    printDocument: function (hideVisits) {
        
        const recordId = this.getRecordId();
        if (!recordId) {
            this.showMessage("No se pudo determinar el ID del registro médico", "error");
            return;
        }

        
        const printUrl = `${this.urls.printA4}?id=${recordId}&showVisits=${!hideVisits}`;

        
        const printWindow = window.open(printUrl, '_blank');

        if (!printWindow) {
            this.showMessage("Por favor, habilite las ventanas emergentes para este sitio e intente nuevamente", "error");
return;
        }


if (printWindow) {
    printWindow.addEventListener('afterprint', function () {
        printWindow.close();
    });
}
    },


generatePdf: function(hideVisits) {
    
    const recordId = this.getRecordId();
    if (!recordId) {
        this.showMessage("No se pudo determinar el ID del registro médico", "error");
        return;
    }

    
    const pdfUrl = `${this.urls.generatePdf}?id=${recordId}&showVisits=${!hideVisits}`;

    
    this.showMessage("Generando PDF, por favor espere...", "info");

    
    window.location.href = pdfUrl;
},


sendByEmail: function(hideVisits) {
    
    const recordId = this.getRecordId();
    if (!recordId) {
        this.showMessage("No se pudo determinar el ID del registro médico", "error");
        return;
    }

    
    if (!confirm("¿Está seguro que desea enviar este documento por correo electrónico al paciente?")) {
        return;
    }

    
    this.showMessage("Enviando correo electrónico, por favor espere...", "info");

    
    const emailUrl = `${this.urls.sendEmail}?id=${recordId}&showVisits=${!hideVisits}`;

    
    fetch(emailUrl)
        .then(response => response.text())
        .then(result => {
            if (result.includes("Error")) {
                this.showMessage(result, "error");
            } else {
                this.showMessage(result, "success");
            }
        })
        .catch(error => {
            console.error('Error al enviar email:', error);
            this.showMessage("Ocurrió un error al enviar el correo electrónico", "error");
        });
},


getRecordId: function() {
    
    const hiddenInput = document.getElementById('generalNoteId') || document.getElementById('recordId');
    if (hiddenInput && hiddenInput.value) {
        return hiddenInput.value;
    }

    
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    if (idFromUrl) {
        return idFromUrl;
    }

    
    const container = document.querySelector('[data-record-id]');
    if (container) {
        return container.dataset.recordId;
    }

    return null;
},


showMessage: function(message, type) {
    
    if (this.messageContainer) {
        const container = document.querySelector(this.messageContainer);
        if (container) {
            
            container.innerHTML = '';

            
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
            alertDiv.role = 'alert';

            
            let icon = '';
            switch (type) {
                case 'success':
                    icon = '<i class="bi bi-check-circle-fill me-2"></i>';
                    break;
                case 'error':
                case 'danger':
                    icon = '<i class="bi bi-exclamation-triangle-fill me-2"></i>';
                    type = 'danger'; 
                    break;
                case 'warning':
                    icon = '<i class="bi bi-exclamation-circle-fill me-2"></i>';
                    break;
                case 'info':
                default:
                    icon = '<i class="bi bi-info-circle-fill me-2"></i>';
                    break;
            }

            
            alertDiv.innerHTML = `
                    ${icon}${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;

            
            container.appendChild(alertDiv);

            
            if (type === 'success' || type === 'info') {
                setTimeout(() => {
                    const bsAlert = new bootstrap.Alert(alertDiv);
                    bsAlert.close();
                }, 5000);
            }

            return;
        }
    }

    
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: type.charAt(0).toUpperCase() + type.slice(1),
            text: message,
            icon: type === 'error' ? 'error' : (type === 'warning' ? 'warning' : (type === 'success' ? 'success' : 'info')),
            confirmButtonText: 'OK'
        });
        return;
    }

    
    alert(message);
}
};


document.addEventListener('DOMContentLoaded', function () {
    
    const configElement = document.querySelector('[data-print-config]');
    let config = {};

    if (configElement) {
        try {
            config = JSON.parse(configElement.dataset.printConfig);
        } catch (e) {
            console.warn('Error al parsear configuración de impresión:', e);
        }
    }

    
    medicalRecordPrint.init(config);
});


function printMedicalRecord(recordId, hideVisits = false) {
    
    if (!recordId) {
        console.error('Se requiere el ID del registro médico para imprimir');
        return;
    }

    
    const printUrl = `${medicalRecordPrint.urls.printA4}?id=${recordId}&showVisits=${!hideVisits}`;

    
    const printWindow = window.open(printUrl, '_blank');

    if (!printWindow) {
        alert("Por favor, habilite las ventanas emergentes para este sitio e intente nuevamente");
    }
}


function generateMedicalRecordPdf(recordId, hideVisits = false) {
    
    if (!recordId) {
        console.error('Se requiere el ID del registro médico para generar PDF');
        return;
    }

    
    const pdfUrl = `${medicalRecordPrint.urls.generatePdf}?id=${recordId}&showVisits=${!hideVisits}`;

    
    window.location.href = pdfUrl;
}


function sendMedicalRecordByEmail(recordId, hideVisits = false) {
    
    if (!recordId) {
        console.error('Se requiere el ID del registro médico para enviar por email');
        return;
    }

    
    if (!confirm("¿Está seguro que desea enviar este documento por correo electrónico al paciente?")) {
        return;
    }

    
    const emailUrl = `${medicalRecordPrint.urls.sendEmail}?id=${recordId}&showVisits=${!hideVisits}`;

    
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Enviando...',
            text: 'Enviando correo electrónico, por favor espere...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    
    fetch(emailUrl)
        .then(response => response.text())
        .then(result => {
            if (typeof Swal !== 'undefined') {
                Swal.close();
                Swal.fire({
                    title: result.includes("Error") ? 'Error' : 'Éxito',
                    text: result,
                    icon: result.includes("Error") ? 'error' : 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                alert(result);
            }
        })
        .catch(error => {
            console.error('Error al enviar email:', error);
            if (typeof Swal !== 'undefined') {
                Swal.close();
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al enviar el correo electrónico',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                alert('Ocurrió un error al enviar el correo electrónico');
            }
        });
}