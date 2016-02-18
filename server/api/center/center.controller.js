/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/centers              ->  index
 * POST    /api/centers              ->  create
 * GET     /api/centers/:id          ->  show
 * PUT     /api/centers/:id          ->  update
 * DELETE  /api/centers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Center from './center.model';

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

// Gets a list of Centers
export function index(req, res) {
  Center.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Center from the DB
export function show(req, res) {
  Center.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Center in the DB
export function create(req, res) {
  Center.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Center in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Center.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Center from the DB
export function destroy(req, res) {
  Center.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
