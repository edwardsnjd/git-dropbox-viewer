import dfs from 'dropbox-fs';

import { getClient } from './dropbox';

export default () => dfs({ client: getClient() });


// The fs object has the following interface:
// - readFile(path) => binary
//   Must also call callback() with no arguments if the file does not exist.
// - readChunk(path, start, end) => binary
//   Must also call callback() with no arguments if the file does not exist.
// - writeFile(path, binary) =>
//   Must also make every directory up to parent of path.
// - readDir(path) => array<paths>
//   Must also call callback() with no arguments if the file does not exist.

// module.exports = function() {
    
// }