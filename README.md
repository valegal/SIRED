## SUMMARY

Este repositorio cuenta con tres folders principales: LocalTestDB | frontend | server

- Para clonar el respositorio en un directorio local: `git clone https://github.com/valegal/SIRED.git`

### LocalTestDB

En el directorio LocalTestDB se encuentra una copia de testeo de la base de datos del sistemagrivp almacenador en el servidor del semillero SIRED, con esta copia reducida se puede crear una versión local para las diferentes pruebas de la plataforma, la base de datos se llama 'valeg' y tiene seis tablas 'equipos', 'equipos_has_grupos', 'grupos', 'indicadores', 'mediciones', 'usuarios'. El siguiente es el diagrama Entidad-Relación.
![ER Diagram](/LocalTestDB/image.png)

Se ejecuta el script MySQL y luego se configura de forma local para que coincida con las configuraciones dentro de la conexión a la base de datos (y las variables de entorno) que se escribió en los archivos 'db.js' y 'server.js' dentro del directorio /server.

### frontend

La carpeta frontend contiene la parte del cliente de la plataforma, creada con el servidor de desarrollo local ViteJS para el framework React, para inicializarla es necesario tener NodeJS instalado, luego la consola ubicada en el directorio frontend se instala el gestor de paquetes y las librerias necesarias como axios (Cliente HTTP basado en promesas para node.js y el navegador) o chakra-ui (para el UX/UI).

```
npm i
npm i @chakra-ui/toast
npm install axios
```

- Para levantar el servidor cliente en el puerto http://localhost:5173/ se puede utilizar `npm run dev`.

### server

La parte del servidor fue creada con NodeJS y el entorno de trabajo para aplicaciones web Express, para inicializarla solo se necesita el comando `npm i` dentro del directorio /server y para correr el servidor en el puerto 8081 y establecer la conexión con la base de datos se ejecuta `npm start`.

#### Adicionales

- Variables de entorno para producción:

```
PORT=22

DB_HOST=10.1.81.226

DB_USER=sired

DB_PASSWORD=sired*e3t

DB_NAME=sistemagripv

JWT_SECRET=secreto
```

- Configuración de nginx (es un servidor web que también puede ser usado como proxy inverso):
       
```
server {
    listen 80;
    listen [::]:80
    server_name siged.uis.edu.co;

    location / {
        root /home/sired/SIRED/frontend/dist;
        try_files $uri /index.html;
        }

    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        }
    }
```

En el puerto público `sudo nano /etc/nginx/sites-available/200.16.118.194`.
