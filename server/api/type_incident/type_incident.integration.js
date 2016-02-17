'use strict';

var app = require('../..');
import request from 'supertest';

var newTypeIncident;

describe('TypeIncident API:', function() {

  describe('GET /api/type_incidents', function() {
    var typeIncidents;

    beforeEach(function(done) {
      request(app)
        .get('/api/type_incidents')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          typeIncidents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      typeIncidents.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/type_incidents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/type_incidents')
        .send({
          name: 'New TypeIncident',
          info: 'This is the brand new typeIncident!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTypeIncident = res.body;
          done();
        });
    });

    it('should respond with the newly created typeIncident', function() {
      newTypeIncident.name.should.equal('New TypeIncident');
      newTypeIncident.info.should.equal('This is the brand new typeIncident!!!');
    });

  });

  describe('GET /api/type_incidents/:id', function() {
    var typeIncident;

    beforeEach(function(done) {
      request(app)
        .get('/api/type_incidents/' + newTypeIncident._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          typeIncident = res.body;
          done();
        });
    });

    afterEach(function() {
      typeIncident = {};
    });

    it('should respond with the requested typeIncident', function() {
      typeIncident.name.should.equal('New TypeIncident');
      typeIncident.info.should.equal('This is the brand new typeIncident!!!');
    });

  });

  describe('PUT /api/type_incidents/:id', function() {
    var updatedTypeIncident;

    beforeEach(function(done) {
      request(app)
        .put('/api/type_incidents/' + newTypeIncident._id)
        .send({
          name: 'Updated TypeIncident',
          info: 'This is the updated typeIncident!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTypeIncident = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTypeIncident = {};
    });

    it('should respond with the updated typeIncident', function() {
      updatedTypeIncident.name.should.equal('Updated TypeIncident');
      updatedTypeIncident.info.should.equal('This is the updated typeIncident!!!');
    });

  });

  describe('DELETE /api/type_incidents/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/type_incidents/' + newTypeIncident._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when typeIncident does not exist', function(done) {
      request(app)
        .delete('/api/type_incidents/' + newTypeIncident._id)
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
