'use strict';

var app = require('../..');
import request from 'supertest';

var newIncident;

describe('Incident API:', function() {

  describe('GET /api/incidents', function() {
    var incidents;

    beforeEach(function(done) {
      request(app)
        .get('/api/incidents')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          incidents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      incidents.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/incidents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/incidents')
        .send({
          name: 'New Incident',
          info: 'This is the brand new incident!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newIncident = res.body;
          done();
        });
    });

    it('should respond with the newly created incident', function() {
      newIncident.name.should.equal('New Incident');
      newIncident.info.should.equal('This is the brand new incident!!!');
    });

  });

  describe('GET /api/incidents/:id', function() {
    var incident;

    beforeEach(function(done) {
      request(app)
        .get('/api/incidents/' + newIncident._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          incident = res.body;
          done();
        });
    });

    afterEach(function() {
      incident = {};
    });

    it('should respond with the requested incident', function() {
      incident.name.should.equal('New Incident');
      incident.info.should.equal('This is the brand new incident!!!');
    });

  });

  describe('PUT /api/incidents/:id', function() {
    var updatedIncident;

    beforeEach(function(done) {
      request(app)
        .put('/api/incidents/' + newIncident._id)
        .send({
          name: 'Updated Incident',
          info: 'This is the updated incident!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIncident = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIncident = {};
    });

    it('should respond with the updated incident', function() {
      updatedIncident.name.should.equal('Updated Incident');
      updatedIncident.info.should.equal('This is the updated incident!!!');
    });

  });

  describe('DELETE /api/incidents/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/incidents/' + newIncident._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when incident does not exist', function(done) {
      request(app)
        .delete('/api/incidents/' + newIncident._id)
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
