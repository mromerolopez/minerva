'use strict';

var app = require('../..');
import request from 'supertest';

var newCopy;

describe('Copy API:', function() {

  describe('GET /copies', function() {
    var copys;

    beforeEach(function(done) {
      request(app)
        .get('/copies')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          copys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      copys.should.be.instanceOf(Array);
    });

  });

  describe('POST /copies', function() {
    beforeEach(function(done) {
      request(app)
        .post('/copies')
        .send({
          name: 'New Copy',
          info: 'This is the brand new copy!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCopy = res.body;
          done();
        });
    });

    it('should respond with the newly created copy', function() {
      newCopy.name.should.equal('New Copy');
      newCopy.info.should.equal('This is the brand new copy!!!');
    });

  });

  describe('GET /copies/:id', function() {
    var copy;

    beforeEach(function(done) {
      request(app)
        .get('/copies/' + newCopy._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          copy = res.body;
          done();
        });
    });

    afterEach(function() {
      copy = {};
    });

    it('should respond with the requested copy', function() {
      copy.name.should.equal('New Copy');
      copy.info.should.equal('This is the brand new copy!!!');
    });

  });

  describe('PUT /copies/:id', function() {
    var updatedCopy;

    beforeEach(function(done) {
      request(app)
        .put('/copies/' + newCopy._id)
        .send({
          name: 'Updated Copy',
          info: 'This is the updated copy!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCopy = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCopy = {};
    });

    it('should respond with the updated copy', function() {
      updatedCopy.name.should.equal('Updated Copy');
      updatedCopy.info.should.equal('This is the updated copy!!!');
    });

  });

  describe('DELETE /copies/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/copies/' + newCopy._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when copy does not exist', function(done) {
      request(app)
        .delete('/copies/' + newCopy._id)
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
