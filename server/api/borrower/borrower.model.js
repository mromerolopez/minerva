'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BorrowerSchema = new mongoose.Schema({
  name: String,
  surname1: String,
  surname2 : String,
  email : String,
  phone : String,
  address :  String,
  class :  String,
  studentId : String,
  loans : [{type: mongoose.Schema.Types.ObjectId, ref: ''}],
  incidents : [{type: mongoose.Schema.Types.ObjectId, ref: ''}],
  active : {type: Boolean , default: true},
  created_at : {type: Date, default: Date.now},
  updated_at : Date
});

export default mongoose.model('Borrower', BorrowerSchema);
