import dfs from 'dropbox-fs';
import promisify from 'es6-promisify';

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
            vnode.state.file = null;

            const fs = dfs({ client: getClient() });
            const readdir = promisify(fs.readdir.bind(fs));
            const stat = promisify(fs.stat.bind(fs));
            const readFile = promisify(fs.readFile.bind(fs));

            const rootPath = '';
            readdir(rootPath)
                .then(names => names.map(n => `${rootPath}/${n}`))
                .then(paths => paths.map(p => stat(p)))
                .then(promises => Promise.all(promises))
                .then(entries => {
                    vnode.state.entries = entries;
                    m.redraw();
                })
                .catch(console.error);

            const filePath = '/.docpad.cson';
            readFile(filePath, {encoding: 'utf-8'})
                .then(buffer => {console.log(buffer); return buffer;})
                .then(file => {
                    vnode.state.file = file;
                    m.redraw();
                })
                .catch(console.error);
        },
        view: function(vnode) {
            console.log('rendering', vnode.state.entries);
            return m('div', [
                m('h2', 'Dropbox files!'),
                vnode.state.file == null ?
                    m('p', 'Loading file...') :
                    m('pre', vnode.state.file),
                vnode.state.entries == null ?
                    m('p', 'Loading dir...') :
                    m('ul', vnode.state.entries.map(item => m('li', [item.isDirectory() ? '+ ' : '', item.name]))),
            ]);
        },
    };
};