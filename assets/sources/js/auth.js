/**
 * HYDRO-CONECTA - Sistema de Autenticación Simple
 * Protección de rutas del dashboard sin base de datos
 */

class AuthManager {
    constructor() {
        this.SESSION_KEY = 'authenticated';
        this.USERNAME_KEY = 'username';
        this.DEV_MODE_KEY = 'devMode';
    }

    /**
     * Verifica si el usuario está autenticado
     * @returns {boolean}
     */
    isAuthenticated() {
        return sessionStorage.getItem(this.SESSION_KEY) === 'true' || 
               localStorage.getItem(this.SESSION_KEY) === 'true';
    }

    /**
     * Verifica si está en modo desarrollo
     * @returns {boolean}
     */
    isDevMode() {
        return sessionStorage.getItem(this.DEV_MODE_KEY) === 'true';
    }

    /**
     * Obtiene el nombre de usuario actual
     * @returns {string|null}
     */
    getUsername() {
        return sessionStorage.getItem(this.USERNAME_KEY) || 
               localStorage.getItem(this.USERNAME_KEY);
    }

    /**
     * Cierra sesión
     */
    logout() {
        // Limpiar sessionStorage
        sessionStorage.removeItem(this.SESSION_KEY);
        sessionStorage.removeItem(this.USERNAME_KEY);
        sessionStorage.removeItem(this.DEV_MODE_KEY);

        // Limpiar localStorage
        localStorage.removeItem(this.SESSION_KEY);
        localStorage.removeItem(this.USERNAME_KEY);

        // Redirigir al login
        window.location.href = 'login.html';
    }

    /**
     * Protege una página - redirige al login si no está autenticado
     */
    protectPage() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * Muestra indicador de modo desarrollo en la página
     */
    showDevIndicator() {
        if (!this.isDevMode()) return;

        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ffc107;
            color: #000;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            font-size: 0.85rem;
            font-weight: 600;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        indicator.innerHTML = '<i class="fas fa-code"></i> MODO DEV';
        document.body.appendChild(indicator);
    }

    /**
     * Añade botón de logout al dashboard
     */
    addLogoutButton() {
        const username = this.getUsername();
        if (!username) return;

        // Buscar la navbar
        const navbar = document.querySelector('.navbar-menu');
        if (!navbar) return;

        // Crear elemento de usuario
        const userElement = document.createElement('div');
        userElement.style.cssText = `
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-left: auto;
            padding: 0.5rem 1rem;
        `;

        userElement.innerHTML = `
            <span style="color: #023e8a; font-weight: 500;">
                <i class="fas fa-user-circle"></i> ${username}
            </span>
            <button id="logoutBtn" class="btn-logout" style="
                background: #dc3545;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            ">
                <i class="fas fa-sign-out-alt"></i> Salir
            </button>
        `;

        navbar.appendChild(userElement);

        // Event listener para logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
            logoutBtn.addEventListener('mouseenter', (e) => {
                e.target.style.background = '#c82333';
                e.target.style.transform = 'translateY(-2px)';
            });
            logoutBtn.addEventListener('mouseleave', (e) => {
                e.target.style.background = '#dc3545';
                e.target.style.transform = 'translateY(0)';
            });
        }
    }

    /**
     * Inicializa el sistema de autenticación en el dashboard
     */
    initDashboard() {
        // Proteger página
        if (!this.protectPage()) return;

        // Mostrar indicador de desarrollo
        this.showDevIndicator();

        // Añadir botón de logout
        this.addLogoutButton();

        console.log(`✅ Auth: Usuario "${this.getUsername()}" autenticado`);
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.AuthManager = AuthManager;
}

// Exportar para Node.js (testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}
