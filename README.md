# 🌊 Hydro-Conecta

**Sistema Web de Gestión Hidroeléctrica con Análisis Inteligente de Comentarios Ciudadanos**

Sistema integral para la administración de la Represa Valle Azul, combinando sitio público informativo, panel administrativo en tiempo real y clasificación automática de reportes mediante IA.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Descripción del Proyecto

**Hydro-Conecta** es una plataforma web completa que facilita la gestión de infraestructura hidroeléctrica y la comunicación bidireccional con la comunidad. El sistema permite:

- �️ **Transparencia Institucional**: Información pública sobre gestión y operación
- � **Participación Ciudadana**: Formulario de reportes, comentarios y solicitudes
- 🤖 **Clasificación Inteligente**: IA para categorizar automáticamente reportes (Reclamo/Solicitud/Duda/General)
- 😊 **Análisis de Sentimiento**: Detección automática de sentimiento (Positivo/Negativo/Neutral)
- � **Dashboard Administrativo**: Visualización de métricas y gestión de reportes
- 🗺️ **Geolocalización**: Mapas interactivos con ubicación de reportes ciudadanos

---

## ✨ Características Principales

### 🌐 Sitio Público

#### **Página Principal (index.html)**
- Banner de presentación con estadísticas clave de la represa
- Galería de proyectos con Splide.js
- Sección de valores institucionales
- Diseño responsive con animaciones AOS
- Sistema de navegación moderna con glassmorphism

#### **Página Nosotros (nosotros.html)**
- Información del equipo técnico
- Misión, visión y valores
- Estadísticas de capacidad e infraestructura
- Galería de equipo profesional

#### **Formulario Ciudadano (form.html)**
- Formulario multi-paso dinámico
- 10 preguntas con validación en tiempo real
- Opciones de respuesta personalizadas
- Barra de progreso visual
- Envío asíncrono a API Flask

### 📊 Panel Administrativo

#### **Dashboard Principal (dashboard.html)**
- **4 Métricas Clave**:
  - Total de respuestas recibidas
  - Tasa de completación de formularios
  - Tiempo promedio de respuesta
  - Índice de satisfacción ciudadana
  
- **2 Gráficos Interactivos** (Chart.js):
  - Distribución de respuestas por pregunta (gráfico de barras)
  - Distribución por categoría (gráfico de donut)

- **Sistema de Filtros Avanzado**:
  - Filtro por Categoría (IA): Reclamo, Solicitud, Duda, General
  - Filtro por Sentimiento (IA): Positivo, Negativo, Neutral
  - Aplicación en tiempo real

#### **Mapa Interactivo (map.html)**
- Visualización geográfica de reportes con Leaflet.js
- Marcadores por ubicación de ciudadanos
- Clustering de puntos por densidad
- Información emergente (popup) por marcador

#### **Gestión de Usuarios (users.html)**
- Tabla de usuarios registrados
- Información de contacto y ubicación
- Estadísticas de participación por usuario

### 🤖 Inteligencia Artificial

#### **Modelo de Clasificación**
- **Algoritmo**: Multinomial Naive Bayes
- **Vectorización**: TF-IDF (Term Frequency-Inverse Document Frequency)
- **Entrenamiento**: Dataset de 50+ comentarios etiquetados
- **Precisión**: ~85-90% en clasificación de categoría
- **Tiempo de respuesta**: <100ms por comentario

#### **Categorías Detectadas**
1. **Reclamo**: Quejas sobre servicio, calidad del agua, interrupciones
2. **Solicitud**: Peticiones de mejora, información adicional
3. **Duda**: Preguntas técnicas, consultas generales
4. **General**: Comentarios informativos, agradecimientos

#### **Análisis de Sentimiento**
- **Positivo**: Agradecimientos, elogios, satisfacción
- **Negativo**: Quejas, problemas urgentes, insatisfacción
- **Neutral**: Comentarios informativos, sugerencias constructivas

---

## 🛠️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **HTML5** | - | Estructura semántica moderna |
| **CSS3** | - | Estilos modulares con variables CSS |
| **JavaScript ES6+** | - | Lógica interactiva y manejo de eventos |
| **AOS** | 2.3.4 | Animaciones al scroll |
| **Splide.js** | 4.1.4 | Carruseles de imágenes |
| **Chart.js** | 4.4.0 | Gráficos interactivos |
| **Leaflet.js** | 1.9.4 | Mapas interactivos |
| **Font Awesome** | 6.4.0 | Iconografía |

