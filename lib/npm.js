const objStr = require('stringify-object');
const { createObjectTree } = require('./utils');

module.exports = function (pkg) {
  const { scripts } = pkg;
  const output = {};

  Object.keys(scripts).forEach((key) => {
    const keys = key.split(':');
    const script = `async () => await run("${scripts[key].replace(
      /[\""]/g,
      '\\"'
    )}")`;
    if (keys.length > 1) {
      const firstKey = keys[0];
      let obj = {};

      if (typeof output[firstKey] === 'function') {
        obj = {
          default: output[firstKey],
        };
      } else if (typeof output[firstKey] === 'object') {
        obj = output[firstKey];
      }

      output[firstKey] = Object.assign(
        obj,
        createObjTree(keys.slice(1), script)
      );
    } else {
      output[key] = script;
    }
  });

  let str = objStr(output);

  str = str.replace(/\:\s*\'/gi, ': ');
  str = str.replace(/\'\,/gi, ',');
  str = str.replace(/\'\n/gi, ',\n');

  return `const { run } = require('@pinefile/pine');

module.exports = ${str}`;
};
