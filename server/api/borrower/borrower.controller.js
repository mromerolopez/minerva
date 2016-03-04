/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/borrowers              ->  index
 * POST    /api/borrowers              ->  create
 * GET     /api/borrowers/:id          ->  show
 * PUT     /api/borrowers/:id          ->  update
 * DELETE  /api/borrowers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Borrower from './borrower.model';

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

// Gets a list of Borrowers
export function index(req, res) {
  Borrower.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Borrower from the DB
export function show(req, res) {
  Borrower.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Borrower in the DB
export function create(req, res) {
  Borrower.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Borrower in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Borrower.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Borrower from the DB
export function destroy(req, res) {
  Borrower.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function findByFilter(req, res){
var query = req.params.query;
var keywords = query.split(' ');

var busqueda = [];

for (var i = 0; i < keywords.length; i++) {
    var queryName = {'name':{$regex:keywords[i], $options:'i'}};
    var querySurname1 = {'surname1':{$regex: keywords[i], $options:'i'}};
    var querySurname2 = {'surname2': {$regex: keywords[i], $options:'i'}}
    var queryNif = {'nif': {$regex: keywords[i], $options:'i'}};
   
    busqueda.push(queryName);
    busqueda.push(querySurname1); 
    busqueda.push(querySurname2); 
    busqueda.push(queryNif);
    
}



    Borrower.find({
        $or: busqueda
    })
    .then(function(datos){
        res.json(datos);
    });
}