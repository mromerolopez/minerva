'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BorrowerSchema = new mongoose.Schema({
  name: {type:String, required:true},
  surname1: {type:String, required:true},
  surname2 : {type:String, required:true},
  email : String,
  phone : String,
  address :  String,
  classroom :  String,
  dni : String,
  studentId : String,
  loans : [{type: mongoose.Schema.Types.ObjectId, ref: 'Loan'}],
  incidents : [{type: mongoose.Schema.Types.ObjectId, ref: 'Incident'}],
  active : {type: Boolean , default: true},
  created_at : {type: Date, default: Date.now},
  updated_at : Date,

});

export default mongoose.model('Borrower', BorrowerSchema);
