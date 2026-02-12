
 
const SaleConfig = {
    allowSalesWithoutStock: true,
    checkStockBeforeAdding: false,
    selectedProducts: [],
    isEditMode: false,
    baseUrl: '',
    
    savedInsuranceData: {
        insuranceId: null,
        insuranceName: null,
        insuranceNumber: null,
        authorizationNumber: null,
        coverPercent: 0
    }
};
 
$(document).ready(function () {
    SaleConfig.baseUrl = $('meta[name="base-url"]').attr('content') || '';

    SaleConfig.isEditMode = $("#SalesId").val() > 0;

    window.addProductToCart = addProductToCart;
    window.openNewProductModal = openNewProductModal;
    window.checkStockBeforeAdding = SaleConfig.checkStockBeforeAdding;
    window.allowSalesWithoutStock = SaleConfig.allowSalesWithoutStock;

    loadInitialData();

    setupEventHandlers();

    
    initializeUserType7State();

    calculateTotals();
});
 
function loadInitialData() { 
    if (SaleConfig.isEditMode) {
        const salesDetailsJson = $("#salesDetailsJson").val();
        if (salesDetailsJson) {
            try {
                SaleConfig.selectedProducts = JSON.parse(salesDetailsJson);
            } catch (e) {
                console.error("Error parsing sales details:", e);
            }
        }
    }
}
 
function setupEventHandlers() {
    $("#btnToggleAdvanced").click(toggleAdvancedOptions);

    $("#searchCustomerBtn").click(openCustomerSearch);

    $("#paymentTypeSelect").change(handlePaymentTypeChange);

    $("input[name='IsPrivate']").change(toggleInsuranceFields);

    $("input[name='ImmediatePayment']").change(togglePaymentSection);

    togglePaymentSection.call($("input[name='ImmediatePayment']:checked")[0]);

    
    const isPrivate = $("input[name='IsPrivate']:checked").val() === "true";
    if (isPrivate) {
        $("#insuranceFields").hide();
    } else {
        $("#insuranceFields").show();
    }

    $("#coverPercentInput").on("input", calculateTotals);
     
    $(document).on("click", ".remove-product", removeProduct);
     
    $(document).on("input", ".product-quantity, .product-price, .product-tax, .product-discount", updateProductTotals);
     
    $(".mixed-payment").on("input", validateMixedPayment);
     
    $("#receivedAmountInput").on("input", calculateChange);
     
    $("#saveSaleBtn").click(saveSale);
     
    $("#customerSearchBtn").click(function() { searchCustomers(false); });
    $("#customerSearchInput").keypress(function (e) {
        if (e.which === 13) {
            searchCustomers(false);
            return false;
        }
    });
     
    $("#saveNewProductBtn").click(saveNewProduct);
    $("#insuranceSelect").change(function () {
        const insuranceId = $(this).val();
        $("#insuranceId").val(insuranceId);
        reloadProducts();
    });

    
    $(document).on("click", "[data-dismiss='modal']", function(e) {
        const modalId = $(this).closest(".modal").attr("id");
        if (modalId) {
            $(`#${modalId}`).modal("hide");
        }
    });

    
    $("#authorSelect").change(function () {
        const authorId = $(this).val();

        if (authorId && authorId !== "0") {
            
            $("#customerIdInput").val("");
            $("#customerNameInput").val("");
            $("#customerInfo").text("");

            
            SaleConfig.selectedProducts = [];
            $("#selectedProductsBody").empty();
            calculateTotals();

            
            SaleConfig.savedInsuranceData = {
                insuranceId: null,
                insuranceName: null,
                insuranceNumber: null,
                authorizationNumber: null,
                coverPercent: 0
            };

            
            loadDoctorsByAuthor(authorId);

            
            loadCategoriesByAuthor(authorId);

            
            loadAreasByAuthor(authorId);

            
            loadSaleCategoriesByAuthor(authorId);

            
            reloadProducts();
        } else {
            
            $("#doctorSelect").html('<option value="0">-- Seleccione un Owner primero --</option>');
            $("#newProductCategory").html('<option value="0">-- Seleccione un Owner primero --</option>');
        }
    });
}
 
function toggleAdvancedOptions() {
    const showAdvanced = $("#showAdvancedOptions").val() === "true";
    $("#showAdvancedOptions").val(!showAdvanced);

    if (!showAdvanced) {
        
        $("#advancedFieldsRow").removeAttr('hidden');
        $("#btnToggleAdvanced").html('<i class="fas fa-cogs"></i> Ocultar Opciones Avanzadas');
    } else {
        
        $("#advancedFieldsRow").attr('hidden', 'hidden');
        $("#btnToggleAdvanced").html('<i class="fas fa-cogs"></i> Mostrar Opciones Avanzadas');
    }
}
 
