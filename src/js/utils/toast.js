/**
 * HYDRO-CONECTA - Sistema de Notificaciones Toast
 * Reemplaza los molestos alert() con notificaciones modernas
 */

class Toast {
    constructor() {
        this.container = null;
        this.createContainer();
    }

    /**
     * Crea el contenedor de toasts si no existe
     */
    createContainer() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    }

    /**
     * Muestra una notificación toast
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
     * @param {number} duration - Duración en ms (default: 3000)
     */
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Iconos según el tipo
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        
        const icon = icons[type] || icons.info;
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span class="toast-message">${this.escapeHTML(message)}</span>
            <button class="toast-close" aria-label="Cerrar">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Agregar al contenedor
        this.container.appendChild(toast);
        
        // Animar entrada
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Botón de cerrar
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.hide(toast));
        
        // Auto-ocultar
        if (duration > 0) {
            setTimeout(() => this.hide(toast), duration);
        }
        
        return toast;
    }

    /**
     * Oculta y elimina un toast
     * @param {HTMLElement} toast - Elemento toast a ocultar
     */
    hide(toast) {
        toast.classList.remove('show');
        toast.classList.add('hide');
        
        // Eliminar del DOM después de la animación
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    /**
     * Escapa HTML para prevenir XSS
     * @param {string} str - String a escapar
     * @returns {string} String escapado
     */
    escapeHTML(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Métodos de conveniencia
    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
}

// Crear instancia global
const toast = new Toast();

// Exportar para módulos
if (typeof window !== 'undefined') {
    window.Toast = Toast;
    window.toast = toast;
}

// Exportar para Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Toast;
}
