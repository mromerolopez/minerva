/**
 * Configuration model events
 */

'use strict';

import {EventEmitter} from 'events';
var Configuration = require('./configuration.model');
var ConfigurationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConfigurationEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Configuration.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ConfigurationEvents.emit(event + ':' + doc._id, doc);
    ConfigurationEvents.emit(event, doc);
  }
}

export default ConfigurationEvents;
