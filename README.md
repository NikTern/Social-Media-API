
# Social Media API

A simple and efficient backend API for a social media application, built with Node.js, Express, MongoDB and Mongoose.

## Features

- User registration and authentication
- User profiles with the ability to add and remove friends
- Create, read, update, and delete thoughts
- Add, view, and remove reactions to thoughts

## API Endpoints

Below is a list of available API endpoints:

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:userId` - Get a single user by ID
- `PUT /api/users/:userId` - Update a user by ID
- `DELETE /api/users/:userId` - Delete a user by ID
- `POST /api/users/:userId/friends/:friendId` - Add a friend to a user
- `DELETE /api/users/:userId/friends/:friendId` - Remove a friend from a user

### Thoughts

- `POST /api/thoughts` - Create a new thought
- `GET /api/thoughts` - Get all thoughts
- `GET /api/thoughts/:thoughtId` - Get a single thought by ID
- `PUT /api/thoughts/:thoughtId` - Update a thought by ID
- `DELETE /api/thoughts/:thoughtId` - Delete a thought by ID
- `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## License

MIT License
