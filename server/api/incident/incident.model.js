'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var IncidentSchema = new mongoose.Schema({
  loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan' },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower' },
  copy: { type: mongoose.Schema.Types.ObjectId, ref: 'Copy' },
  observations: String,
  type : {
            name: String, 
            description: String, 
            code: String
        },
  active : {type: Boolean , default:true},
  created_at : {type: Date, default : Date.now},
  updated_at : Date
});

export default mongoose.model('Incident', IncidentSchema);
