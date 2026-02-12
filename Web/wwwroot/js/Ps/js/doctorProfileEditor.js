document.addEventListener('DOMContentLoaded', function () {
    const tinyMceConfig = {
        height: 300,
        menubar: true,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | fontselect fontsizeselect | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        images_upload_url: '/Manage/UploadDoctorImage',
        images_upload_handler: function (blobInfo, progress) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = false;
                xhr.open('POST', '/Manage/UploadDoctorImage');
                xhr.upload.onprogress = (e) => {
                    progress(e.loaded / e.total * 100);
                };
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const json = JSON.parse(xhr.responseText);
                        if (!json || typeof json.location != 'string') {
                            reject('Invalid JSON: ' + xhr.responseText);
                            return;
                        }
                        resolve(json.location);
                    } else {
                        reject('HTTP Error: ' + xhr.status);
                    }
                };
                xhr.onerror = () => {
                    reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
                };
                const formData = new FormData();
                formData.append('image', blobInfo.blob(), blobInfo.filename());
                xhr.send(formData);
            });
        }
    };

    if (typeof tinymce !== 'undefined') {
        tinymce.init({
            selector: '#htmlHeaderEditor',
            ...tinyMceConfig
        });

        tinymce.init({
            selector: '#service1Editor, #service2Editor, #service3Editor',
            ...tinyMceConfig,
            height: 200  
        });

        tinymce.init({
            selector: '#experienceEditor, #educationEditor',
            ...tinyMceConfig
        });
    }

    const showMapToggle = document.getElementById('showMapToggle');
    if (showMapToggle) {
        const mapLocationFields = document.getElementById('mapLocationFields');
        showMapToggle.addEventListener('change', function () {
            if (this.checked) {
                mapLocationFields.classList.remove('d-none');
                initializeMap();
            } else {
                mapLocationFields.classList.add('d-none');
            }
        });

        if (showMapToggle.checked) {
            initializeMap();
        }
    }

    const firstName = document.getElementById('Name');
    const lastName = document.getElementById('LastName');
    const displayName = document.getElementById('displayName');
    if (firstName && lastName && displayName) {
        const updateDisplayName = () => {
            const name = firstName.value.trim();
            const last = lastName.value.trim();
            if (name && last) {
                displayName.value = name + last.replace(/\s+/g, "");
            }
        };
        firstName.addEventListener('blur', updateDisplayName);
        lastName.addEventListener('blur', updateDisplayName);
        if (firstName.value && lastName.value && !displayName.value) {
            updateDisplayName();
        }
    }

    initializeImageContainers();

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (e) {
            if (typeof tinymce !== 'undefined') {
                tinymce.triggerSave();

                if (tinymce.get('service1Editor')) {
                    const service1Content = tinymce.get('service1Editor').getContent();
                    const input1 = document.createElement('input');
                    input1.type = 'hidden';
                    input1.name = 'Service1DescriptionHtml';
                    input1.value = service1Content;
                    form.appendChild(input1);
                }

                if (tinymce.get('service2Editor')) {
                    const service2Content = tinymce.get('service2Editor').getContent();
                    const input2 = document.createElement('input');
                    input2.type = 'hidden';
                    input2.name = 'Service2DescriptionHtml';
                    input2.value = service2Content;
                    form.appendChild(input2);
                }

                if (tinymce.get('service3Editor')) {
                    const service3Content = tinymce.get('service3Editor').getContent();
                    const input3 = document.createElement('input');
                    input3.type = 'hidden';
                    input3.name = 'Service3DescriptionHtml';
                    input3.value = service3Content;
                    form.appendChild(input3);
                }

                if (tinymce.get('experienceEditor')) {
                    const experienceContent = tinymce.get('experienceEditor').getContent();
                    const inputExp = document.createElement('input');
                    inputExp.type = 'hidden';
                    inputExp.name = 'ProfessionalExperienceHtml';
                    inputExp.value = experienceContent;
                    form.appendChild(inputExp);
                }

                if (tinymce.get('educationEditor')) {
                    const educationContent = tinymce.get('educationEditor').getContent();
                    const inputEdu = document.createElement('input');
                    inputEdu.type = 'hidden';
                    inputEdu.name = 'EducationHtml';
                    inputEdu.value = educationContent;
                    form.appendChild(inputEdu);
                }
            }
        });
    }
});

