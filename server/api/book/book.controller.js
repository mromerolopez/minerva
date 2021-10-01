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
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Books
export function index(req, res) {
  return Book.find()
    .populate('user')
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Book from the DB
export function show(req, res) {
  return Book.findById(req.params.id)
    .populate({
      path: 'loans',
      populate: { path: 'borrower' }
    })
    .populate({
      path: 'incidents',
      populate: { path: 'borrower' }
    })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Book in the DB
export function create(req, res) {
  return Book.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Book in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Book.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Book from the DB
export function destroy(req, res) {
  return Book.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function findByFilter(req, res) {
  const query = req.params.query;
  const keywords = query.split(' ');

  const query = [];

  for (let i = 0; i < keywords.length; i++) {
    const queryIsbn10 = { 'isbn10': { $regex: keywords[i], $options: 'i' } };
    const queryIsbn13 = { 'isbn13': { $regex: keywords[i], $options: 'i' } };
    const queryTitle = { 'title': { $regex: keywords[i], $options: 'i' } }
    const queryAuthor = { 'author': { $regex: keywords[i], $options: 'i' } };
    const queryEditorial = { 'editorial': { $regex: keywords[i], $options: 'i' } };

    query.push(queryIsbn10);
    query.push(queryIsbn13);
    query.push(queryTitle);
    query.push(queryAuthor);
    query.push(queryEditorial);
  }



  return Book.find({
    $or: query
  })
    .then((datos) => res.json(datos));
}
