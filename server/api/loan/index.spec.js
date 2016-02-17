'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var loanCtrlStub = {
  index: 'loanCtrl.index',
  show: 'loanCtrl.show',
  create: 'loanCtrl.create',
  update: 'loanCtrl.update',
  destroy: 'loanCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var loanIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './loan.controller': loanCtrlStub
});

describe('Loan API Router:', function() {

  it('should return an express router instance', function() {
    loanIndex.should.equal(routerStub);
  });

  describe('GET /api/loans', function() {

    it('should route to loan.controller.index', function() {
      routerStub.get
        .withArgs('/', 'loanCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/loans/:id', function() {

    it('should route to loan.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'loanCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/loans', function() {

    it('should route to loan.controller.create', function() {
      routerStub.post
        .withArgs('/', 'loanCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/loans/:id', function() {

    it('should route to loan.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'loanCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/loans/:id', function() {

    it('should route to loan.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'loanCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/loans/:id', function() {

    it('should route to loan.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'loanCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
