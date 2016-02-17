'use strict';

var app = require('../..');
import request from 'supertest';

var newLoan;

describe('Loan API:', function() {

  describe('GET /api/loans', function() {
    var loans;

    beforeEach(function(done) {
      request(app)
        .get('/api/loans')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          loans = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      loans.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/loans', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/loans')
        .send({
          name: 'New Loan',
          info: 'This is the brand new loan!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newLoan = res.body;
          done();
        });
    });

    it('should respond with the newly created loan', function() {
      newLoan.name.should.equal('New Loan');
      newLoan.info.should.equal('This is the brand new loan!!!');
    });

  });

  describe('GET /api/loans/:id', function() {
    var loan;

    beforeEach(function(done) {
      request(app)
        .get('/api/loans/' + newLoan._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          loan = res.body;
          done();
        });
    });

    afterEach(function() {
      loan = {};
    });

    it('should respond with the requested loan', function() {
      loan.name.should.equal('New Loan');
      loan.info.should.equal('This is the brand new loan!!!');
    });

  });

  describe('PUT /api/loans/:id', function() {
    var updatedLoan;

    beforeEach(function(done) {
      request(app)
        .put('/api/loans/' + newLoan._id)
        .send({
          name: 'Updated Loan',
          info: 'This is the updated loan!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLoan = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLoan = {};
    });

    it('should respond with the updated loan', function() {
      updatedLoan.name.should.equal('Updated Loan');
      updatedLoan.info.should.equal('This is the updated loan!!!');
    });

  });

  describe('DELETE /api/loans/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/loans/' + newLoan._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when loan does not exist', function(done) {
      request(app)
        .delete('/api/loans/' + newLoan._id)
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
