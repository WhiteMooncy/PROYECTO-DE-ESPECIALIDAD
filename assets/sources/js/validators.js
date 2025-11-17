/**
 * HYDRO-CONECTA - Validadores de Formularios
 * Validación robusta para formularios chilenos
 * Incluye validación de RUT, teléfono, email, fechas
 */

class FormValidators {
    /**
     * Valida RUT chileno con dígito verificador
     * @param {string} rut - RUT a validar (puede incluir puntos y guión)
     * @returns {boolean} true si el RUT es válido
     */
    static validateRUT(rut) {
        if (!rut || typeof rut !== 'string') return false;

        // Limpiar formato: eliminar puntos y guión
        const cleanRUT = rut.replace(/\./g, '').replace(/-/g, '').trim().toUpperCase();
        
        // Verificar longitud mínima
        if (cleanRUT.length < 8 || cleanRUT.length > 9) return false;
        
        // Separar cuerpo y dígito verificador
        const body = cleanRUT.slice(0, -1);
        const dv = cleanRUT.slice(-1);
        
        // Verificar que el cuerpo solo contenga números
        if (!/^\d+$/.test(body)) return false;
        
        // Calcular dígito verificador
        let sum = 0;
        let multiplier = 2;
        
        // Iterar de derecha a izquierda
        for (let i = body.length - 1; i >= 0; i--) {
            sum += parseInt(body[i]) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }
        
        // Calcular DV esperado
        const expectedDV = 11 - (sum % 11);
        const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString();
        
        return dv === calculatedDV;
    }

    /**
     * Formatea RUT chileno (12.345.678-9)
     * @param {string} rut - RUT a formatear
     * @returns {string} RUT formateado
     */
    static formatRUT(rut) {
        if (!rut) return '';
        
        // Limpiar
        const clean = rut.replace(/\./g, '').replace(/-/g, '').trim().toUpperCase();
        
        // Separar cuerpo y DV
        const body = clean.slice(0, -1);
        const dv = clean.slice(-1);
        
        // Formatear con puntos
        let formatted = '';
        let count = 0;
        
        for (let i = body.length - 1; i >= 0; i--) {
            formatted = body[i] + formatted;
            count++;
            if (count === 3 && i !== 0) {
                formatted = '.' + formatted;
                count = 0;
            }
        }
        
        return `${formatted}-${dv}`;
    }

