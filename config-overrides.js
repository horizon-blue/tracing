// override create-react-app settings without ejecting the app
// https://ant.design/docs/react/use-with-create-react-app
const { injectBabelPlugin } = require('react-app-rewired');

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
  return config;
};
