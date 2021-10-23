const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const { stringifyObject } = require('./utils');

const createFile = function (file, obj) {
  let str = `const { run } = require("@pinefile/pine");

${Object.keys(obj)
  .map((key) => `exports.${key} = ${obj[key]}`)
  .join('\n\n')}
`;

  str = prettier.format(str, { semi: false, parser: 'babel' });

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
  console.log(`${file} has been created`);
};

module.exports = {
  createPinefile,
};
