# UlimaHub - Servidor

Backend en Node.js + Express + Sequelize + PostgreSQL.

## 1. Instalar PostgreSQL

Descargar el instalador desde https://www.postgresql.org/download/windows/ y durante la instalacion poner una contrasena para el usuario `postgres`. Despues, con pgAdmin o `psql`, crear una base de datos llamada `ulimahub`.

## 2. Configurar la conexion

Editar `server/models/index.js` y poner ahi la contrasena que le pusiste al usuario `postgres` durante la instalacion (reemplazar `'ulimahub123'`).

## 3. Instalar dependencias y correr

```
cd server
npm install
npm start
```

Si todo esta bien, en la consola aparece `Servidor funcionando en el puerto 3000` y `Sequelize` crea las tablas solas (`sequelize.sync()`). Para probar que responde: abrir `http://localhost:3000/api/health` en el navegador, deberia devolver `{"ok":true}`.