### Backend
| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Python** | 3.8+ | Lenguaje de servidor |
| **Flask** | 2.x | Framework web RESTful |
| **Flask-CORS** | - | Manejo de peticiones cross-origin |
| **Pandas** | 1.x | Procesamiento de datos |
| **Scikit-learn** | 1.x | Machine Learning (NLP) |

### Servidor
- **XAMPP**: Entorno de desarrollo local
- **Apache**: Servidor web HTTP

---

## 📁 Estructura del Proyecto

```
PROYECTO-DE-ESPECIALIDAD/
│
├── 📄 index.html                     # Página principal del sitio público
├── 🐍 app.py                         # API Flask con modelo de IA
├── 📖 README.md                      # Documentación del proyecto
├── 📖 CSS_MODULAR_README.md          # Guía de arquitectura CSS
├── 📖 OPTIMIZATION.md                # Mejoras de rendimiento
├── 📜 LICENSE                        # Licencia MIT
│
├── 📁 pages/                         # Páginas del sitio
│   ├── dashboard.html                # Panel administrativo principal
│   ├── form.html                     # Formulario ciudadano multi-paso
│   ├── map.html                      # Mapa interactivo con Leaflet
│   ├── nosotros.html                 # Página institucional "Quiénes somos"
│   └── users.html                    # Gestión de usuarios
│
├── 📁 assets/                        # Recursos estáticos
│   │
│   ├── 📁 css/                       # Hojas de estilo MODULARES
│   │   ├── main.css                  # Variables CSS, reset, tipografía base
│   │   ├── components.css            # Componentes reutilizables (navbar, footer, waves)
│   │   ├── dashboard.css             # Estilos específicos del dashboard
│   │   ├── index.css                 # Estilos de la página principal
│   │   ├── nosotros.css              # Estilos de página "Nosotros"
│   │   ├── form.css                  # Estilos del formulario
│   │   ├── modern-styles.css         # (Legacy) Estilos monolíticos antiguos
│   │   ├── theme-dashboard.css       # (Legacy) Tema antiguo del dashboard
│   │   └── theme-form.css            # (Legacy) Tema antiguo del formulario
│   │
│   ├── 📁 js/                        # Scripts JavaScript
│   │   ├── main.js                   # Lógica del formulario + envío a API
│   │   ├── dashboard.js              # Carga datos del dashboard desde API
│   │   ├── cont.js                   # Contador y mapa interactivo
│   │   └── 📁 animations/            # Scripts de animaciones
│   │       ├── swiperInit.js         # Inicialización de carruseles
│   │       └── swiperInitIndex.js    # Carrusel de la página principal
│   │
│   ├── 📁 py/                        # Scripts Python auxiliares
│   │   └── dataComments.py           # Dataset de entrenamiento IA
│   │
│   └── 📁 sources/                   # Recursos multimedia
│       ├── 📁 icons/                 # Iconos personalizados
│       ├── 📁 img/                   # Imágenes del sitio
│       │   ├── represa.webp          # Imagen principal de la represa
│       │   ├── example.jpg           # Imágenes de ejemplo
│       │   └── ...
│       └── 📁 menu/                  # Recursos del menú de navegación
│
└── 📁 config/                        # Archivos de configuración (si aplica)
```

### 🎨 Arquitectura CSS Modular (Nueva)

El proyecto migró de CSS monolítico a **CSS modular** siguiendo el patrón de **Akelarre**:

#### **Ventajas de la Nueva Arquitectura**:
- ✅ **35% más ligero** (46.6 KB vs 71.2 KB monolítico)
- ✅ **Reutilización de componentes** (navbar, footer, waves)
- ✅ **Mantenimiento simplificado** (cambios localizados)
- ✅ **Caché del navegador optimizado** (archivos independientes)
- ✅ **Zero CSS incrustado** (todo separado en archivos)

#### **Archivos CSS Modulares**:

1. **main.css** (11.9 KB) - Fundación del proyecto
   - Variables CSS (colores, gradientes, sombras, tipografía)
   - Reset CSS global
   - Tipografía base (h1-h6, párrafos)
   - Clases utilitarias (.container, .text-gradient)
   - Estilos base de botones y tarjetas

2. **components.css** (6.9 KB) - Componentes compartidos
   - `.waves-background`: 4 capas SVG animadas
   - `.navbar-modern`: Navbar con glassmorphism
   - `.modern-footer`: Footer de 4 columnas

