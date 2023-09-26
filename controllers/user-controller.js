const { User } = require('../models');

// Defining the userController object to hold CRUD methods for the User model
const userController = {
  
  // Method to retrieve all users from the User collection
  getAllUsers(req, res) {
    User.find({}) // Using Mongoose's find method to retrieve all User documents
      .then(dbUserData => res.json(dbUserData)) // Sending the retrieved data as JSON to the client
      .catch(err => {
        console.log(err); 
        res.status(500).json(err); 
      });
  },

  // Method to retrieve a single user by their ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id }) // Using Mongoose's findOne method to retrieve a User document by ID
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' }); 
          return;
        }
        res.json(dbUserData); // Sending the retrieved user data as JSON to the client
      })
      .catch(err => {
        console.log(err); 
        res.status(400).json(err);
      });
  },

  // Method to create a new user
  createUser({ body }, res) {
    User.create(body) // Using Mongoose's create method to add a new User document to the collection
      .then(dbUserData => res.json(dbUserData)) 
      .catch(err => res.status(400).json(err)); 
  },

  // Method to update a user by their ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }) // Using Mongoose's findOneAndUpdate method to update a User document by ID
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData); // Sending the updated user data as JSON to the client
      })
      .catch(err => res.status(400).json(err)); 
  },

  // Method to delete a user by their ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id }) // Using Mongoose's findOneAndDelete method to remove a User document by ID
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData); // Sending the deleted user data as JSON to the client
      })
      .catch(err => res.status(400).json(err)); 
  },

  // add friend
addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // remove friend
removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },  
};

// Exporting the userController object to be used in routes
module.exports = userController;
