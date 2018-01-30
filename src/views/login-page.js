import { getClient } from './dropbox';

module.exports = function() {
   
    return {
        oninit: function(vnode) {
            const dbx = getClient();
            vnode.state.authUrl = dbx.getAuthenticationUrl('http://localhost:3000/');
        },
        view: function(vnode) {
            return m('div', [
                m('h2', 'Congratulations, you made it here.'),
                m('p', 'You\'ve spun up your very first Mithril app :-)'),
                m('p', [
                    m('a', {href: vnode.state.authUrl}, 'Connect to your Dropbox'),
                ]),
            ]);
        },
    };
};