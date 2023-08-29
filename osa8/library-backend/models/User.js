// 8.16 - Mongoose schema for user

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true, // unique usernames
    },
    favouriteGenre: {
        type: String,
    },
})

module.exports = mongoose.model('User', userSchema)