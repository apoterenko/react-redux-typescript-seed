const prodConfig = require('./webpack.prod.js');

module.exports = function () {
  return prodConfig({ isProdBuild: false });
};
