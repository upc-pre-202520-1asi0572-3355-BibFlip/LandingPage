# Bibflip — Landing Page

Landing page simple para presentar Bibflip, una solución para reservar y monitorear cubículos de estudio en tiempo real.

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

Pasos:
1) En GitHub, ve a Settings > Pages y asegúrate de que “Source” esté en “GitHub Actions”.
2) Haz push a `main`. El workflow compilará con el `base-href` adecuado y desplegará la carpeta `dist/` a Pages.
3) Espera a que el job “Deploy to GitHub Pages” finalice. La página quedará disponible en:
   - https://upc-pre-202520-1asi0572-3355-BibFlip.github.io/LandingPage/

Notas:
- Las rutas de imágenes y assets están configuradas en relativo para funcionar bajo `/LandingPage/`.
- Si cambias el nombre del repositorio, la URL también cambiará; el workflow ajusta automáticamente el `base-href`.

## Contribuciones
Sugerencias y mejoras son bienvenidas. Abre un issue o un PR con tu propuesta.

## Licencia
Este proyecto se usa con fines académicos. Define una licencia antes de publicación en producción (por ejemplo, MIT).
