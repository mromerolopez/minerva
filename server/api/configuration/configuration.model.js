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
    schoolar_year: {
        start_date: Date,
        finish_date: Date
    },
    default_borrow_time: {type: Number, default: 15}
});

export default mongoose.model('Configuration', ConfigurationSchema);
