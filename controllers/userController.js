const User = require("../models/User");

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  },
  getUserById: async (req, res) => {
    const user = await User.findById(req.params.userId)
      .populate("thoughts")
      .populate("friends");
    res.json(user);
  },
  createUser: async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
  },
  updateUser: async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  },
  deleteUser: async (req, res) => {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: "User deleted" });
  },
  addFriend: async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    await user.save();
    res.json(user);
  },
  removeFriend: async (req, res) => {
    const user = await User.findById(req.params.userId);
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
  },
};
