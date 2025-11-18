// form-page.js - Formulario Censo Social

// Importar sistema de toast (se carga desde HTML)
// const toast = window.toast;

// AOS Animation
AOS.init({ 
    once: true,
    duration: 800,
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

// Formulario Censo Social
let currentStep = 1;
const totalSteps = 5;
const formData = {};
let familiaresCount = 1;

// Elementos
const steps = document.querySelectorAll('.form-step');
const stepIndicators = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('procedural-form');

// Campos condicionales - Paso 1
const tieneDiscapacidadSelect = document.getElementById('tiene-discapacidad');
const tipoDiscapacidadGroup = document.getElementById('tipo-discapacidad-group');
const tieneSubsidioSelect = document.getElementById('tiene-subsidio');
const tipoSubsidioGroup = document.getElementById('tipo-subsidio-group');

// Campos condicionales - Paso 4
const asistenciaMedicaSelect = document.getElementById('asistencia-medica');
const asistenciaMedicaDetallesGroup = document.getElementById('asistencia-medica-detalles-group');
const movilidadReducidaSelect = document.getElementById('movilidad-reducida');
const movilidadReducidaDetallesGroup = document.getElementById('movilidad-reducida-detalles-group');
const problemasServiciosSelect = document.getElementById('problemas-servicios');
const problemasServiciosDetallesGroup = document.getElementById('problemas-servicios-detalles-group');
const emergenciasSelect = document.getElementById('emergencias');
const emergenciasDetallesGroup = document.getElementById('emergencias-detalles-group');
const ayudaSocialSelect = document.getElementById('ayuda-social');
const ayudaSocialDetallesGroup = document.getElementById('ayuda-social-detalles-group');

// Mostrar/ocultar campos condicionales - Paso 1
if (tieneDiscapacidadSelect) {
    tieneDiscapacidadSelect.addEventListener('change', (e) => {
        tipoDiscapacidadGroup.style.display = e.target.value === 'Sí' ? 'block' : 'none';
        if (e.target.value === 'No') {
            document.getElementById('tipo-discapacidad').value = '';
        }
    });
}

if (tieneSubsidioSelect) {
    tieneSubsidioSelect.addEventListener('change', (e) => {
        tipoSubsidioGroup.style.display = e.target.value === 'Sí' ? 'block' : 'none';
        if (e.target.value === 'No') {
            document.getElementById('tipo-subsidio').value = '';
        }
    });
}

// Mostrar/ocultar campos condicionales - Paso 4
if (asistenciaMedicaSelect) {
    asistenciaMedicaSelect.addEventListener('change', (e) => {
        asistenciaMedicaDetallesGroup.style.display = e.target.value === 'Sí' ? 'block' : 'none';
    });
}

if (movilidadReducidaSelect) {
    movilidadReducidaSelect.addEventListener('change', (e) => {
        movilidadReducidaDetallesGroup.style.display = e.target.value === 'Sí' ? 'block' : 'none';
    });
}

if (problemasServiciosSelect) {
    problemasServiciosSelect.addEventListener('change', (e) => {
        problemasServiciosDetallesGroup.style.display = e.target.value === 'Sí' ? 'block' : 'none';
    });
}

if (emergenciasSelect) {
    emergenciasSelect.addEventListener('change', (e) => {
        emergenciasDetallesGroup.style.display = e.target.value === 'Sí' ? 'block' : 'none';
    });
}

if (ayudaSocialSelect) {
    ayudaSocialSelect.addEventListener('change', (e) => {
        ayudaSocialDetallesGroup.style.display = e.target.value === 'Sí' ? 'block' : 'none';
    });
}

// Calcular edad automáticamente
const fechaNacimientoInput = document.getElementById('fecha-nacimiento');
const edadInput = document.getElementById('edad');

if (fechaNacimientoInput && edadInput) {
    fechaNacimientoInput.addEventListener('change', (e) => {
        const birthDate = new Date(e.target.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        edadInput.value = age >= 0 ? age : '';
    });
}

// Gestión de familiares dinámicos
const btnAddFamiliar = document.getElementById('btn-add-familiar');
const familiaContainer = document.getElementById('familia-container');

if (btnAddFamiliar) {
    btnAddFamiliar.addEventListener('click', () => {
        const newIndex = familiaresCount;
        const familiarHTML = `
            <div class="familia-item" data-index="${newIndex}">
                <div class="familia-header">
                    <h4><i class="fas fa-user-plus"></i> Familiar #${newIndex + 1}</h4>
                    <button type="button" class="btn-remove-familiar" data-index="${newIndex}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-user"></i> Nombre completo</label>
                        <input type="text" name="familiar-nombre-${newIndex}" placeholder="Nombre del familiar">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-id-card"></i> RUT</label>
                        <input type="text" name="familiar-rut-${newIndex}" placeholder="12345678-9">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-heart"></i> Parentesco</label>
                        <select name="familiar-parentesco-${newIndex}">
                            <option value="">Selecciona</option>
                            <option value="Cónyuge">Cónyuge</option>
                            <option value="Hijo/a">Hijo/a</option>
                            <option value="Padre/Madre">Padre/Madre</option>
                            <option value="Hermano/a">Hermano/a</option>
                            <option value="Abuelo/a">Abuelo/a</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-hashtag"></i> Edad</label>
                        <input type="number" name="familiar-edad-${newIndex}" min="0" max="120" placeholder="25">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-briefcase"></i> Ocupación</label>
                        <input type="text" name="familiar-ocupacion-${newIndex}" placeholder="Estudiante">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-graduation-cap"></i> Nivel educativo</label>
                        <select name="familiar-educacion-${newIndex}">
                            <option value="">Selecciona</option>
                            <option value="Sin estudios">Sin estudios</option>
                            <option value="Básica">Básica</option>
                            <option value="Media">Media</option>
                            <option value="Técnica">Técnica</option>
                            <option value="Universitaria">Universitaria</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-wheelchair"></i> ¿Discapacidad?</label>
                        <select name="familiar-discapacidad-${newIndex}">
                            <option value="">Selecciona</option>
                            <option value="No">No</option>
                            <option value="Sí">Sí</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-money-check-alt"></i> ¿Subsidio/Pensión?</label>
                        <select name="familiar-subsidio-${newIndex}">
                            <option value="">Selecciona</option>
                            <option value="No">No</option>
                            <option value="Sí">Sí</option>
                        </select>
                    </div>
                </div>
            </div>
        `;
        
        familiaContainer.insertAdjacentHTML('beforeend', familiarHTML);
        familiaresCount++;
        
        // Agregar event listener al nuevo botón de eliminar
        const newRemoveBtn = familiaContainer.querySelector(`[data-index="${newIndex}"] .btn-remove-familiar`);
        newRemoveBtn.addEventListener('click', () => removeFamiliar(newIndex));
    });
}

// Remover familiar
function removeFamiliar(index) {
    const familiarItem = document.querySelector(`.familia-item[data-index="${index}"]`);
    if (familiarItem) {
        familiarItem.remove();
    }
}

// Event listener para el botón de eliminar inicial
document.querySelectorAll('.btn-remove-familiar').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const index = e.currentTarget.dataset.index;
        removeFamiliar(index);
    });
});

