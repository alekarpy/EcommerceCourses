# ⚙️ Backend - API RESTful Tienda de Cursos en Línea

Este proyecto contiene la API backend encargada de toda la lógica de negocio, autenticación, base de datos y procesamiento de la plataforma de e-commerce de cursos. Está construida con **Node.js, Express.js y MongoDB**.

## 🛠️ Tecnologías Utilizadas

*   **Servidor:** Node.js + Express.js
*   **Base de Datos:** MongoDB con ODM Mongoose
*   **Autenticación:** JSON Web Tokens (JWT)
*   **Seguridad:** bcryptjs para el encriptado de contraseñas
*   **Validaciones:** express-validator

## 🚀 Funcionalidades Clave

*   **Autenticación y Autorización:** Login/Registro seguro y protección de rutas según el rol (Administrador vs Cliente).
*   **Gestión de Catálogo (CRUD):** Los administradores pueden crear, leer, actualizar y eliminar cursos.
*   **Gestión de Usuarios:** Los administradores pueden ver y administrar cuentas de usuarios.
*   **Carrito de Compras:** Endpoints para que los usuarios añadan, actualicen o eliminen ítems antes de la compra.
*   **Órdenes:** Procesamiento de compras y generación de historial de órdenes.
*   **Características Técnicas:** Paginación de resultados y un middleware centralizado para el manejo de errores.

## 📋 Endpoints Principales

Aquí hay un resumen de los endpoints disponibles (ver Postman para la documentación completa). Prefijo base: `/api`.

| Recurso | Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/register` | Registro de usuario nuevo | Público |
| | `POST` | `/auth/login` | Iniciar sesión y obtener JWT | Público |
| | `GET` | `/auth/me` | Obtener datos del perfil actual | Cliente / Admin |
| **Cursos** | `GET` | `/products` | Obtener catálogo de cursos | Público |
| | `GET` | `/products/:id` | Ver detalle de un curso | Público |
| | `POST`, `PUT`, `DELETE`| `/products/*` | Modificar catálogo de cursos | **Solo Admin** |
| **Carrito** | `GET`, `DELETE` | `/cart` | Ver o vaciar el carrito | Cliente |
| | `POST`, `PUT`, `DELETE`| `/cart/add`, `/cart/:itemId` | Modificar ítems del carrito | Cliente |
| **Órdenes** | `POST` | `/orders` | Crear nueva orden de compra | Cliente |
| | `GET` | `/orders` | Historial de compras | Cliente / Admin |
| **Usuarios**| `GET`, `PUT`, `DELETE`| `/users/*` | Gestión de cuentas | **Solo Admin** |

## ⚙️ Instalación y Configuración

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Variables de Entorno (.env):**
    Crea un archivo llamado `.env` en la raíz de la carpeta `ecommerce-api` con las siguientes variables:
    ```env
    PORT=5000
    MONGODB_URI=tu_cadena_de_conexion_de_mongodb
    JWT_SECRET=tu_palabra_secreta_super_segura
    JWT_EXPIRE=30d
    ```

3.  **Poblar la Base de Datos (Seed):**
    Es altamente recomendado cargar los datos iniciales para poder probar el frontend inmediatamente:
    ```bash
    npm run seed
    ```

4.  **Iniciar Servidor de Desarrollo:**
    ```bash
    npm run dev
    ```

## 🧪 Datos de Prueba

Después de ejecutar el comando `npm run seed`, tendrás en tu base de datos algunas categorías, cursos y los siguientes usuarios listos para ser utilizados:

| Rol | Nombre | Email | Contraseña |
| :--- | :--- | :--- | :--- |
| **Administrador** | admin_user | `admin@example.com` | `password123` |
| **Cliente** | karla_medina | `karla@example.com` | `password123` |

*Nota: Todos los requests protegidos deben incluir el JWT en el Header `Authorization` como `Bearer <TOKEN>`.*
