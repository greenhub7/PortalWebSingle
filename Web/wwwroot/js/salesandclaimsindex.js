$(document).ready(function () {
    if (!$("#dateFrom").val()) {
        var today = new Date().toISOString().split('T')[0];
        $("#dateFrom").val(today);
        $("#dateTo").val(today);
    }

    var title = '';
    if (isClaim) {
        title = "Reclamaciones";
    } else {
        title = "Facturas";
    }
    var table = $('#salesTable').DataTable({
        dom: 'Bfrtip',
        responsive: false,  
        buttons: [{
            extend: 'excel',
            text: 'Exportar a Excel',
            title: title + '-' + new Date().toLocaleDateString(),
            footer: true,
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                orthogonal: 'filter'
            }
        }],
        "order": [[1, "desc"]],
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
            "search": "Buscar en resultados:",
            "zeroRecords": "No se encontraron resultados",
            "infoEmpty": "No hay datos disponibles",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        "pageLength": 25,
        "footerCallback": function (row, data, start, end, display) {
            var api = this.api();

            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ? i : 0;
            };

            var pageTotal = {
                subtotal: api.column(5, { page: 'current' }).data().reduce(function (a, b) { return intVal(a) + intVal(b); }, 0),
                discount: api.column(6, { page: 'current' }).data().reduce(function (a, b) { return intVal(a) + intVal(b); }, 0),
                tax: api.column(7, { page: 'current' }).data().reduce(function (a, b) { return intVal(a) + intVal(b); }, 0),
                total: api.column(8, { page: 'current' }).data().reduce(function (a, b) { return intVal(a) + intVal(b); }, 0),
                paid: api.column(9, { page: 'current' }).data().reduce(function (a, b) { return intVal(a) + intVal(b); }, 0),
                pending: api.column(10, { page: 'current' }).data().reduce(function (a, b) { return intVal(a) + intVal(b); }, 0)
            };

            $(api.column(5).footer()).html('$' + pageTotal.subtotal.toFixed(2));
            $(api.column(6).footer()).html('$' + pageTotal.discount.toFixed(2));
            $(api.column(7).footer()).html('$' + pageTotal.tax.toFixed(2));
            $(api.column(8).footer()).html('$' + pageTotal.total.toFixed(2));
            $(api.column(9).footer()).html('$' + pageTotal.paid.toFixed(2));
            $(api.column(10).footer()).html('$' + pageTotal.pending.toFixed(2));
        }
    });

    $('#btnExportExcel').click(function () {
        table.button('.buttons-excel').trigger();
    });
});