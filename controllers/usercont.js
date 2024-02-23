const { User, Thought } = require("../models");


module.exports = {
  async getUsers(req, res) {
    try {
      console.log("Trying to get");
      const users = await User.find()
        .populate({ path: 'thoughts', select: '-__v' })
        .populate({ path: 'friends', select: '-__v' });
      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const users = await User.create(req.body);
      res.json(users);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    };
  },

  async getSingleUser(req, res) {
    try {
      const users = await User.findOne({ _id: req.params.userId })
        .populate({ path: "thoughts", path: "friends", select: '-__v' });
      res.json(users);
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  async putUser(req, res) {
    try {
      const users = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true, runValidators: true });
      res.json(users);
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  async deleteUser(req, res) {
    try {
      const users = await User.findOneAndDelete({ _id: req.params.userId });
      res.json({ message: "user deleted" });
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  async addFriend(req, res) {

    try {
      const users = await User.findOneAndUpdate({ _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true });
      res.json(users);
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  },

  async deleteFriend(req, res) {
    try {
      const users = await User.findOneAndUpdate({ _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true });
      res.json(users);
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  }
};