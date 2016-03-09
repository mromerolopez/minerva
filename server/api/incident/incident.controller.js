/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/incidents              ->  index
 * POST    /api/incidents              ->  create
 * GET     /api/incidents/:id          ->  show
 * PUT     /api/incidents/:id          ->  update
 * DELETE  /api/incidents/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Incident from './incident.model';
import Loan from '../loan/loan.model.js';
import Book from '../book/book.model.js';
import Borrower from '../borrower/borrower.model.js';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Incidents
export function index(req, res) {
  Incident.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Incident from the DB
export function show(req, res) {
  Incident.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Incident in the DB
export function create(req, res) {

    Incident.createAsync(req.body)
        .then(function(data){
          
            Loan.findByIdAndUpdate(
                 data.loan,
                { $push: { incidents: data._id } },
                {safe: true, upsert: true},
                function(err, model) {
                    console.log(err);
                }
             );
     
            Book.findByIdAndUpdate(
                 data.book,
                { $push: { incidents: data._id } },
                {safe: true, upsert: true},
                function(err, model) {
                    console.log(err);
                }
             );
     
            Borrower.findByIdAndUpdate(
                 data.borrower,
                { $push: { incidents: data._id } },
                {safe: true, upsert: true},
                function(err, model) {
                    console.log(err);
                }
             );
            res.json(data);

        })
        .catch(handleError(res));
        }

// Updates an existing Incident in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Incident.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Incident from the DB
export function destroy(req, res) {
  Incident.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
