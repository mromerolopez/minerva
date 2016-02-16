'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var copyCtrlStub = {
  index: 'copyCtrl.index',
  show: 'copyCtrl.show',
  create: 'copyCtrl.create',
  update: 'copyCtrl.update',
  destroy: 'copyCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var copyIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './copy.controller': copyCtrlStub
});

describe('Copy API Router:', function() {

  it('should return an express router instance', function() {
    copyIndex.should.equal(routerStub);
  });

  describe('GET /copies', function() {

    it('should route to copy.controller.index', function() {
      routerStub.get
        .withArgs('/', 'copyCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /copies/:id', function() {

    it('should route to copy.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'copyCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /copies', function() {

    it('should route to copy.controller.create', function() {
      routerStub.post
        .withArgs('/', 'copyCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /copies/:id', function() {

    it('should route to copy.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'copyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /copies/:id', function() {

    it('should route to copy.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'copyCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /copies/:id', function() {

    it('should route to copy.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'copyCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
