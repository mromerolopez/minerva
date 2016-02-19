'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var LocationSchema = new mongoose.Schema({
  name: {type: String, required : true},
  located : {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Location'
  },
  is_content : [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}],
  copys : [{type: mongoose.Schema.Types.ObjectId, ref: 'Incident'}],
  created_at : { type: Date , default: Date.now},
  updated_at: Date,
  active: {type: Boolean, default: true},
  center: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Center'
  }
});

export default mongoose.model('Location', LocationSchema);
