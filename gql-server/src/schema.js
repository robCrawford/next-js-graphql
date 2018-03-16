const { makeExecutableSchema } = require("graphql-tools");
const axios = require("./axios");
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
    context: req => ({ axios })
};
