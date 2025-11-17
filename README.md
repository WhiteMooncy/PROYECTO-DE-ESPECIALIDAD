# 💧 Hydro-Conecta - Sistema de Gestión Comunitaria

> Plataforma web integral para la gestión de encuestas sociales y análisis de datos comunitarios enfocado en infraestructura hidroeléctrica.

[![Estructura Profesional](https://img.shields.io/badge/Estructura-Profesional-brightgreen)](docs/PROJECT_STRUCTURE.md)
[![Versión](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/WhiteMooncy/PROYECTO-DE-ESPECIALIDAD)
[![Licencia](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)

---

## 📂 Estructura del Proyecto (v2.0)

El proyecto ha sido reorganizado siguiendo las mejores prácticas de desarrollo web:

```
PROYECTO-DE-ESPECIALIDAD/
│
├── 📂 src/                      # Código fuente (DESARROLLO)
│   ├── js/
│   │   ├── modules/            # Módulos reutilizables
│   │   ├── pages/              # Scripts de páginas
│   │   └── utils/              # Utilidades
│   ├── css/
│   │   ├── base/               # Variables y base
│   │   ├── components/         # Componentes
│   │   ├── layout/             # Layouts
│   │   └── pages/              # Estilos de páginas
│   └── images/
│       ├── icons/              # Íconos y logos
│       ├── ui/                 # Elementos UI
│       └── content/            # Imágenes de contenido
│
├── 📂 public/                   # Archivos de producción
├── 📂 pages/                    # Páginas HTML
├── 📂 data/                     # Datos JSON
├── 📂 config/                   # Configuraciones
└── 📂 docs/                     # Documentación

```

> 📖 **Documentación completa**: [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)  
> 🚀 **Guía rápida**: [docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)

---

## 🎯 Objetivo del Proyecto

**Hydro-Conecta** es un sistema web desarrollado para facilitar la recopilación, análisis y visualización de información socioeconómica de comunidades relacionadas con proyectos de infraestructura hidroeléctrica. 

El proyecto busca:
- 📊 Digitalizar el proceso de encuestas comunitarias
- 🗺️ Visualizar geográficamente la distribución de datos
- 📈 Analizar necesidades y problemáticas mediante IA
- 👥 Gestionar información de usuarios y beneficiarios

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────┐
│                  HYDRO-CONECTA                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Frontend (HTML/CSS/JS)    Backend (Python Flask)  │
│  ├── Formularios           ├── API REST            │
│  ├── Dashboard             ├── Clasificación IA    │
│  ├── Mapas (Leaflet)       └── Base de Datos       │
│  └── Visualizaciones                               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Tecnologías Principales

| Componente | Tecnología | Propósito |
|------------|-----------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript | Interfaz de usuario responsive |
| **Backend** | Python 3.11 + Flask | API y procesamiento de datos |
| **Mapas** | Leaflet.js 1.9.4 | Visualización geográfica |
| **Animaciones** | AOS 2.3.4 | Efectos visuales |
| **Iconos** | Font Awesome 6.4.0 | Elementos gráficos |
| **Tipografía** | Google Fonts (Poppins) | Diseño moderno |

---

## 📋 Módulos del Sistema

### 1️⃣ **Formulario Dinámico** (`form.html` + `form.js`)

Sistema inteligente de encuestas que carga preguntas desde JSON y genera campos automáticamente.

**Características:**
- ✅ 5 secciones configurables: Socio Principal, Domicilio, Núcleo Familiar, Necesidades, Encuestador
- ✅ 7 tipos de campos: texto, número, fecha, email, teléfono, radio, firma digital
- ✅ Validación en tiempo real con notificaciones toast
- ✅ Barra de progreso visual
- ✅ Signature pad para firmas digitales
- ✅ Responsive design

**Flujo de Trabajo:**
```
Usuario → Formulario → Validación → API → Base de Datos → Dashboard
```

**Ejemplo de Configuración (preguntas.json):**
```json
{
  "datos_socio_principal": {
    "Nombre completo": "Texto",
    "RUT": "Texto/Número",
    "Tiene discapacidad?": "Sí/No"
  }
}
```

---

### 2️⃣ **Dashboard Administrativo** (`dashboard.html`)

Panel de control con visualización de datos en tiempo real y análisis mediante IA.

**Características:**
- 📊 Estadísticas generales (total respuestas, preguntas, categorías)
- 📈 Gráficos de barras personalizados (visualización por categoría)
- 💬 Sistema de comentarios con clasificación IA
- 🔍 Filtros dinámicos por fecha y categoría
- 📥 Exportación de datos
- ⚡ Footer administrativo con estado del sistema en tiempo real

**Clasificación IA:**
```javascript
Tipos de Comentarios:
- RECLAMO (problemas, quejas)
- SOLICITUD (pedidos, necesidades)
- SUGERENCIA (ideas, mejoras)
- CONSULTA (preguntas)
- AGRADECIMIENTO (reconocimientos)
```

**Footer Profesional:**
- 🖥️ Estado: Operativo (tiempo real)
- ⏰ Reloj actualizado cada segundo
- 📌 Versión: v1.0.0 | Build 2025.11.10
- 🔗 Links rápidos: Ayuda, Reportar Error, Documentación

---

### 3️⃣ **Mapa Interactivo** (`map.html`)

Visualización geográfica de datos recopilados usando Leaflet.js.

**Funcionalidades:**
- 🗺️ Mapa interactivo con marcadores
- 📍 Geolocalización de encuestados
- 🎨 Clusters para agrupación visual
- ℹ️ Popups informativos con datos del usuario

---

### 4️⃣ **Gestión de Usuarios** (`users.html`)

Módulo para administración de usuarios y beneficiarios del sistema.

---

## 🎨 Diseño Visual

### Paleta de Colores
```css
--color-primary: #0077b6;      /* Azul principal */
--color-secondary: #00b4d8;    /* Azul secundario */
--color-accent: #48cae4;       /* Azul claro */
--color-dark: #03045e;         /* Azul oscuro */
--gradient-primary: linear-gradient(135deg, #0077b6, #00b4d8);
```

### Sistema de Variables CSS
```css
:root {
  /* Colores */
  --color-primary, --color-secondary, --color-light, --color-dark
  
  /* Tipografía */
  --font-family: 'Poppins', sans-serif
  --font-weight-light: 300, --font-weight-bold: 700
  
  /* Espaciado */
  --radius-sm: 4px, --radius-md: 8px, --radius-lg: 16px
  
  /* Efectos */
  --shadow-md, --shadow-lg, --shadow-xl
  --transition: all 0.3s ease
}
```

---

## 🚀 Instalación y Uso

### Requisitos Previos
- Python 3.11+
- PHP 8.0+ (servidor local)
- Navegador moderno (Chrome, Firefox, Edge)

### Configuración

1. **Iniciar Servidor Flask (API)**
```powershell
python app.py
# URL: http://127.0.0.1:5000
```

2. **Iniciar Servidor PHP (Frontend)**
```powershell
php -S localhost:8000
# URL: http://localhost:8000
```

3. **Acceder a la Aplicación**
- Inicio: `http://localhost:8000/index.html`
- Formulario: `http://localhost:8000/pages/form.html`
- Dashboard: `http://localhost:8000/pages/dashboard.html`
- Mapa: `http://localhost:8000/pages/map.html`
- Usuarios: `http://localhost:8000/pages/users.html`

---

## 📊 API Endpoints

### Dashboard
```http
GET /api/dashboard
Response: {
  "stats": { "total": 150, "questions": 45, "categories": 8 },
  "comments": [...],
  "categories": [...],
  "users": [...],
  "locations": [...]
}
```

### Envío de Formulario
```http
POST /api/submit-survey
Content-Type: application/json
Body: { "Datos del Socio Principal": {...}, ... }
```

---

## 🎯 Características Principales

### ✨ Formulario Inteligente
- Generación dinámica de campos desde JSON
- Validación automática por tipo de dato
- Progreso visual paso a paso
- Firma digital con canvas
- Notificaciones toast elegantes

### 📊 Dashboard Analítico
- Visualización de datos en tiempo real
- Clasificación automática de comentarios con IA
- Gráficos interactivos personalizados
- Filtros por fecha y categoría
- Estado del sistema actualizado cada segundo

### 🗺️ Geolocalización
- Mapas interactivos con Leaflet
- Marcadores personalizados
- Clusters de agrupación
- Información detallada por ubicación

### 🎨 Diseño Profesional
- Responsive design (Desktop, Tablet, Mobile)
- Animaciones fluidas con AOS
- Footer administrativo estilo panel profesional
- Tema de colores consistente
- Accesibilidad (ARIA labels, semantic HTML)

---

## 📁 Estructura de Archivos

```
PROYECTO-DE-ESPECIALIDAD/
│
├── index.html                  # Página principal
├── app.py                      # Backend Flask con IA
├── preguntas.json             # Configuración de formulario
│
├── pages/
│   ├── form.html              # Formulario dinámico
│   ├── dashboard.html         # Panel administrativo
│   ├── map.html               # Mapa interactivo
│   ├── users.html             # Gestión de usuarios
│   └── nosotros.html          # Información del proyecto
│
├── assets/
│   ├── css/
│   │   ├── main.css           # Estilos globales + variables
│   │   ├── dashboard.css      # Estilos del dashboard
│   │   ├── form.css           # Estilos del formulario
│   │   ├── components.css     # Componentes reutilizables
│   │   └── modern-styles.css  # Estilos modernos
│   │
│   ├── js/
│   │   ├── form.js            # Lógica formulario dinámico (420 líneas)
│   │   ├── dashboard.js       # Visualización y filtros
│   │   └── main.js            # Scripts globales
│   │
│   └── sources/
│       └── img/               # Imágenes y recursos
│
└── README_PROYECTO.md         # Este archivo
```

---

## 🔧 Personalización

### Agregar Nueva Pregunta al Formulario
Edita `preguntas.json`:
```json
{
  "datos_socio_principal": {
    "Nueva Pregunta": "Tipo de dato"
  }
}
```

Tipos válidos: `"Texto"`, `"Número"`, `"Fecha (Día/Mes/Año)"`, `"Sí/No"`, `"Correo electrónico"`, `"Teléfono"`, `"Firma"`

### Modificar Colores del Sistema
Edita variables en `main.css`:
```css
:root {
  --color-primary: #TU_COLOR;
  --gradient-primary: linear-gradient(135deg, #COLOR1, #COLOR2);
}
```

---

## 📈 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Líneas de código | ~2,500+ |
| Archivos CSS | 5 archivos modulares |
| Archivos JavaScript | 3 módulos principales |
| Páginas HTML | 6 páginas completas |
| Responsividad | 100% (Desktop, Tablet, Mobile) |
| Tipos de datos soportados | 7 tipos diferentes |
| Secciones del formulario | 5 configurables |

---

## 🎓 Casos de Uso

### 1. Junta de Vecinos
Recopilar información socioeconómica de beneficiarios para programas de ayuda social.

### 2. Municipalidades
Encuestas de satisfacción y necesidades de la comunidad.

### 3. Proyectos de Infraestructura
Registro de habitantes afectados por proyectos hidroeléctricos.

### 4. ONGs
Levantamiento de información para programas de asistencia.

---

## 🚀 Próximas Mejoras

- [ ] Autenticación de usuarios (login/registro)
- [ ] Exportación a PDF/Excel
- [ ] Panel de estadísticas avanzadas
- [ ] Modo offline con sincronización
- [ ] Notificaciones push
- [ ] Multi-idioma (ES/EN)
- [ ] Validación de RUT chileno
- [ ] Upload de documentos adjuntos
- [ ] Firma digital mejorada (touch/mouse)
- [ ] Integración con WhatsApp API

---

## 👥 Equipo de Desarrollo

**Hydro-Conecta Development Team**  
Proyecto de Especialidad 2025

---

## 📄 Licencia

© 2025 Hydro-Conecta. Todos los derechos reservados.

---

## 📞 Contacto y Soporte

- 📧 Email: soporte@hydroconecta.com
- 📱 Teléfono: +56 9 XXXX XXXX
- 🌐 Web: www.hydroconecta.com
- 💬 Chat en vivo: Panel administrativo

---

**Versión del Proyecto**: 1.0.0  
**Última actualización**: 10 de Noviembre, 2025  
**Estado**: ✅ Producción

---

## 🏆 Logros del Proyecto

✅ **Sistema completo de formularios dinámicos**  
✅ **Dashboard con IA para clasificación de comentarios**  
✅ **Visualización geográfica interactiva**  
✅ **Footer administrativo profesional con estado en tiempo real**  
✅ **Diseño responsive 100%**  
✅ **Arquitectura modular y escalable**  
✅ **Código limpio y documentado**

---

> *"Conectando comunidades con tecnología para un mejor futuro"* 💧
