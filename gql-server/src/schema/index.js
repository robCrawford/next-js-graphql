const DataLoader = require("dataloader");
const axios = require("../services/axios");
const movie = require("./movie");
const { version } = require("../services/status");

module.exports = {
    typeDefs: [
        `
        type Query {
            version: String!
        }
        `,
        movie.type
    ],
    resolvers: {
        Query: Object.assign(
            { version: () => version },
            movie.resolvers.Query
        )
    },
    context: ({ req }) => ({
        loaders: {
            content: new DataLoader(
                queries =>
                    Promise.all(
                        queries.map(([url, config]) => axios.get(url, config))
                    ),
                { cacheKeyFn: JSON.stringify }
            )
        }
    })
};
