const express = require('express');
const cors = require("cors");
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers, context } = require("./schema");
const fs = require('fs');
const os = require('os');

let version;
fs.readFile('package.json', 'utf8', function(err, data) {
    if (err) throw err;
    version = JSON.parse(data).version;
});

const PORT = 4000;
const app = express();
const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

app.get('/status', (req, res) => {
    res.status(200).json({
        timestamp: new global.Date().toISOString(),
        host: os.hostname(),
        serviceName: 'graphql',
        serviceVersion: version
    });
});
