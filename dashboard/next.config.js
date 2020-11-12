const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const path = require('path');

module.exports = withPlugins([[withImages], [withCSS]], {
    webpack(config) {
        config.resolve.modules.push(path.resolve('./'));
        return config;
    },
    env: {
        NEXT_PUBLIC_HEROKU_PR_NUMBER: process.env.HEROKU_PR_NUMBER
    }
});
