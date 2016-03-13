'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ConfigurationSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    incident_types: [{name: String, description: String, active: {type: Boolean, default: true}}],
    borrower_types: [{name:String, time: Number, date: Date, active: { type: Boolean, default:true }}],
    book_type: [{name:String, active: { type: Boolean, default:true }}],
    locations: [{name:String, active: { type: Boolean, default:true }}]
});

export default mongoose.model('Configuration', ConfigurationSchema);