// Mostrar paso actual
function showStep(stepNumber) {
    steps.forEach((step, index) => {
        step.classList.remove('active');
        if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });
    
    stepIndicators.forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');
        if (index + 1 < stepNumber) {
            indicator.classList.add('completed');
        }
        if (index + 1 === stepNumber) {
            indicator.classList.add('active');
        }
    });
    
    // Actualizar conectores
    const connectors = document.querySelectorAll('.step-connector');
    connectors.forEach((connector, index) => {
        if (index < stepNumber - 1) {
            connector.style.background = 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary) 100%)';
            connector.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
        } else {
            connector.style.background = '#d1d5db';
            connector.style.boxShadow = 'none';
        }
    });
    
    // Actualizar botones
    prevBtn.style.display = stepNumber === 1 ? 'none' : 'flex';
    nextBtn.style.display = stepNumber === totalSteps ? 'none' : 'flex';
    submitBtn.style.display = stepNumber === totalSteps ? 'flex' : 'none';
    
    // Scroll al top con animación suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validar paso actual con validación mejorada y feedback visual
function validateStep(stepNumber) {
    const currentStepElement = document.getElementById(`step-${stepNumber}`);
    const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    const errors = [];
    
    inputs.forEach(input => {
        const value = input.value.trim();
        const fieldName = input.getAttribute('data-label') || input.name || input.id;
        const errorElement = input.parentElement.querySelector('.error-message');
        
        // Limpiar estado previo
        input.classList.remove('error', 'valid', 'invalid');
        if (errorElement) errorElement.textContent = '';
        
        // Validar campo requerido vacío
        if (!value) {
            isValid = false;
            input.classList.add('error', 'invalid');
            if (errorElement) {
                errorElement.textContent = 'Este campo es obligatorio';
            }
            errors.push(`${fieldName} es obligatorio`);
            return;
        }
        
        // Validaciones específicas por tipo
        let fieldValid = true;
        let errorMessage = '';
        
        if (input.id === 'rut' && window.FormValidators) {
            if (!FormValidators.validateRUT(value)) {
                fieldValid = false;
                errorMessage = 'RUT inválido. Formato: 12.345.678-9';
            }
        } else if (input.type === 'email' || input.id === 'email') {
            if (!validateEmail(value)) {
                fieldValid = false;
                errorMessage = 'Email inválido';
            }
        } else if (input.id === 'telefono' && window.FormValidators) {
            if (!FormValidators.validatePhone(value)) {
                fieldValid = false;
                errorMessage = 'Teléfono inválido. Formato: +56 9 1234 5678';
            }
        } else if (input.type === 'number') {
            const num = parseInt(value);
            if (isNaN(num) || num < 0 || num > 120) {
                fieldValid = false;
                errorMessage = 'Valor inválido';
            }
        }
        
        if (!fieldValid) {
            isValid = false;
            input.classList.add('error', 'invalid');
            if (errorElement) {
                errorElement.textContent = errorMessage;
            }
            errors.push(errorMessage);
        } else {
            input.classList.add('valid');
        }
    });
    
    // Validar checkbox en paso 5
    if (stepNumber === totalSteps) {
        const checkbox = document.getElementById('acepto-terminos');
        if (!checkbox.checked) {
            isValid = false;
            errors.push('Debes aceptar los términos y condiciones');
            if (window.toast) {
                window.toast.error('Debes aceptar los términos y condiciones', 3000);
            } else {
                alert('Debes aceptar los términos y condiciones');
            }
        }
    }
    
    // Mostrar errores con toast si está disponible
    if (!isValid && errors.length > 0 && window.toast) {
        const uniqueErrors = [...new Set(errors)];
        const errorList = uniqueErrors.slice(0, 2).join(', ');
        const moreErrors = uniqueErrors.length > 2 ? ` y ${uniqueErrors.length - 2} más` : '';
        window.toast.error(`Por favor corrige: ${errorList}${moreErrors}`, 5000);
    }
    
    return isValid;
}

// Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Guardar datos del paso
function saveStepData(stepNumber) {
    const currentStepElement = document.getElementById(`step-${stepNumber}`);
    const inputs = currentStepElement.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            formData[input.name] = input.checked;
        } else {
            formData[input.name] = input.value;
        }
    });
}

// Actualizar resumen
function updateSummary() {
    // Datos Personales
    const datosPersonalesHTML = `
        <div class="summary-item"><span class="summary-label">Fecha Registro:</span><span class="summary-value">${formData['fecha-registro'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Nombre:</span><span class="summary-value">${formData['nombre'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">RUT:</span><span class="summary-value">${formData['rut'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Fecha Nacimiento:</span><span class="summary-value">${formData['fecha-nacimiento'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Edad:</span><span class="summary-value">${formData['edad'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Estado Civil:</span><span class="summary-value">${formData['estado-civil'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Profesión:</span><span class="summary-value">${formData['profesion'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Teléfono:</span><span class="summary-value">${formData['telefono'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Email:</span><span class="summary-value">${formData['email'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Situación Laboral:</span><span class="summary-value">${formData['situacion-laboral'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Nivel Educativo:</span><span class="summary-value">${formData['nivel-educativo'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Discapacidad:</span><span class="summary-value">${formData['tiene-discapacidad'] || '-'}</span></div>
        ${formData['tipo-discapacidad'] ? `<div class="summary-item"><span class="summary-label">Tipo Discapacidad:</span><span class="summary-value">${formData['tipo-discapacidad']}</span></div>` : ''}
        <div class="summary-item"><span class="summary-label">Subsidio/Pensión:</span><span class="summary-value">${formData['tiene-subsidio'] || '-'}</span></div>
        ${formData['tipo-subsidio'] ? `<div class="summary-item"><span class="summary-label">Tipo Subsidio:</span><span class="summary-value">${formData['tipo-subsidio']}</span></div>` : ''}
    `;
    document.getElementById('confirm-datos-personales').innerHTML = datosPersonalesHTML;
    
    // Domicilio
    const domicilioHTML = `
        <div class="summary-item"><span class="summary-label">Dirección:</span><span class="summary-value">${formData['direccion'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Tipo Vivienda:</span><span class="summary-value">${formData['tipo-vivienda'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Condición:</span><span class="summary-value">${formData['condicion-vivienda'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Material:</span><span class="summary-value">${formData['material-construccion'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Aguas Servidas:</span><span class="summary-value">${formData['eliminacion-aguas'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Internet:</span><span class="summary-value">${formData['acceso-internet'] || '-'}</span></div>
        <div class="summary-item"><span class="summary-label">Acceso:</span><span class="summary-value">${formData['medio-acceso'] || '-'}</span></div>
    `;
    document.getElementById('confirm-domicilio').innerHTML = domicilioHTML;
    
    // Familia
    let familiaHTML = '';
    for (let i = 0; i < familiaresCount; i++) {
        if (formData[`familiar-nombre-${i}`]) {
            familiaHTML += `
                <div class="familia-summary">
                    <h4>Familiar #${i + 1}</h4>
                    <div class="summary-item"><span class="summary-label">Nombre:</span><span class="summary-value">${formData[`familiar-nombre-${i}`] || '-'}</span></div>
                    <div class="summary-item"><span class="summary-label">RUT:</span><span class="summary-value">${formData[`familiar-rut-${i}`] || '-'}</span></div>
                    <div class="summary-item"><span class="summary-label">Parentesco:</span><span class="summary-value">${formData[`familiar-parentesco-${i}`] || '-'}</span></div>
                    <div class="summary-item"><span class="summary-label">Edad:</span><span class="summary-value">${formData[`familiar-edad-${i}`] || '-'}</span></div>
                    <div class="summary-item"><span class="summary-label">Ocupación:</span><span class="summary-value">${formData[`familiar-ocupacion-${i}`] || '-'}</span></div>
                    <div class="summary-item"><span class="summary-label">Educación:</span><span class="summary-value">${formData[`familiar-educacion-${i}`] || '-'}</span></div>
                    <div class="summary-item"><span class="summary-label">Discapacidad:</span><span class="summary-value">${formData[`familiar-discapacidad-${i}`] || '-'}</span></div>
                    <div class="summary-item"><span class="summary-label">Subsidio:</span><span class="summary-value">${formData[`familiar-subsidio-${i}`] || '-'}</span></div>
                </div>
            `;
        }
    }
    document.getElementById('confirm-familia').innerHTML = familiaHTML || '<p>No se registraron familiares</p>';
    
    // Necesidades
    const necesidadesHTML = `
        <div class="summary-item"><span class="summary-label">Asistencia Médica:</span><span class="summary-value">${formData['asistencia-medica'] || '-'}</span></div>
        ${formData['asistencia-medica-detalles'] ? `<div class="summary-item"><span class="summary-label">Detalles:</span><span class="summary-value">${formData['asistencia-medica-detalles']}</span></div>` : ''}
        <div class="summary-item"><span class="summary-label">Movilidad Reducida:</span><span class="summary-value">${formData['movilidad-reducida'] || '-'}</span></div>
        ${formData['movilidad-reducida-detalles'] ? `<div class="summary-item"><span class="summary-label">Detalles:</span><span class="summary-value">${formData['movilidad-reducida-detalles']}</span></div>` : ''}
        <div class="summary-item"><span class="summary-label">Problemas Servicios:</span><span class="summary-value">${formData['problemas-servicios'] || '-'}</span></div>
        ${formData['problemas-servicios-detalles'] ? `<div class="summary-item"><span class="summary-label">Detalles:</span><span class="summary-value">${formData['problemas-servicios-detalles']}</span></div>` : ''}
        <div class="summary-item"><span class="summary-label">Emergencias:</span><span class="summary-value">${formData['emergencias'] || '-'}</span></div>
        ${formData['emergencias-detalles'] ? `<div class="summary-item"><span class="summary-label">Detalles:</span><span class="summary-value">${formData['emergencias-detalles']}</span></div>` : ''}
        <div class="summary-item"><span class="summary-label">Ayuda Social:</span><span class="summary-value">${formData['ayuda-social'] || '-'}</span></div>
        ${formData['ayuda-social-detalles'] ? `<div class="summary-item"><span class="summary-label">Detalles:</span><span class="summary-value">${formData['ayuda-social-detalles']}</span></div>` : ''}
        ${formData['otros-comentarios'] ? `<div class="summary-item"><span class="summary-label">Otros Comentarios:</span><span class="summary-value">${formData['otros-comentarios']}</span></div>` : ''}
        <div class="summary-item"><span class="summary-label">Encuestador:</span><span class="summary-value">${formData['encuestador'] || '-'}</span></div>
    `;
    document.getElementById('confirm-necesidades').innerHTML = necesidadesHTML;
}

