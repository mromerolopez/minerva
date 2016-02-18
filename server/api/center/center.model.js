'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CenterSchema = new mongoose.Schema({
  name: {type:String, required:true},
  address : String,
  code: String,
  users:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  copies:[{type: mongoose.Schema.Types.ObjectId, ref: 'Copy'}],
  borrowers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Borrower'}],
  locations :[{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}]
});

export default mongoose.model('Center', CenterSchema);
