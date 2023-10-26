import "./App.css";
import Game from "./components/Game";
import { io } from "socket.io-client";

const socket = io();

function App() {
    return (
        <div className="App">
            <Game socket={socket} />
        </div>
    );
}

export default App;
