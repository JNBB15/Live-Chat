const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("Un usuario se ha conectado al chat");

    socket.on('Chat Message', (msg) => {
        io.emit('Chat Message', msg);
    })

    socket.on('disconnect', () => {
        console.log("El usuario se ha desconectado");//Esto sirve para avisar en la terminal que el usuario se ha desconectado cuando se cierra la ventana en el navegador.
    })
});

server.listen(8080, () => {
    console.log("Estoy desde el puerto 8080");
});

//Peque codigo que sirve para poder hacer un chat simple en tiempo real con JS y html en el navegador