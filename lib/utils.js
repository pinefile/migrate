const createObjectTree = function (tree, val) {
  const key = tree.shift();
  return {
    [key]: tree.length ? createObjectTree(tree, val) : val
  };
};

module.exports = {
  createObjectTree
};
