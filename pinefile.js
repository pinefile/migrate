const fs = require('fs');
const path = require('path');
const { run } = require('@pinefile/pine');
const npm = require(`${__dirname}/lib/npm.js`);
const { createPinefile } = require(`${__dirname}/lib/pine.js`);

const create = (opts) => {
  try {
    createPinefile(opts);
    console.log(
      'remember to install pine task runner: npm install --save-dev @pinefile/pine'
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  npm: (args) => {
    const file = args.package
      ? path.resolve(args.package)
      : path.join(process.cwd(), 'package.json');
    const tasks = npm(require(file));

    create({
      tasks,
      file: args.output,
      tasksDir: args.tasksDir,
    });
  },
};
