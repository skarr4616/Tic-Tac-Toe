import React from "react";

const verdict = {
    winner: "You win!",
    loser: "You lose!",
    draw: "Draw!",
};

function Verdict(props) {
    if (props.verdict !== null) {
        return (
            <div>
                <h1>{verdict[props.verdict]}</h1>
                <button onClick={props.handleReturnToDashboard}>
                    <h2>Return to Dashboard</h2>
                </button>
            </div>
        );
    }
}

export default Verdict;