// Siguiente paso
nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
        saveStepData(currentStep);
        currentStep++;
        
        if (currentStep === totalSteps) {
            updateSummary();
        }
        
        showStep(currentStep);
    }
});

// Paso anterior
prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
});

// Botón DEV - Autocompletar formulario
const devBtn = document.getElementById('devBtn');
if (devBtn) {
    devBtn.addEventListener('click', () => {
        // Paso 1: Datos Personales
        document.getElementById('fecha-registro').value = '2025-11-17';
        document.getElementById('nombre').value = 'Juan Pérez García';
        document.getElementById('rut').value = '12345678-9';
        document.getElementById('fecha-nacimiento').value = '1985-05-15';
        document.getElementById('edad').value = '40';
        document.getElementById('estado-civil').value = 'Casado/a';
        document.getElementById('profesion').value = 'Agricultor';
        document.getElementById('telefono').value = '+56 9 8765 4321';
        document.getElementById('email').value = 'juan.perez@ejemplo.cl';
        document.getElementById('situacion-laboral').value = 'Independiente';
        document.getElementById('nivel-educativo').value = 'Media completa';
        document.getElementById('tiene-discapacidad').value = 'No';
        document.getElementById('tiene-subsidio').value = 'Sí';
        document.getElementById('tipo-subsidio').value = 'Subsidio Familiar';
        tipoSubsidioGroup.style.display = 'block';
        
        // Paso 2: Domicilio
        document.getElementById('direccion').value = 'Calle Principal #123, Villa Los Aromos';
        document.getElementById('tipo-vivienda').value = 'Casa';
        document.getElementById('condicion-vivienda').value = 'Propia';
        document.getElementById('material-construccion').value = 'Cemento';
        document.getElementById('eliminacion-aguas').value = 'Red pública';
        document.getElementById('acceso-internet').value = 'Sí';
        document.getElementById('medio-acceso').value = 'Caminos pavimentados';
        
        // Paso 4: Necesidades
        document.getElementById('asistencia-medica').value = 'No';
        document.getElementById('movilidad-reducida').value = 'No';
        document.getElementById('problemas-servicios').value = 'No';
        document.getElementById('emergencias').value = 'No';
        document.getElementById('ayuda-social').value = 'No';
        document.getElementById('otros-comentarios').value = 'Familia estable, sin mayores problemas.';
        document.getElementById('encuestador').value = 'María González';
        
        // Aceptar términos
        document.getElementById('acepto-terminos').checked = true;
        
        // Notificación
        devBtn.innerHTML = '<i class="fas fa-check"></i> Completado';
        devBtn.style.background = '#10b981';
        
        setTimeout(() => {
            devBtn.innerHTML = '<i class="fas fa-code"></i> DEV';
            devBtn.style.background = '';
        }, 2000);
    });
}

