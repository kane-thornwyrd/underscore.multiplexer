module.exports = function clean(conf){
  "use strict";
  return require('del')(conf);
};
return module.exports;
