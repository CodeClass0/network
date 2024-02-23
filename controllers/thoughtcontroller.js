const { User, Thought } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThoughtById(req, res) {
    try {
      const thoughts = await Thought.findOne({ _id: req.params.thoughtId }).populate({path: "reactions"}).populate({path: "thoughtText"}).select("__v");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thoughts = await Thought.create(req.body);
      console.log(req.body);
      const users = await User.findOneAndUpdate(
        {username: req.body.username},
        {$push: {thoughts: thoughts._id}},
        {new: true}
      );
      
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async putThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true });
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      res.json({message:"Thought deleted"});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}