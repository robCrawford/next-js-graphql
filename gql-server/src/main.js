const { graphqlExpress } = require("apollo-server-express");
const { schema, context } = require("./schema");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3001;
const app = express();

app.use(cors());

app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress(req => ({
        schema,
        pretty: true,
        graphiql: true,
        tracing: true,
        context: context(req)
    }))
);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
