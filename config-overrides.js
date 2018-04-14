// override create-react-app settings without ejecting the app
// https://ant.design/docs/react/use-with-create-react-app
const { injectBabelPlugin } = require('react-app-rewired');
// add less support
// https://github.com/timarney/react-app-rewired/tree/master/packages/react-app-rewire-less
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    [
      'module-resolver',
      {
        root: ['./src'],
      },
    ],
    config
  );
  config = rewireLess(config, env);
  return config;
};
