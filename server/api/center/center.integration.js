'use strict';

var app = require('../..');
import request from 'supertest';

var newCenter;

describe('Center API:', function() {

  describe('GET /api/centers', function() {
    var centers;

    beforeEach(function(done) {
      request(app)
        .get('/api/centers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          centers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      centers.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/centers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/centers')
        .send({
          name: 'New Center',
          info: 'This is the brand new center!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCenter = res.body;
          done();
        });
    });

    it('should respond with the newly created center', function() {
      newCenter.name.should.equal('New Center');
      newCenter.info.should.equal('This is the brand new center!!!');
    });

  });

  describe('GET /api/centers/:id', function() {
    var center;

    beforeEach(function(done) {
      request(app)
        .get('/api/centers/' + newCenter._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          center = res.body;
          done();
        });
    });

    afterEach(function() {
      center = {};
    });

    it('should respond with the requested center', function() {
      center.name.should.equal('New Center');
      center.info.should.equal('This is the brand new center!!!');
    });

  });

  describe('PUT /api/centers/:id', function() {
    var updatedCenter;

    beforeEach(function(done) {
      request(app)
        .put('/api/centers/' + newCenter._id)
        .send({
          name: 'Updated Center',
          info: 'This is the updated center!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCenter = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCenter = {};
    });

    it('should respond with the updated center', function() {
      updatedCenter.name.should.equal('Updated Center');
      updatedCenter.info.should.equal('This is the updated center!!!');
    });

  });

  describe('DELETE /api/centers/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/centers/' + newCenter._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when center does not exist', function(done) {
      request(app)
        .delete('/api/centers/' + newCenter._id)
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
