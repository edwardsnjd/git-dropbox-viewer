import { isAuthenticated } from './lib/dropbox';

// Views
import Splash from './views/splash-page';
import LoginPage from './views/login-page';
import HomePage from './views/home-page';

// Authentication route resolver
const requireAuth = (component) => ({
    onmatch: () => {
        if (!isAuthenticated()) {
            console.log('Not authenticated, so redirecting to login');
            m.route.set('/login');
        } else {
            console.log('Authenticated, you may continue');
            return component;
        }
    },
});

module.exports = {
    defaultRoute: '/splash',
    config: {
        '/splash': Splash,
        '/login': LoginPage,
        '/home': requireAuth(HomePage),
    },
};