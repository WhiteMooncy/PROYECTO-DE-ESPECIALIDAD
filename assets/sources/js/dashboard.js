// =========================================================================
// ARCHIVO: /assets/js/dashboard.js (GitHub Pages Compatible)
// FUNCIÓN: Maneja la navegación, gráficos, mapa y la carga de datos estáticos.
// =========================================================================

// Cambio a datos estáticos JSON para GitHub Pages
const API_ENDPOINT = '../data/dashboard-data.json';
let map;
let mapInitialized = false;

// Variables de almacenamiento global para los datos
let allDashboardData = null;
let allCommentsData = []; // Comentarios estáticos + usuario (localStorage)

// ------------------------------------
// 1. UTILIDADES Y FUNCIONES DE RENDERIZADO
// ------------------------------------

/** Obtiene los valores de filtro de Categoría y Sentimiento. */
function getActiveFilters() {
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    const sentimentFilter = document.getElementById('sentimentFilter')?.value || 'all';
    return { 
        category: categoryFilter.toLowerCase(), 
        sentiment: sentimentFilter.toLowerCase() 
    };
}

// Renderizar gráficos (Gráfico de barras principal)
function renderBarChart(questionsData) {
    const chartElement = document.getElementById('barChart');
    if (!chartElement) return;

    // Limpiar el contenido anterior
    chartElement.innerHTML = ''; 

    questionsData.forEach(item => {
        const barWrap = document.createElement('div');
        barWrap.className = 'bar-wrap';
        barWrap.innerHTML = `
            <div class="bar-label">${item.label}</div>
            <div class="bar-value">${item.value}%</div>
            <div class="bar-inner" style="width: ${item.value}%;" title="${item.responses} respuestas"></div>
        `;
        chartElement.appendChild(barWrap);
    });
}

// Renderizar gráfico de categorías
function renderCategoryChart(categoriesData) {
    const chartElement = document.getElementById('categoryChart');
    if (!chartElement) return;

    // Limpiar el contenido anterior
    chartElement.innerHTML = ''; 

    categoriesData.forEach(item => {
        const barWrap = document.createElement('div');
        barWrap.className = 'bar-wrap';
        barWrap.innerHTML = `
            <div class="bar-label">${item.label}</div>
            <div class="bar-value">${item.value}%</div>
            <div class="bar-inner category" style="width: ${item.value}%;"></div>
        `;
        chartElement.appendChild(barWrap);
    });
}

// Inicializar y Renderizar Mapa (usando Leaflet)
function initMap(locationsData) {
    try {
        if (!mapInitialized && locationsData && locationsData.length > 0) {
            const mapElement = document.getElementById('map');
            if (!mapElement) return;

            // Coordenadas centrales de Chile (Santiago)
            map = L.map('map').setView([-33.4489, -70.6693], 5); 

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Asegurar que el total de respuestas se calcule correctamente
            const totalResponsesString = allDashboardData?.stats?.totalRespuestas || '0';
            // Usa parseInt y manejo de errores para el total
            const totalResponses = parseInt(totalResponsesString.replace(/,/g, ''), 10) || 0;
            
            locationsData.forEach(location => {
                // El radio del círculo se escala según el porcentaje de respuestas.
                const radius = location.percentage * 5000; 

                const circle = L.circle([location.lat, location.lng], {
                    color: '#3498db',
                    fillColor: '#3498db',
                    fillOpacity: 0.4,
                    radius: radius
                }).addTo(map);

                // Cálculo del total de usuarios por ciudad
                const usersInCity = Math.round(totalResponses * location.percentage / 100);

                circle.bindPopup(`
                    <strong>${location.city}</strong><br>
                    Respuestas: ${location.percentage}%<br>
                    Total: ${usersInCity.toLocaleString('es-CL')} usuarios
                `);
            });

            mapInitialized = true;
            
            // Forzar actualización del tamaño del mapa
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }
    } catch (error) {
        console.error('Error inicializando el mapa:', error);
    }
}

// Renderizar tabla de usuarios
function renderUsersTable(usersData) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = usersData.map(user => {
        const initials = user.name.split(' ').map(n => n[0]).join('');
        return `
            <div class="table-row">
                <div class="user-info">
                    <div class="user-avatar">${initials}</div>
                    <span>${user.name}</span>
                </div>
                <div>${user.location}</div>
                <div>${user.date}</div>
                <div><span class="status-badge ${user.status === 'Completa' ? 'success' : 'pending'}">${user.status}</span></div>
            </div>
        `;
    }).join('');
}


// FUNCIÓN: Renderizar y Filtrar Comentarios
function renderCommentsList(comments) {
    const commentsListElement = document.getElementById('commentsList');
    if (!commentsListElement) return;

    // Obtener filtros activos
    const { category: categoryFilter, sentiment: sentimentFilter } = getActiveFilters();

    // 1. Filtrar los datos
    const filteredComments = comments.filter(comment => {
        const matchesCategory = categoryFilter === 'all' || comment.filtro.toLowerCase() === categoryFilter;
        const matchesSentiment = sentimentFilter === 'all' || comment.sentimiento.toLowerCase() === sentimentFilter;
        return matchesCategory && matchesSentiment;
    });

    // 2. Generar HTML
    if (filteredComments.length === 0) {
        commentsListElement.innerHTML = `
            <div class="comment-item placeholder">
                No se encontraron comentarios que coincidan con los filtros seleccionados.
            </div>
        `;
    } else {
        commentsListElement.innerHTML = filteredComments.map(comment => {
            const sentimentClass = `sentiment-${comment.sentimiento.toLowerCase()}`;
            let borderColor = '#ccc'; // Color por defecto

            // Asignar color de borde según el sentimiento
            if (comment.sentimiento === 'Negativo') borderColor = 'var(--danger)';
            else if (comment.sentimiento === 'Positivo') borderColor = 'var(--success)';
            else if (comment.sentimiento === 'Neutral') borderColor = '#ffc107'; // Amarillo/warning

            return `
                <div class="comment-item" 
                    data-category="${comment.filtro.toLowerCase()}" 
                    data-sentiment="${comment.sentimiento.toLowerCase()}"
                    style="border-left-color: ${borderColor};">
                    
                    <div class="comment-header">
                        <div class="comment-category">${comment.filtro}</div>
                        <div class="comment-sentiment ${sentimentClass}">
                            ${comment.sentimiento}
                        </div>
                    </div>
                    <div class="comment-text">
                        ${comment.textoOriginal}
                    </div>
                    <div class="comment-footer">
                        <small>ID: ${comment.idComentario} | Estado: ${comment.respondido ? 'Respondido' : 'Pendiente'}</small>
                    </div>
                </div>
            `;
        }).join('');
    }
}


