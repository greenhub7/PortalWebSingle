


var perinatalData = null;


$(document).ready(function() {
    console.log('Perinatal Print: Inicializando...');

    var recordId = $('#recordId').val();

    if (!recordId) {
        showError('No se encontro el ID del registro');
        return;
    }

    
    loadPerinatalData(recordId);
});


function loadPerinatalData(recordId) {
    console.log('Perinatal Print: Cargando datos para registro:', recordId);

    $('body').addClass('loading');

    $.ajax({
        url: '/PerinatalHistories/GetPrintData/' + recordId,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log('Perinatal Print: Datos recibidos', data);
            perinatalData = data;

            
            fillAllSections(data);

            $('body').removeClass('loading');
        },
        error: function(xhr, status, error) {
            console.error('Perinatal Print: Error cargando datos', error);
            showError('Error al cargar los datos: ' + error);
            $('body').removeClass('loading');
        }
    });
}


function fillAllSections(data) {
    console.log('Perinatal Print: Llenando secciones...');

    
    fillIdentificacion(data);
    fillAntecedentes(data);
    fillGestacionActual(data);
    fillConsultasAntenatales(data);
    fillPartoAborto(data);
    fillRecienNacido(data);
    fillPostparto(data);

    
    fillMorbilidad(data);
    fillNearMiss(data);
    fillPuerperio(data);
    fillEgresoMaterno(data);
    fillAnticoncepcion(data);

    console.log('Perinatal Print: Llenado completo');
}




function fillIdentificacion(data) {
    var patient = data.patient || {};
    var person = patient.person || {};

    setText('#hc-numero', data.id);
    setText('#hc-numero-p2', data.id);

    
    var nombreCompleto = [person.firstName, person.lastName].filter(Boolean).join(' ');
    setText('#id-nombre', nombreCompleto);

    
    if (person.bornDate) {
        var edad = calcularEdad(person.bornDate);
        setText('#id-edad', edad + ' años');
    }

    
    setText('#id-estado-civil', person.maritalSituation?.name || '');
    setText('#id-estudios', person.schoolLevel?.name || '');
    setText('#id-lugar-nacimiento', person.country?.name || '');
    setText('#id-domicilio', person.address || '');
    setText('#id-telefono', person.cel || person.tel || '');
}




function fillAntecedentes(data) {
    var med = data.medicalBackground || {};
    var obs = data.obstetricBackground || {};

    
    setCheckbox('#ant-fam-tbc', med.familyTuberculosis);
    setCheckbox('#ant-fam-diabetes', med.familyDiabetes);
    setCheckbox('#ant-fam-hipertension', med.familyHypertension);
    setCheckbox('#ant-fam-preeclampsia', med.familyPreeclampsia);
    setCheckbox('#ant-fam-eclampsia', med.familyEclampsia);
    setCheckbox('#ant-fam-otra', med.familyOther);

    
    setCheckbox('#ant-per-tbc', med.personalTuberculosis);
    setCheckbox('#ant-per-diabetes', med.personalDiabetes);
    setCheckbox('#ant-per-hipertension', med.personalHypertension);
    setCheckbox('#ant-per-preeclampsia', med.personalPreeclampsia);
    setCheckbox('#ant-per-eclampsia', med.personalEclampsia);
    setCheckbox('#ant-per-cirugia', med.personalGenitourinarySurgery);
    setCheckbox('#ant-per-infertilidad', med.personalInfertility);
    setCheckbox('#ant-per-cardiopatia', med.personalHeartDisease);
    setCheckbox('#ant-per-nefropatia', med.personalKidneyDisease);
    setCheckbox('#ant-per-violencia', med.personalViolence);
    setCheckbox('#ant-per-vih', med.personalHIV);

    
    setText('#ant-obs-gestas', obs.previousPregnancies);
    setText('#ant-obs-partos', obs.totalDeliveries);
    setText('#ant-obs-vaginales', obs.vaginalDeliveries);
    setText('#ant-obs-cesareas', obs.cesareanDeliveries);
    setText('#ant-obs-abortos', obs.abortions);
    setText('#ant-obs-viven', obs.livingChildren);
    setText('#ant-obs-muertos-1sem', obs.deadFirstWeek);
    setText('#ant-obs-muertos-desp', obs.deadAfterFirstWeek);
    setText('#ant-obs-fin-anterior', formatDate(obs.lastPregnancyEndDate));
    setCheckbox('#ant-obs-gemelares', obs.twins);
    setCheckbox('#ant-obs-3abortos', obs.threeOrMoreAbortions);
}




