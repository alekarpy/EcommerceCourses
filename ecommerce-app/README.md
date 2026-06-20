# 🖥️ Frontend - Tienda de Cursos en Línea (Angular)

Este es el frontend de la plataforma de e-commerce de cursos educativos, desarrollado utilizando **Angular** y estilizado con **Tailwind CSS**. Proporciona una interfaz moderna, responsiva y fácil de usar tanto para los estudiantes como para los administradores de la plataforma.

## ✨ Tecnologías Principales

*   **Framework:** Angular (Standalone Components y Lazy Loading)
*   **Estilos:** Tailwind CSS
*   **Routing:** Angular Router
*   **Gestión de Formularios:** Reactive Forms
*   **Autenticación:** Interceptors y Guards basados en JWT

## 🗺️ Estructura de Rutas y Navegación

La aplicación está dividida en diferentes áreas según el nivel de acceso del usuario:

### 🌐 Rutas Públicas (Cualquiera puede acceder)
*   `/inicio` - Página de aterrizaje principal de la tienda.
*   `/cursos` - Catálogo completo de cursos disponibles.
*   `/login` - Inicio de sesión.
*   `/register` - Registro de nuevos usuarios.
*   `/sobrenosotros` - Información sobre la plataforma.
*   `/contacto` - Formulario de contacto.

### 🔒 Rutas Protegidas (Solo para usuarios autenticados)
*   `/profile` - Perfil de usuario para modificar datos.
*   `/cart` y `/cart-full` - Visualización del carrito de compras.
*   `/wishlist` - Cursos guardados en la lista de deseos.
*   `/checkout` - Proceso de compra (con protección para no abandonar el formulario por error).
*   `/order-history` - Historial de compras anteriores.

### 🛡️ Rutas de Administración (Solo usuarios con rol admin)
*   `/admin/*` - Panel de control (Dashboard) cargado mediante *Lazy Loading* para gestionar productos (cursos), usuarios y visualizar métricas de la tienda.

## 🚀 Instalación y Ejecución

Asegúrate de que la API Backend (`ecommerce-api`) esté ejecutándose antes de probar el frontend para que las llamadas a la base de datos funcionen correctamente.

1.  **Instalar dependencias:**
    Navega a la carpeta `ecommerce-app` y ejecuta:
    ```bash
    npm install
    ```

2.  **Ejecutar el servidor de desarrollo:**
    ```bash
    ng serve
    # O también puedes usar: npm start
    ```

3.  **Visualizar la app:**
    Abre tu navegador web y dirígete a `http://localhost:4200/`. La aplicación recargará automáticamente si realizas cambios en el código fuente.

## 🧪 Cómo probar la aplicación

Para experimentar con los distintos flujos de la aplicación, te recomendamos usar los usuarios generados por el backend (asegúrate de haber ejecutado `npm run seed` en el backend):

*   **Para ver la experiencia de compra:** Inicia sesión con `karla@example.com` (Contraseña: `password123`). Podrás añadir cursos al carrito, ir al checkout y ver el historial.
*   **Para ver el panel de administración:** Inicia sesión con `admin@example.com` (Contraseña: `password123`) y navega a las rutas de administración para gestionar el contenido de la tienda.

## 🛠️ Comandos Adicionales (Angular CLI)

*   `ng build`: Compila el proyecto en la carpeta `dist/` para subirlo a producción.
*   `ng test`: Ejecuta las pruebas unitarias usando Karma.
