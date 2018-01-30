import { getClient, isAuthenticated } from './dropbox';

module.exports = function() {
   
    return {
        oninit: function(vnode) {
            if (!isAuthenticated()) {
                console.log('Not authenticated, so redirecting to login');
                m.route.set('/login');
                return;
            }

            vnode.state.entries = null;

            const dbx = getClient();
            dbx.filesListFolder({path: ''})
                .then(response => {
                    vnode.state.entries = response.entries;
                    m.redraw();
                })
                .catch(console.error);
        },
        view: function(vnode) {
            console.log('rendering', vnode.state.entries);
            return m('div', [
                m('h2', 'Dropbox files!'),
                vnode.state.entries == null ?
                    m('p', 'Loading...') :
                    m('ul', vnode.state.entries.map(item => m('li', item.name))),
            ]);
        },
    };
};