function fillGestacionActual(data) {
    var preg = data.currentPregnancy || {};

    setText('#gest-peso-anterior', preg.prePregnancyWeight);
    setText('#gest-talla', preg.height);
    setText('#gest-fum', formatDate(preg.lastMenstrualPeriod));
    setText('#gest-fpp', formatDate(preg.estimatedDueDate));
    setText('#gest-eg-confiable', formatYesNoNC(preg.reliableGestationalAge));

    
    setText('#gest-fumadora', formatYesNoNC(preg.smoker));
    setText('#gest-drogas', formatYesNoNC(preg.drugs));
    setText('#gest-alcohol', formatYesNoNC(preg.alcohol));

    
    setText('#gest-antitetanica', preg.tetanusVaccine || '');
    setText('#gest-ex-odonto', formatYesNoNC(preg.dentalExam));
    setText('#gest-ex-mamas', formatYesNoNC(preg.breastExam));

    
    setText('#gest-grupo', preg.bloodGroup);
    setText('#gest-rh', preg.rhFactor);
    setText('#gest-sensibilizada', formatYesNoNC(preg.rhSensitized));

    
    setText('#gest-toxoplasma', formatLabResult(preg.toxoplasmosis));
    setText('#gest-vih', formatLabResult(preg.hiv));
    setText('#gest-hb1', preg.hemoglobin1);
    setText('#gest-hb2', preg.hemoglobin2);
    setText('#gest-vdrl1', formatLabResult(preg.vdrl1));
    setText('#gest-vdrl2', formatLabResult(preg.vdrl2));
    setText('#gest-chagas', formatLabResult(preg.chagas));
    setText('#gest-paludismo', formatLabResult(preg.malaria));
    setText('#gest-bacteriuria', formatLabResult(preg.bacteriuria));
    setText('#gest-glucemia', preg.glycemia);
    setText('#gest-estreptococo', formatLabResult(preg.streptococcusB));
    setText('#gest-pap', formatYesNoNC(preg.papSmear));
    setText('#gest-colposcopia', formatYesNoNC(preg.colposcopy));
    setText('#gest-fe-folatos', formatYesNoNC(preg.ironFolicAcid));
}




function fillConsultasAntenatales(data) {
    var consultations = data.prenatalConsultations || [];
    var tbody = $('#consultas-tbody');
    tbody.empty();

    consultations.forEach(function(c) {
        var row = $('<tr>');
        row.append($('<td>').text(formatDate(c.date)));
        row.append($('<td>').text(c.gestationalAge || ''));
        row.append($('<td>').text(c.weight || ''));
        row.append($('<td>').text(c.bloodPressure || ''));
        row.append($('<td>').text(c.uterineHeight || ''));
        row.append($('<td>').text(c.presentation || ''));
        row.append($('<td>').text(c.fetalHeartRate || ''));
        row.append($('<td>').text(c.fetalMovements ? 'Si' : 'No'));
        row.append($('<td>').text(c.proteinuria || ''));
        row.append($('<td>').text(c.warningSign ? 'Si' : ''));
        row.append($('<td>').text(c.initials || ''));
        tbody.append(row);
    });

    
    var emptyRows = 8 - consultations.length;
    for (var i = 0; i < emptyRows && i < 8; i++) {
        var emptyRow = $('<tr>');
        for (var j = 0; j < 11; j++) {
            emptyRow.append($('<td>').html('&nbsp;'));
        }
        tbody.append(emptyRow);
    }

    setText('#consultas-total', consultations.length);
}