function initializeMap() {
    const mapElement = document.getElementById('location-map');
    const latInput = document.getElementById('mapLatitude');
    const lngInput = document.getElementById('mapLongitude');

    if (!mapElement || !latInput || !lngInput) return;

    let lat = 18.4861;
    let lng = -69.9312;
    let zoom = 13;

    if (latInput.value && lngInput.value) {
        lat = parseFloat(latInput.value);
        lng = parseFloat(lngInput.value);
        zoom = 15;
    }

    const map = L.map('location-map').setView([lat, lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let marker;
    if (latInput.value && lngInput.value) {
        marker = L.marker([lat, lng], { draggable: true }).addTo(map);

        marker.on('dragend', function (e) {
            const position = marker.getLatLng();
            latInput.value = position.lat.toFixed(6);
            lngInput.value = position.lng.toFixed(6);
        });
    }

    map.on('click', function (e) {
        const position = e.latlng;

        latInput.value = position.lat.toFixed(6);
        lngInput.value = position.lng.toFixed(6);

        if (marker) {
            marker.setLatLng(position);
        } else {
            marker = L.marker(position, { draggable: true }).addTo(map);

            marker.on('dragend', function (e) {
                const newPosition = marker.getLatLng();
                latInput.value = newPosition.lat.toFixed(6);
                lngInput.value = newPosition.lng.toFixed(6);
            });
        }
    });

    const updateMapFromInputs = function () {
        const newLat = parseFloat(latInput.value);
        const newLng = parseFloat(lngInput.value);

        if (!isNaN(newLat) && !isNaN(newLng)) {
            if (marker) {
                marker.setLatLng([newLat, newLng]);
            } else {
                marker = L.marker([newLat, newLng], { draggable: true }).addTo(map);

                marker.on('dragend', function (e) {
                    const position = marker.getLatLng();
                    latInput.value = position.lat.toFixed(6);
                    lngInput.value = position.lng.toFixed(6);
                });
            }
            map.setView([newLat, newLng], 15);
        }
    };

    latInput.addEventListener('change', updateMapFromInputs);
    lngInput.addEventListener('change', updateMapFromInputs);

    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

function initializeImageContainers() {
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(function (container) {
        const imageElement = container.querySelector('.image-element');
        const imageFile = container.querySelector('.image-file');
        const pencilIcon = container.querySelector('.pencil-icon');
        const trashIcon = container.querySelector('.trash-icon');
        const cancelIcon = container.querySelector('.cancel-icon');
        if (!imageElement || !imageFile) return;
        let originalImageURL = imageElement.src;
        if (!originalImageURL || originalImageURL.includes('pattern-') || originalImageURL.includes('blank.svg')) {
            if (trashIcon) trashIcon.style.display = 'none';
        }
        if (pencilIcon) {
            pencilIcon.addEventListener('click', function () {
                if (imageFile) imageFile.click();
            });
        }
        if (imageFile) {
            imageFile.addEventListener('change', function () {
                const file = this.files[0];
                if (!file) return;
                if (!file.type.match('image.*')) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Por favor seleccione un archivo de imagen válido (jpg, png o jpeg).',
                        icon: 'error'
                    });
                    return;
                }
                const imageURL = URL.createObjectURL(file);
                imageElement.src = imageURL;
                if (cancelIcon) cancelIcon.style.display = 'inline-block';
                if (trashIcon) trashIcon.style.display = 'none';
            });
        }
        if (trashIcon) {
            trashIcon.addEventListener('click', function () {
                const addressToGo = trashIcon.getAttribute('where-to-go');
                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Esta acción eliminará la imagen.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (addressToGo) {
                            window.location.href = addressToGo;
                        } else {
                            imageElement.src = '';
                            if (imageFile) imageFile.value = '';
                            if (cancelIcon) cancelIcon.style.display = 'none';
                            trashIcon.style.display = 'none';
                        }
                    }
                });
            });
        }
        if (cancelIcon) {
            cancelIcon.addEventListener('click', function () {
                imageElement.src = originalImageURL;
                if (imageFile) imageFile.value = '';
                cancelIcon.style.display = 'none';
                if (!originalImageURL || originalImageURL.includes('pattern-') || originalImageURL.includes('blank.svg')) {
                    if (trashIcon) trashIcon.style.display = 'none';
                } else {
                    if (trashIcon) trashIcon.style.display = 'inline-block';
                }
            });
        }
    });
}

function initializeHeaderImageInput() {
    const headerImageInput = document.querySelector('input[data-kt-image-input-action="change"]');
    if (headerImageInput) {
        headerImageInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;
            if (!file.type.match('image.*')) {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor seleccione un archivo de imagen válido (jpg, png o jpeg).',
                    icon: 'error'
                });
                return;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initializeHeaderImageInput();
});