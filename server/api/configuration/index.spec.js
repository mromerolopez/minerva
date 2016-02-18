'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var configurationCtrlStub = {
  index: 'configurationCtrl.index',
  show: 'configurationCtrl.show',
  create: 'configurationCtrl.create',
  update: 'configurationCtrl.update',
  destroy: 'configurationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var configurationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './configuration.controller': configurationCtrlStub
});

describe('Configuration API Router:', function() {

  it('should return an express router instance', function() {
    configurationIndex.should.equal(routerStub);
  });

  describe('GET /api/configurations', function() {

    it('should route to configuration.controller.index', function() {
      routerStub.get
        .withArgs('/', 'configurationCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/configurations/:id', function() {

    it('should route to configuration.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'configurationCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/configurations', function() {

    it('should route to configuration.controller.create', function() {
      routerStub.post
        .withArgs('/', 'configurationCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/configurations/:id', function() {

    it('should route to configuration.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'configurationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/configurations/:id', function() {

    it('should route to configuration.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'configurationCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/configurations/:id', function() {

    it('should route to configuration.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'configurationCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
