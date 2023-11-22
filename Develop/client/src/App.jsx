// client/src/App.jsx

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import {Router, Route} from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: '/graphql', // Update with your GraphQL endpoint
  cache: new InMemoryCache(),
});

function App() {
  console.log(React)
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Route>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
          </Route>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

