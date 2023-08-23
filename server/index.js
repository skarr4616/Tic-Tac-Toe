const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const uuidv4 = require("uuid").v4;

const { Queue } = require("./queue.js");

const app = express();
app.use(cors());

const server = http.createServer(app);
let waitingList = new Queue();
let games = {};

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        console.log(data);
        socket.broadcast.emit("receive_message", data);
    });

    socket.on("play_game", (data) => {
        console.log(`I am here ${socket.id}`);

        if (waitingList.size() == 0) {
            waitingList.push(socket.id);
        } else {
            const player1 = waitingList.pop();
            const player2 = socket.id;

            const gameId = uuidv4();
            games[gameId] = {
                player0: player1,
                player1: player2,
                gameId: gameId,
                gameState: Array(9).fill(null),
            };

            socket.to(player1).emit("got_player", {
                gameId: gameId,
                turn: 1,
            });

            socket.emit("got_player", {
                gameId: gameId,
                turn: 0,
            });
        }
    });

    socket.on("game_move", (data) => {
        const gameId = data.gameId;
        const idx = data.idx;

        const player0 = games[gameId].player0;
        const player1 = games[gameId].player1;
        const opponent = socket.id === player0 ? player1 : player0;

        games[gameId].gameState[idx] = socket.id === player0 ? 0 : 1;

        socket.to(opponent).emit("make_move", { idx: data.idx });
    });
});

server.listen(8080, () => {
    console.log("SERVER IS RUNNING");
});
