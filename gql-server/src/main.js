const express = require('express');
const cors = require("cors");
const { typeDefs, resolvers, context } = require("./schema");
const { ApolloServer, gql } = require('apollo-server-express');

const PORT = 4000;

const app = express();
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers, context });
server.applyMiddleware({ app });

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
