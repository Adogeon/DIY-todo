const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = [
  `
  type Query {
    hello: String
    allTodos: [todo]
  }

  type todo {
    id: Number
    text: string
  }

  `,
];

const resolvers = {
  Query: {
    hello: () => "Hello there",
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = { schema };
