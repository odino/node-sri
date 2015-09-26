var assert = require("assert")
var sri  = require('./index')

describe('sri', function() {
  describe('#hash()', function () {
    it('should return a promise when called without callback', function () {
      assert(typeof sri.hash('/hello').then === 'function');
    });

    it('should return an hash when generating an sri for an existing file', function (done) {
      sri.hash('fixtures/sample.js').then(function(hash){
        assert.strictEqual('sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', hash)
        done()
      }).catch(function(err){
        console.log(err)
      })
    });

    it('should accept an option to not return the algo in the hash', function (done) {
      sri.hash({file: 'fixtures/sample.js', prefix: false}).then(function(hash){
        assert.strictEqual('47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', hash)
        done()
      }).catch(function(err){
        console.log(err)
      })
    });

    it('should accept an option to use different algorithms', function (done) {
      sri.hash({file: 'fixtures/sample.js', algo: 'sha512'}).then(function(hash){
        assert.strictEqual('sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==', hash)
        done()
      }).catch(function(err){
        console.log(err)
      })
    });

    it('should return an error when generating an sri for a non existing file', function (done) {
      sri.hash('fixtures/nooooooo.js').catch(function(err){
        assert.strictEqual("cat: fixtures/nooooooo.js: No such file or directory\n", err)
        done()
      })
    });

    it('should use a callback when passed', function () {
      assert(sri.hash('/hello', function(){}) === undefined);
    });

    it('should return an hash when generating an sri for an existing file with a callback', function (done) {
      sri.hash('fixtures/sample.js', function(err, hash){
        assert.strictEqual('sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', hash)
        assert.strictEqual(null, err)
        done()
      })
    });


    it('should return an error when generating an sri for a non existing file with a callback', function (done) {
      sri.hash('fixtures/nooooooo.js', function(err, hash){
        assert(err instanceof Error)
        assert.strictEqual("cat: fixtures/nooooooo.js: No such file or directory\n", err.message)
        assert.strictEqual(undefined, hash)
        done()
      })
    });
  });
});
