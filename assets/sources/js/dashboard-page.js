// dashboard-page.js - Inicialización del dashboard administrativo

// Inicializar sistema de autenticación
const auth = new AuthManager();
auth.initDashboard();

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
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
