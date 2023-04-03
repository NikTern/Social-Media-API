const { Schema, Types } = require('mongoose');

// Define the date format function
function dateFormat(date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
  }

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (currentVal)=> dateFormat(currentVal)
            
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

module.exports = reactionSchema