# Bibflip — Landing Page

Landing page para presentar Bibflip, nuestra solución para reservar y monitorear cubículos de estudio en tiempo real.

## Características
- Secciones: Hero, ¿Qué es?, Características, Cómo usar, Testimonios, Sobre nosotros y Footer.
- Diseño responsive con tipografías web y Bootstrap.
- Animaciones suaves y componentes accesibles.
- Código en Angular standalone + estilos CSS.

## Demo / Preview
- Desarrollo local: http://localhost:4200/
- Producción (GitHub Pages, tras el primer deploy): https://upc-pre-202520-1asi0572-3355-BibFlip.github.io/LandingPage/

## Stack técnico
- Angular 20
- Bootstrap 5 (solo CSS)
- CSS personalizado

## Requisitos
- Node.js 20 o 22 (LTS)
- npm 9+

## Puesta en marcha (Windows)
1) Instalar dependencias:

```cmd
npm install
```

2) Ejecutar en desarrollo:

```cmd
npm run start
```

3) Abrir en el navegador:
- URL: http://localhost:4200/

Los cambios en el código recargan la página automáticamente.

## Build de producción
Genera los artefactos optimizados en la carpeta `dist/`:

```cmd
npm run build
```

## Scripts disponibles
- `npm run start`: inicia el servidor de desarrollo.
- `npm run build`: compila la app para producción.
- `npm run watch`: compila en modo watch (desarrollo).

## Estructura del proyecto (resumen)
- `src/` código fuente de la landing
  - `app/` componentes, HTML y estilos específicos
  - `index.html` documento base
  - `styles.css` estilos globales
- `public/` recursos estáticos (imágenes, íconos, etc.)
- `package.json` scripts y dependencias

## Despliegue (GitHub Pages con Actions)
Este repositorio incluye un flujo en `.github/workflows/deploy.yml` que construye y publica automáticamente al hacer push a `main`.

https://upc-pre-202520-1asi0572-3355-BibFlip.github.io/LandingPage/

