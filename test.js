var assert = require("assert")
var sri  = require('./index')

describe('sri', function() {
  describe('#hash()', function () {
    it('should return a promise when called without callback', function () {
      assert(typeof sri.hash('/hello').then === 'function');
    });

    it('should return an hash when generating an sri for an existing file', function (done) {
      sri.hash('fixtures/sample.js').then(function(hash){
        assert.strictEqual('OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb', hash)
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
        assert.strictEqual('OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb', hash)
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
