# Challenge Legendaryum 🚀

## Tecnologías utilizadas 👨🏻‍💻
- [Typescript]
- [NodeJs]
- [Express.js]
- [Socket.io]
- [Redis]

## Funcionalidad del challenge 
Primero instalar dependencias utilizando ```npm install``` 

Luego inicializar el server con el comando ```npm start```. El servidor creara las monedas, las habitaciones y sus tamaños. Luego de manera aleatoria se ubicaran las monedas.

## Endpoints de la API 
|GET|localhost:8080/rooms|Ver todas las habitaciones disponibles|
|GET|localhost:8080/coins/room/:room|Pasandole el nombre de la room, devuelve las monedas disponibles en ese room especifico.|
