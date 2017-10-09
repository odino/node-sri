const assert = require('assert');
const sinon = require('sinon');
const sri  = require('./index');

describe('SRI', () => {
  describe('#hash()', () => {
    describe('Promise API', () => {
      it('should return a promise when called without callback', () => {
        assert(typeof sri.hash('fixtures/sample.js').then === 'function');
      });

      it('should return an hash when generating an sri for an existing file', () => {
        return sri.hash('fixtures/sample.js')
          .then((hash) => {
            assert.strictEqual('sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', hash);
          });
      });

      it('should accept an option to not return the algo in the hash', () => {
        const options = {
          file: 'fixtures/sample.js',
          prefix: false
        };

        return sri.hash(options)
          .then((hash) => {
            assert.strictEqual('47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', hash);
          });
      });

      it('should accept an option to use different algorithms', () => {
        const options = {
          file: 'fixtures/sample.js',
          algo: 'sha512'
        };

        return sri.hash(options)
          .then((hash) => {
            assert.strictEqual('sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==', hash);
          });
      });

      it('should return an error when generating an sri for a non existing file', () => {
        return sri.hash('fixtures/nooooooo.js')
          .catch((error) => {
            assert.strictEqual(error.errno,  -2);
            assert.strictEqual(error.code,  'ENOENT');
            assert.strictEqual(error.syscall,  'open');
          });
      });
    });

    describe('Callback API', () => {
      it('should use a callback when passed', () => {
        assert(sri.hash('/hello', function(){}) === undefined);
      });

      it('should return an hash when generating an sri for an existing file with a callback', (done) => {
        sri.hash('fixtures/sample.js', (error, hash) => {
          assert.strictEqual('sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', hash);
          assert.strictEqual(null, error);
          done()
        });
      });

      it('should return an error when generating an sri for a non existing file with a callback', (done) => {
        sri.hash('fixtures/nooooooo.js', (error, hash) => {
          assert(error instanceof Error);
          assert.strictEqual('Error: ENOENT: no such file or directory, open \'fixtures/nooooooo.js\'', error.message);
          assert.strictEqual(undefined, hash);
          done();
        });
      });
    });
  });
});
