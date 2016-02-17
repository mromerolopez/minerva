'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CopySchema = new mongoose.Schema({
  state: String,
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  loans: [{type: mongoose.Schema.Types.ObjectId, ref: 'Loan'}],
  location : {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
  active : {type: Boolean , default : true},
  incidents : [{type: mongoose.Schema.Types.ObjectId, ref: 'Incident'}],
  created_at : {type:Date , default : Date.now},
  updated_at : Date
});

export default mongoose.model('Copy', CopySchema);
