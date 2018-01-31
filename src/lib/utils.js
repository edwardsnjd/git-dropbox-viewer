const identity = r => r;

const updateAfter = (value, handler=identity) =>
    handler(Promise.resolve(value))
        .then(m.redraw)
        .catch(console.error);

module.exports = {
    identity,
    updateAfter,
};
