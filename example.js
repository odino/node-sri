var sri = require('./index')

console.log('Generating SRI hash for the package.json...')

sri.hash('package.json', function(err, hash){
  console.log('package.json\'s hash is', hash)
})

console.log('Generating SRI hash for the README.md...')

sri.hash('README.md').then(function(hash){
  console.log('README.md\'s hash is', hash)
})

console.log('Generating SRI hash for a file that doesn\'t exist...')

sri.hash('/YOLO!').catch(function(err){
  console.log('We got this error when generating an SRI hash for a file that doesnt exist:', err)
})
