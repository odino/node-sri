const fs = require('fs');
const crypto = require('crypto');

function buildOptions(fileOrOptions) {
  const defaults = {
    algo: 'sha256',
    prefix: true
  };

  if (typeof fileOrOptions === 'object') {
    return Object.assign({}, defaults, fileOrOptions);
  }

  return Object.assign({}, defaults, { file: fileOrOptions });
}

/**
 * Creates a SRI hash of the given file
 *
 * @param  {Mixed}   file Accepts either a filename or a dictionary of options
 * @param  {Function} cb   optional
 * @return {Mixed}    Returns a promise if no callback was provided
 */
function hash(file, cb) {
  const options = buildOptions(file);

  const promised = new Promise((resolve, reject) => {
    fs.readFile(options.file, (error, data) => {
      if (error) {
        return reject(error || stderr);
      }
      const sha = crypto.createHash(options.algo).update(data).digest('base64');
      const integrity = options.prefix ? `${options.algo}-${sha}` : sha;
      return resolve(integrity);
    });
  });

  if (typeof cb === 'function') {
    promised
      .then((hash) => cb(null, hash))
      .catch((error) => cb(new Error(error)));
  } else {
    return promised;
  }
}

/**
 * Public API
 *
 * @type {Object}
 */
module.exports = {
  hash
}
