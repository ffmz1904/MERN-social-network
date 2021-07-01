const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: [],

    },
    followins: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true }
);

module.exports = model('User', userSchema);
