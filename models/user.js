const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // match:["","email address invalid"]
        },
        thoughts: [{
                type: Schema.Types.ObjectId,
                ref: "thought"
            }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "user",
            required: false
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

userSchema
    .virtual("friendCount")
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;

