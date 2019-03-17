const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const next = require("next");

const app = express();
const server = http.Server(app);
const io = socketio(server);

const dev = process.env.NODE_ENV !== "prodcution";
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();

let port = 3000;

nextApp.prepare().then(() => {
    app.get("*", (req, res) => {
        console.log(`URL requested: ${req.url}`);
        return nextHandler(req, res);
    })

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Server listening on port ${port}`);
    })
})

io.on("connect", socket => {
    console.log("Received connection: " + socket.id);

    socket.on('trivia_question', data => {
        console.log('got trivia question ' + JSON.stringify(data));
        socket.broadcast.emit('trivia_question', data);
    })

    socket.on('answer', data => {
        console.log('got answer ' + JSON.stringify(data));
        socket.broadcast.emit('answer', data);
    })

    socket.emit('now', {
        message: 'zeit'
    })
});

