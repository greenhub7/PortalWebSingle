    function setCurrentDate() {
        var mytoday = new Date();
        var dd = mytoday.getDate();
        var mm = mytoday.getMonth() + 1; 

        var yyyy = mytoday.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var mytoday2 = dd + '/' + mm + '/' + yyyy;
        $(".PsDates").val(mytoday2); 
}
    function getAge(dateString) {
    var now = new Date();
    var today = new Date(now.getYear(), now.getMonth(), now.getDate());

    var yearNow = now.getYear();
    var monthNow = now.getMonth();
    var dateNow = now.getDate();

    var dob = new Date(dateString.substring(6, 10),
        dateString.substring(3, 5) - 1,
        dateString.substring(0, 2)
    );

    var yearDob = dob.getYear();
    var monthDob = dob.getMonth();
    var dateDob = dob.getDate();
    var age = {};
    var ageString = "";
    var yearString = "";
    var monthString = "";
    var dayString = "";
    var monthAge;
    var dateAge;
    var yearAge;
    yearAge = yearNow - yearDob;

    if (monthNow >= monthDob)
        monthAge = monthNow - monthDob;
    else {
        yearAge--;
        monthAge = 12 + monthNow - monthDob;
    }

    if (dateNow >= dateDob)
        dateAge = dateNow - dateDob;
    else {
        monthAge--;
        dateAge = 31 + dateNow - dateDob;

        if (monthAge < 0) {
            monthAge = 11;
            yearAge--;
        }
    }

    age = {
        years: yearAge,
        months: monthAge,
        days: dateAge
    };

    if (age.years > 1) yearString = " Años";
    else yearString = " Año";
    if (age.months > 1) monthString = " Meses";
    else monthString = " Mes";
    if (age.days > 1) dayString = " Dias";
    else dayString = " Dia";
     
    if ((age.years > 0) && (age.months > 0) && (age.days > 0))
        ageString = age.years + yearString;
    else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
        ageString = age.days + dayString;
    else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
        ageString = age.years + yearString;
    else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
        ageString = age.years + yearString;
    else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
        ageString = age.months + monthString;
    else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
        ageString = age.years + yearString;
    else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
        ageString = age.months + monthString;
    else ageString = "Oops! Escoja una fecha inferior a la del dia!";

    return ageString;
}

    function OpenUrlInNewWindow(urlToNavigate) {
    var win = window.open(urlToNavigate);
    if (win) {
        
        win.focus();
    } else {
        
        alert("Porfavor, debes permitir que se abran las ventanas emergentes o el reporte no va a salir :'( ");
    }
}

    function getUniversalDateStr() {
    let now = new Date();
    let dateStr = now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0') +
        now.getHours().toString().padStart(2, '0') +
        now.getMinutes().toString().padStart(2, '0');
    return dateStr;
}

    function psFormatDateStr(dateStr) {
        const inputDate = new Date(dateStr);
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const year = inputDate.getFullYear();

        return `${day}/${month}/${year}`;  
    }

    $(document).ready(function () { 
  

    $(".IsDetailForm").find("input,select,textarea,button").prop("disabled", true);

    $(".Tel").mask("(999) 999-9999");
    
    

    $('#BtnPdf').click(function () {
        let btn = $(this);
        btn.prop("disabled", true);
        btn.text("Generando..."); 
        let dateStr = getUniversalDateStr(); 
        let urlParams = new URLSearchParams(window.location.search);
        let id = urlParams.get('id');
        let fileName = dateStr + id + ".pdf";
        $.ajax({
            url: UrlGeneratePdf,
            success: function (result) {
                if (result.startsWith("Error:")) {
                    alert(result);
                } else {
                    let binary = atob(result.toString());
                    let len = binary.length;
                    let buffer = new ArrayBuffer(len);
                    let view = new Uint8Array(buffer);
                    for (let i = 0; i < len; i++) {
                        view[i] = binary.charCodeAt(i);
                    }
                    let blob = new Blob([view], { type: 'application/pdf' });
                    let link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName  ;
                    link.click();
                }
                btn.prop("disabled", false);
                btn.text("Generar PDF");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.prop("disabled", false);
                btn.text("Generar PDF");
                alert("Ocurrió un error, intentelo nuevamente");
            }
        });
    });

    $('#BtnPdfEmail').click(function () {
        let btn = $(this);
        btn.prop("disabled", true);
        btn.text("Enviando..."); 
        $.ajax({
            url: UrlSendEmail,
            success: function (result) {
                 
                alert(result);
                btn.prop("disabled", false);
                btn.text("Enviar por Email");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                btn.prop("disabled", false);
                btn.text("Enviar por Email");
                alert("Ocurrió un error, intentelo nuevamente");
            }
        });
    });

    $('#BtnPrintA4').click(function () { 
        OpenUrlInNewWindow(UrlPrintA4); 
    });

    $('#BtnPrintA6').click(function () { 
        OpenUrlInNewWindow(UrlPrintA6);  
    });

    $('#BtnPrintA4Empty').click(function () { 
        OpenUrlInNewWindow(UrlPrintA4Empty);  
    });

    $('#BtnPrintA6Empty').click(function () { 
        OpenUrlInNewWindow(UrlPrintA6Empty);  
    });
});
