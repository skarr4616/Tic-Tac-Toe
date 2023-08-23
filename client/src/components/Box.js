import React, { Component } from "react";
import "./Box.css";

export class Box extends Component {
    handleClick = () => {
        this.props.handleBoxClick(this.props.idx);
    };

    render() {
        const sym = ["0", "X"];
        const value = this.props.value != null ? sym[this.props.value] : "";

        var style = "box";

        if (value === "X") {
            style = "box x";
        } else {
            style = "box o";
        }

        return (
            <div>
                <button className={style} onClick={this.handleClick}>
                    {value}
                </button>
            </div>
        );
    }
}

export default Box;
