# Plantilla para un API con base de datos SQL Server

Esta es una plantilla base para crear un API que utiliza una de datos SQL Server. El codigo proveido en este repositorio no debería de usarse en producción.

Este proyecto asume que el usuario cuenta con una base de datos SQL Server. Referirse al folder `setup` para tener una referencia de la base de datos a utilizar.

Para poder iniciar el processo, se debe crear un archivo tipo `.env` en el folder raíz con la siguiente información:

```text
## JSON Web Token key
jwtPrivateKey=miLlavePrivada

## Base URL (para activación por correo)
BASE_URL=http://localhost:3000/api/activar/

## Info DB
MSSQLUSER=usuario
MSSQLHOST=localhost
MSSQLPASSWORD=contraseña
MSSQLDATABASE=baseDeDatos


## Info de servidor de correos
SEND_ACTIVATION=(true/false)
EMAIL_HOST=myEmailHost
EMAIL_USER=myEmail
EMAIL_PASS=myEmailPassword

## Sentry Logging
SENTRY=https://...
Estar seguro que estos valores concuerdan con el ambiente de desarrollo (development, testing or production).
```

Para iniciar el proceso:

```bash
npm start
```

Si se cuenta con `nodemon` instalado globalmente se puede correr el ambiente de desarrollo:

```bash
npm run dev
```

Las pruebas se corren con:

```bash
npm run test
```
