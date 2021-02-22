import express = require("express");
import "reflect-metadata";
import {buildSchema} from "type-graphql";
import {connect} from "mongoose"
import {graphqlHTTP} from 'express-graphql'

//resolvers

import {TodosResolver} from "./resolvers/todos"
import {UserResolver} from "./resolvers/user"

const main = async () => {
  const schema = await buildSchema({
    resolvers: [TodosResolver, UserResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const mongoose = await connect('mongodeb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
  await mongoose.connection;

  const app = express();
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  }))
  
  app.listen({port: 3333}, () => {
    console.log(`Server ready and listening at ==> http://localhost:3333/graphql`)
  });
  main().catch((error) => {
    console.log(error, 'error');
  })
}

main().catch((error) => {
  console.log(error, "error");
})

