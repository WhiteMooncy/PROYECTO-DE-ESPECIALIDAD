# =========================================================================
# ARCHIVO: app.py
# FUNCIÓN: API REST con Flask para servir datos y simular la IA.
#          Contiene la lógica de clasificación de comentarios (NLP).
# =========================================================================

from flask import Flask, jsonify
from flask_cors import CORS 
import random

# ------------------------------------
# 1. CONFIGURACIÓN E INICIALIZACIÓN
# ------------------------------------
app = Flask(__name__)
# Permitir peticiones desde el frontend (puerto 8000 o cualquier origen)
CORS(app) 

# ------------------------------------
# 2. SIMULACIÓN DE LA IA (Clasificador de Comentarios)
# ------------------------------------

# Palabras clave para clasificación simple
RECLAMO_WORDS = ['pésimo', 'vergüenza', 'problema', 'malo', 'insatisfecho', 'inaceptable', 'grosero']
SOLICITUD_WORDS = ['solicitar', 'solicitud', 'quiero', 'necesito', 'podría', 'gestión']
DUDA_WORDS = ['duda', 'pregunta', '¿', 'cómo', 'cuándo', 'información']

NEGATIVO_WORDS = ['pésimo', 'vergüenza', 'problema', 'malo', 'insatisfecho', 'inaceptable', 'grosero', 'lenta']
POSITIVO_WORDS = ['excelente', 'felicito', 'fantástico', 'perfecto', 'satisfecho', 'gran', 'rápido']

def classify_comment(text):
    """Clasifica el texto dado en una categoría y un sentimiento (simulación de IA)."""
    try:
        text_lower = text.lower()
        
        # Clasificar categoría
        if any(word in text_lower for word in RECLAMO_WORDS):
            category = "Reclamo"
        elif any(word in text_lower for word in SOLICITUD_WORDS):
            category = "Solicitud"
        elif any(word in text_lower for word in DUDA_WORDS):
            category = "Duda"
        else:
            category = "General"
        
        # Clasificar sentimiento
        if any(word in text_lower for word in NEGATIVO_WORDS):
            sentiment = "Negativo"
        elif any(word in text_lower for word in POSITIVO_WORDS):
            sentiment = "Positivo"
        else:
            sentiment = "Neutral"
            
        return category, sentiment
    except Exception as e:
        print(f"Error en la clasificación: {e}")
        return "General", "Neutral" 


# ------------------------------------
# 3. DATOS DUMMY
# ------------------------------------

DUMMY_COMMENTS = [
    {"idComentario": 1, "textoOriginal": "La factura llegó muy alta este mes y el agua estaba turbia. Esto es un reclamo formal.", "respondido": False},
    {"idComentario": 2, "textoOriginal": "Quiero saber cuándo se completará la expansión de la red de alcantarillado en mi sector. Agradezco la ayuda.", "respondido": False},
    {"idComentario": 3, "textoOriginal": "El nuevo sistema de pago en línea es fantástico, muy rápido y cómodo. ¡Excelente servicio!", "respondido": True},
    {"idComentario": 4, "textoOriginal": "¿Puedo solicitar una visita técnica para revisar el contador que está haciendo ruido?", "respondido": False},
    {"idComentario": 5, "textoOriginal": "El personal de atención telefónica fue grosero y no me dio una solución. Es inaceptable.", "respondido": False},
    {"idComentario": 6, "textoOriginal": "Solo quería dejar constancia de que estoy muy satisfecho con la presión del agua en el último año.", "respondido": True},
    {"idComentario": 7, "textoOriginal": "Tengo una duda sobre cómo aplicar el subsidio de consumo a mi cuenta.", "respondido": False},
    {"idComentario": 8, "textoOriginal": "El corte de agua no fue avisado a tiempo, generó problemas serios en mi negocio.", "respondido": False},
    {"idComentario": 9, "textoOriginal": "Solicito información detallada sobre el proyecto 'Hydro Sostenible' que mencionaron.", "respondido": True},
    {"idComentario": 10, "textoOriginal": "Todo perfecto, gran gestión comunitaria.", "respondido": True},
]

