/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/books              ->  index
 * POST    /api/books              ->  create
 * GET     /api/books/:id          ->  show
 * PUT     /api/books/:id          ->  update
 * DELETE  /api/books/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Book from './book.model';

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

// Gets a list of Books
export function index(req, res) {
  Book.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Book from the DB
export function show(req, res) {
  Book.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Book in the DB
export function create(req, res) {
  Book.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Book in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Book.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Book from the DB
export function destroy(req, res) {
  Book.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function findByFilter(req, res){
var query = req.params.query;
var keywords = query.split(' ');

var busqueda = [];

for (var i = 0; i < keywords.length; i++) {
    var queryIsbn10 = {'isbn10':{$regex:keywords[i], $options:'i'}};
    var queryIsbn13 = {'isbn13':{$regex: keywords[i], $options:'i'}};
    var queryTitle = {'title': {$regex: keywords[i], $options:'i'}}
    var queryAuthor = {'author': {$regex: keywords[i], $options:'i'}};
    var queryEditorial = {'editorial': {$regex: keywords[i], $options:'i'}};
   
    busqueda.push(queryIsbn10);
    busqueda.push(queryIsbn13); 
    busqueda.push(queryTitle); 
    busqueda.push(queryAuthor);
    busqueda.push(queryEditorial);
    
}



    Book.find({
        $or: busqueda
    })
    .then(function(datos){
        res.json(datos);
    });
}
