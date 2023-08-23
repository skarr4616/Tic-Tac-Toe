import "./App.css";
import Game from "./components/Game";
import Message from "./components/Message";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

function App() {
    return (
        <div className="App">
            {/* <Message socket={socket}></Message> */}
            <Game socket={socket} />
        </div>
    );
}

export default App;
