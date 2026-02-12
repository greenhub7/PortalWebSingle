
$(document).ready(function () {
    let optionId = $("#optionId").val() || $("#optionIdDropdown").val();

    toggleSpecialtyFields(optionId);

    $("#optionIdDropdown").on("change", function () {
        toggleSpecialtyFields($(this).val());
    });

    $(".weight-input").on("change", function () {
        let id = $(this).attr("id");
        let value = parseFloat($(this).val());

        if (!isNaN(value)) {
            if (id === "WeightKg") {
                $("#WeightLbs").val((value * 2.20462).toFixed(2));
            } else if (id === "WeightLbs") {
                $("#WeightKg").val((value / 2.20462).toFixed(2));
            }
        }
    });
});

 
function toggleSpecialtyFields(optionId) {
    if (!optionId) return;
     
    $(".specialty-card").hide();
     
    switch (String(optionId)) {
        case "316": 
            $("#cardiology-fields").show();
            $("#cardiology-visit-fields").show();
            break;
        case "322": 
            $("#gynecology-fields").show();
            $("#gynecology-visit-fields").show();
            break;
        case "323": 
            $("#gynecology-fields").show();
            $("#gynecology-visit-fields").show();
            break;
        case "324": 
            $("#pediatrics-fields").show();
            $("#pediatrics-visit-fields").show();
            break;
        case "325": 
            $("#psychology-fields").show();
            break;
        case "326":  
            $("#psychology-fields").show();
            break;
        case "329": 
            $("#orthopedics-fields").show();
            $("#orthopedics-visit-fields").show();
            break;
        case "369": 
            $("#dental-fields").show();
            $("#dental-visit-fields").show();
            break;
        case "370": 
            $("#dental-fields").show();
            $("#dental-visit-fields").show();
            break;
        case "344": 
            $("#ophthalmology-fields").show();
            $("#ophthalmology-visit-fields").show();
            break;
        case "334": 
            $("#dermatology-fields").show();
            $("#dermatology-visit-fields").show();
            break;
        case "346": 
            $("#neurology-fields").show();
            $("#neurology-visit-fields").show();
            break;
        case "347": 
            $("#gastroenterology-fields").show();
            $("#gastroenterology-visit-fields").show();
            break;
        case "345": 
            $("#ent-fields").show();
            $("#ent-visit-fields").show();
            break;
        case "328": 
            $("#urology-fields").show();
            $("#urology-visit-fields").show();
            break;
        case "373": 
            $("#rheumatology-fields").show();
            break;
        case "338": 
            $("#wounds-fields").show();
            $("#wounds-visit-fields").show();
            break;
        case "321": 
            $("#nutritional-fields").show();
            break;
        case "335": 
            $("#aesthetic-visit-fields").show();
            break;
        default: 
            break;
    }
}
 
function ifElementExists(selector, callback) {
    if ($(selector).length) {
        callback($(selector));
    }
}