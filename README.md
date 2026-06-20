# 🎓 Plataforma de Cursos en Línea (E-commerce)

¡Bienvenido al repositorio de la Plataforma de Cursos en Línea! Este proyecto es una aplicación full-stack diseñada para la venta y gestión de cursos educativos. Está compuesta por un frontend moderno construido con **Angular** y una robusta API backend desarrollada con **Node.js, Express y MongoDB**.

## 🏗️ Estructura del Proyecto

El repositorio está dividido en dos directorios principales:

*   [**`ecommerce-app/`**](./ecommerce-app/README.md): Contiene la aplicación web frontend (Angular).
*   [**`ecommerce-api/`**](./ecommerce-api/README.md): Contiene la API RESTful backend (Node.js/Express).

Cada carpeta tiene su propio `README.md` con instrucciones detalladas específicas para el frontend y el backend.

## 🌟 Funcionalidades Principales

### Para Estudiantes (Clientes)
*   Explorar el catálogo de cursos disponibles.
*   Crear una cuenta e iniciar sesión de forma segura (JWT).
*   Agregar cursos a un carrito de compras y lista de deseos (wishlist).
*   Realizar el proceso de compra (checkout).
*   Ver historial de órdenes de compra.
*   Modificar información del perfil de usuario.

### Para Administradores
*   Panel de administración dedicado.
*   Gestión de cursos (Crear, Leer, Actualizar, Eliminar).
*   Gestión de usuarios de la plataforma.

## 🚀 Requisitos Previos

Para ejecutar este proyecto de forma local, necesitarás tener instalado:

*   **Node.js** (v16 o superior)
*   **Angular CLI** (para ejecutar el frontend)
*   **MongoDB** (local o una instancia en la nube como MongoDB Atlas)

## 🛠️ Guía de Instalación Rápida

Sigue estos pasos para arrancar ambos proyectos de forma simultánea.

### 1. Configurar y lanzar el Backend (`ecommerce-api`)

1.  Abre una terminal y navega al backend:
    ```bash
    cd ecommerce-api
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Crea un archivo `.env` en la raíz de `ecommerce-api` basándote en un posible `.env.example` o configura las variables esenciales (ver el README del backend para detalles como `MONGODB_URI` y `JWT_SECRET`).
4.  Llena la base de datos con datos y usuarios de prueba:
    ```bash
    npm run seed
    ```
5.  Inicia el servidor backend:
    ```bash
    npm run dev
    ```
    *El backend estará corriendo en `http://localhost:5000`*

### 2. Configurar y lanzar el Frontend (`ecommerce-app`)

1.  Abre **una nueva pestaña** en tu terminal y navega al frontend:
    ```bash
    cd ecommerce-app
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia la aplicación Angular:
    ```bash
    npm start
    # o ng serve
    ```
    *El frontend estará corriendo en `http://localhost:4200`*

---

## 👥 Usuarios de Prueba

Al ejecutar el comando `npm run seed` en el backend, la base de datos se poblará automáticamente con algunos usuarios predeterminados que puedes usar para probar la aplicación en el frontend:

| Rol | Nombre | Email | Contraseña |
| :--- | :--- | :--- | :--- |
| **Administrador** | admin_user | `admin@example.com` | `password123` |
| **Cliente** | karla_medina | `karla@example.com` | `password123` |

Usa el usuario administrador para ver el panel de control y crear/editar cursos, y los usuarios clientes para navegar por la tienda, añadir al carrito y simular compras.

## 📄 Licencia

Este proyecto es para fines educativos y demostrativos.
