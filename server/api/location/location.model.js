'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var LocationSchema = new mongoose.Schema({
  name: String,
  located : {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
  is_content : [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}],
  copys : [{type: mongoose.Schema.Types.ObjectId, ref: 'Incident'}],
  created_at : { type: Date , default: Date.now},
  updated_at: Date,
  active: {type: Boolean, default: true}
});

export default mongoose.model('Location', LocationSchema);
