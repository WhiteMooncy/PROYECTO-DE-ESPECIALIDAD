/**
 * HYDRO-CONECTA - Sistema de Clasificación de Comentarios con IA
 * Clasificador de comentarios usando procesamiento de lenguaje natural básico
 * Compatible con navegadores modernos - Sin dependencias
 */

class CommentClassifier {
    constructor() {
        // Palabras clave para clasificación de categorías - Contexto: Represa Hidroeléctrica
        this.keywords = {
            reclamo: [
                'pésimo', 'vergüenza', 'problema', 'malo', 'insatisfecho', 
                'inaceptable', 'grosero', 'lenta', 'deficiente', 'terrible',
                'horrible', 'desastre', 'queja', 'molesto', 'indignado',
                'furioso', 'enojado', 'frustrado', 'decepcionado',
                // Específicos de represa
                'inundación', 'desplazamiento', 'expulsión', 'despojo',
                'contaminación', 'destrucción', 'afectación', 'perjuicio',
                'daño', 'pérdida', 'injusticia', 'abuso'
            ],
            solicitud: [
                'solicitar', 'solicitud', 'quiero', 'necesito', 'podría',
                'gestión', 'ayuda', 'favor', 'requiero', 'quisiera',
                'necesitaría', 'petición', 'pedido', 'demanda',
                // Específicos de represa
                'compensación', 'indemnización', 'reubicación', 'relocalización',
                'mitigación', 'evaluación', 'estudio', 'informe', 'medición'
            ],
            duda: [
                'duda', 'pregunta', '¿', 'cómo', 'cuándo', 'información',
                'consulta', 'aclaración', 'desconocimiento', 'saber',
                'entender', 'explicar', 'informar', 'qué', 'dónde',
                // Específicos de represa
                'impacto', 'consecuencia', 'efecto', 'plazo', 'cronograma',
                'plan', 'proceso', 'procedimiento', 'protocolo'
            ],
            agradecimiento: [
                'gracias', 'excelente', 'felicito', 'fantástico', 'perfecto',
                'agradezco', 'agradecer', 'gratitud', 'satisfecho',
                'contento', 'feliz', 'aprecio',
                // Específicos de represa
                'oportunidad', 'empleo', 'progreso', 'desarrollo', 'beneficio',
                'inclusión', 'participación', 'transparencia'
            ]
        };

        // Palabras clave para análisis de sentimiento - Contexto: Represa Hidroeléctrica
        this.sentimentWords = {
            positivo: [
                'excelente', 'felicito', 'fantástico', 'perfecto', 'satisfecho',
                'gran', 'rápido', 'bueno', 'bien', 'maravilloso', 'increíble',
                'genial', 'óptimo', 'eficiente', 'agradable', 'positivo',
                'favorable', 'exitoso', 'feliz', 'contento', 'alegre',
                // Específicos de represa
                'oportunidad', 'empleo', 'progreso', 'desarrollo', 'energía',
                'sostenible', 'limpia', 'renovable', 'beneficio', 'mejora',
                'modernización', 'avance', 'crecimiento', 'inclusión'
            ],
            negativo: [
                'pésimo', 'vergüenza', 'problema', 'malo', 'insatisfecho',
                'inaceptable', 'grosero', 'lenta', 'deficiente', 'terrible',
                'horrible', 'desastre', 'molesto', 'furioso', 'enojado',
                'frustrado', 'decepcionado', 'triste', 'desagradable',
                'negativo', 'desfavorable',
                // Específicos de represa
                'inundación', 'desplazamiento', 'contaminación', 'destrucción',
                'pérdida', 'daño', 'afectación', 'perjuicio', 'riesgo',
                'amenaza', 'desastre', 'catástrofe', 'ecosistema', 'biodiversidad',
                'ancestral', 'despojo', 'expulsión', 'injusticia'
            ]
        };

        // Intensificadores de sentimiento
        this.intensifiers = ['muy', 'demasiado', 'extremadamente', 'sumamente'];
        
        // Negadores
        this.negators = ['no', 'nunca', 'jamás', 'tampoco', 'sin'];
    }

    /**
     * Normaliza texto: minúsculas y sin acentos
     * @param {string} text - Texto a normalizar
     * @returns {string} Texto normalizado
     */
    normalize(text) {
        if (!text || typeof text !== 'string') return '';
        
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }

    /**
     * Cuenta ocurrencias de palabras clave en el texto
     * @param {string} text - Texto a analizar
     * @param {Array} wordList - Lista de palabras a buscar
     * @returns {number} Número de coincidencias
     */
    countMatches(text, wordList) {
        let count = 0;
        const normalized = this.normalize(text);
        
        for (const word of wordList) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = normalized.match(regex);
            if (matches) {
                count += matches.length;
            }
        }
        