// Enviar formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!document.getElementById('acepto-terminos').checked) {
        if (window.toast) {
            window.toast.error('Debes aceptar los términos y condiciones', 3000);
        } else {
            alert('Debes aceptar los términos y condiciones');
        }
        return;
    }
    
    saveStepData(currentStep);
    
    // Simular envío con feedback visual
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    if (window.toast) {
        window.toast.info('Enviando formulario...', 2000);
    }
    
    // Simular delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Guardar en localStorage
    const timestamp = new Date().toISOString();
    const submission = {
        ...formData,
        timestamp,
        id: Date.now()
    };
    
    const submissions = JSON.parse(localStorage.getItem('censoSubmissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('censoSubmissions', JSON.stringify(submissions));
    
    // Mostrar éxito
    if (window.toast) {
        window.toast.success('¡Formulario enviado exitosamente!', 5000);
    }
    
    const resultDiv = document.getElementById('result');
    resultDiv.className = 'result-success';
    resultDiv.innerHTML = `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>¡Censo Registrado Exitosamente!</h3>
            <p>Los datos han sido guardados correctamente en el sistema.</p>
            <p>ID de registro: <strong>${submission.id}</strong></p>
            <p>Nombre: <strong>${formData['nombre']}</strong></p>
            <button onclick="location.reload()" class="btn-primary">
                <i class="fas fa-redo"></i>
                Registrar Otro Censo
            </button>
        </div>
    `;
    resultDiv.classList.remove('hidden');
    
    form.style.display = 'none';
    document.querySelector('.form-progress-steps').style.display = 'none';
});

// Inicializar
showStep(1);