# Estructura base de la respuesta del Dashboard
DUMMY_API_RESPONSE_BASE = {
    "stats": {
        "totalRespuestas": "1,247",
        "tasaCompletacion": "87%",
        "promedioTiempo": "4.2m",
        "satisfaccion": "92%"
    },
    "questions": [
        {"label": "Satisfacción General", "value": 85, "responses": 1060},
        {"label": "Calidad del Agua", "value": 72, "responses": 898},
        {"label": "Atención al Cliente", "value": 91, "responses": 1135},
        {"label": "Tiempo de Respuesta", "value": 78, "responses": 973},
    ],
    "categories": [
        {"label": "Calidad", "value": 92},
        {"label": "Infraestructura", "value": 88},
        {"label": "Facturación", "value": 75},
        {"label": "Atención", "value": 94},
    ],
    "users": [
        {"name": "María González", "location": "Santiago, Chile", "date": "2025-10-27 14:30", "status": "Completa"},
        {"name": "Carlos Rodríguez", "location": "Valparaíso, Chile", "date": "2025-10-27 10:15", "status": "Completa"},
        {"name": "Ana Martínez", "location": "Concepción, Chile", "date": "2025-10-26 16:45", "status": "Incompleta"},
        {"name": "Javier Pérez", "location": "Antofagasta, Chile", "date": "2025-10-25 09:00", "status": "Completa"},
        {"name": "Laura Díaz", "location": "Puerto Montt, Chile", "date": "2025-10-24 11:50", "status": "Completa"},
    ],
    "locations": [
        # Las ubicaciones se usan en el mapa (Leaflet)
        {"city": "Santiago", "lat": -33.4489, "lng": -70.6693, "percentage": 45},
        {"city": "Valparaíso", "lat": -33.0472, "lng": -71.6127, "percentage": 20},
        {"city": "Concepción", "lat": -36.8277, "lng": -73.0500, "percentage": 15},
        {"city": "Antofagasta", "lat": -23.6483, "lng": -70.3956, "percentage": 10},
        {"city": "Puerto Montt", "lat": -41.4705, "lng": -72.9388, "percentage": 10},
    ]
}


# ------------------------------------
# 4. ENDPOINT DE LA API
# ------------------------------------

@app.route('/api/dashboard', methods=['GET'])
def get_dashboard_data():
    """Sirve todos los datos del dashboard y clasifica los comentarios."""
    
    # 1. Clasificar todos los comentarios usando la IA (simulada)
    classified_comments = [] 
    for comment in DUMMY_COMMENTS:
        category, sentiment = classify_comment(comment['textoOriginal'])
        
        # Estructura final para el Frontend
        classified_comments.append({
            "idComentario": comment['idComentario'],
            "textoOriginal": comment['textoOriginal'],
            "respondido": comment['respondido'],
            "filtro": category,
            "sentimiento": sentiment
        })

    # 2. Construir la respuesta final
    response_data = {
        "stats": DUMMY_API_RESPONSE_BASE["stats"],
        "comentarios": classified_comments,
        "questions": DUMMY_API_RESPONSE_BASE["questions"], 
        "categories": DUMMY_API_RESPONSE_BASE["categories"],
        "users": DUMMY_API_RESPONSE_BASE["users"],
        "locations": DUMMY_API_RESPONSE_BASE["locations"]
    }
    
    # Simula un pequeño retraso de red
    import time; time.sleep(0.5) 
    
    return jsonify(response_data)


# ------------------------------------
# 5. EJECUCIÓN DEL SERVIDOR
# ------------------------------------

if __name__ == '__main__':
    # Ejecuta el servidor en http://127.0.0.1:5000
    app.run(debug=True, port=5000)
