const { makeExecutableSchema } = require("graphql-tools");
const axios = require("./axios");
const DataLoader = require("dataloader");
const movie = require("./types/movie");

const typeDefs = [
    `
    type Query {
    version: String!
    }
    `,
    movie.type
];

const resolvers = Object.assign(
    {
        Query: {
            version: () => "1"
        }
    },
    movie.resolvers
);

module.exports = {
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    // context: req => ({ axios })
    context: req => ({
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