3. **dashboard.css** (8.8 KB) - Dashboard administrativo
   - `.dashboard-content`, `.dashboard-header`
   - `.stats-grid`, `.stat-card` (4 tarjetas de métricas)
   - `.charts-grid`, `.chart-card` (gráficos Chart.js)
   - `.comments-section`, `.filter-controls`
   - `.comment-badge` (positivo/negativo/neutral)

4. **index.css** (6.8 KB) - Página principal
   - `.presentation-banner`
   - `.banner-stats` (capacidad, altura, año)
   - `.visual-cards`, `.institutional-values`
   - `.projects-gallery` (integración Splide)

5. **nosotros.css** (5.8 KB) - Página institucional
   - `.about-hero`, `.about-stats`
   - `.about-content-grid`, `.team-section`
   - `.values-section`

6. **form.css** (6.4 KB) - Formulario ciudadano
   - `.form-container`, `.form-header`
   - `.question-wrapper`, `.options-grid`
   - `.progress-bar`, `.filter-controls`

---

## 🚀 Instalación y Configuración

### Requisitos Previos
```bash
✅ XAMPP (Apache + PHP)
✅ Python 3.8 o superior
✅ pip (gestor de paquetes Python)
✅ Navegador moderno (Chrome, Firefox, Edge)
```

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/WhiteMooncy/Web-Admin.git
cd PROYECTO-DE-ESPECIALIDAD
```

### Paso 2: Instalar Dependencias de Python
```bash
pip install flask flask-cors pandas scikit-learn
```

### Paso 3: Configurar XAMPP
1. Copiar el proyecto a `C:\xampp\htdocs\`
2. Iniciar **Apache** desde el panel de XAMPP
3. Verificar que Apache esté corriendo en puerto 80

### Paso 4: Iniciar el Servidor Flask (IA)
```bash
cd C:\xampp\htdocs\PROYECTO-DE-ESPECIALIDAD
python app.py
```
✅ El servidor Flask se ejecutará en `http://127.0.0.1:5000`

### Paso 5: Acceder al Sitio
Abrir en el navegador:
```
http://localhost/PROYECTO-DE-ESPECIALIDAD/
```

---

## 📖 Guía de Uso

### 🌐 Para Ciudadanos (Sitio Público)

1. **Navegar al Sitio**
   - Abrir `http://localhost/PROYECTO-DE-ESPECIALIDAD/`
   
2. **Explorar Información**
   - **Inicio**: Estadísticas de la represa
   - **Nosotros**: Equipo y valores
   
3. **Enviar Reporte/Comentario**
   - Click en **"Formulario"** en el navbar
   - Completar las 10 preguntas del formulario multi-paso
   - Observar la barra de progreso
   - Click en **"Enviar Formulario"**
   - ✅ El comentario será clasificado automáticamente por IA

### 📊 Para Administradores (Dashboard)

1. **Acceder al Dashboard**
   ```
   http://localhost/PROYECTO-DE-ESPECIALIDAD/pages/dashboard.html
   ```

2. **Visualizar Métricas**
   - Ver 4 estadísticas clave en tarjetas
   - Analizar gráficos de distribución
   - Identificar tendencias semanales

3. **Filtrar Comentarios**
   - Seleccionar **Categoría**: Reclamo, Solicitud, Duda, General
   - Seleccionar **Sentimiento**: Positivo, Negativo, Neutral
   - Click en **"Aplicar Filtros"**
   - ✅ La lista se actualizará en tiempo real

4. **Ver Mapa de Reportes**
   ```
   http://localhost/PROYECTO-DE-ESPECIALIDAD/pages/map.html
   ```
   - Visualizar marcadores por ubicación
   - Click en marcadores para ver detalles

5. **Gestionar Usuarios**
   ```
   http://localhost/PROYECTO-DE-ESPECIALIDAD/pages/users.html
   ```
   - Ver tabla de usuarios registrados
   - Analizar datos de contacto

---

## 🤖 API Flask - Documentación

### Endpoint Principal

#### **GET** `/api/dashboard`

Retorna datos completos del dashboard con comentarios clasificados por IA.

**URL**:
```
http://127.0.0.1:5000/api/dashboard
```

