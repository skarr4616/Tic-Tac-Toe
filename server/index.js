import http from "http";
import path from "path";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { v4 } from "uuid";

import Queue from "./queue.js";
import checkGameState from "./utils.js";

const app = express();
app.use(express.static("client/build"));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const server = http.createServer(app);
let waitingList = new Queue();
let games = {};
let players = {};

const io = new Server(server);

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("join game", () => {
        if (waitingList.size() === 0) {
            waitingList.push(socket.id);
        } else {
            const player1 = waitingList.pop();
            const player2 = socket.id;

            const gameId = v4();
            games[gameId] = {
                player1: player1,
                player2: player2,
                gameId: gameId,
                gameState: Array(9).fill(null),
                movesPlayed: 0,
            };

            players[player1] = {
                gameId: gameId,
                turn: 1,
                opponent: player2,
            };
            players[player2] = {
                gameId: gameId,
                turn: 2,
                opponent: player1,
            };

            socket.to(player1).emit("start game", {
                gameId: gameId,
                turn: 1,
            });
            socket.emit("start game", {
                gameId: gameId,
                turn: 2,
            });

            console.log(`Game ${gameId} is ON!`);
        }
    });

    socket.on("move", (data) => {
        const boxIdx = data.boxIdx;
        const gameId = data.gameId;
        const opponent = players[socket.id].opponent;

        games[gameId].movesPlayed = games[gameId].movesPlayed + 1;
        games[gameId].gameState[boxIdx] = players[socket.id].turn;
        if (checkGameState(games[gameId].gameState)) {
            console.log(
                `Game ${gameId} was won by player ${players[socket.id].turn}`
            );

            socket.to(opponent).emit("end game", {
                gameState: games[gameId].gameState,
                verdict: "loser",
            });
            socket.emit("end game", {
                gameState: games[gameId].gameState,
                verdict: "winner",
            });
        } else if (games[gameId].movesPlayed === 9) {
            console.log(`Game ${gameId} ended in a draw`);
            socket.to(opponent).emit("end game", {
                gameState: games[gameId].gameState,
                verdict: "draw",
            });
            socket.emit("end game", {
                gameState: games[gameId].gameState,
                verdict: "draw",
            });
        } else {
            socket
                .to(opponent)
                .emit("make move", { gameState: games[gameId].gameState });
        }
    });
});

server.listen(8080, () => {
    console.log("server running at http://localhost:8080");
});
