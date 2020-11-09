const strObj = require('stringify-object');

const createObjectTree = function (tree, val) {
  const key = tree.shift();
  return {
    [key]: tree.length ? createObjectTree(tree, val) : val
  };
};

const stringifyObject = function (obj) {
  let str = strObj(obj);

  str = str.replace(/:\s*'/gi, ': ');
  str = str.replace(/',/gi, ',');
  str = str.replace(/'\n/gi, ',\n');

  return str;
}

module.exports = {
  createObjectTree,
  stringifyObject
};