function openCustomerSearch() {
    $("#customerSearchModal").modal("show");
    $("#customerSearchInput").focus();

    
    searchCustomers(true);
}
 
function handlePaymentTypeChange() {
    const value = $(this).val();
    if (value === "9") { 
        $("#standardPaymentFields").hide();
        $("#mixedPaymentFields").show();
    } else {
        $("#standardPaymentFields").show();
        $("#mixedPaymentFields").hide();
         
        $(".mixed-payment").val(0);
         
        const grandTotal = parseFloat($("#grandTotalDisplay").text().replace(/,/g, '')) || 0;

        if (value === "1") { 
            $("#cashAmountInput").val(grandTotal.toFixed(2));
        } else if (value === "3") { 
            $("#cardAmountInput").val(grandTotal.toFixed(2));
        } else if (value === "4") { 
            $("#checkAmountInput").val(grandTotal.toFixed(2));
        } else if (value === "2") { 
            $("#creditNoteAmountInput").val(grandTotal.toFixed(2));
        } else if (value === "8") { 
            $("#transferAmountInput").val(grandTotal.toFixed(2));
        }
    }
}
 
function toggleInsuranceFields() {
    const isPrivate = $(this).val() === "true";
    const isClaim = $("#IsClaim").val() === "True" || $("#IsClaim").val() === "true";

    if (isPrivate) {
        
        SaleConfig.savedInsuranceData.insuranceId = $("#insuranceSelect").val();
        SaleConfig.savedInsuranceData.insuranceName = $("#insuranceSelect option:selected").text();
        SaleConfig.savedInsuranceData.insuranceNumber = $("#InsuranceNumber").val();
        SaleConfig.savedInsuranceData.authorizationNumber = $("#AutorizationNumber").val();
        SaleConfig.savedInsuranceData.coverPercent = $("#coverPercentInput").val();

        
        $("#insuranceFields").hide();

        
        $("#insuranceId").val(1); 
        $("#insuranceSelect").val(1);
        $("#AutorizationNumber").val("");
        $("#coverPercentInput").val(0); 
        $("#InsuranceNumber").val("");

    } else {
        
        $("#insuranceFields").show();

        
        if (SaleConfig.savedInsuranceData.insuranceId && SaleConfig.savedInsuranceData.insuranceId > 1) {
            $("#insuranceId").val(SaleConfig.savedInsuranceData.insuranceId);
            $("#insuranceSelect").val(SaleConfig.savedInsuranceData.insuranceId);
            $("#InsuranceNumber").val(SaleConfig.savedInsuranceData.insuranceNumber || "");
            $("#AutorizationNumber").val(SaleConfig.savedInsuranceData.authorizationNumber || "");
            $("#coverPercentInput").val(SaleConfig.savedInsuranceData.coverPercent || 0);
        } else {
            
            
            const defaultCoverPercent = isClaim ? 100 : 80;
            $("#coverPercentInput").val(defaultCoverPercent);
        }
    }

    
    calculateTotals();
    reloadProducts();
}
 
function togglePaymentSection() {
    const isImmediate = $(this).val() === "true";
    if (isImmediate) {
        $("#paymentSection").show();
    } else {
        $("#paymentSection").hide();
    }
}
 
function calculateChange() {
    const received = parseFloat($(this).val()) || 0;
    const total = parseFloat($("#grandTotalDisplay").text().replace(/,/g, '')) || 0;
    const change = received - total;
    $("#changeAmountInput").val(change > 0 ? change.toFixed(2) : 0);
}
 
