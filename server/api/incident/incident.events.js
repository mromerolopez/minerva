/**
 * Incident model events
 */

'use strict';

import {EventEmitter} from 'events';
var Incident = require('./incident.model');
var IncidentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
IncidentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Incident.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    IncidentEvents.emit(event + ':' + doc._id, doc);
    IncidentEvents.emit(event, doc);
  }
}

export default IncidentEvents;
