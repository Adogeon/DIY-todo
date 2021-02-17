const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = [
  `
  type Query {
    hello: String
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
