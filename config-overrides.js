// override create-react-app settings without ejecting the app
// https://ant.design/docs/react/use-with-create-react-app
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
    config = injectBabelPlugin(
        [
            'import',
            { libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
        ],
        config
    );
    return config;
};
