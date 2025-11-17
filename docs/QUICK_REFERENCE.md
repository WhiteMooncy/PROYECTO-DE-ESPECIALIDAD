# 📋 Guía Rápida - Nueva Estructura del Proyecto

## 🎯 Dónde Está Cada Cosa

### 📂 JavaScript

| Tipo de Archivo | Ubicación | Ejemplo |
|----------------|-----------|---------|
| **Módulos Reutilizables** | `src/js/modules/` | `auth.js`, `storage-manager.js` |
| **Scripts de Páginas** | `src/js/pages/` | `login-page.js`, `dashboard-page.js` |
| **Utilidades** | `src/js/utils/` | `validators.js`, `admin-footer.js` |

### 🎨 CSS

| Tipo de Archivo | Ubicación | Ejemplo |
|----------------|-----------|---------|
| **Variables y Base** | `src/css/base/` | `variables.css` |
| **Componentes** | `src/css/components/` | `components.css` |
| **Layouts** | `src/css/layout/` | `shared.css`, `main.css` |
| **Páginas Específicas** | `src/css/pages/` | `admin.css`, `form.css` |

### 🖼️ Imágenes

| Tipo de Imagen | Ubicación | Ejemplo |
|---------------|-----------|---------|
| **Íconos y Logos** | `src/images/icons/` | `icon.webp`, `FB.png` |
| **Elementos UI** | `src/images/ui/` | `glideLeftArrow.png` |
| **Contenido** | `src/images/content/` | `represa.webp`, `serCamera.png` |

## 🔄 Referencias en HTML

### ❌ Antes (Estructura Antigua)
```html
<link rel="stylesheet" href="../assets/sources/css/variables.css">
<script src="../assets/sources/js/auth.js"></script>
<img src="../assets/sources/img/icon/icon.webp">
```

### ✅ Ahora (Nueva Estructura)
```html
<link rel="stylesheet" href="../src/css/base/variables.css">
<script src="../src/js/modules/auth.js"></script>
<img src="../src/images/icons/icon.webp">
```

## 🚀 Migración Automática

Para actualizar todas las referencias automáticamente:

```powershell
# Ejecutar desde la raíz del proyecto
.\config\migrate-references.ps1
```

Este script:
- ✓ Busca todos los archivos HTML
- ✓ Actualiza referencias de CSS, JS e imágenes
- ✓ Crea un respaldo automático
- ✓ Muestra reporte de cambios

## 📦 Carpetas Principales

```
PROYECTO-DE-ESPECIALIDAD/
│
├── 🟢 src/              ← TRABAJAR AQUÍ (Desarrollo)
│   ├── js/
│   ├── css/
│   └── images/
│
├── 🔴 public/           ← NO EDITAR (Generado automáticamente)
│   ├── css/
│   ├── js/
│   └── images/
│
├── 📄 pages/            ← Archivos HTML
├── 📊 data/             ← Datos JSON
├── ⚙️ config/           ← Configuraciones
└── 📖 docs/             ← Documentación
```

## 💡 Flujo de Trabajo

### 1. Desarrollo
```
Editar en src/ → Probar localmente → Commit
```

### 2. Producción (Futuro)
```
npm run build → Archivos en public/ → Deploy
```

## 🔍 Encontrar Archivos Rápidamente

### Por Función
- **Autenticación**: `src/js/modules/auth.js`
- **Validaciones**: `src/js/utils/validators.js`
- **IA Classifier**: `src/js/modules/ai-classifier.js`
- **Storage**: `src/js/modules/storage-manager.js`

### Por Página
- **Login**: `src/js/pages/login-page.js` + `src/css/pages/admin.css`
- **Dashboard**: `src/js/pages/dashboard-page.js` + `src/css/pages/admin.css`
- **Form**: `src/js/pages/form-page.js` + `src/css/pages/form.css`
- **Map**: `src/js/pages/map-page.js` + `src/css/layout/shared.css`

## ⚠️ Importante

1. **NO** editar archivos en `assets/sources/` (legacy)
2. **SIEMPRE** trabajar en `src/`
3. **MANTENER** estructura organizada
4. **EJECUTAR** script de migración después de mover archivos

## 🆘 Problemas Comunes

### ❓ "No se carga mi CSS/JS"
- ✓ Verificar ruta en HTML
- ✓ Ejecutar script de migración
- ✓ Limpiar caché del navegador

### ❓ "Imagen no aparece"
- ✓ Verificar ubicación en `src/images/`
- ✓ Actualizar ruta en HTML
- ✓ Verificar nombre del archivo

### ❓ "¿Dónde pongo un nuevo archivo?"
- **Módulo reutilizable**: `src/js/modules/`
- **Script de página**: `src/js/pages/`
- **Utilidad**: `src/js/utils/`
- **Componente CSS**: `src/css/components/`
- **Imagen**: `src/images/[icons|ui|content]/`

## 📚 Más Información

- 📖 **Estructura completa**: `docs/PROJECT_STRUCTURE.md`
- ⚙️ **Configuración**: `config/project-config.json`
- 🔄 **Script migración**: `config/migrate-references.ps1`

---

**Última actualización:** 2025-11-17