// ------------------------------------
// 2. LÓGICA DE NAVEGACIÓN Y CARGA DE DATOS
// ------------------------------------

// Manejar la navegación entre secciones
function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            // Actualizar la clase activa del menú
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Mostrar la sección correspondiente
            document.querySelectorAll('.section').forEach(section => {
                if (section.id.startsWith(sectionId) || (sectionId === 'results' && section.id === 'results')) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // Si se activa la sección del mapa, forzar la actualización de Leaflet
            if (sectionId === 'map') {
                setTimeout(() => {
                    if (mapInitialized) {
                        map.invalidateSize();
                    } else if (allDashboardData) {
                        initMap(allDashboardData.locations);
                    }
                }, 100);
            }
        });
    });
}

// Configurar los event listeners para los filtros de comentarios
function setupCommentFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sentimentFilter = document.getElementById('sentimentFilter');
    // El botón 'applyFilterBtn' ya no es necesario, solo los listeners de cambio
    
    if (categoryFilter) {
        // Ejecutar el renderizado cada vez que la categoría cambia
        categoryFilter.addEventListener('change', () => {
            renderCommentsList(allCommentsData);
        });
    }

    if (sentimentFilter) {
         // Ejecutar el renderizado cada vez que el sentimiento cambia
        sentimentFilter.addEventListener('change', () => {
            renderCommentsList(allCommentsData);
        });
    }

    // Se asume que el botón de aplicar filtros será eliminado del HTML,
    // pero si existe, su listener anterior era:
    // const applyFilterBtn = document.getElementById('applyFilterBtn');
    // if (applyFilterBtn) applyFilterBtn.style.display = 'none'; 
}

// Función principal para cargar y renderizar todos los datos
async function fetchDataAndRender() {
    try {
        // 1. Cargar datos base desde JSON estático
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allDashboardData = await response.json();

        // 2. Cargar comentarios de localStorage (generados por el usuario)
        const storage = new StorageManager();
        const userComments = storage.getComments();

        // 3. Combinar comentarios estáticos + usuario
        allCommentsData = [...allDashboardData.comentarios, ...userComments];

        // 4. Actualizar estadísticas con datos reales
        updateStatsWithUserData(storage);

        // 5. Renderizar comentarios
        renderCommentsList(allCommentsData);

        // 6. Configurar el listener de filtros (ahora reactivos)
        setupCommentFilters();

        // 3. Renderizar Estadísticas
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 4) {
            statCards[0].querySelector('.stat-card-value').textContent = allDashboardData.stats.totalRespuestas;
            statCards[1].querySelector('.stat-card-value').textContent = allDashboardData.stats.tasaCompletacion;
            statCards[2].querySelector('.stat-card-value').textContent = allDashboardData.stats.promedioTiempo;
            statCards[3].querySelector('.stat-card-value').textContent = allDashboardData.stats.satisfaccion;
        }

        // 4. Renderizar Gráficos
        renderBarChart(allDashboardData.questions);
        renderCategoryChart(allDashboardData.categories);

        // 5. Renderizar Tabla de Usuarios
        renderUsersTable(allDashboardData.users);

        // 6. Inicializar Mapa (siempre con los datos)
        initMap(allDashboardData.locations);


    } catch (error) {
        console.error('Error al cargar datos del dashboard:', error);
        // Mostrar un mensaje de error al usuario
        const commentsList = document.getElementById('commentsList');
        if (commentsList) {
            commentsList.innerHTML = `
                <div class="comment-item placeholder" style="border-left-color: var(--danger);">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p><strong>Error al cargar datos</strong></p>
                    <p>No se pudo cargar el archivo dashboard-data.json</p>
                    <p>Verifica que el archivo exista en la carpeta /data/</p>
                </div>
            `;
        }
    }
}

// Nueva función para actualizar estadísticas con datos del usuario
function updateStatsWithUserData(storage) {
    try {
        const surveys = storage.getSurveys();
        const comments = storage.getComments();
        
        // Actualizar contador de respuestas totales
        const baseRespuestas = parseInt(allDashboardData.stats.totalRespuestas.replace(/,/g, ''), 10) || 0;
        const totalRespuestas = baseRespuestas + surveys.length;
        
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 1) {
            const valueElement = statCards[0].querySelector('.stat-card-value');
            if (valueElement) {
                valueElement.textContent = totalRespuestas.toLocaleString('es-CL');
            }
        }
    } catch (error) {
        console.error('Error actualizando estadísticas:', error);
    }
}

// Iniciar la aplicación al cargar la ventana
window.onload = function() {
    setupNavigation();
    fetchDataAndRender();
};
