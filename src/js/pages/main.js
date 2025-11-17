// =========================================================================
// ARCHIVO: main.js
// FUNCIÓN: Implementa la lógica de un formulario de encuesta multi-paso
//          utilizando la función initQuiz (asume que no se usa una API de clasificación).
// =========================================================================

// --- CONFIGURA AQUÍ TUS PREGUNTAS ---
// Estas son las preguntas que definiste para tu encuesta demográfica.
const questions = [
    { id: 'rut', type: 'text', label: '¿Cuál es tu RUT?', placeholder: 'Ej: 12.000.000-k', required: true },
    { id: 'nombre', type: 'text', label: '¿Cuál es tu nombre completo?', placeholder: 'Escribe tu nombre', required: true },
    { id: 'fecha_nacimiento', type: 'text', label: '¿Cuál es tu fecha de nacimiento?', placeholder: 'DD/MM/AAAA', required: true },
    { id: 'edad', type: 'text', label: '¿Cuántos años tienes?', placeholder: 'Ej: 30', required: true },
    { id: 'estado_civil', type: 'radio', label: '¿Cuál es tu estado civil?', options: ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'], required: true },
    { id: 'ocupacion', type: 'text', label: '¿Cuál es tu ocupación?', placeholder: 'Escribe tu ocupación', required: false },
    { id: 'telefono', type: 'text', label: '¿Cuál es tu teléfono de contacto?', placeholder: '+56 9 1234 5678', required: true },
    { id: 'correo', type: 'text', label: '¿Cuál es tu correo electrónico?', placeholder: 'ej: correo@gmail.com', required: true },
    { id: 'situacion_laboral', type: 'radio', label: '¿Cuál es tu situación laboral actual?', options: ['Empleado/a', 'Desempleado/a', 'Estudiante', 'Independiente', 'Jubilado/a'], required: true },
    { id: 'nivel_educacional', type: 'radio', label: '¿Cuál es tu nivel educacional?', options: ['Básica', 'Media', 'Técnica', 'Universitaria', 'Postgrado'], required: true },
    { id: 'tiene_discapacidad', type: 'radio', label: '¿Posee alguna discapacidad?', options: ['Sí', 'No'], required: true },
    { id: 'tipo_discapacidad', type: 'checkbox', label: 'Si respondió sí, ¿qué tipo de discapacidad posee?', options: ['Visual', 'Auditiva', 'Motora', 'Cognitiva', 'Otra'], required: false },
    { id: 'subsidio_pension', type: 'radio', label: '¿Recibe algún subsidio o pensión?', options: ['Sí', 'No'], required: true },
    { id: 'procedencia_subsidio', type: 'text', label: 'Si respondió sí, ¿cuál es la procedencia del subsidio o pensión?', placeholder: 'Escribe la procedencia', required: false },
];


// =========================================================================
// FUNCIÓN INITQUIZ (LÓGICA CENTRAL)
// La he modificado para ser una función estándar y manejar la navegación.
// =========================================================================

function initQuiz(opts = {}) {
    const {
        questionWrapId = 'questionWrap',
        prevBtnId = 'prevBtn',
        nextBtnId = 'nextBtn',
        progressBarId = 'progressBar',
        resultId = 'result',
        actionsId = 'actions',
        quizSectionId = 'quiz' // Añadido para controlar la visibilidad
    } = opts;

    // Estado local dentro de la función
    let index = 0;
    const answers = {};

    // Elementos del DOM
    const questionWrap = document.getElementById(questionWrapId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const progressBar = document.getElementById(progressBarId);
    const resultEl = document.getElementById(resultId);
    const actionsEl = document.getElementById(actionsId);
    const quizSection = document.getElementById(quizSectionId);

    if (!questionWrap || !prevBtn || !nextBtn || !progressBar || !resultEl) {
        console.error('initQuiz: Faltan elementos clave del DOM. Asegúrate de que los IDs estén correctos.');
        return;
    }

    /**
     * Muestra un mensaje de error temporal en la interfaz.
     * @param {string} message - Mensaje a mostrar.
     * @param {string} type - Clase de estilo (ej. 'error').
     */
    function displayMessage(message, type) {
        let msgElement = document.getElementById('tempMessage');
        if (!msgElement) {
            msgElement = document.createElement('div');
            msgElement.id = 'tempMessage';
            // Insertar justo antes de questionWrap
            questionWrap.parentNode.insertBefore(msgElement, questionWrap);
        }

        msgElement.textContent = message;
        msgElement.className = `message-box ${type}`;
        msgElement.style.display = 'block';

        setTimeout(() => {
            msgElement.style.display = 'none';
        }, 3000);
    }
    
    /**
     * Renderiza la pregunta en el DOM.
     * @param {number} i - Índice de la pregunta actual.
     */
    function renderQuestion(i) {
        const q = questions[i];
        questionWrap.innerHTML = '';

        const qEl = document.createElement('div');
        qEl.className = 'questionBlock';

        // Título de la pregunta y número de paso
        const questionHeader = document.createElement('h2');
        questionHeader.className = 'question';
        questionHeader.textContent = `Paso ${i + 1}/${questions.length}: ${q.label}` + (q.required ? ' *' : '');
        qEl.appendChild(questionHeader);

        const fieldWrap = document.createElement('div');
        fieldWrap.className = 'input-wrapper';

        const currentAnswer = answers[q.id] || '';

        if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = q.id;
            input.placeholder = q.placeholder || '';
            input.value = currentAnswer;
            // Usamos 'change' para guardar al salir del campo, pero 'input' para guardar al escribir
            input.addEventListener('input', e => answers[q.id] = e.target.value);
            fieldWrap.appendChild(input);
        } else if (q.type === 'textarea') {
            const ta = document.createElement('textarea');
            ta.id = q.id;
            ta.placeholder = q.placeholder || '';
            ta.rows = 4;
            ta.value = currentAnswer;
            ta.addEventListener('input', e => answers[q.id] = e.target.value);
            fieldWrap.appendChild(ta);
        } else if (q.type === 'radio') {
            q.options.forEach((opt, idx) => {
                const id = `${q.id}_${idx}`;
                const div = document.createElement('label');
                div.className = 'radio-label';
                const inp = document.createElement('input');
                inp.type = 'radio';
                inp.name = q.id;
                inp.value = opt;
                inp.id = id;
                if (currentAnswer === opt) inp.checked = true;
                inp.addEventListener('change', () => answers[q.id] = opt);
                div.appendChild(inp);
                div.appendChild(document.createTextNode(' ' + opt));
                fieldWrap.appendChild(div);
            });
            fieldWrap.className += ' radio-group'; // Clase para estilos de radio
        } else if (q.type === 'checkbox') {
            const saved = Array.isArray(currentAnswer) ? currentAnswer : [];
            q.options.forEach((opt, idx) => {
                const id = `${q.id}_${idx}`;
                const div = document.createElement('label');
                div.className = 'checkbox-label';
                const inp = document.createElement('input');
                inp.type = 'checkbox';
                inp.name = q.id;
                inp.value = opt;
                inp.id = id;
                if (saved.includes(opt)) inp.checked = true;
                
                inp.addEventListener('change', (e) => {
                    const cur = Array.isArray(answers[q.id]) ? answers[q.id] : [];
                    if (e.target.checked) {
                        answers[q.id] = [...cur, opt];
                    } else {
                        answers[q.id] = cur.filter(x => x !== opt);
                    }
                });
                div.appendChild(inp);
                div.appendChild(document.createTextNode(' ' + opt));
                fieldWrap.appendChild(div);
            });
            fieldWrap.className += ' checkbox-group'; // Clase para estilos de checkbox
        } 
        
        qEl.appendChild(fieldWrap);

        // Contenedor de mensaje de error por validación
        const err = document.createElement('div');
        err.className = 'error-message'; // Usamos una clase CSS para errores
        err.id = 'err_' + q.id;
        qEl.appendChild(err);

        questionWrap.appendChild(qEl);

        // Actualizar controles
        prevBtn.disabled = (i === 0);
        nextBtn.textContent = (i === questions.length - 1) ? 'Finalizar y Enviar' : 'Siguiente →';
        
        if (i === questions.length - 1) {
             nextBtn.classList.add('submit-btn');
        } else {
             nextBtn.classList.remove('submit-btn');
        }


        // Actualizar progreso
        const pct = Math.round(((i + 1) / questions.length) * 100);
        progressBar.style.width = pct + '%';
    }

    /**
     * Valida la respuesta de la pregunta actual antes de avanzar o finalizar.
     * @returns {boolean} True si la validación pasa, False en caso contrario.
     */
    function validateCurrent() {
        const q = questions[index];
        const val = answers[q.id];
        const errEl = document.getElementById('err_' + q.id);
        if (errEl) errEl.textContent = ''; // Limpiar errores previos

        if (q.required) {
            let isValid = true;
            if (q.type === 'checkbox') {
                if (!Array.isArray(val) || val.length === 0) {
                    if (errEl) errEl.textContent = 'Por favor selecciona al menos una opción.';
                    isValid = false;
                }
            } else {
                if (val === undefined || val === null || String(val).trim() === '') {
                    if (errEl) errEl.textContent = 'Campo obligatorio.';
                    isValid = false;
                }
            }
            if (!isValid) return false;
        }

        // Validación de formato específica para RUT/Correo (simplificada)
        if (q.id === 'rut' && val && !/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(val.trim())) {
             if (errEl) errEl.textContent = 'Formato de RUT incorrecto (Ej: 12.345.678-k).';
             return false;
        }
        if (q.id === 'correo' && val && !/^\S+@\S+\.\S+$/.test(val.trim())) {
             if (errEl) errEl.textContent = 'Formato de correo electrónico incorrecto.';
             return false;
        }

        return true;
    }

    /**
     * Muestra el resumen de las respuestas y simula el envío.
     */
    function showResult() {
        quizSection.classList.add('hidden');
        resultEl.classList.remove('hidden');
        if (actionsEl) actionsEl.classList.add('hidden');
        progressBar.style.width = '100%';

        // Formatear las respuestas para el resumen
        const lines = questions.map(q => {
            let v = answers[q.id];
            let valueText;

            if (v === undefined || v === null || (Array.isArray(v) && v.length === 0) || String(v).trim() === '') {
                valueText = '(Sin respuesta)';
            } else if (Array.isArray(v)) {
                valueText = v.join(', ');
            } else {
                valueText = String(v);
            }
            
            return `<strong>${q.label}</strong><br>→ ${valueText}`;
        }).join('<br><br>');
        
        // Simular el proceso de envío
        resultEl.innerHTML = `
            <h2 class="success-message">¡Formulario completado!</h2>
            <p class="lead">Gracias por su tiempo. Sus datos han sido guardados.</p>
            <div class="summary">
                <p><strong>Resumen de respuestas:</strong></p>
                <div class="summary-content">${lines}</div>
            </div>
            <button onclick="window.location.reload()" class="submit-btn" type="button">Empezar de nuevo</button>
        `;

        // Aquí iría la llamada a fetch() para enviar los datos al servidor
        console.log('--- Datos de la encuesta listos para enviar (POST) ---');
        console.log(answers);
    }

    // --- MANEJO DE EVENTOS ---
    
    // Función de inicialización de listeners para manejar duplicados
    function setupListeners() {
        // Clonar y reemplazar para eliminar listeners anteriores (práctica defensiva)
        const prevClone = prevBtn.cloneNode(true);
        const nextClone = nextBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(prevClone, prevBtn);
        nextBtn.parentNode.replaceChild(nextClone, nextBtn);

        const prev = document.getElementById(prevBtnId);
        const next = document.getElementById(nextBtnId);

        prev.addEventListener('click', () => {
            // No es necesario validar al retroceder
            if (index > 0) {
                index--;
                renderQuestion(index);
            }
        });

        next.addEventListener('click', () => {
            if (!validateCurrent()) return; // Detener si la validación falla
            
            if (index < questions.length - 1) {
                index++;
                renderQuestion(index);
            } else {
                // Última pregunta: validar y mostrar resultado
                showResult();
            }
        });
    }

    // Iniciar
    setupListeners();
    renderQuestion(index);

    // Devolver API ligera
    return {
        getAnswers: () => ({ ...answers }),
        goTo: (n) => { if (n >= 0 && n < questions.length) { index = n; renderQuestion(index); } }
    };
}


// Ejecutar la inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initQuiz({
        questionWrapId: 'questionWrap',
        prevBtnId: 'prevBtn',
        nextBtnId: 'nextBtn',
        progressBarId: 'progressBar',
        resultId: 'result',
        actionsId: 'actions'
    });
});
