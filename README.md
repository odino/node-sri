# node-sri

[![Build Status](https://travis-ci.org/odino/node-sri.svg)](https://travis-ci.org/odino/node-sri)

A simple module to generate SRI hashes out of files and
implement [sub-resource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).

## Installation

Simply do an `npm install --save node-sri` and include it
in your code:

``` javascript
const sri = require('node-sri');
```

Be aware that you will need to have [openssl installed](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#Tools_for_generating_SRI_hashes)
on the system.

## Usage

Using the module is pretty straightforward, as you can use it
both with callbacks:

``` javascript
const sri = require('node-sri');

sri.hash('/path/to/my/file.js', (err, hash) => {
  if (err) throw err;

  console.log('My hash is', hash);
});
```

and, if you fancy, with promises:

``` javascript
const sri = require('node-sri');

sri.hash('/path/to/my/file.js');
  .then((hash) => {
    console.log('My hash is', hash);
  })
  .catch((err) => {
    console.log('ouch!', err);
  });
```

By default, it will use `sha256` to generate hashes
but you can configure it to use whatever algorithm,
using options rather than a filename as first argument
of the hash function:

``` javascript
sri.hash({file: '/path/to/my/file.js', algo: 'sha512'}); // sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==
```

Hashes will be prepended with the algorithm (ie. `sha256-...`) but
you can also use the `prefix` option to remove the prefix:

``` javascript
sri.hash({file: '/path/to/my/file.js', algo: 'sha512', prefix: false}); // z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==
```

## Examples

See [example.js](https://github.com/odino/node-sri/blob/master/example.js)
or try running it with `node example.js`:

```
~/projects/node-sri (master ✘)✹ ᐅ node example.js
Generating SRI hash for the package.json...
Generating SRI hash for the README.md...
Generating SRI hash for a file that doesn't exist...
Generating SRI hash for the package.json with SHA512...
Generating SRI hash for the package.json with SHA512 without the prefix...
We got this error when generating an SRI hash for a file that doesnt exist: { Error: ENOENT: no such file or directory, open '/YOLO!' errno: -2, code: 'ENOENT', syscall: 'open', path: '/YOLO!' }
package.json's hash is sha256-dPHYQKpcwKgYwpMDIp52UOs6HKts198bnbgax31KMLM=
README.md's hash is sha256-c/QjnsPdnu+IFXFUA/BJVTGmCdsu5ZcccjrcLNeAEcI=
package.json's SHA512 hash is sha512-VfiX60lnMl59PNrSI2eJP5ccYHjYYhKf9Ri7ZCP7UQik5M0C9UCsC7o3zdBl2TFiWCklUwBYqZl0PQC8UGiMMg==
package.json's SHA512 hash without the prefix is VfiX60lnMl59PNrSI2eJP5ccYHjYYhKf9Ri7ZCP7UQik5M0C9UCsC7o3zdBl2TFiWCklUwBYqZl0PQC8UGiMMg==
```

## Tests

After cloning and doing an `npm install` you can
simply run `npm test` and...   ...welcome to greenland!

```
~/projects/node-sri (master ✔) ᐅ npm test

> node-sri@1.0.0 test /home/odino/projects/node-sri
> ./node_modules/mocha/bin/mocha

  SRI
    #hash()
      Promise API
        ✓ should return a promise when called without callback
        ✓ should return an hash when generating an sri for an existing file
        ✓ should accept an option to not return the algo in the hash
        ✓ should accept an option to use different algorithms
        ✓ should return an error when generating an sri for a non existing file
      Callback API
        ✓ should use a callback when passed
        ✓ should return an hash when generating an sri for an existing file with a callback
        ✓ should return an error when generating an sri for a non existing file with a callback


  8 passing (13ms)
```

## Useful resources

* [SRI specification](http://www.w3.org/TR/SRI/)
* [Github implements sub-resource integrity](http://githubengineering.com/subresource-integrity/)
* [online SRI hash generator](https://srihash.org/)
