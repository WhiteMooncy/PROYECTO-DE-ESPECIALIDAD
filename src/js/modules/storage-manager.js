/**
 * HYDRO-CONECTA - Gestor de Almacenamiento Local
 * Sistema de persistencia usando localStorage para GitHub Pages
 * Maneja encuestas, comentarios y configuración del usuario
 */

class StorageManager {
    constructor() {
        // Claves de almacenamiento
        this.STORAGE_KEYS = {
            SURVEYS: 'hydro_surveys',
            COMMENTS: 'hydro_comments',
            SETTINGS: 'hydro_settings',
            VERSION: 'hydro_version'
        };

        // Versión actual del schema
        this.CURRENT_VERSION = '2.0.0';

        // Límites de almacenamiento
        this.MAX_SURVEYS = 100;
        this.MAX_COMMENTS = 200;
        this.MAX_AGE_DAYS = 90; // 90 días

        // Inicializar versión
        this.checkAndMigrate();
    }

    /**
     * Verifica la versión y migra datos si es necesario
     */
    checkAndMigrate() {
        const storedVersion = localStorage.getItem(this.STORAGE_KEYS.VERSION);
        
        if (!storedVersion) {
            // Primera vez, establecer versión
            localStorage.setItem(this.STORAGE_KEYS.VERSION, this.CURRENT_VERSION);
        } else if (storedVersion !== this.CURRENT_VERSION) {
            // Migrar datos si hay cambios de versión
            this.migrateData(storedVersion, this.CURRENT_VERSION);
            localStorage.setItem(this.STORAGE_KEYS.VERSION, this.CURRENT_VERSION);
        }
    }

    /**
     * Migra datos entre versiones
     */
    migrateData(fromVersion, toVersion) {
        console.log(`Migrando datos de ${fromVersion} a ${toVersion}`);
        // Implementar lógica de migración si es necesario en el futuro
    }

