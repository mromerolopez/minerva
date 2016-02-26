'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var LoanSchema = new mongoose.Schema({
    copy: {type: mongoose.Schema.Types.ObjectId, ref: 'Copy', required: true},
    borrower: {type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    loan_date: {type: Date, required: true},
    limit_date: Date,
    incidents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Incident'}],
    returned: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now},
    updated_at: Date
});

export default mongoose.model('Loan', LoanSchema);
