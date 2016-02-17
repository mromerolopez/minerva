'use strict';

var app = require('../..');
import request from 'supertest';

var newUser;

describe('User API:', function() {

  describe('GET /api/users', function() {
    var users;

    beforeEach(function(done) {
      request(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          users = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      users.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/users', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/users')
        .send({
          name: 'New User',
          info: 'This is the brand new user!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUser = res.body;
          done();
        });
    });

    it('should respond with the newly created user', function() {
      newUser.name.should.equal('New User');
      newUser.info.should.equal('This is the brand new user!!!');
    });

  });

  describe('GET /api/users/:id', function() {
    var user;

    beforeEach(function(done) {
      request(app)
        .get('/api/users/' + newUser._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          user = res.body;
          done();
        });
    });

    afterEach(function() {
      user = {};
    });

    it('should respond with the requested user', function() {
      user.name.should.equal('New User');
      user.info.should.equal('This is the brand new user!!!');
    });

  });

  describe('PUT /api/users/:id', function() {
    var updatedUser;

    beforeEach(function(done) {
      request(app)
        .put('/api/users/' + newUser._id)
        .send({
          name: 'Updated User',
          info: 'This is the updated user!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedUser = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUser = {};
    });

    it('should respond with the updated user', function() {
      updatedUser.name.should.equal('Updated User');
      updatedUser.info.should.equal('This is the updated user!!!');
    });

  });

  describe('DELETE /api/users/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/users/' + newUser._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when user does not exist', function(done) {
      request(app)
        .delete('/api/users/' + newUser._id)
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
