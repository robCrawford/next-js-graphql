require('dotenv').config();
const withSass = require("@zeit/next-sass");
const withTypescript = require('@zeit/next-typescript');
const webpack = require('webpack');
const { NODE_ENV, PROXY_ADDRESS, ANALYZE } = process.env;

if (PROXY_ADDRESS && NODE_ENV === 'development') {
    const HttpsProxyAgent = require('https-proxy-agent');
    global.httpsProxyAgent = new HttpsProxyAgent(`http://${PROXY_ADDRESS}`);
}

module.exports = withTypescript(
    withSass({
        sassLoaderOptions: {
            includePaths: ["sass"]
        },
        webpack: (config) => {
            // Push .env vars for the front-end
            config.plugins.push(new webpack.EnvironmentPlugin(process.env));

            if (parseInt(ANALYZE) === 1) {
                const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
                config.plugins.push(new BundleAnalyzerPlugin());
            }
            return config;
        }
    })
);
