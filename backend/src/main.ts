import express = require("express")
import "reflect-metadata"
import {buildSchema} from "type-graphql"
import {connect} from "mongoose"
import {graphqlHTTP} from 'express-graphql'

import jwt from "express-jwt"
import { authChecker} from "./auth/authChecker";

//resolvers
import {ListResolver} from "./resolvers/list"
import {UserResolver} from "./resolvers/user"
import {ItemResolver} from "./resolvers/item"
import {TagResolver} from "./resolvers/tag"
import {AuthResolver} from "./resolvers/auth"


const main = async () => {
  const schema = await buildSchema({
    resolvers: [ListResolver, UserResolver, ItemResolver, TagResolver, AuthResolver],
    authChecker: authChecker,
    dateScalarMode:"timestamp",
    emitSchemaFile: true,
    validate: false,
  });

  const mongoose = await connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
  await mongoose.connection;
  //mongoose.set('debug', true);

  const app = express();

  app.use('/graphql', jwt({
    secret: "TypeGraphQL", 
    algorithms:['HS256'],
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
        return null;
      }
  }))

  app.use(function (err, req, res, next) {
    if(err.inner.name === 'TokenExpiredError') {
      req.user = {error: err.inner.name}
    } 
    return next()
  });

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: error => ({
      message: error.message,
      locations: error.locations,
      path: error.path,
    })
  }))
  
  app.listen({port: 3000}, () => {
    console.log(`Server ready and listening at ==> http://localhost:3000/graphql`)
  });
}

main().catch((error) => {
  console.log(error, "error");
})

