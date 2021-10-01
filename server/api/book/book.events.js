/**
 * Book model events
 */

'use strict';

import { EventEmitter } from 'events';
const Book = require('./book.model');
const BookEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BookEvents.setMaxListeners(0);

// Model events
const events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for (let e in events) {
  var event = events[e];
  Book.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return (doc) => {
    BookEvents.emit(event + ':' + doc._id, doc);
    BookEvents.emit(event, doc);
  }
}

export default BookEvents;
