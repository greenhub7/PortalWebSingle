
function formatDateInputs() {
    $('input[type="date"]').each(function () {
        const dateValue = $(this).val();
        if (dateValue) {
            const date = new Date(dateValue);
            const formattedDate = date.toLocaleDateString();
            $(this).attr('data-formatted-date', formattedDate);
        }
    });
}  

function calculateGestationalAge(lmpDate) {
    if (!lmpDate) return null;
    const lmp = new Date(lmpDate);
    const today = new Date();
    const diffTime = Math.abs(today - lmp);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    return { weeks, days };
}
function calculateEstimatedDueDate(lmpDate) {
    if (!lmpDate) return null;
    const lmp = new Date(lmpDate);
    const edd = new Date(lmp);
    edd.setDate(lmp.getDate() + 280);
    return edd;
}


function getNullableBoolFromRadio(name) {
    var val = $('input[name="' + name + '"]:checked').val();
    if (val === 'si') return true;
    if (val === 'no') return false;
    return null;
}


function addPrenatalConsultation() {
    const recordId = parseInt($('#recordId').val());
    if (!recordId) {
        alert('Please save the record first before adding consultations.');
        return;
    }

    
    var emptyRow = $('tr:has(.consultation-date):first');

    var consultationData = {
        PerinatalHistoryRecordId: recordId,
        ConsultationDate: emptyRow.find('.consultation-date').val(),
        GestationalAgeWeeks: parseInt(emptyRow.find('input[type="number"]').eq(0).val()) || 0,
        Weight: parseFloat(emptyRow.find('input[type="number"]').eq(1).val()) || 0,
        BloodPressure: emptyRow.find('input[type="text"]').eq(0).val(),
        UterineHeight: parseFloat(emptyRow.find('input[type="number"]').eq(2).val()) || 0,
        Presentation: emptyRow.find('input[type="text"]').eq(1).val(),
        FetalHeartRate: parseInt(emptyRow.find('input[type="number"]').eq(3).val()) || 0,
        FetalMovements: emptyRow.find('select').eq(0).val() === 'true',
        ControlLocation: emptyRow.find('input[type="text"]').eq(2).val(),
        Proteinuria: emptyRow.find('select').eq(1).val() === 'true',
        WarningSignsExamsAndTreatments: emptyRow.find('input[type="text"]').eq(3).val(),
        TechnicianInitials: emptyRow.find('input[type="text"]').eq(4).val(),
        NextAppointment: emptyRow.find('.next-date').val()
    };

    
    if (!consultationData.ConsultationDate && 
        !consultationData.GestationalAgeWeeks && 
        !consultationData.BloodPressure) {
        alert('Please fill in at least one of: Consultation Date, Gestational Age, or Blood Pressure.');
        return;
    }

    console.log('Sending consultation data:', JSON.stringify(consultationData, null, 2));

    
    $.ajax({
        url: '/PerinatalHistories/AddPrenatalConsultation',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(consultationData),
        success: function (result) {
            if (result.success) {
                
                var newRow = `<tr class="consultation-row" data-consultation-id="${result.consultation.id}">
                            <td>${new Date(result.consultation.consultationDate).toLocaleDateString()}</td>
                            <td>${result.consultation.gestationalAgeWeeks}</td>
                            <td>${result.consultation.weight}</td>
                            <td>${result.consultation.bloodPressure}</td>
                            <td>${result.consultation.uterineHeight}</td>
                            <td>${result.consultation.presentation}</td>
                            <td>${result.consultation.fetalHeartRate}</td>
                            <td>${result.consultation.fetalMovements ? 'Si' : 'No'}</td>
                            <td>${result.consultation.controlLocation}</td>
                            <td>${result.consultation.proteinuria ? '+' : '-'}</td>
                            <td>${result.consultation.warningSignsExamsAndTreatments}</td>
                            <td>${result.consultation.technicianInitials}</td>
                            <td>${new Date(result.consultation.nextAppointment).toLocaleDateString()}</td>
                        </tr>`;

                
                emptyRow.before(newRow);

                
                emptyRow.find('input, select').val('');

                
                alert('Consultation added successfully');
            } else {
                alert(result.message);
                console.error('Error details:', result);
            }
        },
        error: function (xhr, status, error) {
            alert('Error adding consultation. Please check the form and try again.');
            console.error('XHR:', xhr);
            console.error('Status:', status);
            console.error('Error:', error);
            console.error('Response:', xhr.responseText);
        }
    });
}


function addPostpartumVisit() {
    const recordId = parseInt($('#recordId').val());
    if (!recordId) {
        alert('Please save the record first before adding postpartum visits.');
        return;
    }

    
    var emptyRow = $('tr:has(.temperature):not(.postpartum-visit-row):first');
    var dayIndex = emptyRow.index() - 1; 

    if (dayIndex >= 0 && dayIndex < 4) {
        var dayLabels = ["1er", "2°", "3er", "5° a 10°"];
        var dayValues = [1, 2, 3, 5]; 

        var visitData = {
            PostpartumInformationId: recordId, 
            Day: dayValues[dayIndex],
            Temperature: parseFloat(emptyRow.find('.temperature').val()) || 0,
            BloodPressure: emptyRow.find('.blood-pressure').val(),
            Pulse: parseInt(emptyRow.find('.pulse').val()) || 0,
            UterineInvolution: emptyRow.find('.uterine-involution').val(),
            Lochia: emptyRow.find('.lochia').val(),
            Perineum: emptyRow.find('.perineum').val(),
            Breastfeeding: emptyRow.find('.breastfeeding').val(),
            Observations: emptyRow.find('.observations').val(),
            Responsible: emptyRow.find('.responsible').val()
        };

        
        if (!visitData.Temperature && !visitData.BloodPressure && !visitData.Pulse) {
            alert('Please fill in at least one of: Temperature, Blood Pressure, or Pulse.');
            return;
        }

        console.log('Sending postpartum visit data:', JSON.stringify(visitData, null, 2));

        
        $.ajax({
            url: '/PerinatalHistories/AddPostpartumVisit',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(visitData),
            success: function (result) {
                if (result.success) {
                    
                    emptyRow.html(`
                        <td>${dayLabels[dayIndex]}</td>
                        <td>${result.visit.temperature}</td>
                        <td>${result.visit.bloodPressure}</td>
                        <td>${result.visit.pulse}</td>
                        <td>${result.visit.uterineInvolution}</td>
                        <td>${result.visit.lochia}</td>
                        <td>${result.visit.perineum}</td>
                        <td>${result.visit.breastfeeding}</td>
                        <td>${result.visit.observations}</td>
                        <td>${result.visit.responsible}</td>
                    `);

                    
                    emptyRow.addClass('postpartum-visit-row')
                        .attr('data-visit-id', result.visit.id);

                    
                    alert('Postpartum visit added successfully');
                } else {
                    alert(result.message);
                    console.error('Error details:', result);
                }
            },
            error: function (xhr, status, error) {
                alert('Error adding postpartum visit. Please check the form and try again.');
                console.error('XHR:', xhr);
                console.error('Status:', status);
                console.error('Error:', error);
                console.error('Response:', xhr.responseText);
            }
        });
    } else {
        alert('No more postpartum visits can be added.');
    }
}

 
function formatDateInputs() {
    $('input[type="date"]').each(function () {
        const dateValue = $(this).val();
        if (dateValue) {
            const date = new Date(dateValue);
            const formattedDate = date.toLocaleDateString();
            $(this).attr('data-formatted-date', formattedDate);
        }
    });
}


function calculateGestationalAge(lmpDate) {
    if (!lmpDate) return null;

    const lmp = new Date(lmpDate);
    const today = new Date();

    
    const diffTime = Math.abs(today - lmp);

    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    return { weeks, days };
}


function calculateEstimatedDueDate(lmpDate) {
    if (!lmpDate) return null;

    const lmp = new Date(lmpDate);

    
    const edd = new Date(lmp);
    edd.setDate(lmp.getDate() + 280);

    return edd;
}
 

function saveRecord() {
    
    $('#btnSave').prop('disabled', true).html('<span class="spinner-border spinner-border-sm" role="status"></span> Guardando...');

    try {
        
        const modelInfo = collectFormData();

        if (!modelInfo) {
            console.error('collectFormData returned null');
            $('#btnSave').prop('disabled', false).html('<i class="fas fa-save"></i> Guardar');
            return;
        }

        const dataToSend = { ModelInfo: modelInfo };

        console.log('Sending data:', JSON.stringify(dataToSend, null, 2));

        
        $.ajax({
            url: '/PerinatalHistories/DiagnosePerinatalHistory',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(dataToSend),
            success: function (diagResponse) {
                console.log('📋 DIAGNÓSTICO DE DESERIALIZACIÓN:', diagResponse);

                if (diagResponse.errorsFound > 0) {
                    console.error('❌ Errores de deserialización encontrados:');
                    diagResponse.errors.forEach(function(err, idx) {
                        console.error(`  ${idx + 1}. ${err}`);
                    });
                }

                console.log('📊 Estado de entidades:', {
                    modelInfoId: diagResponse.modelInfoId,
                    modelInfoPatientId: diagResponse.modelInfoPatientId,
                    hasMedicalBackground: diagResponse.hasMedicalBackground,
                    hasObstetricBackground: diagResponse.hasObstetricBackground,
                    hasCurrentPregnancy: diagResponse.hasCurrentPregnancy,
                    hasBirthInformation: diagResponse.hasBirthInformation,
                    hasNewbornInformation: diagResponse.hasNewbornInformation
                });

                
                doSaveRecord(dataToSend);
            },
            error: function (xhr, status, error) {
                console.error('Error en diagnóstico:', xhr.responseText);
                
                doSaveRecord(dataToSend);
            }
        });

    } catch (ex) {
        console.error('Exception in saveRecord:', ex);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: ex.message
        });
        $('#btnSave').prop('disabled', false).html('<i class="fas fa-save"></i> Guardar');
    }
}


