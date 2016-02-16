'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    ageRange: String,
    editorial: String,
    publishYear: Number,
    synopsis: String,
    language: String,
    pages: Number,
    rating: Number,
    active: {type: Boolean, default: true},
    created_At: {type: Date, default: Date.now},
    updated_At: Date
});

export default mongoose.model('Book', BookSchema);
