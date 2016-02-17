'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var typeIncidentCtrlStub = {
  index: 'typeIncidentCtrl.index',
  show: 'typeIncidentCtrl.show',
  create: 'typeIncidentCtrl.create',
  update: 'typeIncidentCtrl.update',
  destroy: 'typeIncidentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var typeIncidentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './type_incident.controller': typeIncidentCtrlStub
});

describe('TypeIncident API Router:', function() {

  it('should return an express router instance', function() {
    typeIncidentIndex.should.equal(routerStub);
  });

  describe('GET /api/type_incidents', function() {

    it('should route to typeIncident.controller.index', function() {
      routerStub.get
        .withArgs('/', 'typeIncidentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/type_incidents/:id', function() {

    it('should route to typeIncident.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'typeIncidentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/type_incidents', function() {

    it('should route to typeIncident.controller.create', function() {
      routerStub.post
        .withArgs('/', 'typeIncidentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/type_incidents/:id', function() {

    it('should route to typeIncident.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'typeIncidentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/type_incidents/:id', function() {

    it('should route to typeIncident.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'typeIncidentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/type_incidents/:id', function() {

    it('should route to typeIncident.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'typeIncidentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
