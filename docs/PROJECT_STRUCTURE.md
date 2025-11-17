# Estructura del Proyecto - PROYECTO-DE-ESPECIALIDAD

## 📁 Estructura Profesional de Carpetas

```
PROYECTO-DE-ESPECIALIDAD/
│
├── 📂 src/                          # Código fuente (desarrollo)
│   ├── 📂 js/
│   │   ├── 📂 modules/              # Módulos reutilizables
│   │   │   ├── auth.js              # Sistema de autenticación
│   │   │   ├── storage-manager.js   # Gestión de localStorage
│   │   │   └── ai-classifier.js     # Clasificador de IA
│   │   │
│   │   ├── 📂 pages/                # Scripts específicos de páginas
│   │   │   ├── index-page.js
│   │   │   ├── login-page.js
│   │   │   ├── form-page.js
│   │   │   ├── dashboard-page.js
│   │   │   ├── map-page.js
│   │   │   ├── users.js
│   │   │   ├── responses.js
│   │   │   └── nosotros-page.js
│   │   │
│   │   └── 📂 utils/                # Utilidades y helpers
│   │       ├── validators.js        # Validaciones de formularios
│   │       └── admin-footer.js      # Footer administrativo
│   │
│   ├── 📂 css/
│   │   ├── 📂 base/                 # Estilos base y variables
│   │   │   └── variables.css        # Variables CSS (colores, fuentes, etc.)
│   │   │
│   │   ├── 📂 components/           # Componentes reutilizables
│   │   │   └── components.css       # Botones, cards, formularios, etc.
│   │   │
│   │   ├── 📂 layout/               # Layouts y estructura
│   │   │   ├── shared.css           # Estilos compartidos
│   │   │   ├── main.css             # Layout principal
│   │   │   └── modern-styles.css    # Estilos modernos
│   │   │
│   │   └── 📂 pages/                # Estilos específicos de páginas
│   │       ├── admin.css            # Estilos del panel admin
│   │       └── form.css             # Estilos del formulario
│   │
│   └── 📂 images/
│       ├── 📂 icons/                # Íconos y logos
│       │   ├── icon.webp
│       │   ├── EMAIL.png
│       │   ├── FB.png
│       │   ├── IG.png
│       │   └── WSP.png
│       │
│       ├── 📂 ui/                   # Elementos de UI
│       │   ├── glideLeftArrow.png
│       │   ├── glideRightArrow.png
│       │   └── ...
│       │
│       └── 📂 content/              # Imágenes de contenido
│           ├── represa.webp
│           ├── serCamera.png
│           ├── serDron.png
│           └── ...
│
├── 📂 public/                       # Archivos públicos (producción)
│   ├── 📂 css/                      # CSS compilado/minificado
│   ├── 📂 js/                       # JS compilado/minificado
│   └── 📂 images/                   # Imágenes optimizadas
│
├── 📂 pages/                        # Páginas HTML
│   ├── dashboard.html
│   ├── form.html
│   ├── login.html
│   ├── map.html
│   ├── nosotros.html
│   ├── responses.html
│   └── users.html
│
├── 📂 data/                         # Datos JSON
│   └── dashboard-data.json
│
├── 📂 config/                       # Archivos de configuración
│   └── (configuraciones futuras)
│
├── 📂 docs/                         # Documentación
│   ├── PROJECT_STRUCTURE.md         # Este archivo
│   ├── API.md                       # Documentación de API (futuro)
│   └── DEPLOYMENT.md                # Guía de despliegue (futuro)
│
├── 📂 assets/                       # (LEGACY - mantener por compatibilidad)
│   └── sources/
│       ├── css/
│       ├── js/
│       └── img/
│
├── index.html                       # Página principal
├── app.py                           # Aplicación Python (backend)
├── README.md                        # Documentación principal
├── REFACTORING_SUMMARY.md           # Resumen de refactorización
├── LICENSE                          # Licencia del proyecto
└── .gitignore                       # Archivos ignorados por Git
```

## 🎯 Convenciones y Mejores Prácticas

### Nomenclatura de Archivos

#### JavaScript
- **Módulos**: `nombre-descriptivo.js` (kebab-case)
  - Ejemplo: `storage-manager.js`, `ai-classifier.js`
  
- **Páginas**: `nombre-page.js` (kebab-case con sufijo -page)
  - Ejemplo: `login-page.js`, `dashboard-page.js`
  
- **Utilidades**: `nombre-util.js` (kebab-case)
  - Ejemplo: `validators.js`, `helpers.js`

