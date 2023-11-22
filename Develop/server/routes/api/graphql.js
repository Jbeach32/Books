const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('../../utils/auth');
const { makeExecutableSchema } = require('graphql-tools');

// Wrap the import in an async function
async function startServer() {
  // Change this line
  // const { typeDefs, resolvers } = require('../../../client/src/mutations');

  // to
  const { typeDefs, resolvers } = await import('../../../client/src/mutations');

  const app = express();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    context: authMiddleware,
  });

  // Apply Apollo Server as middleware
  server.applyMiddleware({ app });

  module.exports = app;
}

// Call the async function to start the server
startServer();
