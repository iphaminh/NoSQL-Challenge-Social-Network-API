# NoSQL-Challenge-Social-Network-API

A Social Network API built with Express.js and Mongoose, designed to handle users, thoughts, and reactions.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
  - [User Routes](#user-routes)
  - [Thought Routes](#thought-routes)
  - [Reaction Routes](#reaction-routes)
- [Testing](#testing)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

cd NoSQL-Challenge-Social-Network-API
npm install

## Usage

npm start

## API Routes

### User Routes

- **GET** `/api/users`: Get all users.
- **GET** `/api/users/:userId`: Get a single user by its `_id` and populated thought and friend data.
- **POST** `/api/users`: Create a new user.
  - `{ "username": "string", "email": "string" }`
- **PUT** `/api/users/:userId`: Update a user by its `_id`.
  - `{ "username": "string", "email": "string" }`
- **DELETE** `/api/users/:userId`: Delete a user by its `_id`.
- **POST** `/api/users/:userId/friends/:friendId`: Add a new friend to a user's friend list.
- **DELETE** `/api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

### Thought Routes

- **GET** `/api/thoughts`: Get all thoughts.
- **GET** `/api/thoughts/:thoughtId`: Get a single thought by its `_id`.
- **POST** `/api/thoughts`: Create a new thought.
  - `{ "thoughtText": "string", "username": "string", "userId": "string" }`
- **PUT** `/api/thoughts/:thoughtId`: Update a thought by its `_id`.
  - `{ "thoughtText": "string" }`
- **DELETE** `/api/thoughts/:thoughtId`: Delete a thought by its `_id`.

### Reaction Routes

- **POST** `/api/thoughts/:thoughtId/reactions`: Create a reaction stored in a single thought's `reactions` array field.
  - `{ "reactionBody": "string", "username": "string" }`
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`: Pull and remove a reaction by the reaction's `reactionId` value.


License
This project is licensed under the MIT License - see the LICENSE.md file for details.