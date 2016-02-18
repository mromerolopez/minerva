/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/configurations', require('./api/configuration'));
  app.use('/api/users', require('./api/user'));
  //app.use('/api/type_incidents', require('./api/type_incident'));
  app.use('/api/locations', require('./api/location'));
  app.use('/api/loans', require('./api/loan'));
  app.use('/api/incidents', require('./api/incident'));
  app.use('/copies', require('./api/copy'));
  app.use('/api/borrowers', require('./api/borrower'));
  app.use('/api/books', require('./api/book'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
