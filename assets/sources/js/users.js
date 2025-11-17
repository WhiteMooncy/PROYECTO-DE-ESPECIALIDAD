// users.js - Gestión de usuarios del sistema

// Inicializar sistema de autenticación
const auth = new AuthManager();
auth.initDashboard();

// Navbar Toggle
const navbarToggler = document.getElementById('navbar-toggler');
const navbarMenu = document.getElementById('navbar-menu');

if(navbarToggler){
    navbarToggler.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        navbarToggler.classList.toggle('active');
    });
}

// Search Toggle
const searchToggle = document.getElementById('search-toggle');
const searchPanel = document.getElementById('search-panel');
const filterToggle = document.getElementById('filter-toggle');
const filterPanel = document.getElementById('filter-panel');

if(searchToggle && searchPanel) {
    searchToggle.addEventListener('click', () => {
        const isVisible = searchPanel.style.display !== 'none';
        searchPanel.style.display = isVisible ? 'none' : 'block';
        searchToggle.classList.toggle('active');
        
        if (!isVisible && filterPanel) {
            filterPanel.style.display = 'none';
            if(filterToggle) filterToggle.classList.remove('active');
        }
    });
}

if(filterToggle && filterPanel) {
    filterToggle.addEventListener('click', () => {
        const isVisible = filterPanel.style.display !== 'none';
        filterPanel.style.display = isVisible ? 'none' : 'block';
        filterToggle.classList.toggle('active');
        
        if (!isVisible && searchPanel) {
            searchPanel.style.display = 'none';
            if(searchToggle) searchToggle.classList.remove('active');
        }
    });
}

// Search Functionality
const userSearch = document.getElementById('user-search');
if(userSearch) {
    userSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('.users-table .table-row');
        
        tableRows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}

// Filter Functionality
const applyFilters = document.getElementById('apply-user-filters');
if(applyFilters) {
    applyFilters.addEventListener('click', () => {
        const statusFilter = document.getElementById('status-filter').value;
        const sortFilter = document.getElementById('sort-filter').value;
        const tableRows = Array.from(document.querySelectorAll('.users-table .table-row'));
        
        // Filter by status
        tableRows.forEach(row => {
            if(statusFilter === 'all') {
                row.style.display = '';
            } else {
                const statusBadge = row.querySelector('.status-badge');
                const isActive = statusBadge && statusBadge.textContent.toLowerCase().includes('activo');
                
                if(statusFilter === 'active' && isActive) {
                    row.style.display = '';
                } else if(statusFilter === 'pending' && !isActive) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });

        // Sort
        const container = document.querySelector('.users-table');
        const header = container.querySelector('.table-header');
        
        if(sortFilter === 'name') {
            tableRows.sort((a, b) => {
                const nameA = a.querySelector('.user-info div div').textContent;
                const nameB = b.querySelector('.user-info div div').textContent;
                return nameA.localeCompare(nameB);
            });
        } else if(sortFilter === 'name-desc') {
            tableRows.sort((a, b) => {
                const nameA = a.querySelector('.user-info div div').textContent;
                const nameB = b.querySelector('.user-info div div').textContent;
                return nameB.localeCompare(nameA);
            });
        }
        
        tableRows.forEach(row => container.appendChild(row));
        
        alert('Filtros aplicados correctamente');
    });
}

// Export Users
const exportBtn = document.getElementById('export-users-btn');
if(exportBtn) {
    exportBtn.addEventListener('click', () => {
        const users = [];
        const tableRows = document.querySelectorAll('.users-table .table-row');
        
        tableRows.forEach(row => {
            const userName = row.querySelector('.user-info div div').textContent;
            const userEmail = row.querySelector('.user-info small').textContent;
            const rut = row.querySelectorAll('[data-label="RUT"]')[0]?.textContent.trim();
            const status = row.querySelector('.status-badge')?.textContent.trim();
            
            users.push({
                nombre: userName,
                email: userEmail,
                rut: rut,
                estado: status
            });
        });

        const data = {
            usuarios: users,
            total: users.length,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hydro-conecta-usuarios-' + new Date().toISOString().split('T')[0] + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('¡Usuarios exportados exitosamente!');
    });
}

// Add User Button
const addUserBtn = document.getElementById('add-user-btn');
if(addUserBtn) {
    addUserBtn.addEventListener('click', () => {
        alert('Funcionalidad de agregar usuario en desarrollo');
    });
}

// Animate KPI values on load
function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = Math.round(end);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Animate KPIs on load
window.addEventListener('load', () => {
    animateValue('total-users', 0, 8, 1000);
    animateValue('active-users', 0, 6, 1200);
    animateValue('pending-users', 0, 2, 800);
    animateValue('total-comments', 0, 24, 1500);
});
