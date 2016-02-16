'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var borrowerCtrlStub = {
  index: 'borrowerCtrl.index',
  show: 'borrowerCtrl.show',
  create: 'borrowerCtrl.create',
  update: 'borrowerCtrl.update',
  destroy: 'borrowerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var borrowerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './borrower.controller': borrowerCtrlStub
});

describe('Borrower API Router:', function() {

  it('should return an express router instance', function() {
    borrowerIndex.should.equal(routerStub);
  });

  describe('GET /api/borrowers', function() {

    it('should route to borrower.controller.index', function() {
      routerStub.get
        .withArgs('/', 'borrowerCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/borrowers/:id', function() {

    it('should route to borrower.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'borrowerCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/borrowers', function() {

    it('should route to borrower.controller.create', function() {
      routerStub.post
        .withArgs('/', 'borrowerCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/borrowers/:id', function() {

    it('should route to borrower.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'borrowerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/borrowers/:id', function() {

    it('should route to borrower.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'borrowerCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/borrowers/:id', function() {

    it('should route to borrower.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'borrowerCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