function fillPartoAborto(data) {
    var birth = data.birthInformation || {};

    setText('#parto-fecha-ingreso', formatDate(birth.admissionDate));
    setText('#parto-fecha', formatDate(birth.birthDate));
    setText('#parto-hora', birth.birthTime || '');

    
    var eg = '';
    if (birth.gestationalAgeAtBirthWeeks) {
        eg = birth.gestationalAgeAtBirthWeeks + ' sem';
        if (birth.gestationalAgeAtBirthDays) {
            eg += ' ' + birth.gestationalAgeAtBirthDays + ' d';
        }
    }
    setText('#parto-eg', eg);

    
    var inicio = [];
    if (birth.spontaneousOnset) inicio.push('Espontaneo');
    if (birth.inducedOnset) inicio.push('Inducido');
    setText('#parto-inicio', inicio.join(', ') || '');

    setText('#parto-rotura', birth.membraneRupture || '');

    
    var presentacion = [];
    if (birth.cephalicPresentation) presentacion.push('Cefalica');
    if (birth.pelvicPresentation) presentacion.push('Pelvica');
    if (birth.transverseSituation) presentacion.push('Transversa');
    setText('#parto-presentacion', presentacion.join(', ') || '');

    setText('#parto-posicion', birth.positionVariety || '');

    
    var terminacion = [];
    if (birth.spontaneousBirth) terminacion.push('Espontaneo');
    if (birth.forcepsBirth) terminacion.push('Forceps');
    if (birth.vacuumBirth) terminacion.push('Vacuum');
    if (birth.cesareanBirth) terminacion.push('Cesarea');
    setText('#parto-terminacion', terminacion.join(', ') || '');

    setText('#parto-indicacion', birth.indication || '');
    setText('#parto-acompanante', formatBool(birth.companion));
    setText('#parto-episiotomia', formatBool(birth.episiotomy));

    
    var desgarros = birth.tear ? ('Grado ' + (birth.tearGrade || '')) : 'No';
    setText('#parto-desgarros', desgarros);

    setText('#parto-placenta', birth.manualRemovalOfPlacenta ? 'Manual' : 'Espontanea');
    setText('#parto-ligadura', birth.cordClampingTime || '');
    setText('#parto-oxitocicos', formatBool(birth.oxytocicsInLabor));
}




function fillRecienNacido(data) {
    var nb = data.newbornInformation || {};

    setText('#rn-sexo', nb.sex || '');
    setText('#rn-peso', nb.birthWeight ? nb.birthWeight + ' g' : '');
    setText('#rn-longitud', nb.length ? nb.length + ' cm' : '');
    setText('#rn-pc', nb.headCircumference ? nb.headCircumference + ' cm' : '');

    
    var egRN = '';
    if (nb.gestationalAgeWeeks) {
        egRN = nb.gestationalAgeWeeks + ' sem';
        if (nb.gestationalAgeDays) {
            egRN += ' ' + nb.gestationalAgeDays + ' d';
        }
        if (nb.gestationalAgeMethod) {
            egRN += ' (' + nb.gestationalAgeMethod + ')';
        }
    }
    setText('#rn-eg', egRN);

    setText('#rn-peg', nb.weightForGestationalAge || '');
    setText('#rn-apgar1', nb.apgarFirstMinute !== null ? nb.apgarFirstMinute : '');
    setText('#rn-apgar5', nb.apgarFifthMinute !== null ? nb.apgarFifthMinute : '');

    
    var reanimacion = [];
    if (nb.resuscitationStimulation) reanimacion.push('Estimulacion');
    if (nb.resuscitationAspiration) reanimacion.push('Aspiracion');
    if (nb.resuscitationMask) reanimacion.push('Mascara');
    if (nb.resuscitationOxygen) reanimacion.push('Oxigeno');
    if (nb.resuscitationIntubation) reanimacion.push('Intubacion');
    if (nb.resuscitationMassage) reanimacion.push('Masaje');
    if (nb.resuscitationMedication) reanimacion.push('Medicacion');
    setText('#rn-reanimacion', reanimacion.length > 0 ? reanimacion.join(', ') : 'Ninguna');

    
    var defectos = nb.birthDefectsType || 'N/A';
    if (nb.birthDefectsCode) {
        defectos += ' (CIE: ' + nb.birthDefectsCode + ')';
    }
    setText('#rn-defectos', defectos);

    setText('#rn-lactancia', nb.earlyBreastfeedingInitiation ? 'Si' : 'No');
}




function fillPostparto(data) {
    var pp = data.postpartumInformation || {};
    setText('#pp-antid', pp.antiDGlobulin || 'N/C');
}




function fillMorbilidad(data) {
    var morb = data.morbidityInformation || {};
    var content = $('#morbilidad-content');
    content.empty();

    var items = [];

    
    if (morb.chronicHypertension) items.push('HTA cronica');
    if (morb.gestationalHypertension) items.push('HTA gestacional');
    if (morb.mildPreeclampsia) items.push('Preeclampsia leve');
    if (morb.severePreeclampsia) items.push('Preeclampsia severa');
    if (morb.eclampsia) items.push('Eclampsia');
    if (morb.hellp) items.push('HELLP');

    
    if (morb.sepsis) items.push('Sepsis');
    if (morb.pyelonephritis) items.push('Pielonefritis');

    
    if (morb.gestationalDiabetes) items.push('Diabetes gestacional');
    if (morb.anemia) items.push('Anemia');

    
    if (morb.polyhydramnios) items.push('Polihidramnios');
    if (morb.oligohydramnios) items.push('Oligohidramnios');
    if (morb.intrauterineGrowthRestriction) items.push('RCIU');
    if (morb.prolongedRuptureOfMembranes) items.push('RPM prolongada');
    if (morb.postpartumHemorrhage) items.push('Hemorragia postparto');

    if (items.length === 0) {
        content.html('<div class="field-row"><span class="label">Sin morbilidad registrada</span></div>');
    } else {
        var html = '<div class="checkbox-grid">';
        items.forEach(function(item) {
            html += '<div class="checkbox-item"><span class="checkbox checked"></span><span class="label">' + item + '</span></div>';
        });
        html += '</div>';
        content.html(html);
    }
}




