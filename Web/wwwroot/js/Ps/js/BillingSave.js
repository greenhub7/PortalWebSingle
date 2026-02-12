
$(document).ready(function () {
     
    $("#tableSearch,#BtnCancelFilter,#Stock,#formaPagoPanel,#LineDiscount,#Vat").hide();

    $('#Stock,#LineDiscount').attr('readonly', true);

    if ($('#IsPrivate').val() === 'False') {
        $('input:radio[name="priceFromprivate"]').filter('[value="2"]').attr('checked', true);
    }

    $('#add').click(function () {
        addItemToable();
    });

    $('#BtnFilter').click(function () {
        $("#BtnFilter,#tableItem").hide();
        $("#tableSearch,#BtnCancelFilter").show();
    });

    $('#BtnCancelFilter').click(function () {
        $("#BtnFilter,#tableItem").show();
        $("#tableSearch,#BtnCancelFilter").hide();
    });

    $('#BtnSearch').click(function (e) {
        e.preventDefault();
        if ($("#Categories2 option:selected").val() == '' || $("#Categories2 option:selected").val() == 0) {
            alert('Debe Seleccionar una Clasificacion, Categoria o Area de la factura');
            return;
        }
        var isPrivate = true;

        if ($('input[name=priceFromprivate]:checked').val() === 2) {
            isPrivate = false;
        }
        var urlso = $(this).attr('href');
        $.ajax({
            type: "GET",
            url: urlso,
            dataType: "json",
            data: { 
                param: $('#option0').val(),
                isPrivate: isPrivate,
                custommerId: $('#CustomerId').val(),
                areaId: 0 
            },
            success: function (result) { 
                $('#tableHolder').html(result.table);
                $('#MyTable').DataTable({
                    "searching": false,
                    "pageLength": 5,
                    "language": {
                        "lengthMenu": "",
                        "info": "",
                        "paginate": {
                            "previous": "&lt;",
                            "next": "&gt;"
                        }
                    }
                });
            },
            error: function (ex) {
                alert("Error al intentar traer los datos para llenar el detalle." + ex);
            }
        }); 
    });
     
    $("#Products").change(function () {
        addFromPanel($("#Categories option:selected").val(), $("#Products option:selected").val(), 2);
        if ($("#Categories option:selected").text() === "Prod/Serv de Monto Variable") {
            $('#SellPrice').attr('readonly', false);
            $('#SellPrice').val('');
        }  
    });

});

function makeid() {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return "FAC-" + text.toUpperCase();
}