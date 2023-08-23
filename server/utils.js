const getRandomID = () => {
    return Math.floor(Math.random() * 100) % 2;
};

module.exports = { getRandomID };
