# 🌊 Hydro-Conecta

Sistema web integral para la gestión, operación y monitoreo de infraestructura hidroeléctrica con análisis de comentarios mediante IA.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Descripción

**Hydro-Conecta** es una plataforma web completa diseñada para la gestión de la Represa Valle Azul. El sistema combina:

- 🏠 **Sitio web público** con información institucional
- 📊 **Panel administrativo** con visualización de datos en tiempo real
- 🤖 **IA integrada** para clasificación automática de comentarios (NLP)
- 🗺️ **Mapas interactivos** con geolocalización de usuarios
- 📝 **Sistema de encuestas** dinámico y adaptable

---

## ✨ Características Principales

### 🌐 Frontend
- Diseño responsivo con sistema de temas personalizados
- Animaciones suaves con AOS (Animate On Scroll)
- Carruseles interactivos con Splide.js
- Formularios dinámicos multi-paso
- Navegación moderna con efectos visuales

### 🎨 Temas Disponibles
- `represa` - Tema principal del sitio
- `dashboard` - Panel administrativo
- `form` - Formularios de encuesta

### 📊 Panel Administrativo
- Visualización de estadísticas en tiempo real
- Gráficos de barras interactivos
- Filtros por categoría y sentimiento
- Tabla de usuarios con información detallada
- Mapa interactivo con Leaflet.js

### 🤖 Inteligencia Artificial
- Clasificación automática de comentarios
- Análisis de sentimiento (Positivo/Negativo/Neutral)
- Categorización por tipo (Reclamo/Solicitud/Duda/General)
- Modelo basado en Scikit-learn (TF-IDF + Naive Bayes)

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript ES6+** - Lógica interactiva
- **AOS** - Animaciones al scroll
- **Splide.js** - Carruseles
- **Leaflet.js** - Mapas interactivos

### Backend
- **Python 3.x** - Lenguaje principal
- **Flask** - Framework web
- **Flask-CORS** - Manejo de CORS
- **Pandas** - Procesamiento de datos
- **Scikit-learn** - Machine Learning
  - TfidfVectorizer
  - MultinomialNB

### Servidor
- **XAMPP** - Servidor local
- **Apache** - Servidor web

---

## 📁 Estructura del Proyecto

```
PROYECTO-DE-ESPECIALIDAD/
│
├── index.html                  # Página principal
├── app.py                      # API Flask con IA
├── README.md                   # Este archivo
├── LICENSE                     # Licencia del proyecto
│
├── pages/                      # Páginas del sitio
│   ├── dashboard.html          # Panel administrativo
│   ├── form.html              # Formulario de encuestas
│   ├── map.html               # Mapa interactivo
│   ├── nosotros.html          # Página "Quiénes somos"
│   └── users.html             # Gestión de usuarios
│
├── assets/                     # Recursos estáticos
│   ├── css/                    # Hojas de estilo
│   │   ├── theme-index.css     # Tema principal
│   │   ├── theme-dashboard.css # Tema del dashboard
│   │   └── theme-form.css      # Tema de formularios
│   │
│   ├── js/                     # Scripts JavaScript
│   │   ├── main.js            # Lógica principal del formulario
│   │   ├── dashboard.js       # Lógica del dashboard
│   │   ├── cont.js            # Contador y mapa
│   │   └── animations/        # Scripts de animaciones
│   │       ├── swiperInit.js
│   │       └── swiperInitIndex.js
│   │
│   └── sources/               # Recursos multimedia
│       └── img/               # Imágenes
│           ├── contact/
│           └── ui/
│
└── assets/test/               # Archivos de prueba
    └── nosotros.css
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- XAMPP instalado
- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/WhiteMooncy/PORTAFOLIO.git
cd PROYECTO-DE-ESPECIALIDAD
```

### Paso 2: Instalar Dependencias de Python
```bash
pip install flask flask-cors pandas scikit-learn
```

### Paso 3: Configurar XAMPP
1. Copiar el proyecto a `C:\xampp\htdocs\`
2. Iniciar Apache desde el panel de control de XAMPP

### Paso 4: Iniciar el Servidor Flask
```bash
python app.py
```
El servidor Flask se ejecutará en `http://127.0.0.1:5000`

### Paso 5: Acceder al Sitio
Abrir en el navegador: `http://localhost/PROYECTO-DE-ESPECIALIDAD/`

---

## 📖 Uso

### Sitio Público
- **Inicio**: Información general de la represa
- **Nosotros**: Equipo y valores de la empresa
- **Formulario**: Enviar comentarios y sugerencias

### Panel Administrativo
Acceder desde: `http://localhost/PROYECTO-DE-ESPECIALIDAD/pages/dashboard.html`

**Funcionalidades:**
- 📊 Visualizar estadísticas generales
- 💬 Revisar comentarios clasificados por IA
- 🗺️ Ver distribución geográfica de usuarios
- 👥 Gestionar usuarios registrados
- 🔍 Filtrar por categoría y sentimiento

---

## 🤖 API de Clasificación (Flask)

### Endpoint Principal
```
GET /api/dashboard
```

**Respuesta:**
```json
{
  "stats": {
    "totalRespuestas": "1,247",
    "tasaCompletacion": "87%",
    "promedioTiempo": "4.2m",
    "satisfaccion": "92%"
  },
  "comentarios": [
    {
      "idComentario": 1,
      "textoOriginal": "El servicio es excelente...",
      "filtro": "General",
      "sentimiento": "Positivo",
      "respondido": false
    }
  ],
  "questions": [...],
  "categories": [...],
  "users": [...],
  "locations": [...]
}
```

---

## 🎨 Temas y Personalización

### Variables CSS Principales
```css
:root {
    --water-dark: #0b3d91;
    --water-mid: #1e6fb3;
    --accent: #38bdf8;
    --text-light: #f5f7fa;
    --glass: rgba(255,255,255,0.06);
    --shadow: 0 8px 24px rgba(2,6,23,0.35);
    --radius-lg: 12px;
}
```

### Aplicar Tema
```html
<body data-theme="represa">
  <!-- Contenido -->
</body>
```

---

## 🔧 Configuración Avanzada

### Modificar el Modelo de IA
Editar `app.py` y actualizar los datos de entrenamiento:

```python
training_data = pd.DataFrame({
    'text': [...],  # Tus textos de ejemplo
    'category': [...],  # Categorías
    'sentiment': [...]  # Sentimientos
})
```

### Agregar Nuevas Ubicaciones al Mapa
En `app.py`, modificar:

```python
"locations": [
    {"city": "Ciudad", "lat": -00.0000, "lng": -00.0000, "percentage": 10}
]
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu función (`git checkout -b feature/NuevaFuncion`)
3. Commit tus cambios (`git commit -m 'Agregar nueva función'`)
4. Push a la rama (`git push origin feature/NuevaFuncion`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👥 Autores

- **WhiteMooncy** - *Desarrollo Completo* - [GitHub](https://github.com/WhiteMooncy)

---

## 📞 Contacto

**Hydro-Conecta**
- 📧 Email: info@hydroconecta.com
- 📱 Tel: +51 000 000 000
- 🌐 Web: [Hydro-Conecta](https://whitemooncy.github.io/PORTAFOLIO/)

---

## 🙏 Agradecimientos

- Comunidad de código abierto
- Bibliotecas y frameworks utilizados
- Usuarios y testers del sistema

---

<div align="center">
  <strong>Hecho con 💙 para la gestión sostenible del agua</strong>
  <br>
  © 2025 Hydro-Conecta. Todos los derechos reservados.
</div>
