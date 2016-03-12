'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ConfigurationSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    incindent_types: [
        {
            name: {type: String, required: true}, 
            description: String, 
            code: String, 
            active: {type: Boolean, default: true},
            created_time: {type: Date, default: Date.now}
        }
    ],
    //default_borrow_time: {type: Number, default: 15},
    borrower_types: [{name:String, time: Number, date: Date, active: { type: Boolean, default:true }}],
    book_type: [{name:String, active: { type: Boolean, default:true }}],
    locations: [{name:String, active: { type: Boolean, default:true }}]
});

export default mongoose.model('Configuration', ConfigurationSchema);