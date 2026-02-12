

document.addEventListener("DOMContentLoaded", function () {
    const btnSave = document.querySelector("#btnSave");
    const btnCancel = document.querySelector("#btnCancel");
    const floatingActions = document.querySelector(".medical-floating-actions");
    const form = btnSave ? btnSave.closest("form") : null;
    
    
    let originalSaveContent = '';
    let originalCancelContent = '';
    
    if (btnSave) {
        originalSaveContent = btnSave.innerHTML;
    }
    
    if (btnCancel) {
        originalCancelContent = btnCancel.innerHTML;
    }

    function showLoadingState() {
        if (btnSave) {
            btnSave.disabled = true;
            btnSave.classList.add('medical-loading');
            btnSave.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                    <polyline points="17,21 17,13 7,13 7,21"/>
                    <polyline points="7,3 7,8 15,8"/>
                </svg>
                <span>Saving...</span>
            `;
        }
        
        
        if (btnCancel) {
            btnCancel.style.opacity = '0.5';
            btnCancel.style.pointerEvents = 'none';
        }
    }

    function hideLoadingState() {
        if (btnSave) {
            btnSave.disabled = false;
            btnSave.classList.remove('medical-loading');
            btnSave.innerHTML = originalSaveContent;
        }
        
        
        if (btnCancel) {
            btnCancel.style.opacity = '';
            btnCancel.style.pointerEvents = '';
        }
    }

    
    if (btnSave) {
        btnSave.addEventListener("click", function (e) {
            
            setTimeout(() => {
                if (form && typeof $(form).valid === "function" && !$(form).valid()) {
                    return; 
                }
                showLoadingState();
            }, 50);
        });
    }

    
    if (form && btnSave) {
        form.addEventListener("submit", function (e) {
            
            if (typeof $(form).valid === "function" && !$(form).valid()) {
                return;
            }
            showLoadingState();
        });
    }

    
    document.addEventListener('focusin', () => {
        setTimeout(() => {
            const errorElements = document.querySelectorAll('.field-validation-error:not(:empty), .validation-summary-errors:not(:empty)');
            
            if (errorElements.length > 0) {
                hideLoadingState();
                
                
                if (btnSave) {
                    btnSave.disabled = true;
                }
            } else {
                
                if (btnSave && btnSave.disabled && !btnSave.classList.contains('medical-loading')) {
                    btnSave.disabled = false;
                }
            }
        }, 100);
    });

    
    document.addEventListener('input', () => {
        if (btnSave && btnSave.classList.contains('medical-loading')) {
            const errorElements = document.querySelectorAll('.field-validation-error:not(:empty)');
            if (errorElements.length > 0) {
                hideLoadingState();
            }
        }
    });
    
    
    initializeMedicalTables();
});



function initializeMedicalTables() {
    
    document.querySelectorAll('.medical-table').forEach(table => {
        initializeTableSorting(table);
        initializeTableFiltering(table);
    });
    
    
    document.querySelectorAll('.medical-table-search input').forEach(input => {
        input.addEventListener('input', debounce(function() {
            filterTable(this.closest('.medical-table-wrapper'), this.value);
        }, 300));
    });
    
    
    document.querySelectorAll('.medical-table-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.closest('.medical-table-filter');
            filter.classList.toggle('active');
            
            
            document.querySelectorAll('.medical-table-filter').forEach(f => {
                if (f !== filter) f.classList.remove('active');
            });
        });
    });
    
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.medical-table-filter')) {
            document.querySelectorAll('.medical-table-filter').forEach(f => {
                f.classList.remove('active');
            });
        }
    });
}

function initializeTableSorting(table) {
    table.querySelectorAll('th.sortable').forEach(header => {
        header.addEventListener('click', function() {
            const column = this.cellIndex;
            const currentSort = this.classList.contains('asc') ? 'asc' : 
                               this.classList.contains('desc') ? 'desc' : 'none';
            
            
            table.querySelectorAll('th.sortable').forEach(h => {
                h.classList.remove('asc', 'desc');
                h.removeAttribute('aria-sort');
            });
            
            
            let newSort = 'asc';
            if (currentSort === 'asc') newSort = 'desc';
            else if (currentSort === 'desc') newSort = 'none';
            
            if (newSort !== 'none') {
                this.classList.add(newSort);
                this.setAttribute('aria-sort', newSort === 'asc' ? 'ascending' : 'descending');
                sortTable(table, column, newSort);
            }
        });
    });
}

function sortTable(table, column, direction) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const sortedRows = rows.sort((a, b) => {
        const aText = a.cells[column].textContent.trim();
        const bText = b.cells[column].textContent.trim();
        
        
        const aNum = parseFloat(aText);
        const bNum = parseFloat(bText);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
            return direction === 'asc' ? aNum - bNum : bNum - aNum;
        }
        
        
        return direction === 'asc' ? 
            aText.localeCompare(bText) : 
            bText.localeCompare(aText);
    });
    
    sortedRows.forEach(row => tbody.appendChild(row));
}

function filterTable(wrapper, searchTerm) {
    const table = wrapper.querySelector('.medical-table');
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const matches = text.includes(searchTerm.toLowerCase());
        row.style.display = matches ? '' : 'none';
    });
    
    updateTableInfo(wrapper);
}

function updateTableInfo(wrapper) {
    const table = wrapper.querySelector('.medical-table');
    const rows = table.querySelectorAll('tbody tr');
    const visibleRows = table.querySelectorAll('tbody tr:not([style*="display: none"])');
    const info = wrapper.querySelector('.medical-table-info');
    
    if (info) {
        info.textContent = `Showing ${visibleRows.length} of ${rows.length} entries`;
    }
}

function initializeTableFiltering(table) {
    
    const wrapper = table.closest('.medical-table-wrapper');
    
    wrapper.querySelectorAll('.medical-table-filter-option').forEach(option => {
        option.addEventListener('click', function() {
            const filter = this.closest('.medical-table-filter');
            const filterValue = this.dataset.value;
            const filterColumn = filter.dataset.column;
            
            
            const btn = filter.querySelector('.medical-table-filter-btn span');
            btn.textContent = this.textContent;
            
            
            applyColumnFilter(table, filterColumn, filterValue);
            
            
            filter.classList.remove('active');
        });
    });
}

function applyColumnFilter(table, column, value) {
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        if (value === 'all') {
            row.style.display = '';
        } else {
            const cellValue = row.cells[column]?.textContent.toLowerCase();
            const matches = cellValue?.includes(value.toLowerCase());
            row.style.display = matches ? '' : 'none';
        }
    });
    
    updateTableInfo(table.closest('.medical-table-wrapper'));
}


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
