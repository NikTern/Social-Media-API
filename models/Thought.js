const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction.js');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (currentVal)=> dateFormat(currentVal)
            
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtSchema.virtual('reactionCount')
    .get(function(){
        return this.reactions.length
    })

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought