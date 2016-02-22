'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname1: {type: String, required: true},
    surname2: {type: String, required: true},
    email: String,
    phone: String,
    address: String,
    dni: String,
    username: {type: String, required: true},
    password: {type: String, required: true},
    active: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now},
    updated_at: Date,
    is_admin: Boolean,
    last_login: Date,
    configuration: {type: mongoose.Schema.Types.ObjectId, ref: 'Configuration'},
    center: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Center'
    },
    books: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    copies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Copy'}],
});

export default mongoose.model('User', UserSchema);
