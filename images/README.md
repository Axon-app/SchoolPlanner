# Images Directory

Esta carpeta contiene las imágenes utilizadas en la aplicación.

## Estructura:
- `logo.png` - Logo principal de la aplicación
- `favicon.ico` - Icono para el navegador
- `icons/` - Iconos adicionales si se necesitan

## Formatos recomendados:
- **Logo**: PNG con fondo transparente, tamaño recomendado 200x200px
- **Favicon**: ICO, 32x32px o 16x16px

## Uso en componentes:
```javascript
// Para usar el logo en un componente:
import logo from '/images/logo.png';

// O directamente en JSX:
<img src="/images/logo.png" alt="Logo" />
```

## Notas:
- Todas las imágenes en la carpeta `public/` son accesibles directamente desde la URL
- No es necesario importar las imágenes de `public/`, se pueden referenciar directamente
- Para optimización, considera usar formatos WebP para navegadores modernos
