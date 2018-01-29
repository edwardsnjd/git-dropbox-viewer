if (module.hot) {
    module.hot.accept();
}

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

// require('./app.scss');

//Define your routes here
const Splash = require('./views/splash-page');
const IndexPage = require('./views/landing-page');
const OtherPage = require('./views/other-page');

m.route(document.body.querySelector('#root'), '/splash', {
    '/splash': Splash,
    '/index': IndexPage,
    '/other': OtherPage,
});