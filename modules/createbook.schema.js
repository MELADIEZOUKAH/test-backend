const mongoose = require('mongoose');

const CreateBook = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    name_book:{
        type: String,
        required: true
    },
    article_code:{
        type: String,
        required: true
    },
    discription:{
        type: String,
        default: "All books"
    },
    createAt:{
        type: Date,
    },
    file:{
        type: String,
    }
});

const Book = mongoose.model('Book', CreateBook, 'Book');
module.exports = Book; 