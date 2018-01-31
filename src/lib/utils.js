const identity = r => r;

const updateAfter = (promise, handler=identity) =>
    handler(promise)
        .then(m.redraw)
        .catch(console.error);

module.exports = {
    identity,
    updateAfter,
};
