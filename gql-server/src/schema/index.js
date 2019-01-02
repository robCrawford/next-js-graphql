const merge = require('lodash/merge');
const { version } = require("../services/status");
const schemas = [require('./movie')];

const rootSchema = {
    typeDefs: [`
        type Query {
            version: String!
        }
    `],
    resolvers: {
        Query: {
            version: () => version
        }
    }
};

module.exports = schemas.reduce(
    (schema, { typeDefs, resolvers }) => {
        return {
            typeDefs: [...schema.typeDefs, typeDefs],
            resolvers: merge(schema.resolvers, resolvers),
        }
    },
    rootSchema
);
