const express = require('express');
const cors = require("cors");
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers, context } = require("./schema");
const { version, hostname, serviceName } = require("./services/status");

const PORT = 4000;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: PORT }, () =>
  console.log(`Ready at http://localhost:4000${server.graphqlPath}`)
)

app.get('/status', (req, res) => {
    res.status(200).json({
        timestamp: new global.Date().toISOString(),
        host: hostname,
        serviceName: serviceName,
        serviceVersion: version
    });
});