**Respuesta** (JSON):
```json
**Respuesta** (JSON):
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
      "textoOriginal": "El agua tiene mal sabor desde hace 3 días",
      "filtro": "Reclamo",        // Clasificado por IA
      "sentimiento": "Negativo",  // Clasificado por IA
      "respondido": false
    },
    {
      "idComentario": 2,
      "textoOriginal": "Excelente gestión del recurso hídrico",
      "filtro": "General",
      "sentimiento": "Positivo",
      "respondido": false
    }
  ],
  "questions": [
    {
      "id": 1,
      "text": "Pregunta 1",
      "responses": 245
    }
  ],
  "categories": [
    {"name": "Reclamo", "count": 145},
    {"name": "Solicitud", "count": 298},
    {"name": "Duda", "count": 187},
    {"name": "General", "count": 617}
  ],
  "users": [
    {
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "city": "Valle Central",
      "submissions": 3
    }
  ],
  "locations": [
    {
      "city": "Valle Central",
      "lat": -12.0464,
      "lng": -77.0428,
      "percentage": 35
    }
  ]
}
```

### Modelo de IA - Detalles Técnicos

**Algoritmo**: Multinomial Naive Bayes + TF-IDF

**Vectorización**:
```python
TfidfVectorizer(
    max_features=500,
    ngram_range=(1, 2),  # Unigramas y bigramas
    stop_words='spanish'
)
```

**Entrenamiento**:
- Dataset: 50+ comentarios etiquetados manualmente
- Split: 80% entrenamiento, 20% validación
- Métricas: Precisión ~85-90%

**Categorías Detectadas**:
| Categoría | Palabras Clave | Ejemplo |
|-----------|----------------|---------|
| **Reclamo** | "problema", "malo", "falla", "turbio" | "El agua está turbia desde ayer" |
| **Solicitud** | "necesito", "quisiera", "solicito", "pedido" | "Solicito información sobre tarifas" |
| **Duda** | "pregunta", "cómo", "cuándo", "información" | "¿Cuándo harán mantenimiento?" |
| **General** | "gracias", "excelente", "información" | "Gracias por el buen servicio" |

---

## 🎨 Personalización y Configuración

### Variables CSS Globales

Ubicación: `assets/css/main.css`

```css
:root {
    /* Colores principales */
    --color-primary: #0077b6;
    --color-secondary: #00b4d8;
    --color-accent: #48cae4;
    --color-light: #90e0ef;
    --color-dark: #023e8a;
    
    /* Gradientes */
    --gradient-primary: linear-gradient(135deg, #0077b6, #00b4d8);
    --gradient-water: linear-gradient(180deg, #0077b6, #48cae4);
    
    /* Sombras */
    --shadow-sm: 0 2px 8px rgba(0, 119, 182, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 119, 182, 0.15);
    --shadow-lg: 0 8px 32px rgba(0, 119, 182, 0.2);
    
    /* Tipografía */
    --font-family: 'Poppins', -apple-system, sans-serif;
    --font-size-base: 16px;
    
    /* Espaciado */
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    --spacing-xl: 4rem;
}
```

### Cambiar Colores del Tema

Editar `assets/css/main.css`:
```css
:root {
    --color-primary: #TU_COLOR;  /* Cambia todos los elementos primarios */
}
```

### Modificar Datos del Dashboard

Editar `app.py`:
```python
"stats": {
    "totalRespuestas": "TU_VALOR",
    "tasaCompletacion": "TU_%",
    "promedioTiempo": "TU_TIEMPO",
    "satisfaccion": "TU_%"
}
```

### Agregar Nuevas Preguntas al Formulario

Editar `pages/form.html`:
```html
<div class="question-wrapper" id="question11">
    <div class="question-header">
        <span class="question-number">11</span>
        <h3 class="question-title">Tu Nueva Pregunta</h3>
    </div>
    <div class="options-grid">
        <label class="option-label">
            <input type="radio" name="q11" value="opcion1">
            <span>Opción 1</span>
        </label>
        <!-- Más opciones -->
    </div>
</div>
```

---

## 🔧 Mantenimiento y Optimización

### Actualizar Caché del Navegador

Cuando hagas cambios en CSS/JS, actualiza el versionado:

```html
<!-- Antes -->
<link rel="stylesheet" href="assets/css/main.css?v=2">

<!-- Después -->
<link rel="stylesheet" href="assets/css/main.css?v=3">
```

### Optimización de Imágenes

