const Thought = require('../models/Thought')
const User = require('../models/User')

module.exports = {
// **`/api/thoughts`** //
  
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  
  // GET a single thought by its _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'No thought with this ID!' })
        } else {
          res.json(thought)
        }
      })
      .catch((err) => res.status(500).json(err))
  },

  // POST to create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((newThought) => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: newThought._id } },
          { new: true }
        )
          .then((updatedUser) => res.json(newThought))
          .catch((err) => res.status(500).json(err))
      })
      .catch((err) => res.status(500).json(err))
  },

  // PUT to update a thought by its _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((updatedThought) => {
        if (!updatedThought) {
          res.status(404).json({ message: 'No thought with this ID!' })
        } else {
          res.json(updatedThought)
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thought with this ID!' })
        } else {
          res.json({ message: 'Thought removed!' })
        }
      })
      .catch((err) => res.status(500).json(err))
  },

// **`/api/thoughts/:thoughtId/reactions`** //

  // POST to create a reaction stored in a single thought's `reactions` array field
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((updatedThought) => {
        if (!updatedThought) {
          res.status(   404).json({ message: 'No thought with this ID!' })
        } else {
          res.json(updatedThought)
        }
      })
      .catch((err) => res.status(500).json(err))
  },

    // DELETE to pull and remove a reaction by the reaction's `reactionId` value
  deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((updatedThought) => {
            if (!updatedThought) {
                res.status(404).json({ message: 'No thought with this ID!' })
            } else {
                res.json(updatedThought)
            }
            })
            .catch((err) => res.status(500).json(err))
        },
}

