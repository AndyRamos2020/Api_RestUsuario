# API REST

API REST desarrollada con Node.js y Express para realizar operaciones CRUD.

## Requisitos previos

Antes de ejecutar el proyecto, necesitas tener instalado:

* [Node.js](https://nodejs.org/)
* npm (incluido con Node.js)
* Git

## Cómo ejecutar la API

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

### 2. Entrar a la carpeta del proyecto

```bash
cd NOMBRE_DEL_PROYECTO
```

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el servidor

```bash
node app.js
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## Endpoints

### GET

Obtiene los usuarios registrados.

```http
GET http://localhost:3000/api/
```

### POST

Guarda un nuevo usuario.

```http
POST http://localhost:3000/api/save
```

### PUT

Actualiza un usuario mediante su ID.

```http
PUT http://localhost:3000/api/put/id
```

### DELETE

Elimina un usuario mediante su ID.

```http
DELETE http://localhost:3000/api/delete/id
```
