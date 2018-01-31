import { isAuthenticated } from '../lib/dropbox';

module.exports = () => ({

    oninit() {
        if (isAuthenticated()) {
            m.route.set('/home');
        } else {
            m.route.set('/login');
        }
    },

    view() {
        return m('.holder', [
            m('.preloader', [
                m('div', 'Loading...'),
            ]),
        ]);
    },
    
});