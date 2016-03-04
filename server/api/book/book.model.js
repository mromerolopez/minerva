'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BookSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    isbn10: {type:String, required:true},
    isbn13: {type:String},
    age_range: String,
    editorial: {type:String, required:true},
    publish_year: {type:String},
    country: String,
    synopsis: String,
    image: String,
    language: String,
    pages: Number,
    is_important: {type: Boolean, default:false},
    rating: Number,
    copies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Copy'}],
    center: {type: mongoose.Schema.Types.ObjectId, ref: 'Center'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    loans: [{type: mongoose.Schema.Types.ObjectId, ref: 'Loan'}],
    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
 
});

export default mongoose.model('Book', BookSchema);
