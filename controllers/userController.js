const User = require('../models/User')
const Thought = require('../models/Thought')

module.exports = {
// **`/api/users`**

    // GET all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },

    // GET a single user by its _id and populated thought & friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends')
            .then(function (user) {
                if (!user) {
                    res.status(404).json({ message: 'No user with this ID' })
                } else {
                    res.json(user);
                }
            })
            .catch((err) => res.status(500).json(err))
    },

    // POST a new user
        // Example Data:
        //   {
        //    "username": "lernantino",
        //    "email": "lernantino@gmail.com"
        //   }
    createUser(req, res) {
        User.create(req.body)
            .then((newUser) => {
                res.json(newUser);
            })
            .catch((err) => res.status(500).json(err))
    },

    // PUT to update a user by its _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body},
            { new: true, runValidators: true }
        )
            .then((updatedUser) => {
                if (!updatedUser) {
                    res.status(404).json({ message: 'No user with this ID' })
                } else {
                    res.json(updatedUser)
                }
            })
            .catch((err) => res.status(500).json(err))
    },

    // DELETE to remove user by its _id
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(async (deletedUser) => {
                if (!deletedUser) {
                    res.status(404).json({ message: 'No user with this ID' })
                } else {
                    // BONUS: Remove a user's associated thoughts when deleted.
                    await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
                    res.json({ message: 'User and associated thoughts deleted' })
                }
            })
            .catch((err) => res.status(500).json(err))
    },

// **`/api/users/:userId/friends/:friendId`**

    // POST to add a new friend to a user's friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then((updatedUser) => {
                if (!updatedUser) {
                    res.status(404).json({ message: 'No user with this ID' })
                } else {
                    res.json(updatedUser)
                }
            })
            .catch((err) => res.status(500).json(err))
    },

    // DELETE to remove a friend from a user's friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((updatedUser) => {
                if (!updatedUser) {
                    res.status(404).json({ message: 'No user with this ID' })
                } else {
                    res.json(updatedUser)
                }
            })
            .catch((err) => res.status(500).json(err))
    },
}