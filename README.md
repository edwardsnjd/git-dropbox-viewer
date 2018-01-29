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

