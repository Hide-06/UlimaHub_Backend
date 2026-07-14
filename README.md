# UlimaHub - Servidor

Backend en Node.js + Express + Sequelize + PostgreSQL.

## 1. Instalar PostgreSQL

Descargar el instalador desde https://www.postgresql.org/download/windows/ y durante la instalacion poner una contrasena para el usuario `postgres`. Despues, con pgAdmin o `psql`, crear una base de datos llamada `ulimahub`.

## 2. Configurar la conexion

La conexion en `models/index.js` usa variables de entorno, con estos valores por defecto si no las configuras:

```
DB_HOST=localhost
DB_NAME=ulimahub
DB_USER=postgres
DB_PASSWORD=tu_contrasena
```

Para correrlo en local alcanza con reemplazar la contrasena por la que le pusiste al usuario `postgres`. Si quieres usar otro host, nombre de base, usuario, etc. puedes definir esas variables de entorno en vez de tocar el codigo.

Tambien se puede configurar `FRONTEND_ORIGINS` con la url del frontend (para que el CORS lo deje pasar). Si no se define, por defecto solo permite `http://localhost:5173`.

## 3. Instalar dependencias y correr

```
npm install
npm start
```

Si todo esta bien, en la consola aparece `Servidor funcionando en el puerto 3000` y `Sequelize` crea las tablas solas (`sequelize.sync()`). Para probar que responde: abrir `http://localhost:3000/api/health` en el navegador, deberia devolver `{"ok":true}`.
