const fs = require('fs');
const path = require('path');
const { stringifyObject } = require('./utils');

const TASKS_DIR = 'tasks';

const createFile = function (file, obj) {
  const str = `const { run } = require('@pinefile/pine');

module.exports = ${stringifyObject(obj)}`;

  fs.writeFileSync(file, str);
};

const createPinefile = function (obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      const dir = path.join(process.cwd(), TASKS_DIR);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      createFile(path.join(dir, `${key}.js`), obj[key]);

      obj[key] = `require("./tasks/${key}.js")`;
    }
  });

  createFile(path.join(process.cwd(), 'pinefile.js'), obj);
};

module.exports = {
  createPinefile,
};
