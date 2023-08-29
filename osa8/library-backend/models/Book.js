// 8.13 - 8.15 - mongoose schema for book

const mongoose = require('mongoose') // mongoose for MongoDB

const uniqueValidator = require('mongoose-unique-validator') // mongoose-unique-validator for unique fields

const bookSchema = new mongoose.Schema({ // mongoose schema for book
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        { type: String }
    ]
})

bookSchema.plugin(uniqueValidator) // mongoose-unique-validator plugin

const Book = mongoose.model('Book', bookSchema) // mongoose model

module.exports = Book 