// Datos de ejemplo
const surveyData = {
    questions: [
        { label: 'Pregunta 1', value: 85, responses: 1060 },
        { label: 'Pregunta 2', value: 72, responses: 898 },
        { label: 'Pregunta 3', value: 91, responses: 1135 },
        { label: 'Pregunta 4', value: 68, responses: 848 },
        { label: 'Pregunta 5', value: 79, responses: 985 }
    ],
    categories: [
        { label: 'Satisfacción', value: 92 },
        { label: 'Calidad', value: 88 },
        { label: 'Precio', value: 75 },
        { label: 'Servicio', value: 94 }
    ],
    users: [
        { name: 'María González', location: 'Santiago, Chile', date: '2025-10-27 14:30', lat: -33.4489, lng: -70.6693 },
        { name: 'Carlos Rodríguez', location: 'Valparaíso, Chile', date: '2025-10-27 10:15', lat: -33.0472, lng: -71.6127 },
        { name: 'Ana Martínez', location: 'Concepción, Chile', date: '2025-10-26 16:45', lat: -36.8201, lng: -73.0444 },
        { name: 'Juan Pérez', location: 'La Serena, Chile', date: '2025-10-26 09:20', lat: -29.9027, lng: -71.2519 },
        { name: 'Sofía López', location: 'Antofagasta, Chile', date: '2025-10-25 13:55', lat: -23.6509, lng: -70.3975 },
        { name: 'Diego Silva', location: 'Temuco, Chile', date: '2025-10-25 11:30', lat: -38.7359, lng: -72.5904 },
        { name: 'Laura Torres', location: 'Rancagua, Chile', date: '2025-10-24 15:10', lat: -34.1705, lng: -70.7407 },
        { name: 'Roberto Muñoz', location: 'Puerto Montt, Chile', date: '2025-10-24 08:45', lat: -41.4693, lng: -72.9424 }
    ],
    locations: [
        { city: 'Santiago', lat: -33.4489, lng: -70.6693, percentage: 45 },
        { city: 'Valparaíso', lat: -33.0472, lng: -71.6127, percentage: 15 },
        { city: 'Concepción', lat: -36.8201, lng: -73.0444, percentage: 12 },
        { city: 'La Serena', lat: -29.9027, lng: -71.2519, percentage: 8 },
        { city: 'Antofagasta', lat: -23.6509, lng: -70.3975, percentage: 7 },
        { city: 'Temuco', lat: -38.7359, lng: -72.5904, percentage: 6 },
        { city: 'Rancagua', lat: -34.1705, lng: -70.7407, percentage: 4 },
        { city: 'Puerto Montt', lat: -41.4693, lng: -72.9424, percentage: 3 }
    ]
};

// Variables globales
let map;
let mapInitialized = false;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderBarChart('barChart', surveyData.questions);
    renderBarChart('categoryChart', surveyData.categories);
    renderUsersTable();
});

// Sistema de navegación
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            
            // Actualizar navegación activa
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Actualizar secciones activas
            sections.forEach(section => section.classList.remove('active'));
            
            // Mostrar sección correspondiente
            switch(sectionId) {
                case 'results':
                    document.getElementById('results').classList.add('active');
                    break;
                case 'map':
                    document.getElementById('map-section').classList.add('active');
                    if (!mapInitialized) {
                        initMap();
                    }
                    break;
                case 'users':
                    document.getElementById('users-section').classList.add('active');
                    break;
            }
        });
    });
}

// Renderizar gráficos de barras
function renderBarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const maxValue = Math.max(...data.map(d => d.value));
    
    container.innerHTML = data.map(item => `
        <div class="bar-item">
            <div class="bar" style="height: ${(item.value / maxValue) * 100}%">
                <div class="bar-value">${item.value}%</div>
            </div>
            <div class="bar-label">${item.label}</div>
        </div>
    `).join('');
}

// Inicializar mapa con Leaflet
function initMap() {
    if (mapInitialized) return;
    
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    try {
        map = L.map('map').setView([-33.4489, -70.6693], 5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        surveyData.locations.forEach(location => {
            const radius = location.percentage * 500;
            
            const circle = L.circle([location.lat, location.lng], {
                color: '#3498db',
                fillColor: '#3498db',
                fillOpacity: 0.4,
                radius: radius
            }).addTo(map);

            circle.bindPopup(`
                <strong>${location.city}</strong><br>
                Respuestas: ${location.percentage}%<br>
                Total: ${Math.round(1247 * location.percentage / 100)} usuarios
            `);
        });

        mapInitialized = true;
        
        // Forzar actualización del tamaño del mapa
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    } catch (error) {
        console.error('Error inicializando el mapa:', error);
    }
}

// Renderizar tabla de usuarios
function renderUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = surveyData.users.map(user => {
        const initials = user.name.split(' ').map(n => n[0]).join('');
        return `
            <div class="table-row">
                <div class="user-info">
                    <div class="user-avatar">${initials}</div>
                    <span>${user.name}</span>
                </div>
                <div>${user.location}</div>
                <div>${user.date}</div>
                <div><span class="badge badge-active">Completado</span></div>
            </div>
        `;
    }).join('');
}