        return count;
    }

    /**
     * Clasifica la categoría del comentario
     * @param {string} text - Texto del comentario
     * @returns {string} Categoría identificada
     */
    classifyCategory(text) {
        if (!text) return 'General';

        const normalized = this.normalize(text);
        const scores = {
            reclamo: 0,
            solicitud: 0,
            duda: 0,
            agradecimiento: 0
        };

        // Calcular scores para cada categoría
        for (const [category, words] of Object.entries(this.keywords)) {
            scores[category] = this.countMatches(normalized, words);
        }

        // Buscar categoría con mayor score
        const maxScore = Math.max(...Object.values(scores));
        
        // Si no hay coincidencias, retornar General
        if (maxScore === 0) return 'General';

        // Retornar la categoría con mayor score
        const category = Object.keys(scores).find(key => scores[key] === maxScore);
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    /**
     * Clasifica el sentimiento del comentario
     * @param {string} text - Texto del comentario
     * @returns {string} Sentimiento identificado (Positivo, Negativo, Neutral)
     */
    classifySentiment(text) {
        if (!text) return 'Neutral';

        const normalized = this.normalize(text);
        let positiveScore = this.countMatches(normalized, this.sentimentWords.positivo);
        let negativeScore = this.countMatches(normalized, this.sentimentWords.negativo);

        // Verificar negación (invierte el sentimiento)
        const hasNegation = this.negators.some(neg => normalized.includes(neg));
        if (hasNegation) {
            // Swap scores si hay negación
            [positiveScore, negativeScore] = [negativeScore, positiveScore];
        }

        // Aplicar peso de intensificadores
        const hasIntensifier = this.intensifiers.some(int => normalized.includes(int));
        if (hasIntensifier) {
            positiveScore *= 1.5;
            negativeScore *= 1.5;
        }

        // Determinar sentimiento basado en scores
        const difference = Math.abs(positiveScore - negativeScore);
        
        if (difference < 1) return 'Neutral';
        if (positiveScore > negativeScore) return 'Positivo';
        if (negativeScore > positiveScore) return 'Negativo';
        
        return 'Neutral';
    }

    /**
     * Calcula un score de confianza de la clasificación (0-100)
     * @param {string} text - Texto del comentario
     * @returns {number} Score de confianza
     */
    getConfidenceScore(text) {
        if (!text) return 0;

        const normalized = this.normalize(text);
        const words = normalized.split(/\s+/).length;
        
        // Contar total de palabras clave encontradas
        let totalMatches = 0;
        for (const wordList of Object.values(this.keywords)) {
            totalMatches += this.countMatches(normalized, wordList);
        }
        
        // Calcular confianza basada en densidad de palabras clave
        const density = words > 0 ? (totalMatches / words) * 100 : 0;
        
        // Limitar entre 0 y 100
        return Math.min(Math.round(density * 10), 100);
    }

    /**
     * Clasificación completa de un comentario
     * @param {string} text - Texto del comentario a clasificar
     * @returns {Object} Objeto con categoría, sentimiento y confianza
     */
    classify(text) {
        if (!text || typeof text !== 'string') {
            return {
                category: 'General',
                sentiment: 'Neutral',
                confidence: 0
            };
        }

        return {
            category: this.classifyCategory(text),
            sentiment: this.classifySentiment(text),
            confidence: this.getConfidenceScore(text)
        };
    }

    /**
     * Clasifica múltiples comentarios
     * @param {Array} comments - Array de strings con comentarios
     * @returns {Array} Array de objetos con clasificaciones
     */
    classifyBatch(comments) {
        if (!Array.isArray(comments)) return [];
        
        return comments.map(comment => ({
            text: comment,
            ...this.classify(comment)
        }));
    }

    /**
     * Extrae palabras clave más relevantes del texto
     * @param {string} text - Texto a analizar
     * @param {number} topN - Número de palabras clave a retornar
     * @returns {Array} Array de palabras clave
     */
    extractKeywords(text, topN = 5) {
        if (!text) return [];

        const normalized = this.normalize(text);
        const words = normalized.split(/\s+/);
        
        // Palabras comunes a ignorar (stopwords español)
        const stopwords = [
            'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se',
            'no', 'haber', 'por', 'con', 'su', 'para', 'como', 'estar',
            'tener', 'le', 'lo', 'todo', 'pero', 'más', 'hacer', 'o',
            'poder', 'decir', 'este', 'ir', 'otro', 'ese', 'si', 'me',
            'ya', 'ver', 'porque', 'dar', 'cuando', 'él', 'muy', 'sin',
            'vez', 'mucho', 'saber', 'qué', 'sobre', 'mi', 'alguno',
            'mismo', 'yo', 'también', 'hasta', 'año', 'dos', 'querer',
            'entre', 'así', 'primero', 'desde', 'grande', 'eso', 'ni',
            'nos', 'llegar', 'pasar', 'tiempo', 'ella', 'sí', 'día',
            'uno', 'bien', 'poco', 'deber', 'entonces', 'poner', 'cosa',
            'tanto', 'hombre', 'parecer', 'nuestro', 'tan', 'donde'
        ];
        
        // Filtrar stopwords y contar frecuencia
        const wordFreq = {};
        words.forEach(word => {
            if (word.length > 3 && !stopwords.includes(word)) {
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            }
        });
        
        // Ordenar por frecuencia y retornar top N
        return Object.entries(wordFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN)
            .map(([word]) => word);
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.CommentClassifier = CommentClassifier;
}

// Exportar para Node.js (testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CommentClassifier;
}
