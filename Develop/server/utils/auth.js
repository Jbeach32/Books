const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express'); // Import Apollo Server error for authentication

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (context) {
    // Get the token from the context
    const token = context.req.headers.authorization;

    if (!token) {
      throw new AuthenticationError('You have no token!');
    }

    try {
      // Verify token and get user data out of it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      context.user = data;
    } catch (err) {
      console.error('Invalid token:', err);
      throw new AuthenticationError('Invalid token!');
    }
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
