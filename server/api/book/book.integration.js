'use strict';

var app = require('../..');
import request from 'supertest';

var newBook;

describe('Book API:', function() {

  describe('GET /api/books', function() {
    var books;

    beforeEach(function(done) {
      request(app)
        .get('/api/books')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          books = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      books.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/books', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/books')
        .send({
          name: 'New Book',
          info: 'This is the brand new book!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBook = res.body;
          done();
        });
    });

    it('should respond with the newly created book', function() {
      newBook.name.should.equal('New Book');
      newBook.info.should.equal('This is the brand new book!!!');
    });

  });

  describe('GET /api/books/:id', function() {
    var book;

    beforeEach(function(done) {
      request(app)
        .get('/api/books/' + newBook._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          book = res.body;
          done();
        });
    });

    afterEach(function() {
      book = {};
    });

    it('should respond with the requested book', function() {
      book.name.should.equal('New Book');
      book.info.should.equal('This is the brand new book!!!');
    });

  });

  describe('PUT /api/books/:id', function() {
    var updatedBook;

    beforeEach(function(done) {
      request(app)
        .put('/api/books/' + newBook._id)
        .send({
          name: 'Updated Book',
          info: 'This is the updated book!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBook = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBook = {};
    });

    it('should respond with the updated book', function() {
      updatedBook.name.should.equal('Updated Book');
      updatedBook.info.should.equal('This is the updated book!!!');
    });

  });

  describe('DELETE /api/books/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/books/' + newBook._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when book does not exist', function(done) {
      request(app)
        .delete('/api/books/' + newBook._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
