var sri = require('./index');

console.log('Generating SRI hash for the package.json...');

sri.hash('package.json', (err, hash) => {
  console.log('package.json\'s hash is', hash);
});

console.log('Generating SRI hash for the README.md...');

sri.hash('README.md').then((hash) => {
  console.log('README.md\'s hash is', hash);
});

console.log('Generating SRI hash for a file that doesn\'t exist...');

sri.hash('/YOLO!').catch((err) => {
  console.log('We got this error when generating an SRI hash for a file that doesnt exist:', err);
});

console.log('Generating SRI hash for the package.json with SHA512...');

sri.hash({file: 'package.json', algo: 'sha512'}, (err, hash) => {
  console.log('package.json\'s SHA512 hash is', hash);
});

console.log('Generating SRI hash for the package.json with SHA512 without the prefix...');

sri.hash({file: 'package.json', algo: 'sha512', prefix: false}, (err, hash) => {
  console.log('package.json\'s SHA512 hash without the prefix is', hash);
});
