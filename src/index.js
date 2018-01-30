import dbx from './views/dropbox';

require('es6-promise').polyfill();
require('isomorphic-fetch');

if (module.hot) {
    module.hot.accept();
}

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

// require('./app.scss');

// Ask Dropbox to authenticate (from URL token) before we start routing
dbx.tryToAuthenticate();

//Define your routes here
const Splash = require('./views/splash-page');
const LoginPage = require('./views/login-page');
const HomePage = require('./views/home-page');

m.route(document.body.querySelector('#root'), '/splash', {
    '/splash': Splash,
    '/login': LoginPage,
    '/home': HomePage,
});