// =========================================================================
// ARCHIVO: /assets/js/dashboard.js
// FUNCIÓN: Maneja la navegación, gráficos, mapa y la carga de datos.
// =========================================================================

// Configuración de endpoints
const API_CONFIG = {
    // Intentar usar Flask API primero, fallback a JSON estático
    FLASK_API: 'http://127.0.0.1:5000/api/dashboard',
    STATIC_JSON: '../data/dashboard-data.json',
    TIMEOUT: 5000 // 5 segundos timeout
};

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


// Función para sanitizar HTML y prevenir XSS
function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
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

    // 2. Generar HTML con sanitización
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
                    data-category="${escapeHTML(comment.filtro.toLowerCase())}" 
                    data-sentiment="${escapeHTML(comment.sentimiento.toLowerCase())}"
                    style="border-left-color: ${borderColor};">
                    
                    <div class="comment-header">
                        <div class="comment-category">${escapeHTML(comment.filtro)}</div>
                        <div class="comment-sentiment ${sentimentClass}">
                            ${escapeHTML(comment.sentimiento)}
                        </div>
                    </div>
                    <div class="comment-text">
                        ${escapeHTML(comment.textoOriginal)}
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

// Función para mostrar loading state
function showLoadingState(show = true) {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    if (show) {
        commentsList.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Cargando datos del dashboard...</p>
            </div>
        `;
    }
}

// Función para mostrar mensaje de error
function showErrorMessage(message, details = '') {
    const commentsList = document.getElementById('commentsList');
    if (commentsList) {
        commentsList.innerHTML = `
            <div class="comment-item placeholder" style="border-left-color: var(--danger);">
                <i class="fas fa-exclamation-triangle"></i>
                <p><strong>Error al cargar datos</strong></p>
                <p>${escapeHTML(message)}</p>
                ${details ? `<p class="error-details">${escapeHTML(details)}</p>` : ''}
                <button onclick="location.reload()" class="btn-retry">
                    <i class="fas fa-redo"></i> Reintentar
                </button>
            </div>
        `;
    }
}

// Función para intentar cargar desde Flask API con timeout
async function fetchWithTimeout(url, timeout = API_CONFIG.TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// Función principal para cargar y renderizar todos los datos
async function fetchDataAndRender() {
    showLoadingState(true);
    
    try {
        let response;
        let usingFlaskAPI = false;
        
        // 1. Intentar cargar desde Flask API primero
        try {
            response = await fetchWithTimeout(API_CONFIG.FLASK_API);
            if (response.ok) {
                usingFlaskAPI = true;
                console.log('✅ Conectado a Flask API');
            } else {
                throw new Error('Flask API no disponible');
            }
        } catch (flaskError) {
            console.warn('⚠️ Flask API no disponible, usando JSON estático:', flaskError.message);
            // Fallback a JSON estático
            response = await fetch(API_CONFIG.STATIC_JSON);
        }
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        allDashboardData = await response.json();
        
        // Mostrar indicador de fuente de datos
        if (usingFlaskAPI) {
            console.log('📊 Datos cargados desde Flask API con IA activa');
        } else {
            console.log('📄 Datos cargados desde JSON estático');
        }

        // Guardar en caché para uso offline
        try {
            localStorage.setItem('dashboard-cache', JSON.stringify(allDashboardData));
            localStorage.setItem('dashboard-cache-time', Date.now().toString());
        } catch (e) {
            console.warn('No se pudo guardar en caché:', e);
        }
        
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

        // 7. Renderizar Estadísticas
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length >= 4) {
            statCards[0].querySelector('.stat-card-value').textContent = allDashboardData.stats.totalRespuestas;
            statCards[1].querySelector('.stat-card-value').textContent = allDashboardData.stats.tasaCompletacion;
            statCards[2].querySelector('.stat-card-value').textContent = allDashboardData.stats.promedioTiempo;
            statCards[3].querySelector('.stat-card-value').textContent = allDashboardData.stats.satisfaccion;
        }

        // 8. Renderizar Gráficos
        renderBarChart(allDashboardData.questions);
        renderCategoryChart(allDashboardData.categories);

        // 9. Renderizar Tabla de Usuarios
        renderUsersTable(allDashboardData.users);

        // 10. Inicializar Mapa (siempre con los datos)
        initMap(allDashboardData.locations);


    } catch (error) {
        console.error('❌ Error al cargar datos del dashboard:', error);
        
        // Determinar tipo de error
        let errorMessage = 'No se pudieron cargar los datos';
        let errorDetails = '';
        
        if (error.name === 'AbortError') {
            errorMessage = 'Tiempo de espera agotado';
            errorDetails = 'El servidor tardó demasiado en responder. Verifica tu conexión.';
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Error de conexión';
            errorDetails = 'No se pudo conectar al servidor. Verifica que el backend esté ejecutándose.';
        } else if (error.message.includes('JSON')) {
            errorMessage = 'Error en el formato de datos';
            errorDetails = 'Los datos recibidos no tienen el formato esperado.';
        } else {
            errorDetails = error.message;
        }
        
        showErrorMessage(errorMessage, errorDetails);
        
        // Intentar cargar datos del caché si existen
        try {
            const cachedData = localStorage.getItem('dashboard-cache');
            if (cachedData) {
                console.log('📦 Cargando datos del caché...');
                allDashboardData = JSON.parse(cachedData);
                // Continuar con el renderizado usando datos en caché
                const storage = new StorageManager();
                const userComments = storage.getComments();
                allCommentsData = [...allDashboardData.comentarios, ...userComments];
                updateStatsWithUserData(storage);
                renderCommentsList(allCommentsData);
                setupCommentFilters();
                
                // Mostrar advertencia de que son datos en caché
                const commentsList = document.getElementById('commentsList');
                if (commentsList) {
                    const warning = document.createElement('div');
                    warning.className = 'cache-warning';
                    warning.innerHTML = '<i class="fas fa-info-circle"></i> Mostrando datos en caché (puede estar desactualizado)';
                    commentsList.insertBefore(warning, commentsList.firstChild);
                }
            }
        } catch (cacheError) {
            console.error('No se pudo cargar el caché:', cacheError);
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
