const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  getSingleUser: async ({ user = null, params }, res) => {
    try {
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      });

      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }

      res.json(foundUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  createUser: async ({ body }, res) => {
    try {
      const user = await User.create(body);

      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }

      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  login: async ({ body }, res) => {
    try {
      const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

      if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
      }

      const correctPw = await user.isCorrectPassword(body.password);

      if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
      }

      const token = signToken(user);
      res.json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  saveBook: async ({ user, body }, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },

  deleteBook: async ({ user, params }, res) => {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
      }

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

