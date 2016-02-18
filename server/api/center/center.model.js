'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CenterSchema = new mongoose.Schema({
  name: String,
  
});

export default mongoose.model('Center', CenterSchema);
