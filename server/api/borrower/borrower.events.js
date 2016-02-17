/**
 * Borrower model events
 */

'use strict';

import {EventEmitter} from 'events';
var Borrower = require('./borrower.model');
var BorrowerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BorrowerEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Borrower.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BorrowerEvents.emit(event + ':' + doc._id, doc);
    BorrowerEvents.emit(event, doc);
  }
}

export default BorrowerEvents;
