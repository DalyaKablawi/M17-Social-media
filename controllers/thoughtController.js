const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  getAllThoughts: async (req, res) => {
    const thoughts = await Thought.find().populate("reactions");
    res.json(thoughts);
  },
  getThoughtById: async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId).populate(
      "reactions"
    );
    res.json(thought);
  },
  createThought: async (req, res) => {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: newThought._id },
    });
    res.json(newThought);
  },
  updateThought: async (req, res) => {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    res.json(updatedThought);
  },
  deleteThought: async (req, res) => {
    await Thought.findByIdAndDelete(req.params.thoughtId);
    res.json({ message: "Thought deleted" });
  },
  createReaction: async (req, res) => {
    const Reaction = require("../models/Reaction");
    const newReaction = await Reaction.create(req.body);
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(newReaction._id);
    await thought.save();
    res.json(newReaction);
  },
  deleteReaction: async (req, res) => {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.pull(req.params.reactionId);
    await thought.save();
    res.json({ message: "Reaction deleted" });
  },
};