Las imágenes están optimizadas en formato **WebP**:
- `represa.webp`: Imagen principal (compresión 80%)
- Usar herramientas: [Squoosh](https://squoosh.app/) o `cwebp`

### Performance

Métricas actuales:
- ⚡ **First Contentful Paint**: <1.5s
- ⚡ **Time to Interactive**: <3s
- ⚡ **Total Page Size**: ~450 KB (sin imágenes)
- ⚡ **CSS Modular**: 46.6 KB (35% más ligero)

---

## 🐛 Solución de Problemas

### Error: "No se puede conectar al servidor Flask"

**Solución**:
```bash
# Verificar que Flask esté corriendo
python app.py

# Verificar en el navegador
http://127.0.0.1:5000/api/dashboard
```

### Error: "CORS policy error"

**Solución**: Asegurarse de que Flask-CORS esté instalado
```bash
pip install flask-cors
```

### Error: "404 Not Found en páginas"

**Solución**: Verificar rutas en XAMPP
```
Debe estar en: C:\xampp\htdocs\PROYECTO-DE-ESPECIALIDAD\
Acceder con: http://localhost/PROYECTO-DE-ESPECIALIDAD/
```

### CSS no se actualiza

**Solución**: Limpiar caché del navegador
- Chrome: `Ctrl + Shift + Delete`
- O cambiar `?v=2` a `?v=3` en los links de CSS

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. **Fork** el proyecto
2. Crea una **rama** para tu función
   ```bash
   git checkout -b feature/NuevaFuncion
   ```
3. **Commit** tus cambios
   ```bash
   git commit -m 'Agregar: Nueva función de X'
   ```
4. **Push** a la rama
   ```bash
   git push origin feature/NuevaFuncion
   ```
5. Abre un **Pull Request**

### Estándares de Código

- ✅ Usar **CSS modular** (no agregar estilos inline)
- ✅ Comentar funciones JavaScript complejas
- ✅ Seguir convención de nombres (camelCase JS, kebab-case CSS)
- ✅ Probar en múltiples navegadores

---

## 📝 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License - Copyright (c) 2025 WhiteMooncy
```

---

## 👥 Autores y Reconocimientos

### Desarrollo
- **WhiteMooncy** - *Desarrollo Full Stack* - [GitHub](https://github.com/WhiteMooncy)

### Tecnologías Open Source
Gracias a las siguientes bibliotecas y frameworks:
- [Flask](https://flask.palletsprojects.com/) - Framework web Python
- [Scikit-learn](https://scikit-learn.org/) - Machine Learning
- [Chart.js](https://www.chartjs.org/) - Gráficos interactivos
- [Leaflet.js](https://leafletjs.com/) - Mapas interactivos
- [AOS](https://michalsnik.github.io/aos/) - Animaciones al scroll
- [Splide.js](https://splidejs.com/) - Carruseles modernos

---

## 📞 Contacto

**Hydro-Conecta - Gestión Hidroeléctrica Inteligente**

- 📧 **Email**: info@hydroconecta.com
- 📱 **Teléfono**: +51 000 000 000
- 🌐 **Sitio Web**: [Hydro-Conecta](https://whitemooncy.github.io/PORTAFOLIO/)
- 💼 **LinkedIn**: [WhiteMooncy](https://linkedin.com/in/whitemooncy)
- 🐱 **GitHub**: [@WhiteMooncy](https://github.com/WhiteMooncy)

---

## 📚 Documentación Adicional

- [CSS_MODULAR_README.md](CSS_MODULAR_README.md) - Guía de arquitectura CSS modular
- [OPTIMIZATION.md](OPTIMIZATION.md) - Mejoras de rendimiento implementadas
- [MIGRATION.md](MIGRATION.md) - Proceso de migración a CSS modular

---

## 🎯 Roadmap Futuro

### Versión 2.1 (Próxima)
- [ ] Sistema de autenticación de administradores
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Exportación de reportes a PDF/Excel
- [ ] Dashboard con filtros de fecha

### Versión 3.0
- [ ] Aplicación móvil (React Native)
- [ ] Integración con IoT (sensores de la represa)
- [ ] Sistema de respuestas automáticas con IA
- [ ] Panel de analíticas avanzadas

---

<div align="center">

## 🌊 Hydro-Conecta

**Gestión Sostenible del Agua con Tecnología Inteligente**

Desarrollado con 💙 para la comunidad del Valle Azul

© 2025 Hydro-Conecta. Todos los derechos reservados.

[![GitHub](https://img.shields.io/badge/GitHub-WhiteMooncy-181717?style=for-the-badge&logo=github)](https://github.com/WhiteMooncy)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>
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
