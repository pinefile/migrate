const { runTask } = require('@pinefile/pine');
const argv = process.argv.slice(2);

argv.push(`--file=${__dirname}/pinefile.js`);

runTask(argv);
