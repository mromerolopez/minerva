'use strict';

var app = require('../..');
import request from 'supertest';

var newConfiguration;

describe('Configuration API:', function() {

  describe('GET /api/configurations', function() {
    var configurations;

    beforeEach(function(done) {
      request(app)
        .get('/api/configurations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          configurations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      configurations.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/configurations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/configurations')
        .send({
          name: 'New Configuration',
          info: 'This is the brand new configuration!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newConfiguration = res.body;
          done();
        });
    });

    it('should respond with the newly created configuration', function() {
      newConfiguration.name.should.equal('New Configuration');
      newConfiguration.info.should.equal('This is the brand new configuration!!!');
    });

  });

  describe('GET /api/configurations/:id', function() {
    var configuration;

    beforeEach(function(done) {
      request(app)
        .get('/api/configurations/' + newConfiguration._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          configuration = res.body;
          done();
        });
    });

    afterEach(function() {
      configuration = {};
    });

    it('should respond with the requested configuration', function() {
      configuration.name.should.equal('New Configuration');
      configuration.info.should.equal('This is the brand new configuration!!!');
    });

  });

  describe('PUT /api/configurations/:id', function() {
    var updatedConfiguration;

    beforeEach(function(done) {
      request(app)
        .put('/api/configurations/' + newConfiguration._id)
        .send({
          name: 'Updated Configuration',
          info: 'This is the updated configuration!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedConfiguration = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConfiguration = {};
    });

    it('should respond with the updated configuration', function() {
      updatedConfiguration.name.should.equal('Updated Configuration');
      updatedConfiguration.info.should.equal('This is the updated configuration!!!');
    });

  });

  describe('DELETE /api/configurations/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/configurations/' + newConfiguration._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when configuration does not exist', function(done) {
      request(app)
        .delete('/api/configurations/' + newConfiguration._id)
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
