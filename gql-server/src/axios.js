const axios = require("axios");
const camelcaseRecursive = require("camelcase-keys-recursive");
const _ = require("lodash");

const instance = axios.create({
    baseURL: "http://api.themoviedb.org",
    params: {
        api_key: "11090f0648c20544d79121a15603dcfe",
        include_adult: false,
        include_video: false
    },
    transformResponse: data => camelcaseRecursive(JSON.parse(data))
});

instance.interceptors.request.use(config => {
    console.log(
        "\x1b[32m",
        config.method.toUpperCase(),
        config.url,
        "\x1b[33m \n",
        _.omit(config.params, ["api_key", "include_adult", "include_video"]),
        "\x1b[0m \n"
    );
    return config;
});

instance.interceptors.response.use(_.identity);

module.exports = instance;
