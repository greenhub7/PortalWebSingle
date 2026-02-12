
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    

    
    

    
    
    
    ;
    

    
    

    
    
    
    
    

    
    
    

    

$(document).ready(function () {
        $(".MasterDdl").change(function () {
            $(".DetailDdl").empty();
            $("#divForm").hide();
            $("#divText").show();
            $.ajax({
                type: "POST",
                url: Urls,
                dataType: "json",
                data: { id: $(".MasterDdl").val() },
                success: function (list) {
                    $.each(list,
                        function (i, item) {
                            $(".DetailDdl").append('<option value="' + item.id + '">' + item.name + "</option>");
                        });
                    $("#divForm").show();
                    $("#divText").hide();
                },
                error: function (ex) {
                    alert("Error al intentar traer los datos para llenar el detalle." + ex);
                }
            });
            return false;
        });
    });
 