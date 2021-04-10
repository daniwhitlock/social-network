const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+\@.+\..+/] //regex
        },
        thought: [
            //array of _id values referencing the Thought model
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                 //array of _id values referencing the user model (self-reference)
                type: Schema.Types.ObjectId, 
                ref: 'User'
               
            }
        ]
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

//virtual that retrieves the lengthof the user's friends array field on query
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;