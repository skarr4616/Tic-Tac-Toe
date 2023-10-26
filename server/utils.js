const checkGameState = (gameState) => {
    for (let i = 0; i < 3; i++) {
        if (
            gameState[i] === gameState[3 + i] &&
            gameState[3 + i] === gameState[6 + i] &&
            gameState[i] != null
        ) {
            return true;
        }

        if (
            gameState[3 * i] === gameState[3 * i + 1] &&
            gameState[3 * i + 1] === gameState[3 * i + 2] &&
            gameState[3 * i] != null
        ) {
            return true;
        }
    }

    if (
        gameState[0] == gameState[4] &&
        gameState[4] == gameState[8] &&
        gameState[0] != null
    ) {
        return true;
    }

    if (
        gameState[2] == gameState[4] &&
        gameState[4] == gameState[6] &&
        gameState[2] != null
    ) {
        return true;
    }

    return false;
};

export default checkGameState;