function doSaveRecord(dataToSend) {
    $.ajax({
        url: '/PerinatalHistories/SavePerinatalHistory',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(dataToSend),
        success: function (response) {
            console.log('📝 Respuesta de SavePerinatalHistory:', response);

            if (response.success) {
                
                Swal.fire({
                    icon: 'success',
                    title: '¡Guardado!',
                    text: 'El registro se ha guardado correctamente.',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    
                    if (response.recordId) {
                        window.location.href = `/PerinatalHistories/AddOrUpdate?id=${response.recordId}`;
                    }
                });
            } else {
                
                console.error('❌ Error al guardar:', response);
                if (response.debug) {
                    console.log('🔍 Debug info:', response.debug);
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.message
                });
            }
        },
        error: function (xhr, status, error) {
            
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error al guardar: ${error}`
            });
            console.error('Error details:', xhr.responseText);
        },
        complete: function () {
            
            $('#btnSave').prop('disabled', false).html('<i class="fas fa-save"></i> Guardar');
        }
    });
}

function addPrenatalConsultation() {
    const recordId = parseInt($('#recordId').val());
    if (!recordId) {
        alert('Please save the record first before adding consultations.');
        return;
    }

    
    var lastRow = $('.consultation-date').last().closest('tr');

    var consultationData = {
        PerinatalHistoryRecordId: recordId,
        ConsultationDate: lastRow.find('.consultation-date').val(),
        GestationalAgeWeeks: parseInt(lastRow.find('input[type="number"]').eq(0).val()) || 0,
        Weight: parseFloat(lastRow.find('input[type="number"]').eq(1).val()) || 0,
        BloodPressure: lastRow.find('input[type="text"]').eq(0).val(),
        UterineHeight: parseFloat(lastRow.find('input[type="number"]').eq(2).val()) || 0,
        Presentation: lastRow.find('input[type="text"]').eq(1).val(),
        FetalHeartRate: parseInt(lastRow.find('input[type="number"]').eq(3).val()) || 0,
        FetalMovements: lastRow.find('select').eq(0).val() === 'true',
        ControlLocation: lastRow.find('input[type="text"]').eq(2).val(),
        Proteinuria: lastRow.find('select').eq(1).val() === 'true',
        WarningSignsExamsAndTreatments: lastRow.find('input[type="text"]').eq(3).val(),
        TechnicianInitials: lastRow.find('input[type="text"]').eq(4).val(),
        NextAppointment: lastRow.find('.next-date').val()
    };

    console.log('Sending consultation data:', JSON.stringify(consultationData, null, 2));

    
    $.ajax({
        url: '/PerinatalHistories/AddPrenatalConsultation',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(consultationData),
        success: function (result) {
            if (result.success) {
                
                var newRow = `<tr class="consultation-row" data-consultation-id="${result.consultation.id}">
                                    <td>${new Date(result.consultation.consultationDate).toLocaleDateString()}</td>
                                    <td>${result.consultation.gestationalAgeWeeks}</td>
                                    <td>${result.consultation.weight}</td>
                                    <td>${result.consultation.bloodPressure}</td>
                                    <td>${result.consultation.uterineHeight}</td>
                                    <td>${result.consultation.presentation}</td>
                                    <td>${result.consultation.fetalHeartRate}</td>
                                    <td>${result.consultation.fetalMovements ? 'Si' : 'No'}</td>
                                    <td>${result.consultation.controlLocation}</td>
                                    <td>${result.consultation.proteinuria ? '+' : '-'}</td>
                                    <td>${result.consultation.warningSignsExamsAndTreatments}</td>
                                    <td>${result.consultation.technicianInitials}</td>
                                    <td>${new Date(result.consultation.nextAppointment).toLocaleDateString()}</td>
                                </tr>`;

                
                $('.consultation-date').first().closest('tr').before(newRow);

                
                lastRow.find('input, select').val('');

                
                alert('Consultation added successfully');
            } else {
                alert(result.message);
                console.error('Error details:', result);
            }
        },
        error: function (xhr, status, error) {
            alert('Error adding consultation. Please check the form and try again.');
            console.error('XHR:', xhr);
            console.error('Status:', status);
            console.error('Error:', error);
            console.error('Response:', xhr.responseText);
        }
    });
}


function addPostpartumVisit() {
    const recordId = parseInt($('#recordId').val());
    if (!recordId) {
        alert('Please save the record first before adding postpartum visits.');
        return;
    }

    
    var emptyRow = $('tr:has(.temperature):first');
    var dayIndex = emptyRow.index() - 1; 

    if (dayIndex >= 0 && dayIndex < 4) {
        var dayLabels = ["1er", "2°", "3er", "5° a 10°"];
        var dayValues = [1, 2, 3, 5]; 

        var visitData = {
            PostpartumInformationId: recordId, 
            Day: dayValues[dayIndex],
            Temperature: parseFloat(emptyRow.find('.temperature').val()) || 0,
            BloodPressure: emptyRow.find('.blood-pressure').val(),
            Pulse: parseInt(emptyRow.find('.pulse').val()) || 0,
            UterineInvolution: emptyRow.find('.uterine-involution').val(),
            Lochia: emptyRow.find('.lochia').val(),
            Perineum: emptyRow.find('.perineum').val(),
            Breastfeeding: emptyRow.find('.breastfeeding').val(),
            Observations: emptyRow.find('.observations').val(),
            Responsible: emptyRow.find('.responsible').val()
        };

        console.log('Sending postpartum visit data:', JSON.stringify(visitData, null, 2));

        
        $.ajax({
            url: '/PerinatalHistories/AddPostpartumVisit',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(visitData),
            success: function (result) {
                if (result.success) {
                    
                    emptyRow.html(`
                                        <td>${dayLabels[dayIndex]}</td>
                                        <td>${result.visit.temperature}</td>
                                        <td>${result.visit.bloodPressure}</td>
                                        <td>${result.visit.pulse}</td>
                                        <td>${result.visit.uterineInvolution}</td>
                                        <td>${result.visit.lochia}</td>
                                        <td>${result.visit.perineum}</td>
                                        <td>${result.visit.breastfeeding}</td>
                                        <td>${result.visit.observations}</td>
                                        <td>${result.visit.responsible}</td>
                                    `);

                    
                    emptyRow.addClass('postpartum-visit-row')
                        .attr('data-visit-id', result.visit.id);

                    
                    alert('Postpartum visit added successfully');
                } else {
                    alert(result.message);
                    console.error('Error details:', result);
                }
            },
            error: function (xhr, status, error) {
                alert('Error adding postpartum visit. Please check the form and try again.');
                console.error('XHR:', xhr);
                console.error('Status:', status);
                console.error('Error:', error);
                console.error('Response:', xhr.responseText);
            }
        });
    } else {
        alert('No more postpartum visits can be added.');
    }
}
 

function collectFormData() {
    console.log('collectFormData called');
    try {
        const recordId = parseInt($('#recordId').val()) || 0;
        const patientId = parseInt($('#patientId').val()) || 0;
        
        console.log('recordId:', recordId, 'patientId:', patientId);

    
    const basicInfo = {
        Id: recordId,
        PatientId: patientId,
        PrenatalControlPlace: $('#PrenatalControlPlace').val() || '',
        BirthPlace: $('#BirthPlace').val() || '',
        CreatedDate: recordId === 0 ? new Date().toISOString() : ($('#CreatedDate').val() || new Date().toISOString()),
        LastModifiedDate: new Date().toISOString()
    };
    
    console.log('basicInfo:', basicInfo);

    
    const medicalBackground = {
        Id: parseInt($('#MedicalBackground_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,
        
        FamilyTuberculosis: parseInt($('input[name="FamilyTuberculosis"]:checked').val()) || null,
        FamilyDiabetes: parseInt($('input[name="FamilyDiabetes"]:checked').val()) || null,
        FamilyDiabetesType: parseInt($('input[name="FamilyDiabetesType"]:checked').val()) || null, 
        FamilyHypertension: parseInt($('input[name="FamilyHypertension"]:checked').val()) || null,
        FamilyPreeclampsia: parseInt($('input[name="FamilyPreeclampsia"]:checked').val()) || null,
        FamilyEclampsia: parseInt($('input[name="FamilyEclampsia"]:checked').val()) || null,
        FamilyOtherSeriousMedicalCondition: parseInt($('input[name="FamilyOtherSeriousMedicalCondition"]:checked').val()) || null,
        FamilyOtherConditionDetails: $('#FamilyOtherConditionDetails').val() || null,
        
        
        PersonalTuberculosis: parseInt($('input[name="PersonalTuberculosis"]:checked').val()) || null,
        PersonalDiabetes: parseInt($('input[name="PersonalDiabetes"]:checked').val()) || null,
        PersonalDiabetesType: parseInt($('input[name="PersonalDiabetesType"]:checked').val()) || null, 
        PersonalHypertension: parseInt($('input[name="PersonalHypertension"]:checked').val()) || null,
        PersonalPreeclampsia: parseInt($('input[name="PersonalPreeclampsia"]:checked').val()) || null,
        PersonalEclampsia: parseInt($('input[name="PersonalEclampsia"]:checked').val()) || null,
        PersonalSurgery: parseInt($('input[name="PersonalSurgery"]:checked').val()) || null,
        PersonalInfertility: parseInt($('input[name="PersonalInfertility"]:checked').val()) || null,
        PersonalHeartDisease: parseInt($('input[name="PersonalHeartDisease"]:checked').val()) || null,
        PersonalNephropathy: parseInt($('input[name="PersonalNephropathy"]:checked').val()) || null,
        PersonalViolence: parseInt($('input[name="PersonalViolence"]:checked').val()) || null,
        PersonalHIVPositive: parseInt($('input[name="PersonalHIVPositive"]:checked').val()) || null,
        PersonalOtherSeriousMedicalCondition: parseInt($('input[name="PersonalOtherSeriousMedicalCondition"]:checked').val()) || null,
        PersonalOtherConditionDetails: $('#PersonalOtherConditionDetails').val() || null,
        
        CurrentSmoker: $('input[name="CurrentSmoker"]:checked').val() === 'true',
        PassiveSmoker: $('input[name="PassiveSmoker"]:checked').val() === 'true',
        DrugUse: $('input[name="DrugUse"]:checked').val() === 'true',
        AlcoholUse: $('input[name="AlcoholUse"]:checked').val() === 'true'
    };
    
    console.log('medicalBackground:', medicalBackground);

    
    
    const obstetricBackground = {
        Id: parseInt($('#ObstetricBackground_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,
        
        PreviousPregnancies: parseInt($('#PreviousPregnancies').val()) || 0,
        Abortions: parseInt($('#Abortions').val()) || 0,
        
        EctopicPregnancy: $('#EctopicPregnancy').val() || null,
        Births: parseInt($('input[asp-for="Births"]').val()) || 0,
        VaginalDeliveries: parseInt($('#VaginalDeliveries').val()) || 0,
        Cesareans: parseInt($('#Cesareans').val()) || 0,
        LivingBorn: parseInt($('#LivingBorn').val()) || 0,
        DeadBorn: parseInt($('#DeadBorn').val()) || 0,
        DiedFirstWeek: parseInt($('#DiedFirstWeek').val()) || 0,
        DiedAfterFirstWeek: parseInt($('#DiedAfterFirstWeek').val()) || 0,
        Living: parseInt($('#livingChildren').val()) || parseInt($('input[name="Living"]').val()) || 0, 
        
        ThreeConsecutiveSpontaneousAbortions: $('#threeAbortionsYes').is(':checked') ? true : null,
        
        TwinsHistory: $('input[name="TwinsHistory"]:checked').length ? $('input[name="TwinsHistory"]:checked').val() === 'true' : null,
        LowBirthWeight: parseInt($('input[name="LowBirthWeight"]:checked').val()) || null, 
        HighBirthWeight: parseInt($('input[name="HighBirthWeight"]:checked').val()) || null, 
        LastPreviousBirthWeightType: parseInt($('input[name="LastPreviousBirthWeightType"]:checked').val()) || null, 
        
        LastPregnancyEndDate: $('#lastPregnancyDate').val() || null,
        
        LastPregnancyLessThanOneYear: $('#lessYearYes').is(':checked') ? true : null,
        
        PregnancyPlanned: $('input[name="PregnancyPlanned"]:checked').length ? $('input[name="PregnancyPlanned"]:checked').val() === 'true' : null,
        ContraceptiveMethodFailure: $('input[name="ContraceptiveMethodFailure"]:checked').val() || null
    };

    
    const currentPregnancy = {
        Id: parseInt($('#CurrentPregnancy_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,
        
        LastMenstrualPeriod: $('input[name$="LastMenstrualPeriod"]').val() || null,
        EstimatedDueDate: $('input[name$="EstimatedDueDate"]').val() || null,
        PreviousWeight: parseFloat($('input[name$="PreviousWeight"]').val()) || null,
        Height: parseFloat($('input[name$="Height"]').val()) || null,
        
        GestationalAgeReliabilityMethod: $('input[name$="GestationalAgeReliabilityMethod"]:checked').val() || null,
        
        ReliableByFUM: parseInt($('input[name="ReliableByFUM"]:checked').val()) || null,
        ReliableByEchoLessThan20Weeks: parseInt($('input[name="ReliableByEchoLessThan20Weeks"]:checked').val()) || null,

        
        SmokingFirstTrimester: parseInt($('input[name="SmokingFirstTrimester"]:checked').val()) || null,
        SmokingSecondTrimester: parseInt($('input[name="SmokingSecondTrimester"]:checked').val()) || null,
        SmokingThirdTrimester: parseInt($('input[name="SmokingThirdTrimester"]:checked').val()) || null,
        PassiveSmokingFirstTrimester: parseInt($('input[name="PassiveSmokingFirstTrimester"]:checked').val()) || null,
        PassiveSmokingSecondTrimester: parseInt($('input[name="PassiveSmokingSecondTrimester"]:checked').val()) || null,
        PassiveSmokingThirdTrimester: parseInt($('input[name="PassiveSmokingThirdTrimester"]:checked').val()) || null,
        DrugUseFirstTrimester: parseInt($('input[name="DrugUseFirstTrimester"]:checked').val()) || null,
        DrugUseSecondTrimester: parseInt($('input[name="DrugUseSecondTrimester"]:checked').val()) || null,
        DrugUseThirdTrimester: parseInt($('input[name="DrugUseThirdTrimester"]:checked').val()) || null,
        AlcoholUseFirstTrimester: parseInt($('input[name="AlcoholUseFirstTrimester"]:checked').val()) || null,
        AlcoholUseSecondTrimester: parseInt($('input[name="AlcoholUseSecondTrimester"]:checked').val()) || null,
        AlcoholUseThirdTrimester: parseInt($('input[name="AlcoholUseThirdTrimester"]:checked').val()) || null,
        ViolenceFirstTrimester: parseInt($('input[name="ViolenceFirstTrimester"]:checked').val()) || null,
        ViolenceSecondTrimester: parseInt($('input[name="ViolenceSecondTrimester"]:checked').val()) || null,
        ViolenceThirdTrimester: parseInt($('input[name="ViolenceThirdTrimester"]:checked').val()) || null,

        
        NormalDentalExamination: parseInt($('input[name="NormalDentalExamination"]:checked').val()) || null,
        NormalBreastExamination: parseInt($('input[name="NormalBreastExamination"]:checked').val()) || null,
        OlderThan35: parseInt($('input[name="OlderThan35"]:checked').val()) || null,
        YoungerThan15: parseInt($('input[name="YoungerThan15"]:checked').val()) || null,

        
        VaccineTetanusDiphtheria: parseInt($('input[name="VaccineTetanusDiphtheria"]:checked').val()) || null,
        VaccineInfluenza: parseInt($('input[name="VaccineInfluenza"]:checked').val()) || null,
        VaccineRubella: parseInt($('input[name="VaccineRubella"]:checked').val()) || null,
        VaccineHepatitisB: parseInt($('input[name="VaccineHepatitisB"]:checked').val()) || null,

        
        
        VaccineTetanusDiphtheriaTime: parseInt($('input[name="VaccineTetanusDiphtheriaTime"]:checked').val()) || null,
        VaccineTetanusDiphtheriaDate: $('input[name="VaccineTetanusDiphtheriaDate"]').val() || null,
        VaccineTetanusDiphtheriaGestationalWeeks: parseInt($('input[name="VaccineTetanusDiphtheriaGestationalWeeks"]').val()) || null,
        VaccineTetanusDiphtheriaTotalDoses: parseInt($('input[name="VaccineTetanusDiphtheriaTotalDoses"]').val()) || null,

        
        VaccineTdapTime: parseInt($('input[name="VaccineTdapTime"]:checked').val()) || null,
        VaccineTdapDate: $('input[name="VaccineTdapDate"]').val() || null,
        VaccineTdapGestationalWeeks: parseInt($('input[name="VaccineTdapGestationalWeeks"]').val()) || null,
        VaccineTdapTotalDoses: parseInt($('input[name="VaccineTdapTotalDoses"]').val()) || null,

        
        VaccineInfluenzaTime: parseInt($('input[name="VaccineInfluenzaTime"]:checked').val()) || null,
        VaccineInfluenzaDate: $('input[name="VaccineInfluenzaDate"]').val() || null,
        VaccineInfluenzaGestationalWeeks: parseInt($('input[name="VaccineInfluenzaGestationalWeeks"]').val()) || null,
        VaccineInfluenzaTotalDoses: parseInt($('input[name="VaccineInfluenzaTotalDoses"]').val()) || null,

        
        VaccineRubellaTime: parseInt($('input[name="VaccineRubellaTime"]:checked').val()) || null,
        VaccineRubellaDate: $('input[name="VaccineRubellaDate"]').val() || null,
        VaccineRubellaGestationalWeeks: parseInt($('input[name="VaccineRubellaGestationalWeeks"]').val()) || null,
        VaccineRubellaTotalDoses: parseInt($('input[name="VaccineRubellaTotalDoses"]').val()) || null,

        
        VaccineHepatitisBTime: parseInt($('input[name="VaccineHepatitisBTime"]:checked').val()) || null,
        VaccineHepatitisBDate: $('input[name="VaccineHepatitisBDate"]').val() || null,
        VaccineHepatitisBGestationalWeeks: parseInt($('input[name="VaccineHepatitisBGestationalWeeks"]').val()) || null,
        VaccineHepatitisBTotalDoses: parseInt($('input[name="VaccineHepatitisBTotalDoses"]').val()) || null,

        
        VaccineHepatitisATime: parseInt($('input[name="VaccineHepatitisATime"]:checked').val()) || null,
        VaccineHepatitisADate: $('input[name="VaccineHepatitisADate"]').val() || null,
        VaccineHepatitisAGestationalWeeks: parseInt($('input[name="VaccineHepatitisAGestationalWeeks"]').val()) || null,
        VaccineHepatitisATotalDoses: parseInt($('input[name="VaccineHepatitisATotalDoses"]').val()) || null,

        
        HepatitisBScreening: parseInt($('input[name="HepatitisBScreening"]:checked').val()) || null,

        
        BloodGroupType: parseInt($('input[name="BloodGroupType"]:checked').val()) || null,
        RhFactorType: parseInt($('input[name="RhFactorType"]:checked').val()) || null,
        RhSensitization: parseInt($('input[name="RhSensitization"]:checked').val()) || null,
        
        
        AntiDImmunoglobulinLessThan20Weeks: parseInt($('input[name="AntiDImmunoglobulinLessThan20Weeks"]:checked').val()) || null,
        AntiDImmunoglobulinGreaterOrEqual20Weeks: parseInt($('input[name="AntiDImmunoglobulinGreaterOrEqual20Weeks"]:checked').val()) || null,
        
        AntiDImmunoglobulin: parseInt($('input[name="AntiDImmunoglobulin"]:checked').val()) || null,

        
        CervixPapExam: parseInt($('input[name="CervixPapExam"]:checked').val()) || null,
        CervixColposcopy: parseInt($('input[name="CervixColposcopy"]:checked').val()) || null,
        CervixVisualInspection: parseInt($('input[name="CervixVisualInspection"]:checked').val()) || null,

        
        MalariaTestResult: $('#malariaNotDone, #malariaNegative, #malariaPositive').filter(':checked').val(),
        ChagasTestResult: $('#chagasNotDone, #chagasNegative, #chagasPositive').filter(':checked').val(),
        BacteriuriaTestResultLessThan20Weeks: $('#bacteriuriaLess20NotDone, #bacteriuriaLess20Negative, #bacteriuriaLess20Positive').filter(':checked').val(),
        BacteriuriaTestResultGreaterOrEqual20Weeks: $('#bacteriuriaGreater20NotDone, #bacteriuriaGreater20Negative, #bacteriuriaGreater20Positive').filter(':checked').val(),

        
        ToxoplasmosisIgGLessThan20Weeks: $('#toxoIgGLess20NotDone, #toxoIgGLess20Negative, #toxoIgGLess20Positive').filter(':checked').val(),
        ToxoplasmosisIgGGreaterOrEqual20Weeks: $('#toxoIgGGreater20NotDone, #toxoIgGGreater20Negative, #toxoIgGGreater20Positive').filter(':checked').val(),
        ToxoplasmosisIgMLessThan20Weeks: $('#toxoIgMFirstConsultNotDone, #toxoIgMFirstConsultNegative, #toxoIgMFirstConsultPositive').filter(':checked').val(),
        ToxoplasmosisIgMGreaterOrEqual20Weeks: null, 

        
        GlucoseLessThan20Weeks: parseFloat($('input[name="GlucoseLessThan20Weeks"], input[asp-for="GlucoseLessThan20Weeks"]').val()) || 0,
        GlucoseGreaterOrEqual30Weeks: parseFloat($('input[name="GlucoseGreaterOrEqual30Weeks"], input[asp-for="GlucoseGreaterOrEqual30Weeks"]').val()) || 0,

        
        HemoglobinLessThan20Weeks: parseFloat($('input[name="HemoglobinLessThan20Weeks"], input[asp-for="HemoglobinLessThan20Weeks"]').val()) || 0,
        AnemiaLessThan20Weeks: $('input[asp-for="AnemiaLessThan20Weeks"], input[name="AnemiaLessThan20Weeks"]').is(':checked'),
        HemoglobinGreaterOrEqual20Weeks: parseFloat($('input[name="HemoglobinGreaterOrEqual20Weeks"], input[asp-for="HemoglobinGreaterOrEqual20Weeks"]').val()) || 0,
        AnemiaGreaterOrEqual20Weeks: $('input[asp-for="AnemiaGreaterOrEqual20Weeks"], input[name="AnemiaGreaterOrEqual20Weeks"]').is(':checked'),
        
        IronSupplements: $('input[name="IronSupplements"]:checked').val() === 'true',
        FolateSupplementsLessThan20Weeks: $('input[name="FolateSupplementsLess20"]:checked').val() === 'true',
        
        IronSupplementsGreaterOrEqual20Weeks: $('input[name="IronSupplementsGreater20"]:checked').val() === 'true',
        FolateSupplements: $('input[name="FolateSupplements"]:checked').val() === 'true',

        
        StreptococcusBTest3537Weeks: $('#streptococcusNotDone, #streptococcusNegative, #streptococcusPositive').filter(':checked').val(),

        
        BirthPreparation: $('#birthPrepYes, #birthPrepNo').filter(':checked').val() === 'true',
        BreastfeedingCounseling: $('#breastfeedingCounselingYes, #breastfeedingCounselingNo').filter(':checked').val() === 'true',

        
        HIVTestRequestedLessThan20Weeks: parseInt($('input[name="HIVTestRequestedLessThan20Weeks"]:checked').val()) || null,
        HIVTestResultLessThan20Weeks: parseInt($('input[name="HIVTestResultLessThan20Weeks"]:checked').val()) || null,
        HIVARTLessThan20Weeks: parseInt($('input[name="HIVARTLessThan20Weeks"]:checked').val()) || null,

        HIVTestRequestedGreaterOrEqual20Weeks: parseInt($('input[name="HIVTestRequestedGreaterOrEqual20Weeks"]:checked').val()) || null,
        HIVTestResultGreaterOrEqual20Weeks: parseInt($('input[name="HIVTestResultGreaterOrEqual20Weeks"]:checked').val()) || null,
        HIVARTGreaterOrEqual20Weeks: parseInt($('input[name="HIVARTGreaterOrEqual20Weeks"]:checked').val()) || null,

        
        
        SyphilisNonTreponemalResultLessThan20Weeks: parseInt($('input[name="SyphilisNonTreponemalResultLessThan20Weeks"]:checked').val()) || null,
        
        SyphilisTreponemalResultLessThan20Weeks: parseInt($('input[name="SyphilisTreponemalResultLessThan20Weeks"]:checked').val()) || null,
        
        SyphilisTreatmentOptionLessThan20Weeks: parseInt($('input[name="SyphilisTreatmentOptionLessThan20Weeks"]:checked').val()) || null,
        SyphilisTreatmentWeeksLessThan20Weeks: parseInt($('input[name="SyphilisTreatmentWeeksLessThan20Weeks"]').val()) || null,
        
        SyphilisPartnerTreatmentLessThan20Weeks: parseInt($('input[name="SyphilisPartnerTreatmentLessThan20Weeks"]:checked').val()) || null,

        
        SyphilisNonTreponemalResultGreaterOrEqual20Weeks: parseInt($('input[name="SyphilisNonTreponemalResultGreaterOrEqual20Weeks"]:checked').val()) || null,
        SyphilisTreponemalResultGreaterOrEqual20Weeks: parseInt($('input[name="SyphilisTreponemalResultGreaterOrEqual20Weeks"]:checked').val()) || null,
        SyphilisTreatmentOptionGreaterOrEqual20Weeks: parseInt($('input[name="SyphilisTreatmentOptionGreaterOrEqual20Weeks"]:checked').val()) || null,
        SyphilisTreatmentWeeksGreaterOrEqual20Weeks: parseInt($('input[name="SyphilisTreatmentWeeksGreaterOrEqual20Weeks"]').val()) || null,
        SyphilisPartnerTreatmentGreaterOrEqual20Weeks: parseInt($('input[name="SyphilisPartnerTreatmentGreaterOrEqual20Weeks"]:checked').val()) || null

        
    };

    
    const prenatalConsultations = [];

    
    $('.consultation-row').each(function () {
        const row = $(this);
        const id = parseInt(row.data('consultation-id')) || 0;
        const inputs = row.find('input, select');

        prenatalConsultations.push({
            Id: id,
            PerinatalHistoryRecordId: recordId,
            ConsultationDate: inputs.eq(0).val(),
            GestationalAgeWeeks: parseInt(inputs.eq(1).val()) || 0,
            Weight: parseFloat(inputs.eq(2).val()) || 0,
            BloodPressure: inputs.eq(3).val(),
            UterineHeight: parseFloat(inputs.eq(4).val()) || 0,
            Presentation: inputs.eq(5).val(),
            FetalHeartRate: parseInt(inputs.eq(6).val()) || 0,
            FetalMovements: inputs.eq(7).val() === 'true',
            ControlLocation: inputs.eq(8).val(),
            Proteinuria: inputs.eq(9).val() === 'true',
            WarningSignsExamsAndTreatments: inputs.eq(10).val(),
            TechnicianInitials: inputs.eq(11).val(),
            NextAppointment: inputs.eq(12).val()
        });
    });

    
    $('tr:has(.consultation-date)').each(function () {
        const consultationDate = $(this).find('.consultation-date').val();
        const gestationalAge = parseInt($(this).find('input[type="number"]').eq(0).val()) || 0;
        const weight = parseFloat($(this).find('input[type="number"]').eq(1).val()) || 0;
        const bloodPressure = $(this).find('input[type="text"]').eq(0).val();

        if (consultationDate || gestationalAge > 0 || weight > 0 || bloodPressure) {
            const fetalMovSelect = $(this).find('select').eq(0);
            const proteinuriaSelect = $(this).find('select').eq(1);

            prenatalConsultations.push({
                Id: 0,
                PerinatalHistoryRecordId: recordId,
                ConsultationDate: consultationDate || new Date().toISOString(),
                GestationalAgeWeeks: gestationalAge,
                Weight: weight,
                BloodPressure: bloodPressure,
                UterineHeight: parseFloat($(this).find('input[type="number"]').eq(2).val()) || 0,
                Presentation: $(this).find('input[type="text"]').eq(1).val(),
                FetalHeartRate: parseInt($(this).find('input[type="number"]').eq(3).val()) || 0,
                FetalMovements: fetalMovSelect.val() === 'true',
                ControlLocation: $(this).find('input[type="text"]').eq(2).val(),
                Proteinuria: proteinuriaSelect.val() === 'true',
                WarningSignsExamsAndTreatments: $(this).find('input[type="text"]').eq(3).val(),
                TechnicianInitials: $(this).find('input[type="text"]').eq(4).val(),
                NextAppointment: $(this).find('.next-date').val() || new Date(new Date().setDate(new Date().getDate() + 30)).toISOString()
            });
        }
    });

    
    const birthInformation = {
        Id: parseInt($('#BirthInformation_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,
        
        BirthType: parseInt($('input[name="BirthType"]:checked').val()) || null,
        AdmissionDate: $('#AdmissionDate').val(),
        PrenatalConsultationsTotal: parseInt($('#PrenatalConsultationsTotal').val()) || 0,
        HasPrenatalCard: $('input[name="HasPrenatalCard"]:checked').val() === 'true',
        FirstConsultationGestationalAgeWeeks: parseInt($('#FirstConsultationGestationalAgeWeeks').val()) || 0,
        FirstConsultationGestationalAgeDays: parseInt($('#FirstConsultationGestationalAgeDays').val()) || 0,
        HospitalizedDuringPregnancy: $('input[name="HospitalizedDuringPregnancy"]:checked').val() === 'true',
        HospitalizationDays: parseInt($('#HospitalizationDays').val()) || 0,
        Companion: $('input[name="Companion"]:checked').val(),
        CompanionP: $('input[name="CompanionP"]:checked').val(),

        
        CorticosteroidsComplete: $('input[name="CorticosteroidsStatus"]:checked').val() === 'complete',
        CorticosteroidsIncomplete: $('input[name="CorticosteroidsStatus"]:checked').val() === 'incomplete',
        CorticosteroidsNone: $('input[name="CorticosteroidsStatus"]:checked').val() === 'none',
        CorticosteroidsNA: $('input[name="CorticosteroidsStatus"]:checked').val() === 'na',
        CorticosteroidsStartWeek: parseInt($('#CorticosteroidsStartWeek').val()) || 0,

        
        GestationalAgeAtBirthWeeks: parseInt($('#GestationalAgeAtBirthWeeks').val()) || 0,
        GestationalAgeAtBirthDays: parseInt($('#GestationalAgeAtBirthDays').val()) || 0,
        GestationalAgeByLMP: $('#gestationalAgeByLMP').is(':checked'),
        GestationalAgeByUltrasound: $('#gestationalAgeByUltrasound').is(':checked'),

        
        CephalicPresentation: $('input[name="Presentation"]:checked').val() === 'cephalic',
        PelvicPresentation: $('input[name="Presentation"]:checked').val() === 'pelvic',
        TransverseSituation: $('input[name="Presentation"]:checked').val() === 'transverse',

        
        FetalSizeAppropriate: $('input[name="FetalSizeAppropriate"]:checked').val() === 'true',

        
        SpontaneousOnset: $('input[name="LaborOnset"]:checked').val() === 'spontaneous',
        InducedOnset: $('input[name="LaborOnset"]:checked').val() === 'induced',
        ElectiveCesareanOnset: $('input[name="LaborOnset"]:checked').val() === 'elective_cesarean',

        
        MembraneRupture: (function() {
            var val = $('input[name="MembraneRupture"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        MembraneRuptureDate: $('#MembraneRuptureDate').val(),
        MembraneRuptureTime: $('#MembraneRuptureTime').val(),
        MembraneRuptureBefore37Weeks: $('#membraneRuptureBefore37Weeks').is(':checked'),
        MembraneRuptureMoreThan18Hours: $('#membraneRuptureMoreThan18Hours').is(':checked'),
        FeverDuringLabor: $('#feverDuringLabor').is(':checked'),
        FeverTemperature: parseFloat($('#FeverTemperature').val()) || null,
        Chorioamnionitis: parseInt($('input[name="Chorioamnionitis"]:checked').val()) || null,
        MeconiumStainedLiquor: parseInt($('input[name="MeconiumStainedLiquor"]:checked').val()) || null,

        
        MaternalPosition: $('#MaternalPosition').val(),
        BloodPressure: $('#BloodPressure').val(),
        Pulse: parseInt($('#Pulse').val()) || 0,
        ContractionsPerTenMinutes: parseInt($('#ContractionsPerTenMinutes').val()) || 0,
        Dilation: parseFloat($('#Dilation').val()) || 0,
        HeightPresentation: $('#HeightPresentation').val(),
        PositionVariety: $('#PositionVariety').val(),
        MeconiumPresent: $('#meconiumPresent').is(':checked'),
        FetalHeartRateDips: $('#FetalHeartRateDips').val(),

        
        LaborHour: parseInt($('input[placeholder="Hora"]').val()) || 0,
        LaborMinute: parseInt($('input[placeholder="Min"]').val()) || 0,

        
        
        IsLiveBirth: (function() {
            var val = $('input[name="BirthStatus"]:checked').val();
            if (val === 'live') return true;
            if (val === 'dead') return false;
            return null;
        })(),

        
        DeadBirthBeforeLabor: $('input[name="DeadBirthTiming"]:checked').val() === 'anteparto',
        DeadBirthDuringLabor: $('input[name="DeadBirthTiming"]:checked').val() === 'parto',
        DeadBirthDuringLaborUnknown: $('input[name="DeadBirthTiming"]:checked').val() === 'ignora',

        
        BirthTime: $('#BirthTime').val(),
        BirthDate: $('#BirthDate').val(),

        
        MultipleBirth: $('input[name="MultipleBirthStatus"]:checked').val() === 'true',
        BirthOrder: $('#BirthOrder').val(),

        
        SpontaneousBirth: $('input[name="TerminationType"]:checked').val() === 'spontaneous',
        CesareanBirth: $('input[name="TerminationType"]:checked').val() === 'cesarean',
        ForcepsBirth: $('input[name="TerminationType"]:checked').val() === 'forceps',
        VacuumBirth: $('input[name="TerminationType"]:checked').val() === 'vacuum',
        OtherTermination: $('input[name="TerminationType"]:checked').val() === 'other',

        
        MainIndicationForInductionOrOperativeDelivery: $('#MainIndicationForInductionOrOperativeDelivery').val(),

        
        InductionCode: $('#InductionCode').val(),
        OperativeCode: $('#OperativeCode').val(),

        
        BirthPosition: $('input[name="BirthPosition"]:checked').val() || null,

        
        Episiotomy: (function() {
            var val = $('input[name="EpisiotomyStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),

        
        Tear: $('#tearNo').is(':checked') ? false : ($('#TearGrade').val() ? true : null),
        TearGrade: $('#TearGrade').val() ? parseInt($('#TearGrade').val()) : null,

        
        OxytocicsPreDelivery: (function() {
            var val = $('input[name="OxytocicsPreDelivery"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        OxytocicsPostDelivery: (function() {
            var val = $('input[name="OxytocicsPostDelivery"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),

        
        CompletePlacenta: (function() {
            var val = $('input[name="CompletePlacentaStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        RetainedPlacenta: (function() {
            var val = $('input[name="RetainedPlacentaStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        ManualRemovalOfPlacenta: null, 

        
        CordClampingTime: parseInt($('input[name="CordClampingTime"]:checked').val()) || null,
        PreDeliveryCordClamping: null, 
        PostDeliveryCordClamping: null, 

        
        OxytocicsInLabor: (function() {
            var val = $('input[name="OxytocicsInLaborStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        AntibioticsTreatment: (function() {
            var val = $('input[name="AntibioticsTreatmentStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        AnalgesiaTreatment: (function() {
            var val = $('input[name="AnalgesiaTreatmentStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        LocalAnesthesia: (function() {
            var val = $('input[name="LocalAnesthesiaStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        RegionalAnesthesia: (function() {
            var val = $('input[name="RegionalAnesthesiaStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        GeneralAnesthesia: (function() {
            var val = $('input[name="GeneralAnesthesiaStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        Transfusion: (function() {
            var val = $('input[name="TransfusionStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        MagnesiumSulfatePreeclampsia: (function() {
            var val = $('input[name="MagnesiumSulfatePreeclampsiaStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        MagnesiumSulfateEclampsia: (function() {
            var val = $('input[name="MagnesiumSulfateEclampsiaStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        OtherMedicationOne: false, 
        OtherMedicationOneDetail: $('#OtherMedicationOneDetail').val(),
        OtherMedicationTwo: false, 
        OtherMedicationTwoDetail: $('#OtherMedicationTwoDetail').val(),

        
        AttendedByDoctor: $('#attendedByDoctor').is(':checked'),
        AttendedByNurse: $('#attendedByNurse').is(':checked'),
        AttendedByStudent: $('#attendedByStudent').is(':checked'),
        AttendedByMidwife: $('#attendedByMidwife').is(':checked'),
        AttendedByOther: $('#attendedByOther').is(':checked'),
        AttendantName: $('#AttendantName').val(),

        
        PartogramDetails: (function() {
            var val = $('input[name="PartogramDetails"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),

        
        BirthSyphilisTest: parseInt($('input[name="BirthSyphilisTest"]:checked').val()) || null,
        BirthHIVTest: parseInt($('input[name="BirthHIVTest"]:checked').val()) || null,
        BirthTARV: parseInt($('input[name="BirthTARV"]:checked').val()) || null
    };

    
    const laborEntries = [];
    $('.labor-entry-row').each(function () {
        const row = $(this);
        const hour = parseInt(row.find('.labor-hour').val()) || 0;
        const minute = parseInt(row.find('.labor-minute').val()) || 0;
        const position = row.find('.labor-position').val();
        const bp = row.find('.labor-bp').val();
        const pulse = parseInt(row.find('.labor-pulse').val()) || 0;
        const contractions = parseInt(row.find('.labor-contractions').val()) || 0;
        const dilation = parseFloat(row.find('.labor-dilation').val()) || 0;
        const height = row.find('.labor-height').val();
        const variety = row.find('.labor-variety').val();
        const meconium = row.find('.labor-meconium').is(':checked');
        const fcf = row.find('.labor-fcf').val();

        
        if (hour > 0 || minute > 0 || position || bp || pulse > 0 || contractions > 0 || dilation > 0 || height || variety || meconium || fcf) {
            laborEntries.push({
                Id: 0,
                PerinatalHistoryRecordId: recordId,
                LaborHour: hour,
                LaborMinute: minute,
                MaternalPosition: position,
                BloodPressure: bp,
                Pulse: pulse,
                ContractionsPerTenMinutes: contractions,
                Dilation: dilation,
                HeightPresentation: height,
                PositionVariety: variety,
                MeconiumPresent: meconium,
                FetalHeartRateDips: fcf
            });
        }
    });

    
    const newbornInformation = {
        Id: parseInt($('#NewbornInformation_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,

        
        Sex: $('input[name="Sex"]:checked').val() || null,

        
        BirthWeight: $('#BirthWeight').val() ? parseFloat($('#BirthWeight').val()) : null,

        
        HeadCircumference: $('#HeadCircumference').val() ? parseFloat($('#HeadCircumference').val()) : null,
        Length: $('#Length').val() ? parseFloat($('#Length').val()) : null,

        
        GestationalAgeWeeks: $('#GestationalAgeWeeks').val() ? parseInt($('#GestationalAgeWeeks').val()) : null,
        GestationalAgeDays: $('#GestationalAgeDays').val() ? parseInt($('#GestationalAgeDays').val()) : null,
        GestationalAgeMethod: $('input[name="GestationalAgeMethod"]:checked').val() || null,
        
        GestationalAge: $('#GestationalAgeWeeks').val() ? parseInt($('#GestationalAgeWeeks').val()) : 0,

        
        WeightForGestationalAge: $('input[name="WeightForGestationalAge"]:checked').val() || null,

        
        ApgarFirstMinute: $('#ApgarFirstMinute').val() ? parseInt($('#ApgarFirstMinute').val()) : null,
        ApgarFifthMinute: $('#ApgarFifthMinute').val() ? parseInt($('#ApgarFifthMinute').val()) : null,

        
        EarlyBreastfeedingInitiation: (function() {
            var val = $('input[name="EarlyBreastfeedingStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),

        
        ResuscitationStimulation: (function() {
            var val = $('input[name="ResuscitationStimulationStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        ResuscitationAspiration: (function() {
            var val = $('input[name="ResuscitationAspirationStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        ResuscitationMask: (function() {
            var val = $('input[name="ResuscitationMaskStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        ResuscitationOxygen: (function() {
            var val = $('input[name="ResuscitationOxygenStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        ResuscitationMassage: (function() {
            var val = $('input[name="ResuscitationMassageStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        ResuscitationIntubation: (function() {
            var val = $('input[name="ResuscitationIntubationStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        ResuscitationMedication: (function() {
            var val = $('input[name="ResuscitationMedicationStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        
        ResuscitationCardiacMassage: (function() {
            var val = $('input[name="ResuscitationMassageStatus"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return false;
        })(),

        
        DeliveryAttendantType: $('input[name="DeliveryAttendantType"]:checked').val() || null,
        DeliveryAttendantName: $('#DeliveryAttendantName').val() || null,

        
        NeonatalAttendantType: $('input[name="NeonatalAttendantType"]:checked').val() || null,
        NeonatalAttendantName: $('#NeonatalAttendantName').val() || null,

        
        AttendedByDoctor: $('input[name="DeliveryAttendantType"]:checked').val() === 'medico',
        AttendedByNurse: $('input[name="DeliveryAttendantType"]:checked').val() === 'enf',
        AttendedByStudent: $('input[name="DeliveryAttendantType"]:checked').val() === 'estud',
        AttendedByMidwife: $('input[name="DeliveryAttendantType"]:checked').val() === 'obst',
        AttendedByOther: $('input[name="DeliveryAttendantType"]:checked').val() === 'otro',
        AttendantName: $('#DeliveryAttendantName').val() || null,

        
        LowBirthWeight: false,
        HighBirthWeight: false,

        
        BirthDefectsType: $('input[name="BirthDefectsType"]:checked').val() || null,
        BirthDefectsCode: $('#BirthDefectsCode').val() || null,
        
        BirthDefectsNone: $('input[name="BirthDefectsType"]:checked').val() === 'no' ? true : null,
        BirthDefectsMajor: $('input[name="BirthDefectsType"]:checked').val() === 'mayor' ? true : null,
        BirthDefectsMinor: $('input[name="BirthDefectsType"]:checked').val() === 'menor' ? true : null,
        BirthDefectsDescription: null,

        
        DiseasesOption: $('input[name="DiseasesOption"]:checked').val() || null,
        DiseaseCode1: $('#DiseaseCode1').val() || null,
        DiseaseCode2: $('#DiseaseCode2').val() || null,
        DiseaseCode3: $('#DiseaseCode3').val() || null,
        DiseaseCode4: $('#DiseaseCode4').val() || null,
        DiseaseCode5: $('#DiseaseCode5').val() || null,
        DiseaseCode6: $('#DiseaseCode6').val() || null,
        
        DiseasesNone: $('input[name="DiseasesOption"]:checked').val() === 'ninguna' ? true : null,
        DiseasesRDS: null, DiseasesCongenitalInfection: null, DiseasesSyphilis: null,
        DiseasesVIH: null, DiseasesOther: null, DiseasesOtherDescription: null,

        
        
        HIVExposedStatus: $('input[name="HIVExposedStatus"]:checked').val() || null,
        HIVTreatmentStatus: $('input[name="HIVTreatmentStatus"]:checked').val() || null,
        
        VDRLResult: $('input[name="VDRLResult"]:checked').val() || null,
        VDRLTreatment: $('input[name="VDRLTreatment"]:checked').val() || null,
        
        ScreeningAudic: $('input[name="ScreeningAudic"]:checked').val() || null,
        ScreeningChagas: $('input[name="ScreeningChagas"]:checked').val() || null,
        ScreeningBilirrub: $('input[name="ScreeningBilirrub"]:checked').val() || null,
        ScreeningToxoIgM: $('input[name="ScreeningToxoIgM"]:checked').val() || null,
        ScreeningHbPatia: $('input[name="ScreeningHbPatia"]:checked').val() || null,
        ScreeningCardiov: $('input[name="ScreeningCardiov"]:checked').val() || null,
        
        ScreeningMetabolicStatus: $('input[name="ScreeningMetabolicStatus"]:checked').val() || null,
        
        HIVExposed: null, HIVTreatment: null,
        ScreeningVDRL: null, ScreeningHearingTest: null, ScreeningCardiovascular: null,
        ScreeningMetabolic: null, ScreeningMeconiumFirstDay: null, ScreeningBilirubin: null,
        ScreeningToxoplasmosisIgM: null, ScreeningChagasDisease: null, ScreeningHemopathies: null,

        
        MotherDiedInDeliveryRoom: (function() {
            var val = $('input[name="MotherDiedInDeliveryRoom"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        NewbornDiedInDeliveryRoom: (function() {
            var val = $('input[name="NewbornDiedInDeliveryRoom"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),

        
        ReferredTo: $('input[name="ReferredTo"]:checked').val() || null,

        
        DischargeStatus: $('input[name="DischargeStatus"]:checked').val() || null,
        DischargeTime: $('#DischargeTime').val() || null,
        Transferred: $('#Transferred').is(':checked'),
        TransferLocation: $('#TransferLocation').val() || null,
        DiedDuringTransferStatus: $('input[name="DiedDuringTransferStatus"]:checked').val() || null,
        
        DischargeLocation: null,
        IsAlive: $('input[name="DischargeStatus"]:checked').val() === 'vivo',
        Deceased: $('input[name="DischargeStatus"]:checked').val() === 'fallece',
        DiedDuringOrInTransferLocation: $('input[name="DiedDuringTransferStatus"]:checked').val() === 'si',

        
        DischargeAge: $('#DischargeAge').val() ? parseInt($('#DischargeAge').val()) : 0,
        DischargeAgeLessThanOneDay: $('#DischargeAgeLessThanOneDay').is(':checked'),

        
        FeedingAtDischarge: $('input[name="FeedingAtDischarge"]:checked').val() || null,

        
        FaceUp: (function() {
            var val = $('input[name="FaceUp"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        BCGVaccine: (function() {
            var val = $('input[name="BCGVaccine"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        HepatitisB: (function() {
            var val = $('input[name="HepatitisB"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),
        MeconiumFirstDay: (function() {
            var val = $('input[name="MeconiumFirstDay"]:checked').val();
            if (val === 'true') return true;
            if (val === 'false') return false;
            return null;
        })(),

        
        DischargeDate: $('#DischargeDate').val() || null,
        DischargeWeight: $('#DischargeWeight').val() ? parseFloat($('#DischargeWeight').val()) : 0,

        
        NewbornName: null,
        ResponsiblePersonForDischarge: null
    };

    
    const postpartumInformation = {
        Id: parseInt($('#PostpartumInformation_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,
        PostpartumVisits: [], 
        AntiDGlobulin: $('input[name="AntiDGlobulin"]:checked').val() || null,
        NewbornId: $('#postpartumNewbornId').val() || null,
        NewbornName: $('#postpartumNewbornName').val() || null,
        DischargeResponsible: $('#postpartumDischargeResponsible').val() || null
    };

    
    const dayValues = [1, 2, 3, 4, 5, 6, 7, 8];
    const dayLabels = ["1er", "2°", "3er", "4°", "5°", "6°", "7°", "8°"];

    
    $('.postpartum-visit-row').each(function () {
        const row = $(this);
        const id = parseInt(row.data('visit-id')) || 0;

        
        let dayValue = 1;
        const dayText = row.find('td').eq(0).text();
        for (let i = 0; i < dayLabels.length; i++) {
            if (dayText.includes(dayLabels[i]) || dayText.includes((i + 1).toString())) {
                dayValue = i + 1;
                break;
            }
        }

        postpartumInformation.PostpartumVisits.push({
            Id: id,
            PostpartumInformationId: postpartumInformation.Id || 0,
            Day: dayValue,
            Time: row.find('td').eq(1).text() || '',
            Temperature: parseFloat(row.find('td').eq(2).text()) || 0,
            BloodPressure: row.find('td').eq(3).text() || '',
            Pulse: parseInt(row.find('td').eq(4).text()) || 0,
            UterineInvolution: row.find('td').eq(5).text() || '',
            Lochia: row.find('td').eq(6).text() || '',
            Perineum: row.find('td').eq(7).text() || '',
            Breastfeeding: row.find('td').eq(8).text() || '',
            Observations: row.find('td').eq(9).text() || '',
            Bleeding: row.find('td').eq(10).text() || '',
            Responsible: row.find('td').eq(11).text() || ''
        });
    });

    
    let emptyRowIndex = 0;
    $('tr:has(.temperature)').each(function () {
        const row = $(this);

        
        if (!row.hasClass('postpartum-visit-row')) {
            const time = row.find('.time').val() || '';
            const temperature = parseFloat(row.find('.temperature').val()) || 0;
            const bloodPressure = row.find('.blood-pressure').val();
            const pulse = parseInt(row.find('.pulse').val()) || 0;
            const bleeding = row.find('.bleeding').val() || '';

            
            if (time || temperature > 0 || bloodPressure || pulse > 0 || bleeding) {
                
                const existingDays = postpartumInformation.PostpartumVisits.map(v => v.Day);
                let assignedDay = 1;

                
                for (let i = 0; i < dayValues.length; i++) {
                    if (!existingDays.includes(dayValues[i])) {
                        assignedDay = dayValues[i];
                        break;
                    }
                }

                postpartumInformation.PostpartumVisits.push({
                    Id: 0, 
                    PostpartumInformationId: postpartumInformation.Id || 0,
                    Day: assignedDay,
                    Time: time,
                    Temperature: temperature,
                    BloodPressure: bloodPressure,
                    Pulse: pulse,
                    UterineInvolution: row.find('.uterine-involution').val() || '',
                    Lochia: row.find('.lochia').val() || '',
                    Perineum: row.find('.perineum').val() || '',
                    Breastfeeding: row.find('.breastfeeding').val() || '',
                    Observations: row.find('.observations').val() || '',
                    Bleeding: bleeding,
                    Responsible: row.find('.responsible').val() || ''
                });
            }
        }
    });

    console.log('Postpartum visits collected:', postpartumInformation.PostpartumVisits);

    
    const morbidityInformation = {
        Id: parseInt($('#MorbidityInformation_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,

        
        HasHypertensiveDisorders: $('input[name="hypertensiveDisorders"]:checked').val() === 'true',
        HasInfections: $('input[name="infections"]:checked').val() === 'true',
        HasFirstTrimesterHemorrhage: $('input[name="firstTrimesterHemorrhage"]:checked').val() === 'true',
        HasSecondTrimesterHemorrhage: $('input[name="secondTrimesterHemorrhage"]:checked').val() === 'true',
        HasThirdTrimesterHemorrhage: $('input[name="thirdTrimesterHemorrhage"]:checked').val() === 'true',
        HasMetabolicDisorders: $('input[name="metabolicDisorders"]:checked').val() === 'true',
        HasDiabetesMellitus: $('input[name="diabetesMellitus"]:checked').val() === 'true',
        HasThyroidDisorders: $('input[name="thyroidDisorders"]:checked').val() === 'true',
        HasOtherDisorders: $('input[name="otherDisorders"]:checked').val() === 'true',
        HasObstetricComplications: $('input[name="obstetricComplications"]:checked').val() === 'true',

        
        ChronicHypertension: $('#chronicHypertension').is(':checked'),
        MildPreeclampsia: $('#mildPreeclampsia').is(':checked'),
        SeverePreeclampsia: $('#severePreeclampsia').is(':checked'),
        Eclampsia: $('#eclampsia').is(':checked'),
        HELLP: $('#hellp').is(':checked'),
        GestationalHypertension: $('#gestationalHypertension').is(':checked'),
        ChronicHypertensionWithSuperimposedPreeclampsia: $('#chronicHypertensionWithSuperimposedPreeclampsia').is(':checked'),

        
        Sepsis: $('#sepsis').is(':checked'),
        Endometritis: $('#endometritis').is(':checked'),
        Chorioamnionitis: $('#chorioamnionitis').is(':checked'),
        AsymptomaticBacteriuria: $('#asymptomaticBacteriuria').is(':checked'),
        Pyelonephritis: $('#pyelonephritis').is(':checked'),
        Pneumonia: $('#pneumonia').is(':checked'),
        CesareanWoundInfection: $('#cesareanWoundInfection').is(':checked'),
        EpisiotomyInfection: $('#episiotomyInfection').is(':checked'),
        OtherInfection: $('#otherInfection').is(':checked'),

        
        PostAbortionHemorrhage: $('#postAbortionHemorrhage').is(':checked'),
        HydatidiformMole: $('#hydatidiformMole').is(':checked'),
        EctopicPregnancy: $('#ectopicPregnancy').is(':checked'),
        PlacentaPrevia: $('#placentaPrevia').is(':checked'),
        AccretaPlacentaPP: $('#accretaPlacentaPP').is(':checked'),
        AbruptioPlacentae: $('#abruptioPlacentae').is(':checked'),
        SecondTrimesterHemorrhage: $('#secondTrimesterHemorrhage').is(':checked'),
        UterineRupture: $('#uterineRupture').is(':checked'),
        PostpartumHemorrhage: $('#postpartumHemorrhage').is(':checked'),
        UterineAtony: $('#uterineAtony').is(':checked'),
        RetainedPlacenta: $('#retainedPlacentaHemorrhage').is(':checked'),
        PlacentalTears: $('#placentalTears').is(':checked'),
        CoagulationDefect: $('#coagulationDefect').is(':checked'),

        
        GlucoseToleranceTest: $('#glucoseToleranceTest').is(':checked'),
        AbnormalOralGlucoseTolerance: $('#abnormalOralGlucoseTolerance').is(':checked'),
        PreexistingInsulinDependentDM: $('#preexistingInsulinDependentDM').is(':checked'),
        PreexistingNonInsulinDependentDM: $('#preexistingNonInsulinDependentDM').is(':checked'),
        GestationalDiabetes: $('#gestationalDiabetes').is(':checked'),
        HyperosmolarState: $('#hyperosmolarState').is(':checked'),
        HyperglycemicState: $('#hyperglycemicState').is(':checked'),
        Ketoacidosis: $('#ketoacidosis').is(':checked'),

        
        Hypothyroidism: $('#hypothyroidism').is(':checked'),
        Hyperthyroidism: $('#hyperthyroidism').is(':checked'),
        ThyroidCrisis: $('#thyroidCrisis').is(':checked'),
        OtherMetabolicDisorder: $('#otherMetabolicDisorder').is(':checked'),

        
        HyperemesisGravidarum: $('#hyperemesisGravidarum').is(':checked'),
        DeepVeinThrombosis: $('#deepVeinThrombosis').is(':checked'),
        PulmonaryThromboembolism: $('#pulmonaryThromboembolism').is(':checked'),
        AmniocEmbolism: $('#amniocEmbolism').is(':checked'),
        Cardiopathy: $('#cardiopathy').is(':checked'),
        Valvulopathy: $('#valvulopathy').is(':checked'),
        Anemia: $('#anemia').is(':checked'),
        SickleCellAnemia: $('#sickleCellAnemia').is(':checked'),
        RenalDisease: $('#renalDisease').is(':checked'),
        MalignantNeoplasia: $('#malignantNeoplasia').is(':checked'),
        PsychiatricDisorder: $('#psychiatricDisorder').is(':checked'),
        Cholestasis: $('#cholestasis').is(':checked'),
        Convulsions: $('#convulsions').is(':checked'),
        ConsciousnessAlteration: $('#consciousnessAlteration').is(':checked'),
        OtherDisorder: $('#otherDisorder').is(':checked'),

        
        Oliguria: $('#oliguria').is(':checked'),
        ObstructedLabor: $('#obstructedLabor').is(':checked'),
        ProlongedRuptureOfMembranes: $('#prolongedRuptureOfMembranes').is(':checked'),
        Polyhydramnios: $('#polyhydramnios').is(':checked'),
        Oligohydramnios: $('#oligohydramnios').is(':checked'),
        IntrauterineGrowthRestriction: $('#intrauterineGrowthRestriction').is(':checked'),
        AcuteFetalDistress: $('#acuteFetalDistress').is(':checked'),
        OtherObstetricComplication: $('#otherObstetricComplication').is(':checked'),

        
        ManualRemovalOfPlacenta: $('#manualRemovalOfPlacentaInt').is(':checked'),
        UterotronicsForHemorrhage: $('#uterotronicsForHemorrhage').is(':checked'),
        OtherUterotronicsDetail: $('#OtherUterotronicsDetail').val(),
        CentralVenousAccess: $('#centralVenousAccess').is(':checked'),
        BloodProductsTransfusion: $('#bloodProductsTransfusion').is(':checked'),
        BloodProductsDetail: $('#BloodProductsDetail').val(),
        LaparotomyCount: parseInt($('#LaparotomyCount').val()) || 0,
        ICUAdmissionDaysGreaterOrEqualSeven: $('input[name="ICUAdmissionDaysGreaterOrEqualSeven"]:checked').val() === 'true',
        IntravenousAntibioticsForInfection: $('#intravenousAntibioticsForInfection').is(':checked'),
        AntibioticsDetail: $('#AntibioticsDetail').val(),
        NonPneumaticAntiShockGarment: $('#nonPneumaticAntiShockGarment').is(':checked'),
        HydrostaticBalloons: $('#hydrostaticBalloons').is(':checked'),
        BLynchSutures: $('#bLynchSutures').is(':checked'),
        UterineOrHypogastricArteryLigature: $('#uterineOrHypogastricArteryLigature').is(':checked'),
        Embolization: $('#embolization').is(':checked')
    };

    
    const nearMissVariables = {
        Id: parseInt($('#NearMissVariables_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,

        
        Shock: getNullableBoolFromRadio('Shock'),
        CardiacArrest: getNullableBoolFromRadio('CardiacArrest'),
        
        JaundiceInPreeclampsia: getNullableBoolFromRadio('JaundiceInPreeclampsia'),
        
        AcuteCyanosis: getNullableBoolFromRadio('AcuteCyanosis'),
        Gasping: getNullableBoolFromRadio('Gasping'),
        SevereTachypnea: getNullableBoolFromRadio('SevereTachypnea'),
        SevereBradypnea: getNullableBoolFromRadio('SevereBradypnea'),
        
        OliguriaUnresponsiveToFluidsOrDiuretics: getNullableBoolFromRadio('OliguriaUnresponsiveToFluidsOrDiuretics'),
        
        CoagulationDisorders: getNullableBoolFromRadio('CoagulationDisorders'),
        
        Coma: getNullableBoolFromRadio('Coma'),
        ProlongedUnconsciousness: getNullableBoolFromRadio('ProlongedUnconsciousness'),
        StrokeOrCVA: getNullableBoolFromRadio('StrokeOrCVA'),
        UncontrollableSeizuresOrStatusEpilepticus: getNullableBoolFromRadio('UncontrollableSeizuresOrStatusEpilepticus'),
        GeneralizedParalysis: getNullableBoolFromRadio('GeneralizedParalysis'),

        
        PlateletsLessThan50000: getNullableBoolFromRadio('PlateletsLessThan50000'),
        CreatinineGreaterOrEqual300: getNullableBoolFromRadio('CreatinineGreaterOrEqual300'),
        BilirubinGreaterThan100: getNullableBoolFromRadio('BilirubinGreaterThan100'),
        PHLessThan7_1: getNullableBoolFromRadio('PHLessThan7_1'),
        HemoglobinSaturationLessThan90PercentForOverOneHour: getNullableBoolFromRadio('HemoglobinSaturationLessThan90PercentForOverOneHour'),
        PaO2FiO2LessThan200: getNullableBoolFromRadio('PaO2FiO2LessThan200'),
        LactateGreaterThan5: getNullableBoolFromRadio('LactateGreaterThan5'),

        
        ContinuousVasoactiveAgentsAdministration: getNullableBoolFromRadio('ContinuousVasoactiveAgentsAdministration'),
        VasoactiveAgentsDetail: $('#vasoactiveAgentsDetail').val(),
        IntubationAndVentilationNotRelatedToAnesthesia: getNullableBoolFromRadio('IntubationAndVentilationNotRelatedToAnesthesia'),
        IntubationDays: parseInt($('#intubationDays').val()) || 0,
        BloodProductsAdministrationGreaterOrEqualThreeUnits: getNullableBoolFromRadio('BloodProductsAdministrationGreaterOrEqualThreeUnits'),
        BloodUnits: parseInt($('#bloodUnits').val()) || 0,
        ICUAdmissionLessThanSevenDays: getNullableBoolFromRadio('ICUAdmissionLessThanSevenDays'),
        ICUDaysLessThanSeven: parseInt($('#icuDays').val()) || 0,
        Hysterectomy: getNullableBoolFromRadio('Hysterectomy'),
        DialysisForAcuteRenalFailure: getNullableBoolFromRadio('DialysisForAcuteRenalFailure'),
        CardiopulmonaryResuscitation: getNullableBoolFromRadio('CardiopulmonaryResuscitation')
    };

    
    const puerperiumDays = [];
    $('.puerperium-day-row').each(function() {
        const row = $(this);
        const dayNumber = parseInt(row.data('day-number')) || 0;
        puerperiumDays.push({
            Id: parseInt(row.find('input[name$=".Id"]').val()) || 0,
            DayNumber: dayNumber,
            DayLabel: row.find('input[name$=".DayLabel"]').val() || '',
            Temperature: parseFloat(row.find('input[id^="puerperiumTemp_"]').val()) || null,
            BloodPressure: row.find('input[id^="puerperiumBP_"]').val() || '',
            Pulse: parseInt(row.find('input[id^="puerperiumPulse_"]').val()) || null,
            UterineInvolution: row.find('input[id^="puerperiumInvol_"]').val() || '',
            Lochia: row.find('input[id^="puerperiumLochia_"]').val() || '',
            Perineum: row.find('input[id^="puerperiumPerineum_"]').val() || '',
            Breastfeeding: row.find('input[id^="puerperiumBreastfeeding_"]').val() || '',
            Observations: row.find('input[id^="puerperiumObs_"]').val() || '',
            Responsible: row.find('input[id^="puerperiumResp_"]').val() || ''
        });
    });

    const puerperiumInformation = {
        Id: parseInt($('#PuerperiumInformation_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,
        Days: puerperiumDays
    };

    
    const contraceptionInformation = {
        Id: parseInt($('#ContraceptionInformation_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,

        OralCounseling: $('#oralCounseling').is(':checked'),
        WrittenCounseling: $('#writtenCounseling').is(':checked'),
        NoCounseling: $('#noCounseling').is(':checked'),

        ContraceptionMethodInitiated: $('input[name="ContraceptionMethodInitiated"]:checked').val() === 'true',

        
        OralContraceptivesPreferred: $('#oralContraceptivesPreferred').is(':checked'),
        OralContraceptivesAccepted: $('#oralContraceptivesAccepted').is(':checked'),

        OtherHormonalMethodsPreferred: $('#otherHormonalMethodsPreferred').is(':checked'),
        OtherHormonalMethodsAccepted: $('#otherHormonalMethodsAccepted').is(':checked'),

        IUDPreferred: $('#iudPreferred').is(':checked'),
        IUDAccepted: $('#iudAccepted').is(':checked'),

        InjectablePreferred: $('#injectablePreferred').is(':checked'),
        InjectableAccepted: $('#injectableAccepted').is(':checked'),

        ImplantPreferred: $('#implantPreferred').is(':checked'),
        ImplantAccepted: $('#implantAccepted').is(':checked'),

        BarrierPreferred: $('#barrierPreferred').is(':checked'),
        BarrierAccepted: $('#barrierAccepted').is(':checked'),

        CondomPreferred: $('#condomPreferred').is(':checked'),
        CondomAccepted: $('#condomAccepted').is(':checked'),

        FemaleSterilizationPreferred: $('#femaleSterilizationPreferred').is(':checked'),
        FemaleSterilizationAccepted: $('#femaleSterilizationAccepted').is(':checked'),

        MaleSterilizationPreferred: $('#maleSterilizationPreferred').is(':checked'),
        MaleSterilizationAccepted: $('#maleSterilizationAccepted').is(':checked'),

        NaturalMethodPreferred: $('#naturalMethodPreferred').is(':checked'),
        NaturalMethodAccepted: $('#naturalMethodAccepted').is(':checked'),

        ResponsiblePerson: $('#ResponsiblePerson').val()
    };

    
    const maternalDischargeInformation = {
        Id: parseInt($('#MaternalDischargeInformation_Id').val()) || 0,
        PerinatalHistoryRecordId: recordId,

        DischargeDate: $('#MaternalDischargeInformation_DischargeDate').val(),
        DischargeTime: $('#MaternalDischargeInformation_DischargeTime').val(),
        DischargeCondition: $('input[name="DischargeCondition"]:checked').val(),
        DischargeLocation: $('#MaternalDischargeInformation_DischargeLocation').val(),
        Transferred: getNullableBoolFromRadio('Transferred'),
        DiedDuringOrInTransferLocation: getNullableBoolFromRadio('DiedDuringOrInTransferLocation'),
        Autopsy: getNullableBoolFromRadio('Autopsy'),

        DischargeType: $('input[name="DischargeType"]:checked').val(),
        ResponsiblePerson: $('#MaternalDischargeInformation_ResponsiblePerson').val(),

        AntiDImmunoglobulin: $('input[name="AntiDImmunoglobulin"]:checked').val() === 'true'
    };

    
    const modelInfo = {
        Id: recordId,
        PatientId: patientId,
        PrenatalControlPlace: basicInfo.PrenatalControlPlace,
        BirthPlace: basicInfo.BirthPlace,
        CreatedDate: basicInfo.CreatedDate,
        LastModifiedDate: basicInfo.LastModifiedDate,
        MedicalBackground: medicalBackground,
        ObstetricBackground: obstetricBackground,
        CurrentPregnancy: currentPregnancy,
        PrenatalConsultations: prenatalConsultations,
        LaborEntries: laborEntries,
        BirthInformation: birthInformation,
        NewbornInformation: newbornInformation,
        PostpartumInformation: postpartumInformation,
        MorbidityInformation: morbidityInformation,
        NearMissVariables: nearMissVariables,
        PuerperiumInformation: puerperiumInformation,
        ContraceptionInformation: contraceptionInformation,
        MaternalDischargeInformation: maternalDischargeInformation
    };

        console.log('collectFormData returning:', modelInfo);
        return modelInfo;
    } catch (error) {
        console.error('Error in collectFormData:', error);
        return null;
    }
}

 
function formatDateForInput(dateString) {
    if (!dateString) return '';
    try {
        
        let date;
        if (dateString.includes('/')) {
            
            const parts = dateString.split('/');
            date = new Date(parts[2], parts[1] - 1, parts[0]);
        } else {
            date = new Date(dateString);
        }

        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (e) {
        return '';
    }
}
function makeConsultationsEditable() {
    
    $('.consultation-row').each(function () {
        const row = $(this);
        row.find('td').each(function (index) {
            const cell = $(this);
            const content = cell.text().trim();

            
            if (index === 0 || index === 12) { 
                cell.html(`<input type="date" class="form-control form-control-sm" value="${formatDateForInput(content)}" />`);
            } else if (index === 7) { 
                const isYes = content.toLowerCase() === 'si';
                cell.html(`
                    <select class="form-control form-control-sm">
                        <option value="">-</option>
                        <option value="true" ${isYes ? 'selected' : ''}>Si</option>
                        <option value="false" ${!isYes && content !== '' ? 'selected' : ''}>No</option>
                    </select>
                `);
            } else if (index === 9) { 
                const isPositive = content === '+';
                const isNegative = content === '-';
                cell.html(`
                    <select class="form-control form-control-sm">
                        <option value="" ${!isPositive && !isNegative ? 'selected' : ''}>--</option>
                        <option value="true" ${isPositive ? 'selected' : ''}>+</option>
                        <option value="false" ${isNegative ? 'selected' : ''}>-</option>
                    </select>
                `);
            } else if (index === 1 || index === 2 || index === 4 || index === 6) { 
                cell.html(`<input type="number" class="form-control form-control-sm no-spinners" value="${content}" step="${index === 2 || index === 4 ? '0.1' : '1'}" />`);
            } else { 
                cell.html(`<input type="text" class="form-control form-control-sm" value="${content}" />`);
            }
        });
    });
}

function makePostpartumVisitsEditable() {
    $('.postpartum-visit-row').each(function () {
        const row = $(this);
        row.find('td').each(function (index) {
            const cell = $(this);
            const content = cell.text().trim();

            
            if (index > 0) {
                if (index === 1) { 
                    cell.html(`<input type="number" step="0.1" class="form-control form-control-sm temperature" value="${content}" placeholder="°C" />`);
                } else if (index === 2) { 
                    cell.html(`<input type="text" class="form-control form-control-sm blood-pressure" value="${content}" placeholder="###/##" />`);
                } else if (index === 3) { 
                    cell.html(`<input type="number" class="form-control form-control-sm pulse" value="${content}" min="40" max="200" />`);
                } else if (index === 4) { 
                    cell.html(`
                        <select class="form-control form-control-sm uterine-involution">
                            <option value="">-</option>
                            <option value="normal" ${content === 'normal' ? 'selected' : ''}>Normal</option>
                            <option value="anormal" ${content === 'anormal' ? 'selected' : ''}>Anormal</option>
                        </select>
                    `);
                } else if (index === 5) { 
                    cell.html(`
                        <select class="form-control form-control-sm lochia">
                            <option value="">-</option>
                            <option value="normal" ${content === 'normal' ? 'selected' : ''}>Normal</option>
                            <option value="anormal" ${content === 'anormal' ? 'selected' : ''}>Anormal</option>
                        </select>
                    `);
                } else if (index === 6) { 
                    cell.html(`
                        <select class="form-control form-control-sm perineum">
                            <option value="">-</option>
                            <option value="normal" ${content === 'normal' ? 'selected' : ''}>Normal</option>
                            <option value="con edema" ${content === 'con edema' ? 'selected' : ''}>Con edema</option>
                            <option value="con hematoma" ${content === 'con hematoma' ? 'selected' : ''}>Con hematoma</option>
                            <option value="con infección" ${content === 'con infección' ? 'selected' : ''}>Con infección</option>
                        </select>
                    `);
                } else if (index === 7) { 
                    cell.html(`
                        <select class="form-control form-control-sm breastfeeding">
                            <option value="">-</option>
                            <option value="exclusiva" ${content === 'exclusiva' ? 'selected' : ''}>Exclusiva</option>
                            <option value="parcial" ${content === 'parcial' ? 'selected' : ''}>Parcial</option>
                            <option value="no" ${content === 'no' ? 'selected' : ''}>No</option>
                        </select>
                    `);
                } else if (index === 8) { 
                    cell.html(`<input type="text" class="form-control form-control-sm observations" value="${content}" />`);
                } else if (index === 9) { 
                    cell.html(`<input type="text" class="form-control form-control-sm responsible" value="${content}" />`);
                }
            }
        });
    });
}
function deleteRecord(id) {
    Swal.fire({
        title: '¿Está seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/PerinatalHistories/DeleteConfirmed',
                type: 'POST',
                data: {
                    id: id,
                    __RequestVerificationToken: $('input[name="__RequestVerificationToken"]').val()
                },
                success: function (response) {
                    Swal.fire(
                        'Eliminado',
                        'El registro ha sido eliminado.',
                        'success'
                    ).then(() => {
                        window.location.reload();
                    });
                },
                error: function (xhr, status, error) {
                    Swal.fire(
                        'Error',
                        'No se pudo eliminar el registro.',
                        'error'
                    );
                }
            });
        }
    });
}

$(document).ready(function () {


    
    formatDateInputs();

    
    $('#BirthWeight').on('input change', function() {
        var weight = parseFloat($(this).val());
        var lowRadio = $('#weightLow');
        var highRadio = $('#weightHigh');

        
        lowRadio.prop('checked', false);
        highRadio.prop('checked', false);

        if (!isNaN(weight) && weight > 0) {
            if (weight < 2500) {
                lowRadio.prop('checked', true);
            } else if (weight >= 4000) {
                highRadio.prop('checked', true);
            }
        }
    });

    
    if ($('#BirthWeight').val()) {
        $('#BirthWeight').trigger('change');
    }

    
    $('#LastMenstrualPeriod').change(function () {
        const lmpDate = $(this).val();
        if (lmpDate) {
            const edd = calculateEstimatedDueDate(lmpDate);
            if (edd) {
                const eddFormatted = edd.toISOString().split('T')[0];
                $('#EstimatedDueDate').val(eddFormatted);
            }
        }
    });

    
    function calculateGestationalWeeks(fumDate, vaccineDate) {
        if (!fumDate || !vaccineDate) return null;

        const fum = new Date(fumDate);
        const vaccine = new Date(vaccineDate);

        
        const diffTime = vaccine - fum;
        
        const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

        return diffWeeks >= 0 ? diffWeeks : null;
    }

    
    const vaccineFields = [
        { date: 'VaccineTetanusDiphtheriaDate', weeks: 'VaccineTetanusDiphtheriaGestationalWeeks' },
        { date: 'VaccineTdapDate', weeks: 'VaccineTdapGestationalWeeks' },
        { date: 'VaccineInfluenzaDate', weeks: 'VaccineInfluenzaGestationalWeeks' },
        { date: 'VaccineRubellaDate', weeks: 'VaccineRubellaGestationalWeeks' },
        { date: 'VaccineHepatitisBDate', weeks: 'VaccineHepatitisBGestationalWeeks' },
        { date: 'VaccineHepatitisADate', weeks: 'VaccineHepatitisAGestationalWeeks' }
    ];

    vaccineFields.forEach(function(vaccine) {
        $(`input[name="${vaccine.date}"]`).change(function () {
            const vaccineDate = $(this).val();
            const fumDate = $('input[asp-for="LastMenstrualPeriod"], input[name="LastMenstrualPeriod"]').val();

            if (vaccineDate && fumDate) {
                const weeks = calculateGestationalWeeks(fumDate, vaccineDate);
                if (weeks !== null) {
                    $(`input[name="${vaccine.weeks}"]`).val(weeks);
                }
            }
        });
    });

    
    $('#BirthDate').change(function () {
        const birthDate = $(this).val();
        if (birthDate) {
            const dob = new Date(birthDate);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            $('#Age').val(age);
        }
    });

    
    $('.bool-radio').change(function () {
        const name = $(this).attr('name');
        const val = $(this).val();
        $(`input[name="${name}"][value="${val}"]`).prop('checked', true);
    });

    
    $('.conditional-trigger').change(function () {
        const targetId = $(this).data('target');
        const showOnValue = $(this).data('show-on-value');
        const currentValue = $(this).is(':checkbox') ? $(this).is(':checked').toString() : $(this).val();

        if (currentValue === showOnValue) {
            $(`#${targetId}`).show();
        } else {
            $(`#${targetId}`).hide();
        }
    });

    
    $('.conditional-trigger').trigger('change');

    
    $('#btnSave').click(function (e) {
        e.preventDefault();
        saveRecord();
    });

    
    $(document).on('click', '.nullable-radio', function () {
        var radio = $(this);
        if (radio.data('was-checked') === true) {
            radio.prop('checked', false);
            radio.data('was-checked', false);
        } else {
            
            $('input[name="' + radio.attr('name') + '"]').data('was-checked', false);
            radio.data('was-checked', true);
        }
    });

    
    $(document).on('mousedown', '.nullable-radio', function () {
        var radio = $(this);
        radio.data('was-checked', radio.is(':checked'));
    });

    
    makeConsultationsEditable();
    makePostpartumVisitsEditable();
});