module.exports = function () {
    let looper = null;
    let routeToMainInvokedCount = 0;

    return {
        routeToMain() {
            routeToMainInvokedCount++;
            if (this.dataLoaded) {
                clearTimeout(looper);
                m.route.set('/index');
            }
        },

        oninit() {
            this.dataLoaded = false;
            Promise.all([
                // Fetch all necessary data here
            ]).then(() => {
                this.dataLoaded = true;
                if (routeToMainInvokedCount) {
                    this.routeToMain();
                }
            });
        },

        oncreate() {
            // Check periodically whether data has loaded
            looper = setTimeout(() => this.routeToMain(), 1000);
        },

        view() {
            return m('.holder', [
                m('.preloader', [
                    m('div', 'Loading...'),
                ]),
            ]);
        },
    };
};