function searchCustomers(initialLoad = false) {
    const searchTerm = $("#customerSearchInput").val().trim();

    
    if (!initialLoad && !searchTerm) {
        alert("Ingrese un término de búsqueda.");
        return;
    }

    
    var authorId = null;
    var doctorId = parseInt($("#doctorSelect").val()) || null;

    if ($("#authorSelect").length > 0) {
        
        authorId = parseInt($("#authorSelect").val()) || null;

        if (!authorId || authorId === 0) {
            $("#customerSearchResults").html(`
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i> Debe seleccionar un Owner antes de buscar pacientes.
                </div>
            `);
            return;
        }
    } else {
        
        var uniqueAuthorIds = getUniqueAuthorIdsFromDoctors();

        
        if (uniqueAuthorIds.length === 1 && uniqueAuthorIds[0] > 0) {
            
            authorId = uniqueAuthorIds[0];
        } else if (!doctorId || doctorId === 0) {
            
            $("#customerSearchResults").html(`
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i> Debe seleccionar un médico antes de buscar pacientes.
                </div>
            `);
            return;
        } else {
            
            authorId = parseInt($("#doctorSelect option:selected").data("author-id")) || null;
        }
    }
      
    $("#customerSearchResults").html('<div class="text-center"><i class="fas fa-spinner fa-spin fa-2x"></i><p>Buscando...</p></div>');

    $.ajax({
        url: `${SaleConfig.baseUrl}/SalesAndInventories/PeopleFilter`,
        type: 'GET',
        data: {
            param: searchTerm,
            doctorId: doctorId,
            authorId: authorId
        },
        success: function (result) {
            if (result.success && result.table) { 
                $("#customerSearchResults").html(result.table);
                 
                try { 
                    if ($.fn.DataTable.isDataTable('#customersTable')) {
                        $('#customersTable').DataTable().destroy();
                    }
                     
                    $('#customersTable').DataTable({
                        "pageLength": 5,
                        "language": {
                            "lengthMenu": "Mostrar _MENU_ clientes",
                            "info": "Mostrando _START_ a _END_ de _TOTAL_ clientes",
                            "search": "Buscar:",
                            "zeroRecords": "No se encontraron resultados",
                            "infoEmpty": "No hay datos disponibles",
                            "paginate": {
                                "first": "Primero",
                                "last": "Último",
                                "next": "Siguiente",
                                "previous": "Anterior"
                            }
                        }
                    });
                } catch (e) {
                    console.error("Error inicializando DataTable:", e);
                }
            } else {
                $("#customerSearchResults").html(`
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> ${result.message || "No se encontraron resultados para la búsqueda."}
                    </div>
                `);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la búsqueda:", error);
            $("#customerSearchResults").html(`
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i> Error al buscar clientes.
                </div>
            `);
        }
    });
} 
 
function selectCustomer(customerId, customerName, insuranceId, insuranceName, insuranceNumber) {
    $("#customerIdInput").val(customerId);
    $("#customerNameInput").val(customerName);

    const isClaim = $("#IsClaim").val() === "True" || $("#IsClaim").val() === "true";

    
    if (insuranceId && insuranceId > 1) {
        SaleConfig.savedInsuranceData.insuranceId = insuranceId;
        SaleConfig.savedInsuranceData.insuranceName = insuranceName;
        SaleConfig.savedInsuranceData.insuranceNumber = insuranceNumber || "";

        
        
        const defaultCoverPercent = isClaim ? 100 : 80;
        SaleConfig.savedInsuranceData.coverPercent = defaultCoverPercent;

        let infoText = `Seguro registrado del paciente: ${insuranceName}`;
        if (insuranceNumber) {
            infoText += ` - NSS: ${insuranceNumber}`;
        }
        $("#customerInfo").text(infoText);

        if (isClaim) {
            
            $("#insuranceFields").show();
            $("#insuranceId").val(insuranceId);
            $("#insuranceSelect").val(insuranceId);
            $("#InsuranceNumber").val(insuranceNumber || "");
            $("#coverPercentInput").val(100); 
        } else {
            
            const isPrivate = $("input[name='IsPrivate']:checked").val() === "true";
            if (!isPrivate) {
                $("#insuranceId").val(insuranceId);
                $("#insuranceSelect").val(insuranceId);
                $("#InsuranceNumber").val(insuranceNumber || "");
            }
            
        }
    } else {
        
        $("#customerInfo").text("Paciente sin seguro registrado");

        if (isClaim) {
            
            $("#insuranceFields").show();
            $("#insuranceId").val(1);
            $("#insuranceSelect").val(1);
            $("#InsuranceNumber").val("");
            $("#coverPercentInput").val(100); 
        }
        
    }

    $("#customerSearchModal").modal("hide");
    calculateTotals(); 
    reloadProducts();
}
function openNewProductModal() {
    $("#newProductModal").modal("show");
}
 
function saveNewProduct() {
    const form = $("#newProductForm")[0];
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    
    var authorId = 0;
    if ($("#authorSelect").length > 0) {
        authorId = parseInt($("#authorSelect").val()) || 0;

        
        if (!authorId || authorId === 0) {
            alert("Debe seleccionar un Owner antes de crear un producto.");
            return;
        }
    }

    const productData = {
        Name: $("#newProductName").val(),
        CategoryId: parseInt($("#newProductCategory").val()),
        SellPrice: parseFloat($("#newProductPrice").val()),
        Itbis: parseFloat($("#newProductTax").val()),
        Observations: $("#newProductDescription").val(),
        ManageInventory: $("#newProductInventory").is(":checked"),
        BarCode: 0,
        AuthorId: authorId  
    };

    $.ajax({
        url: `${SaleConfig.baseUrl}/SalesAndInventories/CreateProduct`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(productData),
        success: function (result) {
            if (result.success) { 
                $("#newProductModal").modal("hide");
                 
                $("#newProductForm")[0].reset();
                 
                addProductToCart({
                    ProductId: result.productId,
                    ProductName: result.name,
                    CategoryId: result.categoryId,
                    CategoryName: result.categoryName,
                    Quantity: 1,
                    SellPrice: parseFloat(result.sellPrice),
                    Vat: parseFloat(result.itbis),
                    Barcode: "",
                    Stock: 0
                });
                 
                reloadProducts();
                 
                alert("Producto creado exitosamente.");
            } else {
                alert(result.message || "Error al crear el producto.");
            }
        },
        error: function () {
            alert("Error al crear el producto.");
        }
    });
}
 
function reloadProducts() {
    const searchTerm = $("#productSearchInput").val() || "";
    const categoryId = $("#productCategoryFilter").val() || "";
    const isPrivate = $("input[name='IsPrivate']:checked").val() === "true";
    const customerId = $("#customerIdInput").val() || 0;
    const doctorId = $("#doctorSelect").val() || 0;
    const insuranceId = $("#insuranceId").val() || 1;
    const areaId = $("#areaSelect").val() || 0;

    
    var authorId = null;
    if ($("#authorSelect").length > 0) {
        authorId = parseInt($("#authorSelect").val()) || null;

        
        if (!authorId || authorId === 0) {
            $("#productsContainer").html(`
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i> Debe seleccionar un Owner antes de buscar productos.
                </div>
            `);
            return;
        }
    }

    $("#productsContainer").html('<div class="text-center py-5"><i class="fas fa-spinner fa-spin fa-3x"></i><p class="mt-3">Cargando productos...</p></div>');

    $.ajax({
        url: `${SaleConfig.baseUrl}/SalesAndInventories/ProductsFilter`,
        type: 'GET',
        data: {
            param: searchTerm,
            isPrivate: isPrivate,
            customerId: customerId,
            areaId: areaId,
            categoryId: categoryId,
            doctorId: doctorId,
            insuranceId: insuranceId,
            authorId: authorId
        },
        success: function (result) {
            if (result.success && result.table) {
                $("#productsContainer").html(result.table);

                initializeProductEvents();
            } else {
                $("#productsContainer").html(`
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> ${result.message || "No se encontraron productos."}
                    </div>
                `);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error cargando productos:", error);
            $("#productsContainer").html(`
                <div class="alert alert-danger">
                    <i class="fas fa-exclamation-triangle"></i> Error al cargar productos. Por favor, intente nuevamente.
                </div>
            `);
        }
    });
}
 
function initializeProductEvents() { 
    $("#productSearchInput").off("input").on("input", function () {
        const searchTerm = $(this).val().toLowerCase();

        if (searchTerm.length > 0) {
            $("#productsTable tbody tr").each(function () {
                const productName = $(this).find("td:nth-child(2)").text().toLowerCase();
                const categoryName = $(this).find("td:nth-child(1)").text().toLowerCase();

                if (productName.includes(searchTerm) || categoryName.includes(searchTerm)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        } else { 
            $("#productsTable tbody tr").show();
        }
    });
     
    $("#productCategoryFilter").off("change").on("change", function () {
        const categoryId = $(this).val();
        if (categoryId) {
            reloadProducts();  
        } else {
            reloadProducts();  
        }
    });
} 
function addProductToCart(product) {
    if (!product) {
        alert("No hay producto seleccionado.");
        return;
    }

    const quantity = product.Quantity || 1;
    const price = product.SellPrice || 0;
    const tax = product.Vat || 0;
     
    const subtotal = quantity * price;
    const discount = 0;  
    const taxAmount = (subtotal * tax) / 100;
    const total = subtotal + taxAmount - discount;
     
    const existingRow = $(`#selectedProductsBody tr[data-product-id="${product.ProductId}"]`);
    if (existingRow.length > 0) { 
        const existingQty = parseInt(existingRow.find(".product-quantity").val());
        existingRow.find(".product-quantity").val(existingQty + quantity);
         
        updateProductTotals();
    } else { 
        const newProduct = {
            ProductId: product.ProductId,
            ProductName: product.ProductName,
            CategoryId: product.CategoryId,
            CategoryName: product.CategoryName,
            Quantity: quantity,
            SellPrice: price,
            SubTotal: subtotal,
            Vat: tax,
            ProductCharges: taxAmount,
            LineDiscount: 0,
            ProductDiscount: 0,
            TotalDetail: total,
            Barcode: product.Barcode || ""
        };
         
        SaleConfig.selectedProducts.push(newProduct);
         
        const newRow = `
            <tr data-product-id="${product.ProductId}">
                <td>${product.ProductName}</td>
                <td><input type="number" class="form-control form-control-sm product-quantity" value="${quantity}" min="1"></td>
                <td><input type="number" class="form-control form-control-sm product-price" value="${price.toFixed(2)}" step="0.01"></td>
                <td><input type="number" class="form-control form-control-sm product-tax" value="${tax.toFixed(2)}" step="0.01"></td>
                <td><input type="number" class="form-control form-control-sm product-discount" value="0" step="0.01"></td>
                <td class="product-total">${total.toFixed(2)}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-danger remove-product">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;

        $("#selectedProductsBody").append(newRow);
    }
     
    calculateTotals();
}
 
function removeProduct() {
    const row = $(this).closest("tr");
    const productId = row.data("product-id");
    const detailId = row.data("detail-id");

    if (detailId && SaleConfig.isEditMode) { 
        if (confirm("¿Está seguro de eliminar este producto de la factura?")) {
            removeProductFromSale(detailId, row);
        }
    } else { 
        row.remove();
         
        SaleConfig.selectedProducts = SaleConfig.selectedProducts.filter(p => p.ProductId != productId);
         
        calculateTotals();
    }
}
 
function removeProductFromSale(detailId, row) {
    $.ajax({
        url: `${SaleConfig.baseUrl}/SalesAndInventories/RemoveItemFromSale`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ Id: detailId }),
        success: function (result) {
            if (result.status) { 
                row.remove();
                 
                const productId = row.data("product-id");
                SaleConfig.selectedProducts = SaleConfig.selectedProducts.filter(p => p.ProductId != productId);
                 
                calculateTotals();
            } else {
                alert(result.message || "No se pudo eliminar el producto.");
            }
        },
        error: function () {
            alert("Error al eliminar el producto.");
        }
    });
}
 
function updateProductTotals() { 
    $("#selectedProductsBody tr").each(function () {
        const row = $(this);
        const productId = row.data("product-id");

        const quantity = parseInt(row.find(".product-quantity").val()) || 0;
        const price = parseFloat(row.find(".product-price").val()) || 0;
        const tax = parseFloat(row.find(".product-tax").val()) || 0;
        const discountPercent = parseFloat(row.find(".product-discount").val()) || 0;

        const subtotal = quantity * price;
        const discountAmount = (subtotal * discountPercent) / 100;
        const taxAmount = ((subtotal - discountAmount) * tax) / 100;
        const total = subtotal + taxAmount - discountAmount;
         
        row.find(".product-total").text(total.toFixed(2));
         
        const productIndex = SaleConfig.selectedProducts.findIndex(p => p.ProductId == productId);
        if (productIndex >= 0) {
            SaleConfig.selectedProducts[productIndex].Quantity = quantity;
            SaleConfig.selectedProducts[productIndex].SellPrice = price;
            SaleConfig.selectedProducts[productIndex].SubTotal = subtotal;
            SaleConfig.selectedProducts[productIndex].Vat = tax;
            SaleConfig.selectedProducts[productIndex].ProductCharges = taxAmount;
            SaleConfig.selectedProducts[productIndex].LineDiscount = discountPercent;
            SaleConfig.selectedProducts[productIndex].ProductDiscount = discountAmount;
            SaleConfig.selectedProducts[productIndex].TotalDetail = total;
        }
    });
     
    calculateTotals();
}
 
function calculateTotals() {
    let subtotal = 0;
    let taxTotal = 0;
    let discountTotal = 0;
    let grandTotal = 0;
     
    SaleConfig.selectedProducts.forEach(product => {
        subtotal += product.SubTotal;
        taxTotal += product.ProductCharges;
        discountTotal += product.ProductDiscount;
    });
     
    const isPrivate = $("input[name='IsPrivate']:checked").val() === "true";
    if (!isPrivate) {
        const coverPercent = parseFloat($("#coverPercentInput").val()) || 0;
        if (coverPercent > 0) {
            const coverageAmount = (subtotal * coverPercent) / 100;
            discountTotal = coverageAmount;
        }
    }

    grandTotal = subtotal + taxTotal - discountTotal;
     
    $("#subtotalDisplay").text(subtotal.toFixed(2));
    $("#taxTotalDisplay").text(taxTotal.toFixed(2));
    $("#discountTotalDisplay").text(discountTotal.toFixed(2));
    $("#grandTotalDisplay").text(grandTotal.toFixed(2));
     
    $("#subTotalInput").val(subtotal);
    $("#totalChargesInput").val(taxTotal);
    $("#totalDiscountInput").val(discountTotal);
    $("#totalInput").val(grandTotal);
     
    $("#receivedAmountInput").val(grandTotal.toFixed(2));
    $("#changeAmountInput").val("0.00");
     
    const paymentType = $("#paymentTypeSelect").val();
    if (paymentType !== "9") { 
        if (paymentType === "1") { 
            $("#cashAmountInput").val(grandTotal.toFixed(2));
        } else if (paymentType === "3") { 
            $("#cardAmountInput").val(grandTotal.toFixed(2));
        } else if (paymentType === "4") { 
            $("#checkAmountInput").val(grandTotal.toFixed(2));
        } else if (paymentType === "2") { 
            $("#creditNoteAmountInput").val(grandTotal.toFixed(2));
        } else if (paymentType === "8") { 
            $("#transferAmountInput").val(grandTotal.toFixed(2));
        }
    }
}
 
function validateMixedPayment() {
    const grandTotal = parseFloat($("#grandTotalDisplay").text().replace(/,/g, '')) || 0;

    const cash = parseFloat($("#cashAmountInput").val()) || 0;
    const card = parseFloat($("#cardAmountInput").val()) || 0;
    const check = parseFloat($("#checkAmountInput").val()) || 0;
    const creditNote = parseFloat($("#creditNoteAmountInput").val()) || 0;
    const transfer = parseFloat($("#transferAmountInput").val()) || 0;

    const total = cash + card + check + creditNote + transfer;
     
    if (Math.abs(total - grandTotal) > 0.01) {
        alert(`El total de los pagos (${total.toFixed(2)}) no coincide con el total de la factura (${grandTotal.toFixed(2)})`);
        return false;
    }

    return true;
}
 
function saveSale() { 
    if (!validateSaleForm()) {
        return;
    }
     
    if ($("#paymentTypeSelect").val() === "9" && !validateMixedPayment()) {
        return;
    }
     
    const isImmediatePayment = $("input[name='ImmediatePayment']:checked").val() === "true";
    const paymentType = $("#paymentTypeSelect").val();
    let payment = null;

    if (isImmediatePayment) {
        if (paymentType === "9") { 
            payment = {
                PaymentTypeId: parseInt(paymentType),
                Amount: parseFloat($("#cashAmountInput").val()) || 0,
                AmountTc: parseFloat($("#cardAmountInput").val()) || 0,
                AmountCheck: parseFloat($("#checkAmountInput").val()) || 0,
                AmountNc: parseFloat($("#creditNoteAmountInput").val()) || 0,
                AmountTe: parseFloat($("#transferAmountInput").val()) || 0,
                Remarks: $("#paymentRemarks").val(),
                ReceivedAmount: parseFloat($("#receivedAmountInput").val()) || 0,
                DevolvedAmount: parseFloat($("#changeAmountInput").val()) || 0,
                DoesNotRequireOpenCashier: true
            };
        } else { 
            payment = {
                PaymentTypeId: parseInt(paymentType),
                Remarks: $("#paymentRemarks").val(),
                ReceivedAmount: parseFloat($("#receivedAmountInput").val()) || 0,
                DevolvedAmount: parseFloat($("#changeAmountInput").val()) || 0,
                DoesNotRequireOpenCashier: true
            };
             
            if (paymentType === "1") { 
                payment.Amount = parseFloat($("#grandTotalDisplay").text().replace(/,/g, '')) || 0;
            } else if (paymentType === "3") { 
                payment.AmountTc = parseFloat($("#grandTotalDisplay").text().replace(/,/g, '')) || 0;
            } else if (paymentType === "4") { 
                payment.AmountCheck = parseFloat($("#grandTotalDisplay").text().replace(/,/g, '')) || 0;
            } else if (paymentType === "2") { 
                payment.AmountNc = parseFloat($("#grandTotalDisplay").text().replace(/,/g, '')) || 0;
            } else if (paymentType === "8") { 
                payment.AmountTe = parseFloat($("#grandTotalDisplay").text().replace(/,/g, '')) || 0;
            }
        }
    }
     
    const isPrivate = $("input[name='IsPrivate']:checked").val() === "true";

    
    var selectedAuthorId = null;
    if ($("#authorSelect").length > 0) {
        selectedAuthorId = parseInt($("#authorSelect").val()) || null;
    }

    const saleData = {
        SalesId: parseInt($("#SalesId").val()) || 0,
        AreaId: parseInt($("#areaSelect").val()) || null,
        CustomerId: parseInt($("#customerIdInput").val()),
        SalesDateStr: $("#SalesDateStr").val(),
        Conduce: $("#Conduce").val(),
        Remarks: $("#Remarks").val(),
        SubTotal: parseFloat($("#subTotalInput").val()),
        TotalCharges: parseFloat($("#totalChargesInput").val()),
        TotalDiscount: parseFloat($("#totalDiscountInput").val()),
        Total: parseFloat($("#totalInput").val()),
        CashierDetailId: parseInt($("#CashierDetailId").val()) || null,
        IsPrivate: isPrivate,
        InsuranceId: isPrivate ? 1 : parseInt($("#insuranceId").val()),
        DoctorId: parseInt($("#doctorSelect").val()) || null,
        SelectedAuthorId: selectedAuthorId, 
        AutorizationNumber: isPrivate ? "" : $("#AutorizationNumber").val(),
        InsuranceNumber: isPrivate ? "" : $("#InsuranceNumber").val(),
        CoverPercent: isPrivate ? 0 : parseFloat($("#coverPercentInput").val()) || 0,
        CategoryId: parseInt($("#CategoryId").val()) || null,
        FiscalCredit: $("#fiscalCreditSwitch").is(":checked"),
        GubernamentalCredit: $("#govCreditSwitch").is(":checked"),
        ImmediatePayment: $("input[name='ImmediatePayment']:checked").val() === "true",
        DoesNotRequireOpenCashier: true,
        AllowSalesWithoutStock: SaleConfig.allowSalesWithoutStock,
        IsClaim: $("#IsClaim").val() === "True" || $("#IsClaim").val() === "true", 
        SalesDetails: SaleConfig.selectedProducts,
        Payment: payment
    };
     
    $("#saveSaleBtn").prop("disabled", true).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');

    $.ajax({
        url: `${SaleConfig.baseUrl}/SalesAndInventories/SaveSale`,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(saleData),
        success: function (result) {
            if (result.status) {
                let redirectUrl;
                
                if ($("input[name='IsPrivate']:checked").val() === "false") {
                    
                    redirectUrl = `${SaleConfig.baseUrl}/SalesAndInventories/DetailsClaim/${result.salesId}`;
                } else {
                    
                    redirectUrl = `${SaleConfig.baseUrl}/SalesAndInventories/DetailsSale/${result.salesId}`;
                }
                window.location.href = redirectUrl;
            } else {
                alert(result.message || "Error al guardar la factura.");
                $("#saveSaleBtn").prop("disabled", false).html('<i class="fas fa-save"></i> Guardar Factura');
            }
        },
        error: function () {
            alert("Error al guardar la factura.");
            $("#saveSaleBtn").prop("disabled", false).html('<i class="fas fa-save"></i> Guardar Factura');
        }
    });
}
 
function validateSaleForm() { 
    if (!$("#customerIdInput").val()) {
        alert("Debe seleccionar un cliente.");
        $("#searchCustomerBtn").focus();
        return false;
    }
     
    if (SaleConfig.selectedProducts.length === 0) {
        alert("Debe agregar al menos un producto.");
        $("#productSearchInput").focus();
        return false;
    }
     
    if (!$("#SalesDateStr").val()) {
        alert("Debe seleccionar una fecha válida.");
        $("#SalesDateStr").focus();
        return false;
    }
     
    
    if ($("input[name='IsPrivate']:checked").val() === "false") {
        const insuranceId = parseInt($("#insuranceId").val()) || 1;

        
        if (insuranceId === 1) {
            alert("Debe seleccionar una Aseguradora válida para factura con seguro. No puede ser 'Privado'.");
            $("#insuranceSelect").focus();
            return false;
        }

        
        if (!$("#AutorizationNumber").val() || $("#AutorizationNumber").val().trim() === "") {
            alert("Debe ingresar un número de autorización para factura con seguro.");
            $("#AutorizationNumber").focus();
            return false;
        }

        
        if (!$("#InsuranceNumber").val() || $("#InsuranceNumber").val().trim() === "") {
            alert("Debe ingresar el número de afiliado del paciente para factura con seguro.");
            $("#InsuranceNumber").focus();
            return false;
        }
    }

    return true;
}


function initializeUserType7State() {
    
    if ($("#authorSelect").length > 0) {
        const selectedAuthorId = $("#authorSelect").val();

        
        if (!selectedAuthorId || selectedAuthorId === "0") {
            
            $("#doctorSelect").html('<option value="0">-- Seleccione un Owner primero --</option>');

            
            $("#newProductCategory").html('<option value="0">-- Seleccione un Owner primero --</option>');
        }
    }
}


function loadDoctorsByAuthor(authorId) {
    if (!authorId || authorId === "0") {
        $("#doctorSelect").html('<option value="0">-- Seleccione un Owner primero --</option>');
        return;
    }

    $.ajax({
        url: `${SaleConfig.baseUrl}/SalesAndInventories/GetDoctorsByAuthor`,
        type: 'GET',
        data: { authorId: authorId },
        success: function (response) {
            if (response.success) {
                var doctorSelect = $('#doctorSelect');
                doctorSelect.html('<option value="0">-- Ninguno --</option>');

                $.each(response.doctors, function (index, doctor) {
                    doctorSelect.append($('<option></option>')
                        .attr('value', doctor.value)
                        .attr('data-exequatur', doctor.record || '')
                        .attr('data-cmd', doctor.cmd || '')
                        .attr('data-author-id', doctor.authorId || 0)
                        .text(doctor.text));
                });
            } else {
                alert('Error al cargar doctores: ' + response.message);
                $("#doctorSelect").html('<option value="0">-- Error al cargar --</option>');
            }
        },
        error: function () {
            alert('Error al cargar doctores del servidor');
            $("#doctorSelect").html('<option value="0">-- Error al cargar --</option>');
        }
    });
}


function loadCategoriesByAuthor(authorId) {
    if (!authorId || authorId === "0") {
        $("#newProductCategory").html('<option value="0">-- Seleccione un Owner primero --</option>');
        return;
    }

    $.ajax({
        url: `${SaleConfig.baseUrl}/SalesAndInventories/GetCategoriesByAuthorForSale`,
        type: 'GET',
        data: { authorId: authorId },
        success: function (response) {
            if (response.success) {
                var categorySelect = $('#newProductCategory');
                categorySelect.html('');

                $.each(response.categories, function (index, category) {
                    categorySelect.append($('<option></option>')
                        .attr('value', category.value)
                        .text(category.text));
                });
            } else {
                alert('Error al cargar categorías: ' + response.message);
                $("#newProductCategory").html('<option value="0">-- Error al cargar --</option>');
            }
        },
        error: function () {
            alert('Error al cargar categorías del servidor');
            $("#newProductCategory").html('<option value="0">-- Error al cargar --</option>');
        }
    });
}


function loadAreasByAuthor(authorId) {
    if (!authorId || authorId === "0") {
        return;
    }

    $.ajax({
        url: `${SaleConfig.baseUrl}/SalesAndInventories/GetAreasByAuthor`,
        type: 'GET',
        data: { authorId: authorId },
        success: function (response) {
            if (response.success) {
                var areaSelect = $('#areaSelect');
                areaSelect.html('');

                $.each(response.areas, function (index, area) {
                    areaSelect.append($('<option></option>')
                        .attr('value', area.value)
                        .text(area.text));
                });
            } else {
                console.error('Error al cargar áreas: ' + response.message);
            }
        },
        error: function () {
            console.error('Error al cargar áreas del servidor');
        }
    });
}


function loadSaleCategoriesByAuthor(authorId) {
    if (!authorId || authorId === "0") {
        return;
    }

    $.ajax({
        url: `${SaleConfig.baseUrl}/SalesAndInventories/GetSaleCategoriesByAuthor`,
        type: 'GET',
        data: { authorId: authorId },
        success: function (response) {
            if (response.success) {
                var categorySelect = $('#CategoryId'); 
                categorySelect.html('');

                $.each(response.categories, function (index, category) {
                    categorySelect.append($('<option></option>')
                        .attr('value', category.value)
                        .text(category.text));
                });
            } else {
                console.error('Error al cargar categorías de venta: ' + response.message);
            }
        },
        error: function () {
            console.error('Error al cargar categorías de venta del servidor');
        }
    });
}


function getUniqueAuthorIdsFromDoctors() {
    var authorIds = [];

    $('#doctorSelect option').each(function() {
        var optionValue = parseInt($(this).val()) || 0;
        
        if (optionValue > 0) {
            var authorId = parseInt($(this).data('author-id')) || 0;
            if (authorId > 0 && authorIds.indexOf(authorId) === -1) {
                authorIds.push(authorId);
            }
        }
    });

    return authorIds;
}

window.selectCustomer = selectCustomer;