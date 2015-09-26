# node-sri

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

## Useful resources

* [SRI specification](http://www.w3.org/TR/SRI/)
* [Github implements sub-resource integrity](http://githubengineering.com/subresource-integrity/)
* [online SRI hash generator](https://srihash.org/)