function fillNearMiss(data) {
    var nm = data.nearMissVariables || {};
    var content = $('#nearmiss-content');
    content.empty();

    var items = [];

    
    if (nm.shock) items.push('Shock');
    if (nm.cardiacArrest) items.push('Paro cardiaco');
    if (nm.jaundiceInPreeclampsia) items.push('Ictericia en preeclampsia');
    if (nm.acuteCyanosis) items.push('Cianosis aguda');
    if (nm.gasping) items.push('Gasping');
    if (nm.severeTachypnea) items.push('Taquipnea severa');
    if (nm.severeBradypnea) items.push('Bradipnea severa');
    if (nm.oliguriaUnresponsiveToFluidsOrDiuretics) items.push('Oliguria');
    if (nm.coagulationDisorders) items.push('Coagulopatia');
    if (nm.coma) items.push('Coma');
    if (nm.prolongedUnconsciousness) items.push('Inconsciencia prolongada');
    if (nm.strokeOrCVA) items.push('ACV');
    if (nm.uncontrollableSeizuresOrStatusEpilepticus) items.push('Convulsiones');
    if (nm.generalizedParalysis) items.push('Paralisis');

    
    if (nm.plateletsLessThan50000) items.push('Plaquetas <50000');
    if (nm.creatinineGreaterOrEqual300) items.push('Creatinina >=300');
    if (nm.bilirubinGreaterThan100) items.push('Bilirrubina >100');
    if (nm.pHLessThan7_1) items.push('pH <7.1');
    if (nm.hemoglobinSaturationLessThan90PercentForOverOneHour) items.push('SatO2 <90%');
    if (nm.lactateGreaterThan5) items.push('Lactato >5');

    
    if (nm.continuousVasoactiveAgentsAdministration) items.push('Vasoactivos');
    if (nm.intubationAndVentilationNotRelatedToAnesthesia) items.push('Intubacion');
    if (nm.bloodProductsAdministrationGreaterOrEqualThreeUnits) items.push('Transfusion >=3U');
    if (nm.iCUAdmissionLessThanSevenDays) items.push('UCI');
    if (nm.hysterectomy) items.push('Histerectomia');
    if (nm.dialysisForAcuteRenalFailure) items.push('Dialisis');
    if (nm.cardiopulmonaryResuscitation) items.push('RCP');

    if (items.length === 0) {
        content.html('<div class="field-row"><span class="label">Sin criterios Near Miss</span></div>');
    } else {
        var html = '<div class="checkbox-grid">';
        items.forEach(function(item) {
            html += '<div class="checkbox-item"><span class="checkbox checked"></span><span class="label">' + item + '</span></div>';
        });
        html += '</div>';
        content.html(html);
    }
}




function fillPuerperio(data) {
    var puerp = data.puerperiumInformation || {};
    var days = puerp.days || [];
    var tbody = $('#puerperio-tbody');
    tbody.empty();

    days.forEach(function(d) {
        var row = $('<tr>');
        row.append($('<td>').text(d.dayLabel || d.dayNumber));
        row.append($('<td>').text(d.temperature || ''));
        row.append($('<td>').text(d.bloodPressure || ''));
        row.append($('<td>').text(d.pulse || ''));
        row.append($('<td>').text(d.uterineInvolution || ''));
        row.append($('<td>').text(d.lochia || ''));
        row.append($('<td>').text(d.breastfeeding || ''));
        row.append($('<td>').text(d.responsible || ''));
        tbody.append(row);
    });

    
    var emptyRows = 4 - days.length;
    for (var i = 0; i < emptyRows && i < 4; i++) {
        var emptyRow = $('<tr>');
        for (var j = 0; j < 8; j++) {
            emptyRow.append($('<td>').html('&nbsp;'));
        }
        tbody.append(emptyRow);
    }
}