#### CSS
- **Base**: Archivos de configuración global
  - `variables.css` - Variables CSS
  - `reset.css` - Reset de estilos
  - `typography.css` - Tipografía

- **Components**: Componentes reutilizables
  - Nombres descriptivos del componente
  - Ejemplo: `buttons.css`, `cards.css`, `forms.css`

- **Layout**: Estructura de página
  - `header.css`, `footer.css`, `sidebar.css`
  - `grid.css`, `layout.css`

- **Pages**: Estilos específicos de página
  - Nombre de la página + `.css`
  - Ejemplo: `admin.css`, `form.css`

#### Imágenes
- **Icons**: Íconos pequeños, logos
  - Formato: `.svg` (preferido), `.png`, `.webp`
  - Tamaño: generalmente < 100KB

- **UI**: Elementos de interfaz
  - Flechas, decoraciones, fondos
  - Formato: `.svg`, `.png`

- **Content**: Imágenes de contenido
  - Fotos, ilustraciones grandes
  - Formato: `.webp` (preferido), `.jpg`, `.png`
  - Optimizar para web

### Organización del Código

#### JavaScript
```javascript
// 1. Imports (si se usan módulos ES6)
// 2. Constantes y configuración
// 3. Variables globales
// 4. Funciones principales
// 5. Event listeners
// 6. Inicialización
```

#### CSS
```css
/* 1. Variables y configuración */
/* 2. Reset y base */
/* 3. Layout general */
/* 4. Componentes */
/* 5. Páginas específicas */
/* 6. Responsive (Media Queries) */
```

## 🔄 Migración desde la Estructura Antigua

### Mapeo de Carpetas

| Antigua Ubicación | Nueva Ubicación |
|-------------------|-----------------|
| `assets/sources/js/*.js` | `src/js/modules/` o `src/js/pages/` |
| `assets/sources/css/*.css` | `src/css/base/`, `src/css/components/`, `src/css/layout/` o `src/css/pages/` |
| `assets/sources/img/icon/` | `src/images/icons/` |
| `assets/sources/img/ui/` | `src/images/ui/` |
| `assets/sources/img/*.{jpg,png,webp}` | `src/images/content/` |

### Actualización de Referencias en HTML

#### Antes:
```html
<link rel="stylesheet" href="../assets/sources/css/variables.css">
<script src="../assets/sources/js/auth.js"></script>
<img src="../assets/sources/img/icon/icon.webp">
```

#### Después:
```html
<link rel="stylesheet" href="../src/css/base/variables.css">
<script src="../src/js/modules/auth.js"></script>
<img src="../src/images/icons/icon.webp">
```

## 📦 Carpeta Public

La carpeta `public/` está diseñada para contener los archivos optimizados y compilados para producción:

- **CSS minificado**: Todos los CSS concatenados y minificados
- **JS minificado**: Todos los JS concatenados y minificados
- **Imágenes optimizadas**: Comprimidas y en formatos web modernos

### Proceso de Build (Futuro)

```bash
# Compilar CSS
npm run build:css

# Compilar JS
npm run build:js

# Optimizar imágenes
npm run build:images

# Build completo
npm run build
```

## 🚀 Ventajas de la Nueva Estructura

### 1. **Escalabilidad**
- Fácil agregar nuevos módulos, componentes o páginas
- Estructura clara para proyectos grandes

### 2. **Mantenibilidad**
- Código organizado lógicamente
- Fácil encontrar y modificar archivos específicos

### 3. **Separación de Responsabilidades**
- Desarrollo (`src/`) vs Producción (`public/`)
- Módulos reutilizables vs código específico

### 4. **Colaboración**
- Estructura estándar que cualquier desarrollador puede entender
- Menos conflictos en control de versiones

### 5. **Performance**
- Posibilidad de minificar y comprimir
- Lazy loading más sencillo
- Cache más eficiente

## 📝 Próximos Pasos

1. ✅ Crear estructura de carpetas
2. ✅ Mover archivos a nuevas ubicaciones
3. ⏳ Actualizar referencias en HTML
4. ⏳ Crear proceso de build
5. ⏳ Implementar minificación
6. ⏳ Configurar linters (ESLint, StyleLint)
7. ⏳ Agregar tests unitarios

## 🔗 Referencias

- [MDN Web Docs - Project Structure](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website)
- [Frontend Clean Architecture](https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/)
- [Best Practices for Web Development](https://github.com/elsewhencode/project-guidelines)

---

**Última actualización:** 2025-11-17  
**Versión:** 2.0  
**Mantenedor:** WhiteMooncy
