const fs = require('fs');
const npm = require('./lib/npm.js');

const argv = process.argv.slice(2);
const tool = argv.shift();

try {
  let output;

  switch (tool) {
    case 'npm':
      output = npm(require(argv.length ? argv[0] : './package.json'));
      break;
    default:
      break;
  }

  if (output) {
    fs.writeFileSync('pinefile.js', output);
    console.log('pinefile.js has been created');
  } else {
    console.log('no tool selected');
  }
} catch (err) {
  console.log(err);
}
