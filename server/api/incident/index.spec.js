'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var incidentCtrlStub = {
  index: 'incidentCtrl.index',
  show: 'incidentCtrl.show',
  create: 'incidentCtrl.create',
  update: 'incidentCtrl.update',
  destroy: 'incidentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var incidentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './incident.controller': incidentCtrlStub
});

describe('Incident API Router:', function() {

  it('should return an express router instance', function() {
    incidentIndex.should.equal(routerStub);
  });

  describe('GET /api/incidents', function() {

    it('should route to incident.controller.index', function() {
      routerStub.get
        .withArgs('/', 'incidentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/incidents/:id', function() {

    it('should route to incident.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'incidentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/incidents', function() {

    it('should route to incident.controller.create', function() {
      routerStub.post
        .withArgs('/', 'incidentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/incidents/:id', function() {

    it('should route to incident.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'incidentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/incidents/:id', function() {

    it('should route to incident.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'incidentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/incidents/:id', function() {

    it('should route to incident.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'incidentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
