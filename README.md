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
- 📊 Digitalizar el proceso de censo social comunitario
- 🗺️ Visualizar geográficamente la distribución de datos
- 📈 Analizar necesidades y problemáticas mediante IA
- 👥 Gestionar información de usuarios y núcleo familiar
- 📋 Recopilar datos estructurados para programas sociales

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

### 1️⃣ **Formulario Censo Social** (`form.html` + `form-page.js`)

Sistema procedural de censo social en 5 pasos con validación completa y campos dinámicos.

**Características:**
- ✅ 5 pasos visuales: Datos Personales, Domicilio, Núcleo Familiar, Necesidades, Confirmación
- ✅ Indicadores de progreso animados con efectos visuales avanzados
- ✅ Campos condicionales que se muestran según respuestas
- ✅ Gestión dinámica de familiares (agregar/eliminar)
- ✅ Cálculo automático de edad desde fecha de nacimiento
- ✅ Validación en tiempo real por paso
- ✅ Resumen completo antes de enviar
- ✅ Botón DEV para autocompletar (desarrollo)
- ✅ Responsive design con adaptación a móvil/tablet
- ✅ Guardado en localStorage

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
│   ├── form.html              # Formulario censo social (5 pasos)
│   ├── dashboard.html         # Panel administrativo
│   ├── map.html               # Mapa interactivo
│   ├── users.html             # Gestión de usuarios
│   └── nosotros.html          # Información del proyecto
│
├── src/
│   ├── css/
│   │   └── layout/
│   │       └── modern-styles.css  # Estilos completos del sistema
│   │
│   ├── js/
│   │   └── pages/
│   │       ├── form-page.js    # Lógica formulario censo (600+ líneas)
│   │       ├── nosotros-page.js # Página nosotros con carousel
│   │       └── dashboard.js    # Visualización y filtros
│   │
│   └── images/
│       └── content/           # Imágenes y recursos
│
└── README_PROYECTO.md         # Este archivo
```

---

## 🚀 Próximas Mejoras

- [ ] Autenticación de usuarios (login/registro)
- [ ] Exportación a PDF/Excel de censos
- [ ] Panel de estadísticas avanzadas por familia
- [ ] Modo offline con sincronización
- [ ] Notificaciones push
- [ ] Multi-idioma (ES/EN)
- [ ] Validación de RUT chileno con dígito verificador
- [ ] Upload de documentos adjuntos
- [ ] Impresión de resumen de censo
- [ ] Integración con WhatsApp API
- [ ] Búsqueda avanzada de censos por RUT/nombre
- [ ] Historial de modificaciones

---

## 👥 Equipo de Desarrollo

**Inveciles-team**  
Proyecto de Especialidad 2025
**Versión del Proyecto**: 2.0.0  
**Última actualización**: 17 de Noviembre, 2025  
**Estado**: ✅ Producción

---

## 🏆 Logros del Proyecto

✅ **Sistema completo de censo social en 5 pasos**  
✅ **Formulario procedural con validación por paso**  
✅ **Gestión dinámica de núcleo familiar**  
✅ **Campos condicionales inteligentes**  
✅ **Dashboard con IA para clasificación de comentarios**  
✅ **Visualización geográfica interactiva**  
✅ **Indicadores de progreso animados con efectos avanzados**  
✅ **Footer administrativo profesional con estado en tiempo real**  
✅ **Diseño responsive 100%**  
✅ **Arquitectura modular y escalable**  
✅ **Código limpio y documentado**  
✅ **Botón DEV para testing rápido**

---

> *"Conectando comunidades con tecnología para un mejor futuro"* 💧
