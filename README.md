README
======

A browser based ([unhosted][unhosted]) app that allows you to browse (readonly) a bare Git repository stored in your Dropbox.

Hopefully quite light weight by leveraging other libraries for all the heavy lifting:

1. [ ] Mithril UI layer (home grown)
2. [ ] Git layer (https://github.com/creationix/js-git)
    - A thin custom adapter changes the FS layer to the expected interface (and prevents accidental writes!)
3. [x] FS layer (https://github.com/sallar/dropbox-fs)
    - Passed an authenticated Dropbox client, it offers a filesystem facade
4. [x] Dropbox API (http://dropbox.github.io/dropbox-sdk-js/)
    - Loaded via `script` tag from `unpkg` rather than via `npm` to avoid problems sniffing browser environment

Design
------

[Mithril](https://mithril.js.org/) SPA, over a library leaning on third parties for the heavy lifting of getting and processing Git internals.

Dev tooling:

- ES6
- Babel
- Webpack 3
- Sass/SCSS
- Webpack dev server
- Hot module reloading
- ESLint

Deployment and hosting:

- [Surge][surge]

Development
-----------

```shell
npm start
  # Webpack dev server with reloading

npm run build
  # Build for production to `dist`

npm run deploy
  # Use Surge to deploy
```

Source
------

```shell
├── dist/                         # Compiled files
├── node_modules/                 # 3rd-party libraries
├── src/                          # Application source files 
│   
├-- CNAME                         # Surge CNAME config
├── eslintrc.js                   # ESLint config
├── package.json                  # NPM config
└── webpack.*.js                  # Webpack config
```

[unhosted]: https://unhosted.org/
[surge]: https://surge.sh