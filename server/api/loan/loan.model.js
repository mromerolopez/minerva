'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var LoanSchema = new mongoose.Schema({
  copy: {type: mongoose.Schema.Types.ObjectId, ref: 'Copy' , required:true},
  borrower: {type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required:true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
  limit_date : Date,
  borrow_date : {type:Date, required:true},
  incidents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Incident'}],
  returned: Boolean,
  created_at : {type: Date, default : Date.now },
  updated_at : Date
});

export default mongoose.model('Loan', LoanSchema);
