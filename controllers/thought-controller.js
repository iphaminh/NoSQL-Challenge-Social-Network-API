const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) { // retrieve all thoughts from the database eventho there is no thoughts
    Thought.find({}) //empty array
      .then(dbThoughtData => res.json(dbThoughtData)) // find it return it to json
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) { //find param thri url
    Thought.findOne({ _id: params.id }) //Find a document where the _id property matches params.userId
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create thought
  createThought({ body }, res) { // Notice that we are only destructuring body from the request
    Thought.create(body)
      .then(({ _id }) => { //After the thought is created, we get its _id
        return User.findOneAndUpdate(  //find user
        { _id: body.userId }, // Use body.userId instead of params.userId
          { $push: { thoughts: _id } }, //add thoughts id to its userid
          { new: true }
        );
      })
      .then(dbUserData => { //dbUserData will contain the updated user document with the new thought ID in its thoughts array
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) { //seeking url and get the body
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }) //find matching id then put new body
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id }) // seeking its url id value
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // add reaction to a thought
  addReaction({ params, body }, res) { //req is destructured to extract params and body. params will contain any route parameters (in this case, thoughtId)
    Thought.findOneAndUpdate(
      { _id: params.thoughtId }, // Finding thought by _id
      { $push: { reactions: body } }, // Pushing new reaction to reactions array
      { new: true, runValidators: true } //Options: return updated document and run validators
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // remove reaction from a thought
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
