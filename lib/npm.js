const { createObjectTree } = require('./utils');

const replaceScript = (s) => {
  return s.replace(/[""]/g, '\\"').replace(/npm run/, 'npx pine');
};

module.exports = function (pkg) {
  const { scripts } = pkg;
  const output = {};

  Object.keys(scripts).forEach((key) => {
    const keys = key.split(':');
    const script = `async () => await run("${replaceScript(scripts[key])}")`;
    if (keys.length > 1) {
      const firstKey = keys[0];
      let obj = {};

      if (typeof output[firstKey] === 'string') {
        obj = {
          default: output[firstKey],
        };
      } else if (typeof output[firstKey] === 'object') {
        obj = output[firstKey];
      }

      output[firstKey] = Object.assign(
        obj,
        createObjectTree(keys.slice(1), script)
      );
    } else {
      output[key] = script;
    }
  });

  return output;
};
