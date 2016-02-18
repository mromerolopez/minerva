'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var centerCtrlStub = {
  index: 'centerCtrl.index',
  show: 'centerCtrl.show',
  create: 'centerCtrl.create',
  update: 'centerCtrl.update',
  destroy: 'centerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var centerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './center.controller': centerCtrlStub
});

describe('Center API Router:', function() {

  it('should return an express router instance', function() {
    centerIndex.should.equal(routerStub);
  });

  describe('GET /api/centers', function() {

    it('should route to center.controller.index', function() {
      routerStub.get
        .withArgs('/', 'centerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/centers/:id', function() {

    it('should route to center.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'centerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/centers', function() {

    it('should route to center.controller.create', function() {
      routerStub.post
        .withArgs('/', 'centerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/centers/:id', function() {

    it('should route to center.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'centerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/centers/:id', function() {

    it('should route to center.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'centerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/centers/:id', function() {

    it('should route to center.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'centerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
