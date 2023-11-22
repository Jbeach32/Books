// client/src/mutations.js
import { gql } from '@apollo/client';
// import { defaultConfiguration } from '../../server/routes/api/graphql';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

const typeDefs = gql`
  type Book {
    _id: ID
    title: String
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  input BookInput {
    title: String
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
  }

  type Query {
    me: User
    // Other queries
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    // Other mutations
  }
`;

export default typeDefs;
// Define other mutations similarly
