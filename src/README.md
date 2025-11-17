# Carpeta SRC - Código Fuente

Esta carpeta contiene todo el código fuente del proyecto organizado de manera profesional.

## 📂 Estructura

### `/js` - JavaScript
```
js/
├── modules/        # Módulos reutilizables
│   ├── auth.js                 # Sistema de autenticación
│   ├── storage-manager.js      # Gestión de localStorage
│   └── ai-classifier.js        # Clasificador de IA
│
├── pages/          # Scripts de páginas
│   ├── index-page.js
│   ├── login-page.js
│   ├── dashboard-page.js
│   └── ...
│
└── utils/          # Utilidades
    ├── validators.js           # Validaciones
    └── admin-footer.js         # Footer admin
```

### `/css` - Hojas de Estilo
```
css/
├── base/           # Base y variables
│   └── variables.css          # Variables CSS globales
│
├── components/     # Componentes
│   └── components.css         # Botones, cards, forms
│
├── layout/         # Layouts
│   ├── shared.css             # Estilos compartidos
│   ├── main.css               # Layout principal
│   └── modern-styles.css      # Estilos modernos
│
└── pages/          # Páginas específicas
    ├── admin.css              # Panel administrativo
    └── form.css               # Formularios
```

### `/images` - Recursos Visuales
```
images/
├── icons/          # Íconos y logos
│   ├── icon.webp
│   ├── EMAIL.png
│   └── ...
│
├── ui/             # Elementos UI
│   ├── glideLeftArrow.png
│   └── ...
│
└── content/        # Contenido
    ├── represa.webp
    └── ...
```

## 🎯 Convenciones

### JavaScript
- **Nombres de archivo**: kebab-case (`auth-manager.js`)
- **Formato**: ES6+ con semicolons
- **Comentarios**: JSDoc para funciones públicas

### CSS
- **Nombres de archivo**: kebab-case (`button-styles.css`)
- **Metodología**: BEM recomendado
- **Variables**: Usar custom properties (--color-primary)

### Imágenes
- **Formatos**: WebP preferido, PNG para transparencias
- **Nombres**: descriptivos y en minúsculas
- **Optimización**: Comprimir antes de commit

## 🔧 Desarrollo

Para trabajar en el proyecto:

1. Editar archivos en `src/`
2. Probar cambios localmente
3. Compilar para producción (`public/`)

## 📝 Notas

- **NO** editar archivos en `public/` directamente
- **SIEMPRE** trabajar en `src/`
- Ejecutar proceso de build antes de deploy
- Mantener estructura organizada

---

Para más información, consulta `docs/PROJECT_STRUCTURE.md`
