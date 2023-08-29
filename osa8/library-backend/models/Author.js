//8.13 - 8.15 mongoose schema for author

const mongoose = require('mongoose') // mongoose for MongoDB

// const uniqueValidator = require('mongoose-unique-validator') // mongoose-unique-validator for unique fields

const authorSchema = new mongoose.Schema({ // mongoose schema for author
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
    bookCount: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
        }
    ]
})

// authorSchema.plugin(uniqueValidator) // mongoose-unique-validator plugin

const Author = mongoose.model('Author', authorSchema) // mongoose model

module.exports = Author
