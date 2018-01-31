import promisedDfs from '../lib/promised-dropbox-fs';
import { updateAfter } from '../lib/utils';

module.exports = (vnode) => ({

    oninit: function() {
        vnode.state.entries = null;
        updateAfter(
            getDirEntries(''),
            p => p.then(entries => vnode.state.entries = entries)
        );

        vnode.state.file = null;
        updateAfter(
            getFileContents('/.docpad.cson'),
            p => p.then(file => vnode.state.file = file)
        );
    },

    view: function() {
        const renderEntry = (item) => m('li', [
            item.isDirectory() ? '+ ' : '',
            item.name,
        ]);

        return m('div', [
            m('h2', 'Dropbox files!'),

            vnode.state.file == null ?
                m('p', 'Loading file...') :
                m('pre', vnode.state.file),

            vnode.state.entries == null ?
                m('p', 'Loading dir...') :
                m('ul', vnode.state.entries.map(renderEntry)),
        ]);
    },
    
});

const getDirEntries = (dirPath) => {
    const dfs = promisedDfs();
    return dfs.readdir(dirPath)
        .then(names => names.map(n => `${dirPath}/${n}`))
        .then(paths => paths.map(p => dfs.stat(p)))
        .then(promises => Promise.all(promises));
};

const getFileContents = (filePath) => {
    const dfs = promisedDfs();
    return dfs.readFile(filePath, {encoding: 'utf-8'});
};
