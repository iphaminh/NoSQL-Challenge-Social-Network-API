// Importing necessary modules from mongoose
const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

// schema for a Thought
const ThoughtSchema = new Schema({
  // thoughtText field is required, of type String, and has a maximum length of 280 characters
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280
  },
  // createdAt field will store the date when the thought was created. It defaults to the current date and time.
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal) // Formatting the date value
  },
  // username field is required and of type String. It stores the username of the user who created the thought.
  username: {
    type: String,
    required: true
  },
  // reactions field is an array that will store the reactions to the thought as subdocuments.
  reactions: [ReactionSchema]
});

// Creating a Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// Exporting the Thought model for use in other files
module.exports = Thought;
