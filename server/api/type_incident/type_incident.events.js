/**
 * TypeIncident model events
 */

'use strict';

import {EventEmitter} from 'events';
var TypeIncident = require('./type_incident.model');
var TypeIncidentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TypeIncidentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  TypeIncident.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TypeIncidentEvents.emit(event + ':' + doc._id, doc);
    TypeIncidentEvents.emit(event, doc);
  }
}

export default TypeIncidentEvents;
