const fs = require('fs');
const path = require('path');
const { stringifyObject } = require('./utils');

const createFile = function (file, obj) {
  const str = `const { run } = require('@pinefile/pine');

module.exports = ${stringifyObject(obj)}`;

  fs.writeFileSync(file, str);
};

const createPinefile = function (opts) {
  const obj = opts.tasks;
  const tasksDir = opts.tasksDir || 'tasks';

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      const dir = path.join(process.cwd(), tasksDir);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      createFile(path.join(dir, `${key}.js`), obj[key]);

      obj[key] = `require("./${tasksDir}/${key}.js")`;
    }
  });

  const file = opts.file || 'pinefile.js';
  createFile(path.join(process.cwd(), file), obj);
};

module.exports = {
  createPinefile,
};
