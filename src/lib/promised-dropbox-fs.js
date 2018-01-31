import dfs from 'dropbox-fs';
import promisify from 'es6-promisify';

import { getClient } from './dropbox';

export default () => {
    const fs = dfs({ client: getClient() });
    const promisifyMethod = (name) => promisify(fs[name].bind(fs));
    return {
        readdir:  promisifyMethod('readdir'),
        stat:     promisifyMethod('stat'),
        readFile: promisifyMethod('readFile'),
    };
};
