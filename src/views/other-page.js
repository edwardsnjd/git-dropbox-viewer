module.exports = function(/*vnode*/) {
   
    return {
        view: function(/*vnode*/) {
            return m('div', [
                m('h2', 'Other pages'),
            ]);
        },
    };
};