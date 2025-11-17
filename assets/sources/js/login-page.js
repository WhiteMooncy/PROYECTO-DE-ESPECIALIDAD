// login-page.js - Sistema de autenticación de la página de login

// Credenciales hardcodeadas (sin base de datos)
const CREDENTIALS = {
    username: 'admin',
    password: 'hydro2025'
};

// Elementos del DOM
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
const devBypass = document.getElementById('devBypass');
const alertBox = document.getElementById('alertBox');
const rememberMe = document.getElementById('rememberMe');

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    const icon = togglePassword.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Show alert
function showAlert(message, type = 'danger') {
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type}`;
    alertBox.style.display = 'block';
    
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 5000);
}

// Check if already logged in
if (sessionStorage.getItem('authenticated') === 'true' || localStorage.getItem('authenticated') === 'true') {
    window.location.href = 'dashboard.html';
}

// Login form submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Validar credenciales
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
        // Login exitoso
        if (rememberMe.checked) {
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('username', username);
        } else {
            sessionStorage.setItem('authenticated', 'true');
            sessionStorage.setItem('username', username);
        }

        showAlert('¡Login exitoso! Redirigiendo...', 'success');
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        // Login fallido
        showAlert('Usuario o contraseña incorrectos. Intente de nuevo.');
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Dev Bypass button
devBypass.addEventListener('click', () => {
    sessionStorage.setItem('authenticated', 'true');
    sessionStorage.setItem('username', 'dev');
    sessionStorage.setItem('devMode', 'true');
    
    showAlert('Acceso de desarrollo activado. Redirigiendo...', 'success');
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 800);
});

// Auto-fill hint on page load (for demo purposes)
setTimeout(() => {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-size: 0.85rem;
        z-index: 1000;
        animation: fadeInUp 0.5s ease;
    `;
    hint.innerHTML = `
        <strong>💡 Demo:</strong><br>
        Usuario: <code style="color: #48cae4;">admin</code><br>
        Contraseña: <code style="color: #48cae4;">hydro2025</code>
    `;
    document.body.appendChild(hint);

    setTimeout(() => {
        hint.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => hint.remove(), 500);
    }, 8000);
}, 1000);
