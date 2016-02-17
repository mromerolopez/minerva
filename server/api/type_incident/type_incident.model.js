'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TypeIncidentSchema = new mongoose.Schema({
  name: {type: String, required: true},
  incident: [{type: mongoose.Schema.Types.ObjectId, ref: 'Incident'}],
  active: {type : Boolean , default : true},
  created_at :{ type: Date , default: Date.now},
  updated_at : Date
});

export default mongoose.model('TypeIncident', TypeIncidentSchema);
