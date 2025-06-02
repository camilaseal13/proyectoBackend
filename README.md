# 🛒 Proyecto Backend Ecommerce

Entrega Final – Coderhouse Backend

## 📌 Descripción

Este proyecto es un backend para una tienda de ecommerce, desarrollado con **Node.js**, **Express**, **MongoDB Atlas**, y **Handlebars**. Se cumple con todos los requisitos de la entrega final del curso de Backend, incluyendo persistencia en Mongo, gestión profesional de productos y carritos, filtros, ordenamientos, y vistas dinámicas.

---

## 🚀 Tecnologías usadas

- Node.js
- Express.js
- MongoDB Atlas + Mongoose
- Handlebars (motor de vistas)
- Socket.io
- Nodemon (desarrollo)

---

## 🧪 Instrucciones para correr el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/proyectoBackend.git
cd proyectoBackend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

En la raíz del proyecto, crea un archivo llamado `.env` con el siguiente contenido:

```env
MONGO_URI=mongodb+srv://USUARIO:CONTRASEÑA@clusterproyecto.hgst1nn.mongodb.net/ecommerce
```

> 💡 Puedes usar tu propio usuario y clave o pedirme uno temporal de lectura.

### 4. Ejecutar el servidor

```bash
npm start
```

---

## 🌐 Endpoints principales

### Productos

- `GET /api/products` → Paginación, filtros, ordenamiento (`limit`, `page`, `sort`, `query`)
- `GET /products` → Vista con paginación y botones
- `GET /products/:pid` → Vista de producto individual

### Carritos

- `POST /api/carts` → Crea un nuevo carrito
- `GET /api/carts/:cid` → Vista del carrito con productos `populate`
- `POST /api/carts/:cid/products/:pid` → Agrega producto
- `PUT /api/carts/:cid` → Actualiza todos los productos del carrito
- `PUT /api/carts/:cid/products/:pid` → Cambia cantidad de un producto
- `DELETE /api/carts/:cid/products/:pid` → Elimina un producto del carrito
- `DELETE /api/carts/:cid` → Vacía el carrito

---

## 🖼️ Vistas

- `/products`: Lista con paginación y botones.
- `/products/:pid`: Detalle del producto + botón “Agregar al carrito”.
- `/carts/:cid`: Vista de los productos en el carrito.

---

## ✅ Checklist de requisitos cumplidos

- [x] MongoDB como persistencia principal
- [x] Endpoints de productos y carritos completos
- [x] Paginación, filtros y ordenamientos en `GET /api/products`
- [x] Métodos PUT y DELETE para actualizar/eliminar productos de carritos
- [x] Populate en la vista `/carts/:cid`
- [x] Vistas completas con Handlebars

---

## 🧑‍💻 Autor

**Maria Camila Sepúlveda Alzate**

Propuesta desarrollada como parte del curso de **Backend I- Coderhouse** 🧠

---

## 📂 Notas

> ⚠️ Este repositorio **no incluye `node_modules/` ni `.env`** por seguridad y limpieza. Ver instrucciones arriba.
