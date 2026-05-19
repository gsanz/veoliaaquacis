Actualmente hay 2 carpetas frontend y backend
DEPURACION
primero guardar/reemplazar el fichero backend/.env.samples como backend/.env

LEVANTAR BBDD Y BACKEND

cd backend

levantar bbdd mongodb
docker-compose -f docker-compose-bbdd.yml up -d
actualizar la bbdd con los seeders
npm run seed


levantar backend para depuración
guardar el fichero .env.samples en backend/.env
npm run start

lanzar los tests unitarios
npm run test

comprobar Swagger
http://localhost:3000/api-docs

para generar token o hacer login el siguiente usuario/password es el que se utiliza
usuario : admin@test.com
password: 123456

LEVANTAR FRONTEND
guardar el fichero frontend/.env.samples en frontend/.env
ejecuta
cd frontend
npm run dev

ahora ejecuta en el navegador http://localhost:5173/
y mete como usuario y contraseña
usuario: admin@test.com
password:123456

Para Visualizar el editor de la base de datos mongodb se ejecuta en el navegador http://localhost:8081 y user: admin , password:admin

PRODUCCION

guardar el fichero backend/.env.prod.samples en backend/.env

ponte en el directorio principal (donde están las carpetas de frontend y backend y está el fichero docker-compose.yml. Ahora ejecutas lo siguiente:
docker-compose up --build -d

Comprueba que están todos los contenedores activos  
frontend: veolia-front
backend:  veolia-api
bbdd:    veolia-mongo
gestor: bbdd veolia-mongo-express

comprobar Swagger
http://localhost:3000/api-docs


ahora ejecuta en el navegador http://localhost:5173/
y mete como usuario y contraseña
usuario: admin@test.com
password:123456


para correr los tests en producción se ejecuta lo siguiente
docker exec -it veolia-api npm run test

ejecutar seed de la bbdd

docker exec -it veolia-api npm run seed

Para Visualizar el editor de la base de datos mongodb se ejecuta en el navegador http://localhost:8081 y user: admin , password:admin

