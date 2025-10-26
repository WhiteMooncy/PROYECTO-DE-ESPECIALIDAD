// --- CONFIGURA AQUÍ TUS PREGUNTAS ---
        const questions = [
            { id: 'rut', type: 'text', label: '¿Cuál es tu RUT?', placeholder: 'Ej: 12.000.000-k', required: true },
            { id: 'nombre', type: 'text', label: '¿Cuál es tu nombre completo?', placeholder: 'Escribe tu nombre', required: true },
            { id: 'fecha de nacimiento', type: 'text', label: '¿Cuál es tu fecha de nacimiento?', placeholder: 'DD/MM/AAAA', required: true },
            { id: 'edad', type: 'text', label: '¿Cuántos años tienes?', placeholder: 'Ej: 30', required: true },
            { id: 'estado civil', type: 'radio', label: '¿Cuál es tu estado civil?', options: ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a'], required: true },
            { id: 'ocupacion', type: 'text', label: '¿Cuál es tu ocupación?', placeholder: 'Escribe tu ocupación', required: false },
            { id: 'telefono', type: 'text', label: '¿Cuál es tu teléfono de contacto?', placeholder: '+56 9 1234 5678', required: true },
            { id: 'correo', type: 'text', label: '¿Cuál es tu correo electrónico?', placeholder: 'ej: correo@gmail.com', required: true },
            { id: 'situacion laboral', type: 'radio', label: '¿Cuál es tu situación laboral actual?', options: ['Empleado/a', 'Desempleado/a', 'Estudiante', 'Independiente', 'Jubilado/a'], required: true },
            { id: 'nivel educacional', type: 'radio', label: '¿Cuál es tu nivel educacional?', options: ['Básica', 'Media', 'Técnica', 'Universitaria', 'Postgrado'], required: true },
            { id: 'tiene discapacidad', type: 'radio', label: '¿Posee alguna discapacidad?', options: ['Sí', 'No'], required: true },// la siguente pregunta solo se mostrara si en esta opcion se responde "Sí"
            { id: 'Tipo de discapacidad', type: 'checkbox', label: 'Si respondió sí, ¿qué tipo de discapacidad posee?', options: ['Visual', 'Auditiva', 'Motora', 'Cognitiva', 'Otra'], required: false },
            { id: 'subsidopublico', type: 'radio', label: '¿Recibe algún subsidio o pension?', options: ['Sí', 'No'], required: true },
            { id: 'cual es la procedencia del subsidio o pension', type: 'text', label: 'Si respondió sí, ¿cuál es la procedencia del subsidio o pensión?', placeholder: 'Escribe la procedencia', required: false },
        ];

        // Estado
        let index = 0;
        const answers = {};

        // Elementos
        const questionWrap = document.getElementById('questionWrap');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressBar = document.getElementById('progressBar');
        const resultEl = document.getElementById('result');

        function renderQuestion(i) {
            const q = questions[i];
            questionWrap.innerHTML = '';

            const qEl = document.createElement('div');
            qEl.className = 'questionBlock';

            const label = document.createElement('div');
            label.className = 'question';
            label.textContent = q.label + (q.required ? ' *' : '');
            qEl.appendChild(label);

            const fieldWrap = document.createElement('div');

            if (q.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.id = q.id;
                input.placeholder = q.placeholder || '';
                input.value = answers[q.id] || '';
                input.addEventListener('input', e => answers[q.id] = e.target.value);
                fieldWrap.appendChild(input);
            } else if (q.type === 'textarea') {
                const ta = document.createElement('textarea');
                ta.id = q.id;
                ta.placeholder = q.placeholder || '';
                ta.rows = 4;
                ta.value = answers[q.id] || '';
                ta.addEventListener('input', e => answers[q.id] = e.target.value);
                fieldWrap.appendChild(ta);
            } else if (q.type === 'radio') {
                q.options.forEach((opt, idx) => {
                    const id = `${q.id}_${idx}`;
                    const div = document.createElement('label');
                    div.className = 'option';
                    const inp = document.createElement('input');
                    inp.type = 'radio';
                    inp.name = q.id;
                    inp.value = opt;
                    inp.id = id;
                    if (answers[q.id] === opt) inp.checked = true;
                    inp.addEventListener('change', () => answers[q.id] = opt);
                    div.appendChild(inp);
                    div.appendChild(document.createTextNode(' ' + opt));
                    fieldWrap.appendChild(div);
                });
            } else if (q.type === 'checkbox') {
                q.options.forEach((opt, idx) => {
                    const id = `${q.id}_${idx}`;
                    const div = document.createElement('label');
                    div.className = 'option';
                    const inp = document.createElement('input');
                    inp.type = 'checkbox';
                    inp.name = q.id;
                    inp.value = opt;
                    inp.id = id;
                    const saved = Array.isArray(answers[q.id]) ? answers[q.id] : [];
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
            } else {
                // fallback to text
                const input = document.createElement('input');
                input.type = 'text';
                input.id = q.id;
                input.placeholder = q.placeholder || '';
                input.value = answers[q.id] || '';
                input.addEventListener('input', e => answers[q.id] = e.target.value);
                fieldWrap.appendChild(input);
            }

            qEl.appendChild(fieldWrap);

            // error message container
            const err = document.createElement('div');
            err.className = 'error';
            err.id = 'err_' + q.id;
            qEl.appendChild(err);

            questionWrap.appendChild(qEl);

            // update controls
            prevBtn.disabled = (i === 0);
            nextBtn.textContent = (i === questions.length - 1) ? 'Enviar' : 'Siguiente →';

            // progress
            const pct = Math.round(((i) / (questions.length)) * 100);
            progressBar.style.width = pct + '%';
        }

        function validateCurrent() {
            const q = questions[index];
            const val = answers[q.id];
            const errEl = document.getElementById('err_' + q.id);
            errEl.textContent = '';
            if (q.required) {
                if (q.type === 'checkbox') {
                    if (!Array.isArray(val) || val.length === 0) {
                        errEl.textContent = 'Por favor selecciona al menos una opción.';
                        return false;
                    }
                } else {
                    if (val === undefined || val === null || String(val).trim() === '') {
                        errEl.textContent = 'Campo obligatorio.';
                        return false;
                    }
                }
            }
            return true;
        }

        function showResult() {
            const lines = questions.map(q => {
                let v = answers[q.id];
                if (v === undefined || v === null || (Array.isArray(v) && v.length === 0) || String(v).trim() === '') {
                    v = '(sin respuesta)';
                } else if (Array.isArray(v)) {
                    v = v.join(', ');
                }
                return `${q.label}\n→ ${v}`;
            }).join('\n\n');

            resultEl.classList.remove('hidden');
            questionWrap.classList.add('hidden');
            document.getElementById('actions').classList.add('hidden');
            progressBar.style.width = '100%';
            resultEl.innerHTML = `<div class="summary"><strong>Resumen de respuestas:</strong>\n\n${lines}</div>`;
        }

        prevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                renderQuestion(index);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (!validateCurrent()) return;
            if (index < questions.length - 1) {
                index++;
                renderQuestion(index);
            } else {
                // último: enviar / mostrar resumen
                if (!validateCurrent()) return;
                showResult();
                // aquí se podría enviar `answers` a un servidor con fetch()
            }
        });

        // Iniciar
        renderQuestion(index);