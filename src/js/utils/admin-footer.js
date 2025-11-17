/**
 * Admin Footer Component
 * Componente modular para el footer del panel administrativo
 */

class AdminFooter {
    constructor() {
        this.footerHTML = `
    <!-- Admin Footer -->
    <footer class="admin-footer">
        <div class="admin-footer-container">
            <div class="footer-left">
                <div class="footer-brand">
                    <i class="fas fa-water"></i>
                    <span>Hydro-Conecta Admin</span>
                </div>
                <p class="footer-version">Versión 1.0.0 | Build 2025.11.10</p>
            </div>
            
            <div class="footer-center">
                <div class="footer-stats">
                    <div class="footer-stat-item">
                        <i class="fas fa-server"></i>
                        <span>Estado: <strong class="status-online">Operativo</strong></span>
                    </div>
                    <div class="footer-stat-item">
                        <i class="fas fa-database"></i>
                        <span>Última actualización: <strong id="lastUpdate">10:54:02 a. m.</strong></span>
                    </div>
                </div>
            </div>
            
            <div class="footer-right">
                <div class="footer-links">
                    <a href="#" class="footer-link">
                        <i class="fas fa-question-circle"></i>
                        Ayuda
                    </a>
                    <a href="#" class="footer-link">
                        <i class="fas fa-bug"></i>
                        Reportar Error
                    </a>
                    <a href="#" class="footer-link">
                        <i class="fas fa-book"></i>
                        Documentación
                    </a>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2025 Hydro-Conecta. Panel Administrativo - Todos los derechos reservados.</p>
            <div class="footer-bottom-links">
                <a href="#">Términos de Uso</a>
                <span>•</span>
                <a href="#">Privacidad</a>
                <span>•</span>
                <a href="#">Seguridad</a>
            </div>
        </div>
    </footer>`;
    }

    /**
     * Renderiza el footer en el DOM
     */
    render() {
        document.body.insertAdjacentHTML('beforeend', this.footerHTML);
        this.initTimeUpdate();
    }

    /**
     * Actualiza el timestamp del footer
     */
    initTimeUpdate() {
        const updateFooterTime = () => {
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
        };
        
        // Actualizar inmediatamente y luego cada segundo
        updateFooterTime();
        setInterval(updateFooterTime, 1000);
    }
}

// Inicializar footer cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const footer = new AdminFooter();
    footer.render();
});
