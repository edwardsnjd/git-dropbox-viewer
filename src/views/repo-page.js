import jsGitFsDb from 'js-git/mixins/fs-db';
import jsGitFormats from 'js-git/mixins/formats';
import jsGitModes from 'js-git/lib/modes.js';
import { toUnicode } from 'bodec';

import dropboxFs from '../lib/promised-dropbox-fs';
import { updateAfter } from '../lib/utils';

module.exports = (vnode) => ({

    oninit: function() {
        // const rootPath = '/code/projects/git-dropbox-viewer/.git';
        // const commitHash = '441a87f8fe0cd6fdc21c6a6ee841b63f2073878a';
        // const treeHash = '69bb5141255ff58700df49eb9b63bcdb528b63db';
        // const blobHash = 'fa9d2ae07f1a9c0274db3c61ed3f44869d825055';

        const rootPath = '/code/projects/100BlocksADayFace/.git';
        const commitHash = '4e592cf4acae19ede94285f0087e47f729c96d2c';
        const treeHash = '512519a7e863b6d602690da7e760166de304757d';
        const blobHash = '5e72cbcad97508020984598ee05daa6576b4842f';

        const repo = {};
        repo.rootPath = rootPath;
        jsGitFsDb(repo, dropboxFs());
        jsGitFormats(repo);

        vnode.state.rootPath = repo.rootPath;

        vnode.state.commit = null;
        vnode.state.commitHash = commitHash;
        updateAfter(
            getCommit(repo, commitHash),
            p => p.then(commit => vnode.state.commit = commit)
        );

        vnode.state.tree = null;
        vnode.state.treeHash = treeHash;
        updateAfter(
            getTree(repo, treeHash),
            p => p.then(tree => vnode.state.tree = tree)
        );

        vnode.state.blob = null;
        vnode.state.blobHash = blobHash;
        updateAfter(
            getBlob(repo, blobHash),
            p => p.then(blob => vnode.state.blob = blob)
        );
    },

    view: function() {
        const isImage = true;
        return m('div', [
            m('h2', 'Repo!'),

            m('p', vnode.state.rootPath),

            m('hr'),

            m('p', `Commit ${vnode.state.commitHash}`),
            vnode.state.commit == null ?
                m('p', 'Loading...') :
                m('pre', JSON.stringify(vnode.state.commit, null, 2)),

            m('hr'),

            m('p', `Tree ${vnode.state.treeHash}`),
            vnode.state.tree == null ?
                m('p', 'Loading...') :
                m('pre', JSON.stringify(vnode.state.tree, null, 2)),

            m('hr'),

            m('p', `Blob ${vnode.state.blobHash}`),
            vnode.state.blob == null ?
                m('p', 'Loading...') :
                isImage ? 
                    m('img', {src: getImageUrl('image/png', vnode.state.blob)}) :
                    m('pre', toUnicode(vnode.state.blob)),
        ]);
    },
    
});

const getCommit = (repo, hash) =>
    loadAs(repo, 'commit', hash);

const getTree = (repo, hash) =>
    loadAs(repo, 'tree', hash)
        .then(tree =>
            Object.keys(tree)
                .reduce((result, key) => {
                    const value = tree[key];
                    const type = jsGitModes.toType(value.mode);
                    result[key] = { ...value, type };
                    return result;
                }, {})
        );

const getBlob = (repo, hash) =>
    loadAs(repo, 'blob', hash);

const loadAs = (repo, type, hash) => {
    return new Promise((res, rej) =>
        repo.loadAs(type, hash, (err, val) =>
            err ? rej(err) : res(val)
        )
    );
};

const getImageUrl = (type, data) => {
    const blob = new Blob([data], { type });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
};