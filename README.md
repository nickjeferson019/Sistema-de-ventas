# Prueba técnica CRUD de ventas

Proyecto base full-stack:
- PostgreSQL (base existente `sistema_ventas`)
- Backend: Node.js 20 + Express + pg, arquitectura MVC
- Frontend: Angular 19 standalone + HttpClient

## 1. Base de datos
Tu base ya tiene las tablas `productos`, `vendedor` y `ventas`. El archivo `database/verificar.sql` permite comprobar estructura y relaciones.
No ejecutes un `DROP TABLE`: este proyecto está pensado para aprovechar tus tablas existentes.

## 2. Backend
En una terminal:
```bash
cd backend
npm install
```
Copia `.env.example` como `.env` y ajusta la contraseña de PostgreSQL.
Luego:
```bash
npm run dev
```
API en `http://localhost:3000`. Prueba `http://localhost:3000/api/health`.

## 3. Frontend
Requiere Node.js 20 y Angular CLI 19 (el paquete incluye fuentes; instala dependencias):
```bash
cd frontend
npm install
npm start
```
Abre la URL que indique Angular, normalmente `http://localhost:4200`.

## Endpoints
- `/api/productos`
- `/api/vendedores`
- `/api/ventas`

Cada recurso admite GET (lista y por ID), POST, PUT y DELETE.

## Notas
- Las consultas SQL son parametrizadas.
- `ventas.total` es una columna generada, por eso no se inserta ni actualiza directamente.
- Las ventas referenciadas no se pueden borrar si PostgreSQL tiene `ON DELETE RESTRICT`; la API devuelve un error claro.
- Verifica que la estructura de tus columnas coincida con la usada por el proyecto. Está basada en las columnas observadas en las capturas: `productos(id_producto,nombre,descripcion,precio,stock,activo,fecha_creacion)`, `vendedor(id_vendedor,nombre,apellido,correo,telefono,activo,fecha_creacion)` y `ventas(id_venta,id_producto,id_vendedor,cantidad,precio_unitario,total,fecha_venta)`.
