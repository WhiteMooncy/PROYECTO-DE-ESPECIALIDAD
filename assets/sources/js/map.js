/**
 * Interactive Map Module for Admin Panel
 * Leaflet-based geographic visualization
 */

class InteractiveMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.markerClusterGroup = null;
        this.init();
    }

    async init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initMap());
        } else {
            this.initMap();
        }
    }

    initMap() {
        try {
            // Ocultar loading después de 1 segundo
            setTimeout(() => {
                const loading = document.getElementById('map-loading');
                if (loading) loading.style.display = 'none';
            }, 1000);

            // Coordenadas de Chile (Valle Azul ficticio)
            const chileCenterLat = -33.4489;
            const chileCenterLng = -70.6693;

            // Inicializar mapa
            this.map = L.map('map', {
                center: [chileCenterLat, chileCenterLng],
                zoom: 6,
                zoomControl: true,
                scrollWheelZoom: true
            });

            // Agregar capa de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }).addTo(this.map);

            // Agregar marcadores de ejemplo
            this.addSampleMarkers();

            // Inicializar controles
            this.initControls();

            // Actualizar KPIs
            this.updateKPIs();

            console.log('✅ Mapa inicializado correctamente');

        } catch (error) {
            console.error('❌ Error al inicializar el mapa:', error);
            this.showMapError();
        }
    }

    addSampleMarkers() {
        // Datos de ejemplo para la Represa Valle Azul
        const locations = [
            {
                lat: -33.4489,
                lng: -70.6693,
                title: 'Represa Valle Azul - Zona Central',
                description: 'Zona principal afectada',
                surveys: 45,
                satisfaction: 72
            },
            {
                lat: -33.5489,
                lng: -70.7693,
                title: 'Comunidad Norte',
                description: 'Área de reubicación',
                surveys: 32,
                satisfaction: 65
            },
            {
                lat: -33.3489,
                lng: -70.5693,
                title: 'Comunidad Sur',
                description: 'Zona de impacto ambiental',
                surveys: 28,
                satisfaction: 58
            },
            {
                lat: -33.4989,
                lng: -70.6193,
                title: 'Comunidad Este',
                description: 'Área de compensaciones',
                surveys: 38,
                satisfaction: 81
            },
            {
                lat: -33.3989,
                lng: -70.7193,
                title: 'Comunidad Oeste',
                description: 'Zona de empleos locales',
                surveys: 41,
                satisfaction: 88
            }
        ];

        locations.forEach(location => {
            // Color según satisfacción
            let color = '#0077b6'; // Alta (>70%)
            if (location.satisfaction < 70 && location.satisfaction >= 50) {
                color = '#00b4d8'; // Media (50-70%)
            } else if (location.satisfaction < 50) {
                color = '#90e0ef'; // Baja (<50%)
            }

            // Crear icono personalizado
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="
                    background: ${color};
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 12px;
                ">${location.surveys}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            // Crear marcador
            const marker = L.marker([location.lat, location.lng], { icon: customIcon })
                .addTo(this.map);

            // Popup con información
            const popupContent = `
                <div style="font-family: 'Poppins', sans-serif; min-width: 200px;">
                    <h3 style="margin: 0 0 10px 0; color: #0077b6; font-size: 1.1rem;">
                        <i class="fas fa-map-marker-alt"></i> ${location.title}
                    </h3>
                    <p style="margin: 5px 0; color: #666;">
                        <strong>Descripción:</strong> ${location.description}
                    </p>
                    <p style="margin: 5px 0; color: #666;">
                        <i class="fas fa-poll"></i> <strong>Encuestas:</strong> ${location.surveys}
                    </p>
                    <p style="margin: 5px 0; color: #666;">
                        <i class="fas fa-smile"></i> <strong>Satisfacción:</strong> ${location.satisfaction}%
                    </p>
                    <div style="
                        margin-top: 10px;
                        height: 6px;
                        background: #e2e8f0;
                        border-radius: 10px;
                        overflow: hidden;
                    ">
                        <div style="
                            width: ${location.satisfaction}%;
                            height: 100%;
                            background: linear-gradient(90deg, #0077b6, #00b4d8);
                            border-radius: 10px;
                        "></div>
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent);
            this.markers.push(marker);
        });
    }

    initControls() {
        // Toggle de búsqueda
        const searchToggle = document.getElementById('search-toggle');
        const searchPanel = document.getElementById('search-panel');
        if (searchToggle && searchPanel) {
            searchToggle.addEventListener('click', () => {
                searchPanel.style.display = searchPanel.style.display === 'none' ? 'block' : 'none';
            });
        }

        // Toggle de filtros
        const filterToggle = document.getElementById('filter-toggle');
        const filterPanel = document.getElementById('filter-panel');
        if (filterToggle && filterPanel) {
            filterToggle.addEventListener('click', () => {
                filterPanel.style.display = filterPanel.style.display === 'none' ? 'block' : 'none';
            });
        }

        // Toggle de leyenda
        const legendToggle = document.getElementById('legend-toggle');
        const legendPanel = document.getElementById('legend-panel');
        if (legendToggle && legendPanel) {
            legendToggle.addEventListener('click', () => {
                legendPanel.style.display = legendPanel.style.display === 'none' ? 'block' : 'none';
            });
        }

        // Pantalla completa
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                const mapElement = document.getElementById('map');
                if (mapElement.requestFullscreen) {
                    mapElement.requestFullscreen();
                }
            });
        }

        // Exportar datos
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportMapData();
            });
        }
    }

    updateKPIs() {
        // Actualizar KPIs del dashboard
        const totalLocations = document.getElementById('total-locations');
        const totalSurveys = document.getElementById('total-surveys');
        const totalRegions = document.getElementById('total-regions');
        const lastUpdate = document.getElementById('last-update');

        if (totalLocations) totalLocations.textContent = this.markers.length;
        if (totalSurveys) totalSurveys.textContent = '184';
        if (totalRegions) totalRegions.textContent = '5';
        if (lastUpdate) lastUpdate.textContent = 'Hoy';
    }

    exportMapData() {
        const data = {
            totalMarkers: this.markers.length,
            exportDate: new Date().toISOString(),
            locations: []
        };

        alert('Función de exportación en desarrollo\n\nTotal de ubicaciones: ' + this.markers.length);
    }

    showMapError() {
        const mapDiv = document.getElementById('map');
        if (mapDiv) {
            mapDiv.innerHTML = `
                <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    color: #666;
                    padding: 2rem;
                    text-align: center;
                ">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #f59e0b; margin-bottom: 1rem;"></i>
                    <h3>Error al cargar el mapa</h3>
                    <p>Por favor, recarga la página o contacta al administrador.</p>
                </div>
            `;
        }
    }
}

// Inicializar mapa
const mapInstance = new InteractiveMap();
