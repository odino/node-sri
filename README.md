# node-sri

[![Build Status](https://travis-ci.org/odino/node-sri.svg)](https://travis-ci.org/odino/node-sri)

A simple module to generate SRI hashes out of files and
implement [sub-resource integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity).

## Installation

Simply do an `npm install --save node-sri` and include it
in your code:

``` javascript
var sri = require('node-sri')
```

Be aware that you will need to have [openssl installed](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#Tools_for_generating_SRI_hashes)
on the system.

## Usage

Using the module is pretty straightforward, as you can use it
both with callbacks:

``` javascript
var sri = require('node-sri')

sri.hash('/path/to/my/file.js', function(err, hash){
  if (err) throw err

  console.log('My hash is', hash)
})
```

and, if you fancy, with promises:

``` javascript
var sri = require('node-sri')

sri.hash('/path/to/my/file.js').then(function(hash){
  console.log('My hash is', hash)
}).catch(function(err){
  console.log('ouch!', err)
})
```

By default, it will use `sha256` to generate hashes
but you can configure it to use whatever algorithm,
using options rather than a filename as first argument
of the hash function:

``` javascript
sri.hash({file: '/path/to/my/file.js', algo: 'sha512'}) // sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==
```

Hashes will be prepended with the algorithm (ie. `sha256-...`) but
you can also use the `prefix` option to remove the prefix:

``` javascript
sri.hash({file: '/path/to/my/file.js', algo: 'sha512', prefix: false}) // z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==
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
README.md's hash is sha256-IQW2dfoEDMp/r7nf9Au0lTkTIWYXLLrObNwVO3LUWzc=
package.json's hash is sha256-NsbsCsoAeBPs3qxHKaM6GMX7MfBTuoF+lbI8WWXN+Ys=
package.json's SHA512 hash without the prefix is 5aK2wlSasZymZfq7y2ffJtjFnmkiEZELIWSn0iusYBxJ32pflmCOV3xRfoSBQP/kLQGh/Paqp0Ia7N0EkuhMAA==
package.json's SHA512 hash is sha512-5aK2wlSasZymZfq7y2ffJtjFnmkiEZELIWSn0iusYBxJ32pflmCOV3xRfoSBQP/kLQGh/Paqp0Ia7N0EkuhMAA==
We got this error when generating an SRI hash for a file that doesnt exist: cat: /YOLO!: No such file or directory
```

## Tests

After cloning and doing an `npm install` you can
simply run `npm test` and...   ...welcome to greenland!

```
~/projects/node-sri (master ✔) ᐅ npm test

> node-sri@1.0.0 test /home/odino/projects/node-sri
> ./node_modules/mocha/bin/mocha



  sri
    #hash()
      ✓ should return a promise when called without callback
      ✓ should return an hash when generating an sri for an existing file
      ✓ should return an error when generating an sri for a non existing file
      ✓ should use a callback when passed
      ✓ should return an hash when generating an sri for an existing file with a callback
      ✓ should return an error when generating an sri for a non existing file with a callback


  6 passing (56ms)
```

## Useful resources

* [SRI specification](http://www.w3.org/TR/SRI/)
* [Github implements sub-resource integrity](http://githubengineering.com/subresource-integrity/)
* [online SRI hash generator](https://srihash.org/)
