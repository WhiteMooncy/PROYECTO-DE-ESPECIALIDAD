// ========================================
// HYDRO-CONECTA - FORMULARIO DINÁMICO
// Sistema de formulario basado en preguntas.json
// ========================================

class FormularioDinamico {
    constructor() {
        this.currentStep = 0;
        this.currentSection = 0;
        this.formData = {};
        this.sections = [];
        this.init();
    }

    async init() {
        try {
            await this.loadQuestions();
            
            // Verificar que se cargaron las secciones
            if (!this.sections || this.sections.length === 0) {
                this.showError('No se pudieron cargar las secciones del formulario');
                return;
            }
            
            this.setupEventListeners();
            this.renderCurrentSection();
        } catch (error) {
            console.error('Error en inicialización:', error);
            this.showError('Error al inicializar el formulario');
        }
    }

    async loadQuestions() {
        try {
            const response = await fetch('preguntas.json');
            const data = await response.json();
            
            // Convertir el JSON en secciones del formulario
            this.sections = [
                {
                    title: 'Datos del Socio Principal',
                    icon: 'fa-user',
                    fields: this.convertToFields(data.datos_socio_principal)
                },
                {
                    title: 'Datos del Domicilio',
                    icon: 'fa-home',
                    fields: this.convertToFields(data.datos_domicilio)
                },
                {
                    title: 'Núcleo Familiar',
                    icon: 'fa-users',
                    type: 'repeatable',
                    fields: this.convertToFields(data.nucleo_familiar[0])
                },
                {
                    title: 'Necesidades y Problemáticas',
                    icon: 'fa-question-circle',
                    fields: this.convertNecesidades(data.necesidades_y_problematicas_del_hogar)
                },
                {
                    title: 'Encuestador',
                    icon: 'fa-user-check',
                    fields: this.convertToFields(data.encuesta_realizada_por)
                }
            ];
        } catch (error) {
            console.error('Error al cargar preguntas:', error);
            this.showError('No se pudieron cargar las preguntas del formulario');
        }
    }

    convertToFields(dataObj) {
        return Object.entries(dataObj).map(([label, tipo]) => {
            const field = {
                label: label,
                name: this.sanitizeName(label),
                required: !label.includes('(si aplica)')
            };

            // Determinar tipo de campo basado en la descripción
            if (tipo.toLowerCase().includes('sí/no')) {
                field.type = 'radio';
                field.options = ['Sí', 'No'];
            } else if (tipo.toLowerCase().includes('fecha')) {
                field.type = 'date';
            } else if (tipo.toLowerCase().includes('número')) {
                field.type = 'number';
            } else if (tipo.toLowerCase().includes('correo') || tipo.toLowerCase().includes('email')) {
                field.type = 'email';
            } else if (tipo.toLowerCase().includes('teléfono')) {
                field.type = 'tel';
            } else if (label === 'Firma' || label === 'FIRMA') {
                field.type = 'signature';
            } else {
                field.type = 'text';
            }

            return field;
        });
    }

    convertNecesidades(necesidades) {
        return necesidades.map(item => ({
            label: item.Pregunta,
            name: this.sanitizeName(item.Pregunta),
            type: 'radio',
            options: ['Sí', 'No'],
            hasDetails: true,
            required: true
        }));
    }

    sanitizeName(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');
    }

    renderCurrentSection() {
        const section = this.sections[this.currentSection];
        const questionWrap = document.getElementById('questionWrap');
        const title = document.getElementById('title');

        // Verificar que la sección existe
        if (!section) {
            console.error('Sección no encontrada:', this.currentSection);
            return;
        }

        // Actualizar título
        title.innerHTML = `<i class="fas ${section.icon}"></i> ${section.title}`;

        // Renderizar campos
        let html = '<div class="question">';
        
        if (section.type === 'repeatable') {
            html += this.renderRepeatableSection(section);
        } else {
            html += this.renderNormalSection(section);
        }

        html += '</div>';
        questionWrap.innerHTML = html;

        // Actualizar progreso
        this.updateProgress();
        this.updateButtons();
    }

    renderNormalSection(section) {
        let html = '';
        
        section.fields.forEach((field, index) => {
            html += `<div class="form-field" data-field="${field.name}">`;
            html += `<label for="${field.name}">${field.label}`;
            if (field.required) html += '<span class="required">*</span>';
            html += '</label>';

            switch (field.type) {
                case 'radio':
                    html += '<div class="question-options">';
                    field.options.forEach(option => {
                        html += `
                            <label class="option-label">
                                <input type="radio" name="${field.name}" value="${option}" ${field.required ? 'required' : ''}>
                                <span class="option-text">${option}</span>
                            </label>
                        `;
                    });
                    html += '</div>';
                    
                    if (field.hasDetails) {
                        html += `
                            <div class="details-field hidden" id="details_${field.name}">
                                <label for="${field.name}_detalles">Detalles:</label>
                                <textarea id="${field.name}_detalles" name="${field.name}_detalles" 
                                    placeholder="Proporcione más información..."></textarea>
                            </div>
                        `;
                    }
                    break;

                case 'date':
                    html += `<input type="date" id="${field.name}" name="${field.name}" 
                        class="form-input" ${field.required ? 'required' : ''}>`;
                    break;

                case 'email':
                    html += `<input type="email" id="${field.name}" name="${field.name}" 
                        class="form-input" placeholder="ejemplo@correo.com" ${field.required ? 'required' : ''}>`;
                    break;

                case 'tel':
                    html += `<input type="tel" id="${field.name}" name="${field.name}" 
                        class="form-input" placeholder="+56 9 XXXX XXXX" ${field.required ? 'required' : ''}>`;
                    break;

                case 'number':
                    html += `<input type="number" id="${field.name}" name="${field.name}" 
                        class="form-input" ${field.required ? 'required' : ''}>`;
                    break;

                case 'signature':
                    html += `
                        <div class="signature-pad">
                            <canvas id="${field.name}" width="400" height="150"></canvas>
                            <button type="button" class="btn-clear-signature" onclick="formApp.clearSignature('${field.name}')">
                                <i class="fas fa-eraser"></i> Limpiar
                            </button>
                        </div>
                    `;
                    break;

                default:
                    html += `<input type="text" id="${field.name}" name="${field.name}" 
                        class="form-input" ${field.required ? 'required' : ''}>`;
            }

            html += '</div>';
        });

        return html;
    }

