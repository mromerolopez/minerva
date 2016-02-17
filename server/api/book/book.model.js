'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    age_range: String,
    editorial: String,
    publish_year: Number,
    synopsis: String,
    language: String,
    pages: Number,
    rating: Number,
    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

export default mongoose.model('Book', BookSchema);
