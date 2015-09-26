var exec = require('child_process').exec;

/**
 * Creates a SRI hash of the given file
 *
 * @param  {Mixed}   file Accepts either a filename or a dictionary of options
 * @param  {Function} cb   optional
 * @return {Mixed}    Returns a promise if no callback was provided
 */
function hash(file, cb) {
  var options = {
    algo: 'sha256',
    prefix: true
  }

  if (typeof file === 'object') {
    for (var prop in file) { options[prop] = file[prop]; }
  } else {
    options.file = file
  }

  var p = new Promise(function(resolve, reject){
    exec(`cat ${options.file} | openssl dgst -${options.algo} -binary | openssl enc -base64 -A`, function (error, stdout, stderr) {
        if (error || stderr !== '') {
          reject(error || stderr)
        } else {
          resolve(options.prefix ? `${options.algo}-${stdout}` : stdout)
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