function fillEgresoMaterno(data) {
    var egr = data.maternalDischargeInformation || {};

    setText('#egr-fecha', formatDate(egr.dischargeDate));
    setText('#egr-hora', egr.dischargeTime);
    setText('#egr-condicion', egr.dischargeCondition);
    setText('#egr-tipo', egr.dischargeType);
    setText('#egr-traslado', formatBool(egr.transferred));
    setText('#egr-lugar', egr.dischargeLocation);
    setText('#egr-fallece-traslado', formatBool(egr.diedDuringOrInTransferLocation));
    setText('#egr-autopsia', formatBool(egr.autopsy));
    setText('#egr-responsable', egr.responsiblePerson);
}




function fillAnticoncepcion(data) {
    var antic = data.contraceptionInformation || {};

    
    var consejeria = [];
    if (antic.oralCounseling) consejeria.push('Oral');
    if (antic.writtenCounseling) consejeria.push('Escrita');
    if (antic.noCounseling) consejeria.push('Ninguna');
    setText('#antic-consejeria', consejeria.join(', ') || 'N/A');

    setText('#antic-iniciado', antic.contraceptionMethodInitiated ? 'Si' : 'No');

    
    var preferido = [];
    if (antic.oralContraceptivesPreferred) preferido.push('ACO');
    if (antic.otherHormonalMethodsPreferred) preferido.push('Otro hormonal');
    if (antic.iUDPreferred) preferido.push('DIU');
    if (antic.injectablePreferred) preferido.push('Inyectable');
    if (antic.implantPreferred) preferido.push('Implante');
    if (antic.barrierPreferred) preferido.push('Barrera');
    if (antic.condomPreferred) preferido.push('Condon');
    if (antic.femaleSterilizationPreferred) preferido.push('EQV fem');
    if (antic.maleSterilizationPreferred) preferido.push('EQV masc');
    if (antic.naturalMethodPreferred) preferido.push('Natural');
    setText('#antic-preferido', preferido.join(', ') || 'Ninguno');

    
    var aceptado = [];
    if (antic.oralContraceptivesAccepted) aceptado.push('ACO');
    if (antic.otherHormonalMethodsAccepted) aceptado.push('Otro hormonal');
    if (antic.iUDAccepted) aceptado.push('DIU');
    if (antic.injectableAccepted) aceptado.push('Inyectable');
    if (antic.implantAccepted) aceptado.push('Implante');
    if (antic.barrierAccepted) aceptado.push('Barrera');
    if (antic.condomAccepted) aceptado.push('Condon');
    if (antic.femaleSterilizationAccepted) aceptado.push('EQV fem');
    if (antic.maleSterilizationAccepted) aceptado.push('EQV masc');
    if (antic.naturalMethodAccepted) aceptado.push('Natural');
    setText('#antic-aceptado', aceptado.join(', ') || 'Ninguno');

    setText('#antic-responsable', antic.responsiblePerson);
}






function setText(selector, value) {
    $(selector).text(value !== null && value !== undefined ? value : '');
}


function setCheckbox(selector, value) {
    if (value === true) {
        $(selector).addClass('checked');
    } else {
        $(selector).removeClass('checked');
    }
}


function formatDate(dateString) {
    if (!dateString) return '';
    try {
        var date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        var day = String(date.getDate()).padStart(2, '0');
        var month = String(date.getMonth() + 1).padStart(2, '0');
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
    } catch (e) {
        return '';
    }
}


function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return '';
    var birth = new Date(fechaNacimiento);
    var today = new Date();
    var age = today.getFullYear() - birth.getFullYear();
    var m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}


function formatYesNoNC(value) {
    if (value === true || value === 'Yes' || value === 1) return 'Si';
    if (value === false || value === 'No' || value === 0) return 'No';
    if (value === 'NotRecorded' || value === 2) return 'N/C';
    return '';
}


function formatLabResult(value) {
    if (value === 'Positive' || value === true) return '+';
    if (value === 'Negative' || value === false) return '-';
    if (value === 'NotDone' || value === 'NotRecorded') return 'N/R';
    return value || '';
}


function formatBool(value) {
    if (value === true) return 'Si';
    if (value === false) return 'No';
    return '';
}


function showError(message) {
    console.error('Perinatal Print Error:', message);
    $('body').prepend('<div class="error" style="padding:20px;background:#ffebee;color:#c62828;text-align:center;">' + message + '</div>');
}
