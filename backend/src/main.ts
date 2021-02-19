import express, {Express, Request, Response} from "express"
import {graphqlHTTP} from "express-graphql";

import {connectDb} from "./modules/db";

const { schema } = require("./modules/graphql.js");

const app : Express = express();
const port = 3000;

app.get("/", (_, res : Response) => {
  res.send("Hello World!");
});

connectDb();

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
