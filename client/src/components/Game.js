import React, { Component } from "react";
import Grid from "./Grid";

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameOn: false,
            gameId: null,
            turn: null,
            gameState: null,
            toMove: false,
        };
    }

    componentDidMount() {
        this.props.socket.on("got_player", (data) => {
            const toMove = data.turn === 1 ? true : false;

            this.setState({
                gameOn: true,
                gameId: data.gameId,
                turn: data.turn,
                gameState: Array(9).fill(null),
                toMove: toMove,
            });
        });

        this.props.socket.on("make_move", (data) => {
            const opponentIdx = data.idx;
            const newGameState = this.state.gameState.map((value, idx) => {
                if (idx === opponentIdx) {
                    return 1 - this.state.turn;
                } else {
                    return value;
                }
            });

            this.setState({
                gameState: newGameState,
                toMove: true,
            });
        });
    }

    handleJoinGame = (e) => {
        this.props.socket.emit("play_game", { message: "Play Game" });
    };

    handleBoxClick = (boxId) => {
        if (this.state.toMove) {
            let moved = false;
            const newGameState = this.state.gameState.map((value, idx) => {
                if (idx === boxId && value === null) {
                    moved = true;
                    return this.state.turn;
                } else {
                    return value;
                }
            });

            if (moved === true) {
                this.setState(
                    {
                        gameState: newGameState,
                        toMove: false,
                    },
                    () => {
                        this.props.socket.emit("game_move", {
                            gameId: this.state.gameId,
                            idx: boxId,
                        });
                    }
                );
            }
        }
    };

    render() {
        if (this.state.gameOn === false) {
            return (
                <div>
                    <h1>
                        <button onClick={this.handleJoinGame}>
                            <h2>Join Game</h2>
                        </button>
                    </h1>
                </div>
            );
        } else {
            return (
                <div>
                    <Grid
                        grid={this.state.gameState}
                        handleBoxClick={this.handleBoxClick}
                    />
                </div>
            );
        }
    }
}

export default Game;
