import {makeExecutableSchema} from "@graphql-tools/schema";
import {iTodos, Todo} from "./db/TodoDBSchema";

const typeDefs = `
  type Query {
    todos: Todo;
    hello: String
  }

  type Todo {
    id: String;
    list: [String];
  }

  type Mutation {
    addTodo: 
  }

`

const resolvers = {
  Query: {
    todos: async (_,{ id }) => await Todo.findById(id)
  },
  Todo: {
    id: (root: iTodos):String => root._id 
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})