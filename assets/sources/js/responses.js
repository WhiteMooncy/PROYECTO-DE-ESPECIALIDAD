// responses.js - Gestión de comentarios y respuestas del proyecto de la represa

// Inicializar sistema de autenticación
const auth = new AuthManager();
auth.initDashboard();

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Inicializar StorageManager
const storageManager = new StorageManager();
let allComments = [];
let filteredComments = [];

// Cargar datos al iniciar
async function loadData() {
    try {
        // Cargar comentarios estáticos
        const response = await fetch('../data/dashboard-data.json');
        if (!response.ok) throw new Error('Error al cargar datos');
        
        const data = await response.json();
        allComments = data.comentarios || [];

        // Agregar comentarios de localStorage
        const userComments = storageManager.getComments();
        allComments = [...allComments, ...userComments];

        filteredComments = [...allComments];
        
        updateStats();
        renderComments(filteredComments);
    } catch (error) {
        console.error('Error cargando datos:', error);
        showError('Error al cargar los comentarios. Por favor, recarga la página.');
    }
}

// Actualizar estadísticas
function updateStats() {
    const total = allComments.length;
    const reclamos = allComments.filter(c => 
        c.filtro?.toLowerCase() === 'reclamo' || c.category?.toLowerCase() === 'reclamo'
    ).length;
    const solicitudes = allComments.filter(c => 
        c.filtro?.toLowerCase() === 'solicitud' || c.category?.toLowerCase() === 'solicitud'
    ).length;
    const pendientes = allComments.filter(c => !c.respondido).length;

    document.getElementById('totalComments').textContent = total;
    document.getElementById('reclamosCount').textContent = reclamos;
    document.getElementById('solicitudesCount').textContent = solicitudes;
    document.getElementById('pendientesCount').textContent = pendientes;

    document.getElementById('reclamosPercent').textContent = 
        total > 0 ? `${Math.round((reclamos / total) * 100)}%` : '0%';
    document.getElementById('solicitudesPercent').textContent = 
        total > 0 ? `${Math.round((solicitudes / total) * 100)}%` : '0%';
    document.getElementById('pendientesPercent').textContent = 
        total > 0 ? `${Math.round((pendientes / total) * 100)}%` : '0%';
}

// Renderizar comentarios
function renderComments(comments) {
    const container = document.getElementById('commentsList');
    
    if (comments.length === 0) {
        container.innerHTML = `
            <div class="comment-card placeholder">
                <div class="loading-spinner">
                    <i class="fas fa-inbox"></i>
                    <p>No se encontraron comentarios con los filtros seleccionados.</p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = comments.map((comment, index) => {
        const category = comment.filtro || comment.category || 'General';
        const sentiment = comment.sentimiento || comment.sentiment || 'Neutral';
        const text = comment.textoOriginal || comment.text || '';
        const id = comment.idComentario || comment.id || index + 1;
        const responded = comment.respondido || false;

        // Colores por categoría
        const categoryColors = {
            'reclamo': '#dc3545',
            'solicitud': '#ffc107',
            'duda': '#17a2b8',
            'agradecimiento': '#28a745',
            'general': '#6c757d'
        };

        // Colores por sentimiento
        const sentimentColors = {
            'positivo': '#28a745',
            'negativo': '#dc3545',
            'neutral': '#6c757d'
        };

        return `
            <div class="comment-card" data-aos="fade-up" data-aos-delay="${index * 50}">
                <div class="comment-header">
                    <div class="comment-badges">
                        <span class="badge" style="background: ${categoryColors[category.toLowerCase()] || '#6c757d'}">
                            ${category}
                        </span>
                        <span class="badge" style="background: ${sentimentColors[sentiment.toLowerCase()] || '#6c757d'}">
                            ${sentiment}
                        </span>
                        ${responded ? '<span class="badge" style="background: #28a745">Respondido</span>' : '<span class="badge" style="background: #ffc107; color: #000">Pendiente</span>'}
                    </div>
                    <span class="comment-id">ID: ${id}</span>
                </div>
                <div class="comment-body">
                    <p>${text}</p>
                </div>
                <div class="comment-footer">
                    <button class="comment-action-btn" onclick="toggleResponse(${id})" title="${responded ? 'Marcar como pendiente' : 'Marcar como respondido'}">
                        <i class="fas ${responded ? 'fa-undo' : 'fa-check'}"></i>
                        ${responded ? 'Pendiente' : 'Responder'}
                    </button>
                    <button class="comment-action-btn" onclick="viewDetails(${id})" title="Ver detalles">
                        <i class="fas fa-eye"></i>
                        Detalles
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Aplicar filtros
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sentimentFilter = document.getElementById('sentimentFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    filteredComments = allComments.filter(comment => {
        const category = (comment.filtro || comment.category || 'General').toLowerCase();
        const sentiment = (comment.sentimiento || comment.sentiment || 'Neutral').toLowerCase();
        const responded = comment.respondido || false;

        const categoryMatch = categoryFilter === 'all' || category === categoryFilter;
        const sentimentMatch = sentimentFilter === 'all' || sentiment === sentimentFilter;
        const statusMatch = statusFilter === 'all' || 
            (statusFilter === 'responded' && responded) ||
            (statusFilter === 'pending' && !responded);

        return categoryMatch && sentimentMatch && statusMatch;
    });

    renderComments(filteredComments);
}

// Toggle response status
function toggleResponse(id) {
    const comment = allComments.find(c => (c.idComentario || c.id) === id);
    if (comment) {
        comment.respondido = !comment.respondido;
        renderComments(filteredComments);
        updateStats();
    }
}

// View details
function viewDetails(id) {
    const comment = allComments.find(c => (c.idComentario || c.id) === id);
    if (comment) {
        alert(`ID: ${id}\nCategoría: ${comment.filtro || comment.category}\nSentimiento: ${comment.sentimiento || comment.sentiment}\n\nTexto:\n${comment.textoOriginal || comment.text}`);
    }
}

// Mostrar error
function showError(message) {
    const container = document.getElementById('commentsList');
    container.innerHTML = `
        <div class="comment-card placeholder">
            <div class="loading-spinner" style="animation: none;">
                <i class="fas fa-exclamation-triangle" style="color: #dc3545; animation: none;"></i>
                <p style="animation: none;">${message}</p>
            </div>
        </div>
    `;
}

// Event Listeners
document.getElementById('applyFilterBtn').addEventListener('click', applyFilters);

document.getElementById('clearFiltersBtn').addEventListener('click', () => {
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('sentimentFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    filteredComments = [...allComments];
    renderComments(filteredComments);
});

document.getElementById('exportBtn').addEventListener('click', () => {
    const data = storageManager.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hydro-conecta-responses-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
});

// Navbar Toggle
const navbarToggler = document.getElementById('navbar-toggler');
const navbarMenu = document.getElementById('navbar-menu');

if(navbarToggler){
    navbarToggler.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        navbarToggler.classList.toggle('active');
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-modern');
    if(navbar){
        if(window.scrollY > 50){
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Update footer timestamp
function updateFooterTime() {
    const lastUpdate = document.getElementById('lastUpdate');
    if (lastUpdate) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-CL', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
        });
        lastUpdate.textContent = timeString;
    }
}

// Update time every second
updateFooterTime();
setInterval(updateFooterTime, 1000);

// Cargar datos al iniciar
loadData();
