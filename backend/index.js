const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const db = require("./modules/db.js");
const { schema } = require("./modules/graphql.js");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

db.init();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
