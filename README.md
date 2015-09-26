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

## Examples

See [example.js](https://github.com/odino/node-sri/blob/master/example.js)
or try running it with `node example.js`.

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
