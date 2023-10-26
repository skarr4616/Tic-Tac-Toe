import React, { Component } from "react";
import Verdict from "./Verdict";
import "./Grid.css";
import Box from "./Box";

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: this.props.gameId,
            turn: this.props.turn,
            gameState: Array(9).fill(null),
            toMove: this.props.turn === 1 ? true : false,
            verdict: null,
        };
    }

    componentDidMount() {
        this.props.socket.on("make move", (gameData) => {
            this.setState({
                gameState: gameData.gameState,
                toMove: true,
            });
        });

        this.props.socket.on("end game", (gameData) => {
            console.log(`Game ended in a ${gameData.verdict}`);
            this.setState({
                gameState: gameData.gameState,
                verdict: gameData.verdict,
            });
        });
    }

    handleBoxClick = (boxIdx) => {
        if (this.state.toMove === false) return;

        let moved = false;
        const newGameState = this.state.gameState.map((value, idx) => {
            if (idx === boxIdx && value === null) {
                moved = true;
                return this.state.turn;
            } else {
                return value;
            }
        });

        if (moved === false) return;

        this.setState(
            {
                gameState: newGameState,
                toMove: false,
            },
            () => {
                this.props.socket.emit("move", {
                    gameId: this.state.gameId,
                    boxIdx: boxIdx,
                });
            }
        );
    };

    render() {
        const grid = this.state.gameState;
        const verdict = this.state.verdict;

        return (
            <>
                <div className="board">
                    {grid.map((value, idx) => {
                        return (
                            <Box
                                key={idx}
                                idx={idx}
                                value={value}
                                handleBoxClick={this.handleBoxClick}
                            />
                        );
                    })}
                </div>
                <Verdict
                    verdict={verdict}
                    handleReturnToDashboard={this.props.handleReturnToDashboard}
                />
            </>
        );
    }
}

export default Grid;
