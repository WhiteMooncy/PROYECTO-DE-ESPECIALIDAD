# Estructura CSS Modular - Hydro-Conecta

## 📁 Arquitectura de Estilos

La estructura CSS ha sido reorganizada siguiendo el patrón modular de Akelarre, separando responsabilidades en archivos específicos:

### **1. main.css** - Base y Variables
- ✅ Variables CSS (colores, gradientes, sombras, tipografía)
- ✅ Reset CSS
- ✅ Tipografía base (h1-h6, p, a)
- ✅ Utilidades (.container, .text-center, .text-gradient)
- ✅ Botones base (.btn, .btn-primary, .btn-secondary)
- ✅ Cards base (.card)
- ✅ Responsive breakpoints

### **2. components.css** - Componentes Reutilizables
- ✅ SVG Waves Background (4 capas animadas)
- ✅ Navbar Moderna (glassmorphism, scroll effect, mobile toggle)
- ✅ Footer Moderno (4 columnas, social links)
- ✅ Responsive navbar mobile

### **3. index.css** - Página de Inicio
- ✅ Presentation Banner (hero alternativo)
- ✅ Banner Stats Grid
- ✅ Visual Cards
- ✅ Institutional Values
- ✅ Projects Gallery (Splide carousel)
- ✅ Wave Divider

### **4. nosotros.css** - Página Nosotros
- ✅ About Hero Section
- ✅ About Stats Cards
- ✅ About Content Grid
- ✅ Team Section (member cards con overlay)
- ✅ Values Section

### **5. form.css** - Página Formulario
- ✅ Form Container
- ✅ Form Header (gradient)
- ✅ Question Wrapper
- ✅ Options Grid (radio inputs estilizados)
- ✅ Form Controls (botones prev/next)
- ✅ Progress Bar
- ✅ Result Screen
- ✅ Filter Controls

### **6. dashboard.css** - Página Dashboard
- ✅ Dashboard Layout
- ✅ Dashboard Header
- ✅ Stats Grid (4 cards con gradientes de colores)
- ✅ Stat Cards (iconos circulares, valores, cambios)
- ✅ Charts Grid
- ✅ Chart Cards (placeholders para Chart.js)
- ✅ Comments Section
- ✅ Filter Controls
- ✅ Comment Items (badges, categoría, sentimiento)

## 🎨 Sistema de Variables

```css
:root {
    /* Colores */
    --color-primary: #0077b6;
    --color-secondary: #00b4d8;
    --color-accent: #90e0ef;
    --color-dark: #03045e;
    --color-light: #caf0f8;
    
    /* Gradientes */
    --gradient-primary: linear-gradient(135deg, #0077b6 0%, #00b4d8 100%);
    
    /* Sombras */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.15);
    
    /* Border Radius */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;
    
    /* Transiciones */
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Tipografía */
    --font-family: 'Poppins', sans-serif;
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
}
```

## 📄 Uso en HTML

### Estructura de Importación:

```html
<!-- Stylesheets Modulares -->
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/[página-específica].css">
```

### Ejemplos por Página:

**index.html:**
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/index.css">
```

**pages/nosotros.html:**
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/nosotros.css">
```

**pages/form.html:**
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/form.css">
```

**pages/dashboard.html:**
```html
<link rel="stylesheet" href="../assets/css/main.css">
<link rel="stylesheet" href="../assets/css/components.css">
<link rel="stylesheet" href="../assets/css/dashboard.css">
```

## ✅ Ventajas de la Estructura Modular

1. **Mantenibilidad**: Cada componente en su propio archivo
2. **Escalabilidad**: Fácil agregar nuevas páginas sin afectar existentes
3. **Performance**: Carga solo los estilos necesarios por página
4. **Organización**: Estructura clara inspirada en Akelarre
5. **Reutilización**: Componentes compartidos en components.css
6. **Consistencia**: Variables centralizadas en main.css

## 📊 Comparación con Akelarre

### Akelarre:
```
/css
  ├── main.css (variables, reset, base)
  ├── carta.css
  ├── dashboard.css
  ├── dashboard-common.css
  ├── dashboard-customers.css
  └── ...
```

### Hydro-Conecta:
```
/css
  ├── main.css (variables, reset, base)
  ├── components.css (navbar, footer, waves)
  ├── index.css
  ├── nosotros.css
  ├── form.css
  └── dashboard.css
```

## 🔄 Archivos Deprecados

Los siguientes archivos ya NO se deben usar:
- ❌ `modern-styles.css` (monolítico, todo en uno)
- ❌ `theme-index.css` (viejo sistema de temas)
- ❌ `theme-form.css` (viejo sistema de temas)
- ❌ `theme-dashboard.css` (viejo sistema de temas)

## 🚀 Próximos Pasos

1. Actualizar `index.html` con imports modulares
2. Actualizar `pages/nosotros.html` con imports modulares
3. Actualizar `pages/form.html` con imports modulares
4. ✅ `pages/dashboard.html` ya actualizado
5. Eliminar archivos CSS deprecados
6. Crear `map.css` y `users.css` si es necesario

## 📝 Notas

- Todos los estilos inline han sido removidos
- Las clases CSS siguen convención BEM cuando aplica
- Responsive design incluido en cada módulo
- AOS animations integradas
- Font Awesome 6.4.0 para iconos
