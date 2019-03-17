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

const takers = [];
const givers = [];

io.on("connect", socket => {
    console.log("Received connection: " + socket.id);

    socket.on('disconnect', (reason) => {
        const takerIdx = takers.indexOf(socket);
        if (takerIdx !== -1) {
            takers.splice(takerIdx, 1);
        }
        const giverIdx = givers.indexOf(socket);
        if (giverIdx !== -1) {
            givers.splice(giverIdx, 1);
        }
    });

    socket.on('role', data => {
        if (data === 'taker') {
            takers.push(socket);

            givers.forEach(giver => giver.emit('takers', takers.length));
        } else {
            if (data === 'giver') {
                givers.push(socket);
                if (givers.length > 1 ) {
                    throw "Too many cooks in the kitchen"
                }

                socket.emit('takers', takers.length);
            } else {
                throw "Unsupported role " + data;
            }
        }
    });

    socket.on('trivia_question', data => {
        console.log('got trivia question ' + JSON.stringify(data));
        socket.broadcast.emit('trivia_question', data);
        // send to takers only
    });

    socket.on('answer', data => {
        console.log('got answer ' + JSON.stringify(data));
        socket.broadcast.emit('answer', data);
        // send to givers only
    });
});