    /**
     * Valida email según RFC 5322 (simplificado)
     * @param {string} email - Email a validar
     * @returns {boolean} true si el email es válido
     */
    static validateEmail(email) {
        if (!email || typeof email !== 'string') return false;
        
        // Regex simplificado pero robusto
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Validar formato básico
        if (!regex.test(email)) return false;
        
        // Validaciones adicionales
        const parts = email.split('@');
        if (parts.length !== 2) return false;
        
        const [localPart, domain] = parts;
        
        // Verificar longitudes
        if (localPart.length === 0 || localPart.length > 64) return false;
        if (domain.length === 0 || domain.length > 255) return false;
        
        // Verificar que el dominio tenga al menos un punto
        if (!domain.includes('.')) return false;
        
        // Verificar caracteres inválidos
        if (/[<>()[\]\\,;:\s@"]/.test(localPart)) return false;
        
        return true;
    }

    /**
     * Valida teléfono chileno
     * Acepta formatos: +56912345678, 912345678, +56 9 1234 5678, 9 1234 5678
     * @param {string} phone - Teléfono a validar
     * @returns {boolean} true si el teléfono es válido
     */
    static validatePhone(phone) {
        if (!phone || typeof phone !== 'string') return false;
        
        // Limpiar espacios, guiones y paréntesis
        const cleaned = phone.replace(/[\s\-()]/g, '').replace(/^\+/, '');
        
        // Patrones válidos para Chile
        const patterns = [
            /^569\d{8}$/,      // +56912345678 (sin +)
            /^9\d{8}$/,        // 912345678
            /^2\d{7,8}$/,      // Fijo Santiago: 223456789
            /^(?:3[2-5]|4[1-5]|5[1-5]|6[1-3]|7[1-5])\d{6,7}$/ // Otras regiones
        ];
        
        return patterns.some(pattern => pattern.test(cleaned));
    }

    /**
     * Formatea teléfono chileno
     * @param {string} phone - Teléfono a formatear
     * @returns {string} Teléfono formateado
     */
    static formatPhone(phone) {
        if (!phone) return '';
        
        const cleaned = phone.replace(/[\s\-()]/g, '').replace(/^\+/, '');
        
        // Si es móvil (9 dígitos empezando con 9)
        if (/^9\d{8}$/.test(cleaned)) {
            return `+56 9 ${cleaned.slice(1, 5)} ${cleaned.slice(5)}`;
        }
        
        // Si es con código de país
        if (/^569\d{8}$/.test(cleaned)) {
            return `+56 9 ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
        }
        
        return phone; // Retornar sin cambios si no coincide
    }

    /**
     * Valida fecha en formato DD/MM/YYYY
     * @param {string} dateString - Fecha a validar
     * @returns {boolean} true si la fecha es válida
     */
    static validateDate(dateString) {
        if (!dateString || typeof dateString !== 'string') return false;
        
        // Verificar formato DD/MM/YYYY
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = dateString.match(regex);
        
        if (!match) return false;
        
        const day = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const year = parseInt(match[3], 10);
        
        // Validar rangos básicos
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        if (year < 1900 || year > new Date().getFullYear() + 1) return false;
        
        // Validar días por mes
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) return false;
        
        // Validar que no sea fecha futura (para fecha de nacimiento)
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        
        return inputDate <= today;
    }

    /**
     * Valida edad (entre 0 y 120 años)
     * @param {string|number} age - Edad a validar
     * @returns {boolean} true si la edad es válida
     */
    static validateAge(age) {
        const numAge = parseInt(age, 10);
        return !isNaN(numAge) && numAge >= 0 && numAge <= 120;
    }

    /**
     * Calcula edad desde fecha de nacimiento
     * @param {string} birthDate - Fecha de nacimiento (DD/MM/YYYY)
     * @returns {number|null} Edad en años o null si es inválida
     */
    static calculateAge(birthDate) {
        if (!this.validateDate(birthDate)) return null;
        
        const [day, month, year] = birthDate.split('/').map(Number);
        const birth = new Date(year, month - 1, day);
        const today = new Date();
        
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    /**
     * Valida que un texto no esté vacío (sin solo espacios)
     * @param {string} text - Texto a validar
     * @param {number} minLength - Longitud mínima (default: 1)
     * @param {number} maxLength - Longitud máxima (default: 500)
     * @returns {boolean} true si el texto es válido
     */
    static validateText(text, minLength = 1, maxLength = 500) {
        if (!text || typeof text !== 'string') return false;
        
        const trimmed = text.trim();
        return trimmed.length >= minLength && trimmed.length <= maxLength;
    }

    /**
     * Valida número positivo
     * @param {string|number} num - Número a validar
     * @param {number} min - Valor mínimo (default: 0)
     * @param {number} max - Valor máximo (default: Infinity)
     * @returns {boolean} true si el número es válido
     */
    static validateNumber(num, min = 0, max = Infinity) {
        const parsed = parseFloat(num);
        return !isNaN(parsed) && parsed >= min && parsed <= max;
    }

    /**
     * Sanitiza input contra XSS
     * @param {string} input - Input a sanitizar
     * @returns {string} Input sanitizado
     */
    static sanitizeInput(input) {
        if (!input || typeof input !== 'string') return '';
        
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;',
        };
        
        return input.replace(/[&<>"'/]/g, char => map[char]);
    }

    /**
     * Valida longitud de contraseña (si se implementa login)
     * @param {string} password - Contraseña a validar
     * @returns {Object} Resultado de validación con detalles
     */
    static validatePassword(password) {
        const result = {
            valid: true,
            errors: [],
            strength: 'weak'
        };

        if (!password || typeof password !== 'string') {
            result.valid = false;
            result.errors.push('Contraseña requerida');
            return result;
        }

        // Longitud mínima
        if (password.length < 8) {
            result.valid = false;
            result.errors.push('Mínimo 8 caracteres');
        }

        // Al menos una mayúscula
        if (!/[A-Z]/.test(password)) {
            result.valid = false;
            result.errors.push('Debe contener una mayúscula');
        }

        // Al menos una minúscula
        if (!/[a-z]/.test(password)) {
            result.valid = false;
            result.errors.push('Debe contener una minúscula');
        }

        // Al menos un número
        if (!/\d/.test(password)) {
            result.valid = false;
            result.errors.push('Debe contener un número');
        }

        // Calcular fortaleza
        if (result.valid) {
            if (password.length >= 12 && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                result.strength = 'strong';
            } else if (password.length >= 10) {
                result.strength = 'medium';
            }
        }

        return result;
    }

    /**
     * Valida dirección chilena (básico)
     * @param {string} address - Dirección a validar
     * @returns {boolean} true si la dirección parece válida
     */
    static validateAddress(address) {
        if (!address || typeof address !== 'string') return false;
        
        const trimmed = address.trim();
        
        // Debe tener al menos 5 caracteres y contener un número
        return trimmed.length >= 5 && /\d/.test(trimmed);
    }

    /**
     * Valida selección de radio/checkbox
     * @param {string} name - Nombre del grupo
     * @returns {boolean} true si hay al menos una opción seleccionada
     */
    static validateRadioGroup(name) {
        const radios = document.querySelectorAll(`input[name="${name}"]`);
        return Array.from(radios).some(radio => radio.checked);
    }

    /**
     * Obtiene mensajes de error personalizados
     * @param {string} fieldType - Tipo de campo
     * @returns {string} Mensaje de error
     */
    static getErrorMessage(fieldType) {
        const messages = {
            rut: 'RUT inválido. Formato: 12.345.678-9',
            email: 'Email inválido. Formato: usuario@ejemplo.com',
            phone: 'Teléfono inválido. Formato: +56 9 1234 5678',
            date: 'Fecha inválida. Formato: DD/MM/AAAA',
            age: 'Edad inválida (0-120 años)',
            text: 'Este campo es requerido',
            number: 'Número inválido',
            address: 'Dirección inválida',
            password: 'Contraseña no cumple requisitos mínimos'
        };

        return messages[fieldType] || 'Campo inválido';
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.FormValidators = FormValidators;
}

// Exportar para Node.js (testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidators;
}
