import { tryToAuthenticate } from './lib/dropbox';
import routes from './routes';

// Dropbox SDK needs these for `fetch` and `promise`
require('es6-promise').polyfill();
require('isomorphic-fetch');

if (module.hot) {
    module.hot.accept();
}

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

// Ask Dropbox to authenticate (from URL token) before we start routing
tryToAuthenticate();

// Start Mithril routing
m.route(document.getElementById('root'), routes.defaultRoute, routes.config);