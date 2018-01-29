README
======

A browser based ([unhosted][unhosted]) app that allows you to browse (readonly) a bare Git repository stored in your Dropbox.

Hopefully quite light weight by leveraging other libraries for all the heavy lifting:

1. VueJS UI layer (home grown)
2. Git layer (https://github.com/creationix/js-git)
3. FS layer (https://github.com/jvilk/BrowserFS)
4. Dropbox API (http://dropbox.github.io/dropbox-sdk-js/)

Git internals
-------------

Starting from say a branch ref we can ask Git to tell us about that ref, then drill down into the dir and files:

`git cat-file -p <REF>` will pretty print the 3 types of objects:

- `commit` (a commit, has one `tree` entry for the root directory)
- `tree` (a directory, has one or more `blob` or `tree` entries)
- `blob` (a file)

https://git-scm.com/book/en/v2/Git-Internals-Packfiles

Development
-----------

A boilerplate Mithril application using ES6, Babel, Webpack 3, Sass/SCSS, Webpack dev server hot reload and eslint

Deployed using Surge.

### How to use
```shell
npm install

npm start
  # Webpack dev server will run and opens the app on the browser with HRM,
npm run build
  # Compiles the app for production and all compiled files lies on dist dir.
  # To deploy an the application simply transfer the dist to a web server's public directory.

npm run deploy
  # Use Surge to deploy
```

### Directory Structure:
```shell
├── dist/                         # Compiled files
│     ├── css/
│     │    ├──main.css
│     │    └──vendor.css
│     ├── fonts/
│     ├── images/
│     ├── main-bundle.js
│     ├── vendor-bundle.js
│     └── index.html
│
├── node_modules/                 # 3rd-party libraries
│
├── src/                          # Application source files 
│     │
│     ├── views/                  # All your application view logic files
│     │     ├── components/
│     │     ├── your-pages.js
│     │     └── ...
│     │
│     ├── index.html            
│     └── index.js                # Application entry point
│   
├── eslintrc.js                   # To configuring ESLint
├── package.json                  # NPM scripts list
├── webpack.*.js                  # Webpack configuration files
└-- CNAME                         # Surge CNAME config
```
