import express = require("express")
import "reflect-metadata"
import {buildSchema} from "type-graphql"
import {connect} from "mongoose"
import {graphqlHTTP} from 'express-graphql'

import * as jwt from "express-jwt"
import { authChecker} from "./auth/authChecker";

//resolvers
import {ListResolver} from "./resolvers/list"
import {UserResolver} from "./resolvers/user"
import {ItemResolver} from "./resolvers/item"
import {TagResolver} from "./resolvers/tag"


const main = async () => {
  const schema = await buildSchema({
    resolvers: [ListResolver, UserResolver, ItemResolver, TagResolver],
    authChecker: authChecker,
    dateScalarMode:"timestamp",
    emitSchemaFile: true,
    validate: false,
  });

  const mongoose = await connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
  await mongoose.connection;
  //mongoose.set('debug', true);

  const app = express();

  app.use('/graphql', jwt({secret: "TypeGraphqQL"}))

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }))
  
  app.listen({port: 3000}, () => {
    console.log(`Server ready and listening at ==> http://localhost:3000/graphql`)
  });
}

main().catch((error) => {
  console.log(error, "error");
})

