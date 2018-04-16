// override create-react-app settings without ejecting the app
// add less support
// https://github.com/timarney/react-app-rewired/tree/master/packages/react-app-rewire-less
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = rewireLess(config, env);
  return config;
};
