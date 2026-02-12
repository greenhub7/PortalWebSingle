

const PurchaseConfig = {
    purchaseItems: [],
    baseUrl: '',
    showAdvancedOptions: false,
    barcodeBuffer: '',
    barcodeTimeout: null
};

$(document).ready(function () {
    PurchaseConfig.baseUrl = $('meta[name="base-url"]').attr('content') || '';

    
    var storedPref = localStorage.getItem('solmed_purchaseAdvancedOptions');
    PurchaseConfig.showAdvancedOptions = storedPref === null ? true : storedPref === 'true';

    initializePage();
    setupEventHandlers();
    initializeDatePickers();
    applyAdvancedOptionsState(); 
});


function initializePage() {
    
    if (!$('#InvoiceNo').val()) {
        generateInvoiceNumber();
    }

    
    setCurrentDate();

    
    preselectSingleOptions();
}


function preselectSingleOptions() {
    
    var $areaSelect = $('#AreaId');
    var areaOptions = $areaSelect.find('option').filter(function() {
        return $(this).val() && $(this).val() !== '0' && $(this).val() !== '';
    });
    if (areaOptions.length === 1) {
        $areaSelect.val(areaOptions.first().val());
    }

    
    var $supplierSelect = $('#Suppliers');
    var supplierOptions = $supplierSelect.find('option').filter(function() {
        return $(this).val() && $(this).val() !== '0' && $(this).val() !== '';
    });
    if (supplierOptions.length === 1) {
        $supplierSelect.val(supplierOptions.first().val());
    }
}


function applyAdvancedOptionsState() {
    if (PurchaseConfig.showAdvancedOptions) {
        $('#advancedOptions').show();
        $('#toggleAdvancedBtn i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        $('#toggleAdvancedBtn span').text('Ocultar opciones adicionales');
    } else {
        $('#advancedOptions').hide();
        $('#toggleAdvancedBtn i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        $('#toggleAdvancedBtn span').text('Ver opciones adicionales');
    }
}


function setupEventHandlers() {
    
    $('#quickSearchInput').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            quickSearch();
        }
    });

    $('#quickSearchBtn').on('click', quickSearch);

    
    $('#quickSearchInput').on('keypress', detectBarcodeInput);

    
    $('#toggleAdvancedBtn').on('click', function () {
        toggleAdvancedOptions(true);
    });

    
    $('#Categories').on('change', function () {
        loadProductsByCategory($(this).val());
    });

    
    $('#Products').on('change', function () {
        loadProductInfo($(this).val());
    });

    
    $('#addItemBtn').on('click', addItemToList);

    
    $('#Quantity').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            addItemToList();
        }
    });

    
    $('#savePurchaseBtn').on('click', savePurchase);

    
    $(document).on('input', '#OverallDiscount, #PaidAmount', calculateTotals);

    
    $(document).on('click', '.remove-item-btn', function () {
        var index = $(this).data('index');
        removeItem(index);
    });

    
    $('#addSupplierBtn').on('click', function () {
        window.open(PurchaseConfig.baseUrl + '/SalesAndInventories/CreateOrUpdateSupplier', '_blank', 'width=600,height=500');
    });
}


function initializeDatePickers() {
    if ($.fn.datepicker) {
        $('.PsDates').datepicker({
            format: 'dd/mm/yyyy',
            autoclose: true,
            language: 'es',
            todayHighlight: true
        });
    }
}


function setCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    $('#PurchaseDate').val(dd + '/' + mm + '/' + yyyy);
}


function generateInvoiceNumber() {
    $.ajax({
        url: PurchaseConfig.baseUrl + '/Purchases/GetNextPurchaseNumber',
        type: 'GET',
        success: function (response) {
            if (response.success) {
                $('#InvoiceNo').val(response.nextNumber);
                PurchaseConfig.serverSequence = response.sequence;
                PurchaseConfig.serverPrefix = response.prefix;
            } else {
                
                var timestamp = Date.now();
                $('#InvoiceNo').val('COM-' + timestamp.toString().slice(-8));
            }
        },
        error: function () {
            
            var timestamp = Date.now();
            $('#InvoiceNo').val('COM-' + timestamp.toString().slice(-8));
        }
    });
}


