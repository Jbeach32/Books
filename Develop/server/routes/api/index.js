const router = require('express').Router();
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('../../middleware/auth');
const { typeDefs, resolvers } = require('../../');
const { makeExecutableSchema } = require('graphql-tools');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: authMiddleware,
});

// Apply Apollo Server as middleware
server.applyMiddleware({ app: router });

module.exports = router;

