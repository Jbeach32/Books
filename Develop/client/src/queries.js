// client/src/queries.js
import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
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
export const REMOVE_ALL_BOOKS = gql`
  mutation removeAllBooks {
    removeAllBooks {
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

export const LOGOUT_USER = gql`
  mutation logout {
    logout {
      success
    }
  }
`;
// Define other queries similarly
