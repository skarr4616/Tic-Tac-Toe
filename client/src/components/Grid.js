import React, { Component } from "react";
import "./Grid.css";
import Box from "./Box";

class Grid extends Component {
    render() {
        const grid = this.props.grid;

        return (
            <div className="board">
                {grid.map((value, idx) => {
                    return (
                        <Box
                            key={idx}
                            idx={idx}
                            value={value}
                            handleBoxClick={this.props.handleBoxClick}
                        />
                    );
                })}
            </div>
        );
    }
}

export default Grid;
