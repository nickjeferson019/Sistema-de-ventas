<div align="center">

# 🛒 Sistema de Ventas

**Aplicación web para gestionar productos, clientes y ventas**

Proyecto desarrollado con Angular, un backend propio y una base de datos relacional.

![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-API%20REST-339933)
![Base de datos](https://img.shields.io/badge/Base%20de%20datos-SQL-336791)

</div>

---

## 📋 Sobre el proyecto

Sistema de ventas que permite registrar y consultar productos, clientes y transacciones desde una interfaz web. La aplicación está dividida en tres capas independientes: un **frontend** que consume una **API** del lado del servidor, la cual se conecta a una **base de datos**.

## ✨ Características

- 📦 Gestión de productos (crear, editar, consultar y eliminar)
- 👥 Registro y administración de clientes
- 🧾 Registro de ventas con su detalle
- 🔍 Búsqueda y consulta de la información almacenada
- 🔌 Comunicación entre frontend y backend mediante API REST
- 🗄️ Persistencia de datos en una base de datos relacional

> ✏️ *Ajusta esta lista a lo que realmente hace tu sistema.*

## 🖼️ Vista previa

> Agrega aquí capturas de pantalla de tu aplicación. Crea una carpeta `docs/` en el repositorio, guarda las imágenes y enlázalas así:
>
> `![Pantalla principal](docs/pantalla-principal.png)`

## 🛠️ Tecnologías

| Capa | Tecnología | Uso |
|------|------------|-----|
| Frontend | Angular 19 + TypeScript | Interfaz de usuario y navegación |
| Frontend | HTML5 y CSS3 | Estructura y estilos |
| Backend | *(escribe aquí, por ejemplo Node.js + Express)* | API y lógica de negocio |
| Base de datos | *(escribe aquí, por ejemplo PostgreSQL o MySQL)* | Almacenamiento de la información |
| Control de versiones | Git y GitHub | Código fuente del proyecto |

## 📁 Estructura del proyecto

```
Sistema-de-ventas/
│
├── backend/          # API y lógica del servidor
├── database/         # Scripts y estructura de la base de datos
├── frontend/         # Aplicación Angular
│   └── src/
│       ├── app/      # Componentes de la aplicación
│       └── ...
│
├── .gitignore
└── README.md
```

## 🚀 Cómo ejecutarlo

### Requisitos previos

- [Node.js](https://nodejs.org/) (versión LTS)
- [Git](https://git-scm.com/)
- El motor de base de datos que uses (instalado y en ejecución)

### 1. Clonar el repositorio

```bash
git clone https://github.com/nickjeferson019/Sistema-de-ventas.git
cd Sistema-de-ventas
```

### 2. Base de datos

1. Crea una base de datos nueva en tu motor.
2. Ejecuta los scripts de la carpeta `database/` para crear las tablas.

### 3. Backend

```bash
cd backend
npm install
npm start
```

> Si tu backend usa variables de entorno, crea un archivo `.env` con tus datos de conexión (usuario, contraseña, nombre de la base de datos). Este archivo **no se sube** al repositorio.

### 4. Frontend

```bash
cd frontend
npm install
npm start
```

Luego abre [http://localhost:4200](http://localhost:4200) en tu navegador.

## 👤 Autor

**Nick Jeferson**

[![GitHub](https://img.shields.io/badge/GitHub-nickjeferson019-181717?logo=github)](https://github.com/nickjeferson019)
