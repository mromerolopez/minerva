/**
 * Copy model events
 */

'use strict';

import {EventEmitter} from 'events';
var Copy = require('./copy.model');
var CopyEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CopyEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Copy.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CopyEvents.emit(event + ':' + doc._id, doc);
    CopyEvents.emit(event, doc);
  }
}

export default CopyEvents;