function toggleManualInvoice() {
    var isManual = $('#manualInvoiceCheck').is(':checked');
    $('#InvoiceNo').prop('readonly', !isManual);

    if (!isManual) {
        
        generateInvoiceNumber();
    }
}


function toggleAdvancedOptions(animate) {
    PurchaseConfig.showAdvancedOptions = !PurchaseConfig.showAdvancedOptions;
    localStorage.setItem('solmed_purchaseAdvancedOptions', PurchaseConfig.showAdvancedOptions);

    if (animate) {
        $('#advancedOptions').slideToggle(300);
    } else {
        if (PurchaseConfig.showAdvancedOptions) {
            $('#advancedOptions').show();
        } else {
            $('#advancedOptions').hide();
        }
    }

    if (PurchaseConfig.showAdvancedOptions) {
        $('#toggleAdvancedBtn i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        $('#toggleAdvancedBtn span').text('Ocultar opciones');
    } else {
        $('#toggleAdvancedBtn i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        $('#toggleAdvancedBtn span').text('Ver opciones avanzadas');
    }
}


function detectBarcodeInput(e) {
    if (PurchaseConfig.barcodeTimeout) {
        clearTimeout(PurchaseConfig.barcodeTimeout);
    }

    PurchaseConfig.barcodeBuffer += String.fromCharCode(e.which);

    PurchaseConfig.barcodeTimeout = setTimeout(function () {
        
        if (PurchaseConfig.barcodeBuffer.length >= 8) {
            processBarcodeInput(PurchaseConfig.barcodeBuffer.trim());
        }
        PurchaseConfig.barcodeBuffer = '';
    }, 50);
}


function processBarcodeInput(barcode) {
    $.ajax({
        url: PurchaseConfig.baseUrl + '/SalesAndInventories/GetProductByBarcode',
        type: 'GET',
        data: { barcode: barcode },
        success: function (response) {
            if (response.success && response.product) {
                addProductFromBarcode(response.product);
                $('#quickSearchInput').val('');
            } else {
                showNotification('Producto no encontrado con codigo: ' + barcode, 'warning');
            }
        },
        error: function () {
            showNotification('Error al buscar producto', 'danger');
        }
    });
}


function addProductFromBarcode(product) {
    
    var existingIndex = PurchaseConfig.purchaseItems.findIndex(function (item) {
        return item.ProductId == product.productId;
    });

    if (existingIndex >= 0) {
        
        PurchaseConfig.purchaseItems[existingIndex].Quantity += 1;
        PurchaseConfig.purchaseItems[existingIndex].SubTotal =
            PurchaseConfig.purchaseItems[existingIndex].Quantity *
            PurchaseConfig.purchaseItems[existingIndex].BuyPrice;
    } else {
        
        PurchaseConfig.purchaseItems.push({
            ProductId: product.productId,
            ProductName: product.name,
            Barcode: product.barcode,
            Quantity: 1,
            BuyPrice: product.buyPrice || 0,
            SellPrice: product.sellPrice || 0,
            Vat: product.vat || 0,
            Lote: '',
            ExpirationDateStr: '',
            SubTotal: product.buyPrice || 0
        });
    }

    renderItemsTable();
    calculateTotals();
    showNotification('Producto agregado: ' + product.name, 'success');
}


function quickSearch() {
    var searchTerm = $('#quickSearchInput').val().trim();

    
    $('#searchResults').html('<div class="text-center py-3"><i class="fas fa-spinner fa-spin fa-2x"></i><p class="mt-2">Buscando...</p></div>');
    $('#searchResultsCard').show();

    $.ajax({
        url: PurchaseConfig.baseUrl + '/Purchases/ProductsFilter',
        type: 'GET',
        data: {
            param: searchTerm,      
            opParam: 1              
        },
        success: function (html) {
            $('#searchResults').html(html);

            
            if ($('#ProductsTable').length && $.fn.DataTable) {
                if ($.fn.DataTable.isDataTable('#ProductsTable')) {
                    $('#ProductsTable').DataTable().destroy();
                }
                $('#ProductsTable').DataTable({
                    pageLength: 5,
                    language: {
                        search: "Buscar:",
                        lengthMenu: "Mostrar _MENU_",
                        info: "Mostrando _START_ a _END_ de _TOTAL_",
                        zeroRecords: "No se encontraron resultados",
                        paginate: {
                            first: "Primero",
                            last: "Ultimo",
                            next: "Sig.",
                            previous: "Ant."
                        }
                    }
                });
            }
        },
        error: function () {
            $('#searchResults').html('<div class="alert alert-danger">Error al buscar productos</div>');
        }
    });
}


function addFromPanel(categoryId, productId, caller) {
    if (caller === 1) {
        
        loadProductAndAdd(productId);
    } else {
        
        $('#Categories').val(categoryId).trigger('change');
        setTimeout(function () {
            $('#Products').val(productId).trigger('change');
        }, 500);
    }
}


function loadProductAndAdd(productId) {
    $.ajax({
        url: PurchaseConfig.baseUrl + '/Purchases/GetProductFromPurchaseInfo',
        type: 'GET',
        data: { ProductId: productId },
        success: function (response) {
            if (response) {
                PurchaseConfig.purchaseItems.push({
                    ProductId: response.productId,
                    ProductName: response.productName,
                    Barcode: response.barCode || '',
                    Quantity: 1,
                    BuyPrice: response.buyPrice || 0,
                    SellPrice: response.sellPrice || 0,
                    Vat: response.vat || 0,
                    Lote: '',
                    ExpirationDateStr: '',
                    SubTotal: response.buyPrice || 0,
                    ServiceTypeId: response.serviceTypeId
                });

                renderItemsTable();
                calculateTotals();
                showNotification('Producto agregado', 'success');
            }
        },
        error: function () {
            showNotification('Error al cargar producto', 'danger');
        }
    });
}


function loadProductsByCategory(categoryId) {
    if (!categoryId) {
        $('#Products').html('<option value="">-- Seleccione Producto --</option>');
        return;
    }

    $.ajax({
        url: PurchaseConfig.baseUrl + '/Products/GetProductsWithInventoryCapability',
        type: 'GET',
        data: { MasterId: categoryId },
        success: function (products) {
            var options = '<option value="">-- Seleccione Producto --</option>';
            $.each(products, function (i, p) {
                options += '<option value="' + p.productId + '">' + p.name + '</option>';
            });
            $('#Products').html(options);
        },
        error: function () {
            showNotification('Error al cargar productos', 'danger');
        }
    });
}


function loadProductInfo(productId) {
    if (!productId) {
        clearProductFields();
        return;
    }

    $.ajax({
        url: PurchaseConfig.baseUrl + '/Purchases/GetProductFromPurchaseInfo',
        type: 'GET',
        data: { ProductId: productId },
        success: function (response) {
            if (response) {
                $('#Barcode').val(response.barCode || '');
                $('#BuyPrice').val(response.buyPrice || 0);
                $('#SellPrice').val(response.sellPrice || 0);
                $('#Vat').val(response.vat || 0);
                $('#Quantity').val(1).focus();

                
                if (response.serviceTypeId === 2) {
                    $('.batch-fields').show();
                } else {
                    $('.batch-fields').hide();
                }
            }
        },
        error: function () {
            showNotification('Error al cargar informacion del producto', 'danger');
        }
    });
}


function clearProductFields() {
    $('#Barcode, #BuyPrice, #SellPrice, #Vat, #Quantity, #Lote, #ExpirationDate').val('');
}


function addItemToList() {
    var productId = $('#Products').val();
    var productName = $('#Products option:selected').text();
    var quantity = parseFloat($('#Quantity').val()) || 0;
    var buyPrice = parseFloat($('#BuyPrice').val()) || 0;
    var sellPrice = parseFloat($('#SellPrice').val()) || 0;
    var vat = parseFloat($('#Vat').val()) || 0;
    var lote = $('#Lote').val().trim();
    var expirationDate = $('#ExpirationDate').val().trim();
    var barcode = $('#Barcode').val().trim();

    
    if (!productId) {
        showNotification('Seleccione un producto', 'warning');
        return;
    }

    if (quantity <= 0) {
        showNotification('Ingrese una cantidad valida', 'warning');
        $('#Quantity').focus();
        return;
    }

    if (buyPrice <= 0) {
        showNotification('Ingrese un precio de compra valido', 'warning');
        $('#BuyPrice').focus();
        return;
    }

    
    var existingIndex = PurchaseConfig.purchaseItems.findIndex(function (item) {
        return item.ProductId == productId && item.Lote == lote;
    });

    if (existingIndex >= 0) {
        
        PurchaseConfig.purchaseItems[existingIndex].Quantity += quantity;
        PurchaseConfig.purchaseItems[existingIndex].SubTotal =
            PurchaseConfig.purchaseItems[existingIndex].Quantity *
            PurchaseConfig.purchaseItems[existingIndex].BuyPrice;
    } else {
        
        var subTotal = quantity * buyPrice;
        var vatAmount = (subTotal * vat) / 100;

        PurchaseConfig.purchaseItems.push({
            ProductId: productId,
            ProductName: productName,
            Barcode: barcode,
            Quantity: quantity,
            StockQuantity: quantity,
            BuyPrice: buyPrice,
            SellPrice: sellPrice,
            Vat: vat,
            Lote: lote,
            ExpirationDateStr: expirationDate,
            SubTotal: subTotal,
            ProductCharges: vatAmount,
            Discount: 0,
            ProductDiscount: 0,
            TotalDetail: subTotal + vatAmount
        });
    }

    renderItemsTable();
    calculateTotals();
    clearProductFields();
    $('#Categories').val('').trigger('change');
}


function removeItem(index) {
    if (index >= 0 && index < PurchaseConfig.purchaseItems.length) {
        PurchaseConfig.purchaseItems.splice(index, 1);
        renderItemsTable();
        calculateTotals();
    }
}


function renderItemsTable() {
    var $tbody = $('#purchaseItemsBody');
    $tbody.empty();

    if (PurchaseConfig.purchaseItems.length === 0) {
        $tbody.html('<tr><td colspan="7" class="text-center text-muted py-4"><i class="fas fa-shopping-cart fa-2x mb-2"></i><br>No hay productos agregados</td></tr>');
        return;
    }

    $.each(PurchaseConfig.purchaseItems, function (index, item) {
        var row = '<tr>' +
            '<td>' + (item.Barcode || '-') + '</td>' +
            '<td>' + item.ProductName + '</td>' +
            '<td>' + (item.Lote || '-') + '</td>' +
            '<td class="text-center">' +
            '<input type="number" class="form-control form-control-sm text-center item-quantity" ' +
            'data-index="' + index + '" value="' + item.Quantity + '" min="1" style="width:70px;display:inline-block;">' +
            '</td>' +
            '<td class="text-right">' + formatCurrency(item.BuyPrice) + '</td>' +
            '<td class="text-right">' + formatCurrency(item.SellPrice) + '</td>' +
            '<td class="text-center">' +
            '<button type="button" class="btn btn-sm btn-outline-danger remove-item-btn" data-index="' + index + '">' +
            '<i class="fas fa-trash-alt"></i></button>' +
            '</td>' +
            '</tr>';
        $tbody.append(row);
    });

    
    $('.item-quantity').off('change').on('change', function () {
        var index = $(this).data('index');
        var newQty = parseFloat($(this).val()) || 1;
        if (newQty < 1) newQty = 1;

        PurchaseConfig.purchaseItems[index].Quantity = newQty;
        PurchaseConfig.purchaseItems[index].SubTotal = newQty * PurchaseConfig.purchaseItems[index].BuyPrice;
        PurchaseConfig.purchaseItems[index].TotalDetail =
            PurchaseConfig.purchaseItems[index].SubTotal +
            (PurchaseConfig.purchaseItems[index].SubTotal * PurchaseConfig.purchaseItems[index].Vat / 100);

        calculateTotals();
    });
}


function calculateTotals() {
    var subTotal = 0;
    var totalVat = 0;

    $.each(PurchaseConfig.purchaseItems, function (i, item) {
        subTotal += item.SubTotal;
        totalVat += (item.SubTotal * (item.Vat || 0)) / 100;
    });

    var discountPercent = parseFloat($('#OverallDiscount').val()) || 0;
    var discountAmount = (subTotal * discountPercent) / 100;
    var grandTotal = subTotal + totalVat - discountAmount;
    var paidAmount = parseFloat($('#PaidAmount').val()) || 0;
    var dueAmount = grandTotal - paidAmount;

    $('#TotalAmount').val(subTotal.toFixed(2));
    $('#VatAmount').val(totalVat.toFixed(2));
    $('#OverallDiscountAmount').val(discountAmount.toFixed(2));
    $('#GrandTotal').val(grandTotal.toFixed(2));
    $('#DueAmount').val(dueAmount.toFixed(2));
}


function savePurchase() {
    
    if (PurchaseConfig.purchaseItems.length === 0) {
        showNotification('Agregue al menos un producto', 'warning');
        return;
    }

    var supplierId = $('#Suppliers').val();
    if (!supplierId || supplierId === '0') {
        showNotification('Seleccione un proveedor', 'warning');
        return;
    }

    var purchaseDate = $('#PurchaseDate').val().trim();
    if (!purchaseDate) {
        showNotification('Ingrese una fecha de compra', 'warning');
        return;
    }

    
    $('#savePurchaseBtn').prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');

    var data = {
        PurchaseInvoiceNo: $('#InvoiceNo').val().trim(),
        PurchaseDateStr: purchaseDate,
        SupplierName: $('#Suppliers option:selected').text(),
        SupplierId: supplierId,
        AreaId: $('#AreaId').val() || 0,
        TotalDiscount: $('#OverallDiscountAmount').val().trim(),
        CoverPercent: $('#OverallDiscount').val(),
        PaidAmount: $('#PaidAmount').val().trim(),
        DebtAmount: $('#DueAmount').val().trim(),
        Conduce: $('#Conduce').val().trim(),
        PurchaseDetails: PurchaseConfig.purchaseItems
    };

    $.ajax({
        url: PurchaseConfig.baseUrl + '/Purchases/SaveOrder',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response) {
            if (response.status) {
                showNotification('Compra guardada exitosamente', 'success');
                window.location.href = PurchaseConfig.baseUrl + '/SalesAndInventories/DetailsPurchase?Id=' + response.idi;
            } else {
                showNotification('Error al guardar la compra', 'danger');
                $('#savePurchaseBtn').prop('disabled', false).html('<i class="fas fa-save"></i> Guardar Compra');
            }
        },
        error: function () {
            showNotification('Error de conexion al guardar', 'danger');
            $('#savePurchaseBtn').prop('disabled', false).html('<i class="fas fa-save"></i> Guardar Compra');
        }
    });
}


function formatCurrency(value) {
    return parseFloat(value || 0).toFixed(2);
}


function showNotification(message, type) {
    type = type || 'info';

    
    $('.purchase-notification').remove();

    var alertClass = 'alert-' + type;
    var icon = type === 'success' ? 'check-circle' :
        type === 'warning' ? 'exclamation-triangle' :
            type === 'danger' ? 'times-circle' : 'info-circle';

    var notification = $('<div class="purchase-notification alert ' + alertClass + ' alert-dismissible fade show" style="position:fixed;top:20px;right:20px;z-index:9999;min-width:300px;">' +
        '<i class="fas fa-' + icon + ' mr-2"></i> ' + message +
        '<button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>' +
        '</div>');

    $('body').append(notification);

    setTimeout(function () {
        notification.fadeOut(function () {
            $(this).remove();
        });
    }, 3000);
}


function closeSearchResults() {
    $('#searchResultsCard').hide();
}


window.addFromPanel = addFromPanel;
window.closeSearchResults = closeSearchResults;
window.toggleManualInvoice = toggleManualInvoice;