    /**
     * Genera ID único para registros
     * @returns {string} ID único
     */
    generateId() {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Valida el tamaño del almacenamiento
     * @returns {Object} Información de uso de almacenamiento
     */
    getStorageInfo() {
        let totalSize = 0;
        let used = 0;

        try {
            // Calcular tamaño usado
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length + key.length;
                }
            }

            // Estimar tamaño disponible (5MB en la mayoría de navegadores)
            const maxSize = 5 * 1024 * 1024; // 5MB
            used = (totalSize / maxSize) * 100;

            return {
                used: totalSize,
                total: maxSize,
                percentage: used.toFixed(2),
                available: maxSize - totalSize
            };
        } catch (error) {
            console.error('Error calculando almacenamiento:', error);
            return { used: 0, total: 0, percentage: 0, available: 0 };
        }
    }

    /**
     * Limpia registros antiguos
     */
    cleanOldData() {
        try {
            const maxAge = this.MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
            const now = Date.now();

            // Limpiar encuestas antiguas
            const surveys = this.getSurveys();
            const validSurveys = surveys.filter(survey => {
                const age = now - new Date(survey.timestamp).getTime();
                return age < maxAge;
            });

            if (validSurveys.length !== surveys.length) {
                localStorage.setItem(
                    this.STORAGE_KEYS.SURVEYS,
                    JSON.stringify(validSurveys)
                );
                console.log(`Limpiadas ${surveys.length - validSurveys.length} encuestas antiguas`);
            }

            // Limpiar comentarios antiguos
            const comments = this.getComments();
            const validComments = comments.filter(comment => {
                const age = now - new Date(comment.timestamp).getTime();
                return age < maxAge;
            });

            if (validComments.length !== comments.length) {
                localStorage.setItem(
                    this.STORAGE_KEYS.COMMENTS,
                    JSON.stringify(validComments)
                );
                console.log(`Limpiados ${comments.length - validComments.length} comentarios antiguos`);
            }

        } catch (error) {
            console.error('Error limpiando datos antiguos:', error);
        }
    }

    /**
     * Guarda una encuesta completada
     * @param {Object} surveyData - Datos de la encuesta
     * @returns {Object} Resultado de la operación
     */
    saveSurvey(surveyData) {
        try {
            // Validar datos
            if (!surveyData || typeof surveyData !== 'object') {
                return { success: false, error: 'Datos de encuesta inválidos' };
            }

            const surveys = this.getSurveys();
            
            // Verificar límite
            if (surveys.length >= this.MAX_SURVEYS) {
                // Eliminar la más antigua
                surveys.shift();
            }

            const newSurvey = {
                id: this.generateId(),
                timestamp: new Date().toISOString(),
                data: surveyData,
                status: 'Completa',
                version: this.CURRENT_VERSION
            };

            surveys.push(newSurvey);
            
            // Guardar con manejo de errores
            try {
                localStorage.setItem(
                    this.STORAGE_KEYS.SURVEYS,
                    JSON.stringify(surveys)
                );
            } catch (quotaError) {
                // Si hay error de cuota, limpiar datos antiguos e intentar de nuevo
                this.cleanOldData();
                localStorage.setItem(
                    this.STORAGE_KEYS.SURVEYS,
                    JSON.stringify(surveys)
                );
            }

            return { 
                success: true, 
                id: newSurvey.id,
                timestamp: newSurvey.timestamp 
            };

        } catch (error) {
            console.error('Error guardando encuesta:', error);
            return { 
                success: false, 
                error: error.message || 'Error desconocido' 
            };
        }
    }

    /**
     * Obtiene todas las encuestas guardadas
     * @returns {Array} Array de encuestas
     */
    getSurveys() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.SURVEYS);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error leyendo encuestas:', error);
            return [];
        }
    }

    /**
     * Obtiene una encuesta específica por ID
     * @param {string} id - ID de la encuesta
     * @returns {Object|null} Encuesta encontrada o null
     */
    getSurveyById(id) {
        const surveys = this.getSurveys();
        return surveys.find(survey => survey.id === id) || null;
    }

    /**
     * Guarda un comentario con clasificación IA
     * @param {string} commentText - Texto del comentario
     * @param {Object} additionalData - Datos adicionales opcionales
     * @returns {Object} Resultado de la operación
     */
    saveComment(commentText, additionalData = {}) {
        try {
            // Validar texto
            if (!commentText || typeof commentText !== 'string') {
                return { success: false, error: 'Texto de comentario inválido' };
            }

            // Sanitizar texto
            const sanitizedText = this.sanitizeText(commentText);

            // Clasificar con IA
            const classifier = new CommentClassifier();
            const classification = classifier.classify(sanitizedText);

            const comments = this.getComments();
            
            // Verificar límite
            if (comments.length >= this.MAX_COMMENTS) {
                // Eliminar el más antiguo
                comments.shift();
            }

            const newComment = {
                id: this.generateId(),
                timestamp: new Date().toISOString(),
                text: sanitizedText,
                category: classification.category,
                sentiment: classification.sentiment,
                confidence: classification.confidence,
                respondido: false,
                ...additionalData
            };

            comments.push(newComment);

            // Guardar
            try {
                localStorage.setItem(
                    this.STORAGE_KEYS.COMMENTS,
                    JSON.stringify(comments)
                );
            } catch (quotaError) {
                this.cleanOldData();
                localStorage.setItem(
                    this.STORAGE_KEYS.COMMENTS,
                    JSON.stringify(comments)
                );
            }

            return { 
                success: true, 
                comment: newComment 
            };

        } catch (error) {
            console.error('Error guardando comentario:', error);
            return { 
                success: false, 
                error: error.message || 'Error desconocido' 
            };
        }
    }

    /**
     * Obtiene comentarios con filtros opcionales
     * @param {Object} filters - Filtros a aplicar
     * @returns {Array} Array de comentarios filtrados
     */
    getComments(filters = {}) {
        try {
            let comments = localStorage.getItem(this.STORAGE_KEYS.COMMENTS);
            comments = comments ? JSON.parse(comments) : [];

            // Aplicar filtros
            if (filters.category && filters.category !== 'all') {
                comments = comments.filter(c =>
                    c.category.toLowerCase() === filters.category.toLowerCase()
                );
            }

            if (filters.sentiment && filters.sentiment !== 'all') {
                comments = comments.filter(c =>
                    c.sentiment.toLowerCase() === filters.sentiment.toLowerCase()
                );
            }

            if (filters.respondido !== undefined) {
                comments = comments.filter(c => c.respondido === filters.respondido);
            }

            // Ordenar por fecha (más recientes primero)
            comments.sort((a, b) => 
                new Date(b.timestamp) - new Date(a.timestamp)
            );

            return comments;

        } catch (error) {
            console.error('Error leyendo comentarios:', error);
            return [];
        }
    }

    /**
     * Marca un comentario como respondido
     * @param {string} id - ID del comentario
     * @returns {boolean} Éxito de la operación
     */
    markCommentAsResponded(id) {
        try {
            const comments = this.getComments();
            const comment = comments.find(c => c.id === id);
            
            if (comment) {
                comment.respondido = true;
                comment.respondidoAt = new Date().toISOString();
                
                localStorage.setItem(
                    this.STORAGE_KEYS.COMMENTS,
                    JSON.stringify(comments)
                );
                
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error marcando comentario:', error);
            return false;
        }
    }

    /**
     * Sanitiza texto para prevenir XSS
     * @param {string} text - Texto a sanitizar
     * @returns {string} Texto sanitizado
     */
    sanitizeText(text) {
        if (!text) return '';
        
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        
        return text.replace(/[&<>"'/]/g, char => map[char]);
    }

    /**
     * Obtiene configuración guardada
     * @returns {Object} Configuración del usuario
     */
    getSettings() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
            return data ? JSON.parse(data) : this.getDefaultSettings();
        } catch (error) {
            console.error('Error leyendo configuración:', error);
            return this.getDefaultSettings();
        }
    }

    /**
     * Guarda configuración del usuario
     * @param {Object} settings - Configuración a guardar
     * @returns {boolean} Éxito de la operación
     */
    saveSettings(settings) {
        try {
            localStorage.setItem(
                this.STORAGE_KEYS.SETTINGS,
                JSON.stringify(settings)
            );
            return true;
        } catch (error) {
            console.error('Error guardando configuración:', error);
            return false;
        }
    }

    /**
     * Configuración por defecto
     * @returns {Object} Configuración predeterminada
     */
    getDefaultSettings() {
        return {
            theme: 'light',
            language: 'es',
            notifications: true,
            autoSave: true
        };
    }

    /**
     * Exporta todos los datos como JSON
     * @returns {Object} Objeto con todos los datos
     */
    exportData() {
        return {
            version: this.CURRENT_VERSION,
            exportDate: new Date().toISOString(),
            surveys: this.getSurveys(),
            comments: this.getComments(),
            settings: this.getSettings(),
            storageInfo: this.getStorageInfo()
        };
    }

    /**
     * Importa datos desde JSON
     * @param {Object} data - Datos a importar
     * @returns {boolean} Éxito de la operación
     */
    importData(data) {
        try {
            if (!data || typeof data !== 'object') {
                throw new Error('Datos de importación inválidos');
            }

            if (data.surveys) {
                localStorage.setItem(
                    this.STORAGE_KEYS.SURVEYS,
                    JSON.stringify(data.surveys)
                );
            }

            if (data.comments) {
                localStorage.setItem(
                    this.STORAGE_KEYS.COMMENTS,
                    JSON.stringify(data.comments)
                );
            }

            if (data.settings) {
                localStorage.setItem(
                    this.STORAGE_KEYS.SETTINGS,
                    JSON.stringify(data.settings)
                );
            }

            return true;
        } catch (error) {
            console.error('Error importando datos:', error);
            return false;
        }
    }

    /**
     * Limpia todos los datos del almacenamiento
     * @param {boolean} confirm - Confirmación de limpieza
     * @returns {boolean} Éxito de la operación
     */
    clearAll(confirm = false) {
        if (!confirm) {
            console.warn('Se requiere confirmación para limpiar datos');
            return false;
        }

        try {
            Object.values(this.STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            
            console.log('Todos los datos han sido eliminados');
            return true;
        } catch (error) {
            console.error('Error limpiando datos:', error);
            return false;
        }
    }

    /**
     * Obtiene estadísticas de uso
     * @returns {Object} Estadísticas
     */
    getStatistics() {
        return {
            totalSurveys: this.getSurveys().length,
            totalComments: this.getComments().length,
            commentsByCategory: this.getCommentsByCategory(),
            commentsBySentiment: this.getCommentsBySentiment(),
            storageInfo: this.getStorageInfo()
        };
    }

    /**
     * Obtiene distribución de comentarios por categoría
     * @returns {Object} Distribución por categoría
     */
    getCommentsByCategory() {
        const comments = this.getComments();
        const distribution = {
            Reclamo: 0,
            Solicitud: 0,
            Duda: 0,
            Agradecimiento: 0,
            General: 0
        };

        comments.forEach(comment => {
            distribution[comment.category] = (distribution[comment.category] || 0) + 1;
        });

        return distribution;
    }

    /**
     * Obtiene distribución de comentarios por sentimiento
     * @returns {Object} Distribución por sentimiento
     */
    getCommentsBySentiment() {
        const comments = this.getComments();
        const distribution = {
            Positivo: 0,
            Negativo: 0,
            Neutral: 0
        };

        comments.forEach(comment => {
            distribution[comment.sentiment] = (distribution[comment.sentiment] || 0) + 1;
        });

        return distribution;
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.StorageManager = StorageManager;
}

// Exportar para Node.js (testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}
