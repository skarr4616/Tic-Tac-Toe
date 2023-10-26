import React, { Component } from "react";
import Grid from "./Grid";

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inGame: false,
            gameId: null,
            turn: null,
        };
    }

    componentDidMount() {
        this.props.socket.on("start game", (gameData) => {
            this.setState({
                inGame: true,
                gameId: gameData.gameId,
                turn: gameData.turn,
            });
        });
    }

    handleJoinGame = (e) => {
        this.props.socket.emit("join game");
    };

    handleReturnToDashboard = () => {
        this.setState({
            inGame: false,
            gameId: null,
            turn: null,
        });
    };

    render() {
        if (this.state.inGame === false) {
            return (
                <h1>
                    <button onClick={this.handleJoinGame}>
                        <h2>Join Game</h2>
                    </button>
                </h1>
            );
        } else {
            return (
                <Grid
                    socket={this.props.socket}
                    gameId={this.state.gameId}
                    turn={this.state.turn}
                    handleReturnToDashboard={this.handleReturnToDashboard}
                />
            );
        }
    }
}

export default Game;