    renderRepeatableSection(section) {
        let html = `
            <div class="repeatable-section">
                <p class="section-description">Agregue los datos de cada integrante del hogar</p>
                <div id="family-members"></div>
                <button type="button" class="btn-add-member" onclick="formApp.addFamilyMember()">
                    <i class="fas fa-plus-circle"></i> Agregar Integrante
                </button>
            </div>
        `;
        return html;
    }

    setupEventListeners() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.addEventListener('click', () => this.previousSection());
        nextBtn.addEventListener('click', () => this.nextSection());

        // Delegación de eventos para campos dinámicos
        document.getElementById('questionWrap').addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                this.handleRadioChange(e.target);
            }
            this.saveFieldData(e.target);
        });
    }

    handleRadioChange(radio) {
        // Marcar como seleccionado
        const labels = radio.closest('.question-options').querySelectorAll('.option-label');
        labels.forEach(label => label.classList.remove('selected'));
        radio.closest('.option-label').classList.add('selected');

        // Mostrar campo de detalles si aplica
        const fieldName = radio.name;
        const detailsField = document.getElementById(`details_${fieldName}`);
        
        if (detailsField) {
            if (radio.value === 'Sí') {
                detailsField.classList.remove('hidden');
            } else {
                detailsField.classList.add('hidden');
            }
        }
    }

    saveFieldData(input) {
        const sectionName = this.sections[this.currentSection].title;
        
        if (!this.formData[sectionName]) {
            this.formData[sectionName] = {};
        }

        this.formData[sectionName][input.name] = input.value;
    }

    validateCurrentSection() {
        const section = this.sections[this.currentSection];
        const questionWrap = document.getElementById('questionWrap');
        const requiredFields = questionWrap.querySelectorAll('[required]');
        
        let isValid = true;
        requiredFields.forEach(field => {
            if (field.type === 'radio') {
                const radioGroup = questionWrap.querySelectorAll(`[name="${field.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    isValid = false;
                    field.closest('.form-field').classList.add('error');
                } else {
                    field.closest('.form-field').classList.remove('error');
                }
            } else if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        return isValid;
    }

    nextSection() {
        if (!this.validateCurrentSection()) {
            this.showNotification('Por favor complete todos los campos requeridos', 'warning');
            return;
        }

        if (this.currentSection < this.sections.length - 1) {
            this.currentSection++;
            this.renderCurrentSection();
            this.scrollToTop();
        } else {
            this.submitForm();
        }
    }

    previousSection() {
        if (this.currentSection > 0) {
            this.currentSection--;
            this.renderCurrentSection();
            this.scrollToTop();
        }
    }

    updateProgress() {
        const progress = ((this.currentSection + 1) / this.sections.length) * 100;
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = `${progress}%`;
    }

    updateButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        prevBtn.style.display = this.currentSection === 0 ? 'none' : 'flex';
        
        if (this.currentSection === this.sections.length - 1) {
            nextBtn.innerHTML = '<i class="fas fa-check"></i> Enviar';
        } else {
            nextBtn.innerHTML = 'Siguiente <i class="fas fa-arrow-right"></i>';
        }
    }

    async submitForm() {
        const result = document.getElementById('result');
        const quiz = document.getElementById('quiz');

        // Enviar datos al servidor
        try {
            const response = await fetch('/api/submit-survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.formData)
            });

            if (response.ok) {
                quiz.classList.add('hidden');
                result.classList.remove('hidden');
                result.innerHTML = `
                    <div class="result-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>¡Gracias por tu participación!</h2>
                    <p>Tus respuestas han sido registradas exitosamente.</p>
                    <button class="btn-restart" onclick="formApp.restart()">
                        <i class="fas fa-redo"></i>
                        Nueva Encuesta
                    </button>
                `;
                this.scrollToTop();
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Error al enviar el formulario. Por favor intente nuevamente.', 'error');
        }
    }

    restart() {
        this.currentSection = 0;
        this.formData = {};
        const result = document.getElementById('result');
        const quiz = document.getElementById('quiz');
        
        result.classList.add('hidden');
        quiz.classList.remove('hidden');
        this.renderCurrentSection();
        this.scrollToTop();
    }

    showNotification(message, type = 'info') {
        // Crear notificación toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    showError(message) {
        const questionWrap = document.getElementById('questionWrap');
        questionWrap.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Error al cargar el formulario</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn-restart">
                    <i class="fas fa-redo"></i> Recargar página
                </button>
            </div>
        `;
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    addFamilyMember() {
        // Implementar lógica para agregar miembros de familia
        console.log('Agregar miembro de familia');
    }

    clearSignature(canvasId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// Inicializar cuando el DOM esté listo
let formApp;
document.addEventListener('DOMContentLoaded', () => {
    formApp = new FormularioDinamico();
});
