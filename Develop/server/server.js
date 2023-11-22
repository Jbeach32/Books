const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const graphqlRoute = require('./routes/api/graphql');

const app = express();
const PORT = process.env.PORT || 3001;

// Wrap the import statement in an immediately invoked async function
(async () => {
  const { typeDefs } = await import('../client/src/mutations');

  const server = new ApolloServer({
    typeDefs,
    // resolvers,
    context: authMiddleware,
  });

  // Apply Apollo Server as middleware
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Use your GraphQL route
  app.use('/graphql', graphqlRoute);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
      console.log(`GraphQL server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
})();
