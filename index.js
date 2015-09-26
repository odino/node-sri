var exec = require('child_process').exec;

/**
 * Creates a SRI hash of the given file
 *
 * @param  {String}   file
 * @param  {Function} cb   optional
 * @return {Mixed}    Returns a promise if no callback was provided
 */
function hash(file, cb) {
  var p = new Promise(function(resolve, reject){
    exec('cat ' + file + ' | openssl dgst -sha384 -binary | openssl enc -base64 -A', function (error, stdout, stderr) {
        if (error || stderr !== '') {
          reject(error || stderr)
        } else {
          resolve(stdout)
        }
    });
  })

  if (typeof cb === 'function') {
    p.then(function(hash){
      cb(null, hash)
    }).catch(function(err){
      cb(new Error(err), undefined)
    })
  } else {
    return p
  }
}

/**
 * Public API
 *
 * @type {Object}
 */
module.exports = {
  hash: hash
}
