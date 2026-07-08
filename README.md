# DevBlog

Blog frontend construido con **Vue 3 + Vite** para mostrar artículos técnicos por categoría, con vista de detalle y búsqueda por texto.

## Demo funcional del proyecto

- Home con artículo destacado y listado de posts.
- Búsqueda en tiempo real desde el header (`?q=` en la URL).
- Filtro por categoría con rutas dinámicas.
- Vista de detalle por slug.
- Layout completo con header y footer reutilizables.

## Stack tecnológico

- **Vue 3** (Composition API, `<script setup>`)
- **Vue Router 4** (rutas dinámicas + lazy loading)
- **Pinia** (store de posts disponible en el proyecto)
- **Vite 8**
- **Docker + Nginx** para despliegue estático

## Estructura del proyecto

```text
/home/runner/work/Devblog/Devblog
├── src
│   ├── assets/            # Estilos globales
│   ├── components/
│   │   ├── blog/          # PostCard, PostList, CategoryBadge
│   │   ├── layout/        # AppHeader, AppFooter
│   │   └── ui/            # BaseSpinner
│   ├── composables/       # usePosts, useCategories
│   ├── data/              # posts.json, categories.json
│   ├── repositories/      # Capa de acceso a datos (Repository Pattern)
│   ├── router/            # Definición de rutas
│   ├── stores/            # postStore (Pinia)
│   ├── views/             # HomeView, PostView, CategoryView
│   ├── App.vue
│   └── main.js
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
└── vite.config.js
```

## Arquitectura (resumen)

El proyecto sigue una separación por capas:

- **Views**: componen pantallas.
- **Components**: UI reutilizable.
- **Composables**: lógica reactiva y estados de carga/error.
- **Repositories**: lectura de datos (actualmente desde JSON local).
- **Data**: fuente estática de contenido (`posts.json`, `categories.json`).

Esta base permite migrar fácilmente de JSON local a una API real sin reescribir la UI.

## Rutas disponibles

- `/` → inicio con destacados y listado
- `/post/:slug` → detalle de post
- `/category/:slug` → posts por categoría

## Requisitos

- **Node.js**: `^20.19.0 || >=22.12.0`
- **npm**

## Instalación y ejecución local

```bash
npm install
npm run dev
```

La app corre en el puerto que indique Vite (por defecto `5173`).

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # build de producción
npm run preview  # preview local del build
```

## Build de producción

```bash
npm run build
```

El resultado se genera en `dist/`.

## Ejecutar con Docker

### Opción 1: Docker Compose

```bash
docker compose up --build
```

Disponible en `http://localhost:8080`.

### Opción 2: Docker directo

```bash
docker build -t devblog .
docker run -p 8080:80 devblog
```

## Fuente de datos actual

- `src/data/posts.json`
- `src/data/categories.json`

> Actualmente el contenido es estático. La capa `repositories` facilita reemplazar esta fuente por una API REST/GraphQL más adelante.

## Estado actual

Proyecto preparado para:

- Escalar contenido por categorías.
- Agregar backend sin romper componentes de vista.
- Extender funcionalidades (auth, comentarios, paginación, etc.) sobre una base organizada.
