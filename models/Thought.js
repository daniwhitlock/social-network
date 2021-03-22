const { Schema, model } = require('mongoose');
const ReactionSchema  = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema( 
    {
        thoughtText: {
            type: String, 
            required: true, 
            minLength: 1, 
            maxLength: 280
        }, 
        createdAt: {
            type: Date, 
            default: Date.now, 
            get: timeStamp => dateFormat(timeStamp)
        },
        // user that created this thought
        username: {
            type: String, 
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
      }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;