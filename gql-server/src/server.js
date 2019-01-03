const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const DataLoader = require("dataloader");
const axios = require("./services/axios");
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require("./schema");
const { version, hostname, serviceName } = require("./services/status");
const { NODE_ENV, PROXY_ADDRESS } = process.env;


// Debug proxy
if (PROXY_ADDRESS && NODE_ENV === 'development') {
    process.env.http_proxy = process.env.https_proxy = `http://${PROXY_ADDRESS}`;
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

// Apollo Server
const context = ({ req }) => ({
    loaders: {
        fetch: new DataLoader(
            queries => Promise.all(
                queries.map(([ url, config ]) => {
                    return axios.get(url, config);
                })
            ),
            { cacheKeyFn: JSON.stringify }
        )
    },
    cookies: req.cookies
});

const server = new ApolloServer({ typeDefs, resolvers, context });

// Express
const PORT = 4000;
const app = express();

app.use(cors());
app.use(cookieParser());

app.get('/status', (req, res) => {
    res.status(200).json({
        timestamp: new global.Date().toISOString(),
        host: hostname,
        serviceName: serviceName,
        serviceVersion: version
    });
});

server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
    console.log(`Ready at http://localhost:4000${server.graphqlPath}`)
});
