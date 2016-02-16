'use strict';

var app = require('../..');
import request from 'supertest';

var newBorrower;

describe('Borrower API:', function() {

  describe('GET /api/borrowers', function() {
    var borrowers;

    beforeEach(function(done) {
      request(app)
        .get('/api/borrowers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          borrowers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      borrowers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/borrowers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/borrowers')
        .send({
          name: 'New Borrower',
          info: 'This is the brand new borrower!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBorrower = res.body;
          done();
        });
    });

    it('should respond with the newly created borrower', function() {
      newBorrower.name.should.equal('New Borrower');
      newBorrower.info.should.equal('This is the brand new borrower!!!');
    });

  });

  describe('GET /api/borrowers/:id', function() {
    var borrower;

    beforeEach(function(done) {
      request(app)
        .get('/api/borrowers/' + newBorrower._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          borrower = res.body;
          done();
        });
    });

    afterEach(function() {
      borrower = {};
    });

    it('should respond with the requested borrower', function() {
      borrower.name.should.equal('New Borrower');
      borrower.info.should.equal('This is the brand new borrower!!!');
    });

  });

  describe('PUT /api/borrowers/:id', function() {
    var updatedBorrower;

    beforeEach(function(done) {
      request(app)
        .put('/api/borrowers/' + newBorrower._id)
        .send({
          name: 'Updated Borrower',
          info: 'This is the updated borrower!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBorrower = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBorrower = {};
    });

    it('should respond with the updated borrower', function() {
      updatedBorrower.name.should.equal('Updated Borrower');
      updatedBorrower.info.should.equal('This is the updated borrower!!!');
    });

  });

  describe('DELETE /api/borrowers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/borrowers/' + newBorrower._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when borrower does not exist', function(done) {
      request(app)
        .delete('/api/borrowers/' + newBorrower._id)
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
