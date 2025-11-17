# Script de Migración - Nueva Estructura de Carpetas
# Actualiza todas las referencias en los archivos HTML

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Migración de Referencias en HTML" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projectRoot = "c:\xampp\htdocs\workbench\PROYECTO-DE-ESPECIALIDAD"
$htmlFiles = Get-ChildItem -Path $projectRoot -Include "*.html" -Recurse -File

$replacements = @{
    # CSS
    '../assets/sources/css/variables.css' = '../src/css/base/variables.css'
    '../assets/sources/css/components.css' = '../src/css/components/components.css'
    '../assets/sources/css/admin.css' = '../src/css/pages/admin.css'
    '../assets/sources/css/form.css' = '../src/css/pages/form.css'
    '../assets/sources/css/shared.css' = '../src/css/layout/shared.css'
    '../assets/sources/css/main.css' = '../src/css/layout/main.css'
    '../assets/sources/css/modern-styles.css' = '../src/css/layout/modern-styles.css'
    'assets/sources/css/modern-styles.css' = 'src/css/layout/modern-styles.css'
    
    # JavaScript - Módulos
    '../assets/sources/js/auth.js' = '../src/js/modules/auth.js'
    '../assets/sources/js/storage-manager.js' = '../src/js/modules/storage-manager.js'
    '../assets/sources/js/ai-classifier.js' = '../src/js/modules/ai-classifier.js'
    
    # JavaScript - Páginas
    '../assets/sources/js/index-page.js' = '../src/js/pages/index-page.js'
    '../assets/sources/js/login-page.js' = '../src/js/pages/login-page.js'
    '../assets/sources/js/form-page.js' = '../src/js/pages/form-page.js'
    '../assets/sources/js/dashboard-page.js' = '../src/js/pages/dashboard-page.js'
    '../assets/sources/js/map-page.js' = '../src/js/pages/map-page.js'
    '../assets/sources/js/users.js' = '../src/js/pages/users.js'
    '../assets/sources/js/responses.js' = '../src/js/pages/responses.js'
    '../assets/sources/js/nosotros-page.js' = '../src/js/pages/nosotros-page.js'
    '../assets/sources/js/dashboard.js' = '../src/js/pages/dashboard.js'
    '../assets/sources/js/form.js' = '../src/js/pages/form.js'
    '../assets/sources/js/map.js' = '../src/js/pages/map.js'
    '../assets/sources/js/main.js' = '../src/js/pages/main.js'
    'assets/sources/js/index-page.js' = 'src/js/pages/index-page.js'
    
    # JavaScript - Utilidades
    '../assets/sources/js/validators.js' = '../src/js/utils/validators.js'
    '../assets/sources/js/admin-footer.js' = '../src/js/utils/admin-footer.js'
    
    # Imágenes
    '../assets/sources/img/icon/icon.webp' = '../src/images/icons/icon.webp'
    'assets/sources/img/icon/icon.webp' = 'src/images/icons/icon.webp'
    '../assets/sources/img/' = '../src/images/content/'
    'assets/sources/img/' = 'src/images/content/'
}

$totalFiles = 0
$totalReplacements = 0

foreach ($file in $htmlFiles) {
    Write-Host "Procesando: $($file.Name)" -ForegroundColor Yellow
    
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    $fileReplacements = 0
    
    foreach ($old in $replacements.Keys) {
        $new = $replacements[$old]
        if ($content -match [regex]::Escape($old)) {
            $content = $content -replace [regex]::Escape($old), $new
            $fileReplacements++
            $totalReplacements++
            Write-Host "  [OK] Reemplazado: $old" -ForegroundColor Green
            Write-Host "    -> $new" -ForegroundColor Gray
        }
    }
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $totalFiles++
        Write-Host "  [OK] Archivo actualizado ($fileReplacements reemplazos)" -ForegroundColor Green
    } else {
        Write-Host "  - Sin cambios" -ForegroundColor Gray
    }
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Resumen de Migración" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Archivos procesados: $($htmlFiles.Count)" -ForegroundColor White
Write-Host "Archivos modificados: $totalFiles" -ForegroundColor Green
Write-Host "Total de reemplazos: $totalReplacements" -ForegroundColor Green
Write-Host ""
Write-Host "[OK] Migracion completada exitosamente!" -ForegroundColor Green
Write-Host ""
