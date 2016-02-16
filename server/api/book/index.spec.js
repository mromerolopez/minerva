'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bookCtrlStub = {
  index: 'bookCtrl.index',
  show: 'bookCtrl.show',
  create: 'bookCtrl.create',
  update: 'bookCtrl.update',
  destroy: 'bookCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bookIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './book.controller': bookCtrlStub
});

describe('Book API Router:', function() {

  it('should return an express router instance', function() {
    bookIndex.should.equal(routerStub);
  });

  describe('GET /api/books', function() {

    it('should route to book.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bookCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/books/:id', function() {

    it('should route to book.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bookCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/books', function() {

    it('should route to book.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bookCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/books/:id', function() {

    it('should route to book.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bookCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/books/:id', function() {

    it('should route to book.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bookCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/books/:id', function() {

    it('should route to book.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bookCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
