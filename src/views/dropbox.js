import { Dropbox } from 'dropbox';
import { parse } from 'query-string';

const CLIENT_ID = 'z369gnu8abo2p2i';

let dbx = new Dropbox({ clientId: CLIENT_ID });
let accessToken = null;

module.exports = {
    getClient: () => dbx,
    isAuthenticated: () => !!accessToken,

    tryToAuthenticate: () => {
        console.log(location.hash);
        const token = parse(location.hash).access_token;
        if (token) {
            console.log('Authenticated!', token);
            accessToken = token;
            dbx = new Dropbox({ accessToken });
        }
    },
};
