const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => timestamp.toLocaleString(),
  },
  username: { type: String, required: true },
  reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
});

// Virtual to get the count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;
