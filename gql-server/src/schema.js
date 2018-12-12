const axios = require("./axios");
const DataLoader = require("dataloader");
const movie = require("./types/movie");

module.exports = {
    typeDefs: [
        `
        type Query {
            version: String!
        }
        `,
        movie.type
    ],
    resolvers: Object.assign(
        {
            Query: {
                version: () => "1"
            }
        },
        movie.resolvers
    ),
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
