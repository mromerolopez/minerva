'use strict';

var express = require('express');
var controller = require('./user.controller');

var jwt=require('express-jwt');
var jwtConfig=require('../jwtConfig');
var secret=jwtConfig.getSecret();

var router = express.Router();

router.get('/',jwt({secret:secret}), controller.index);
router.get('/:id',jwt({secret:secret}), controller.show);
router.post('/',jwt({secret:secret}), controller.create);
router.post('/login', controller.login);
router.put('/:id',jwt({secret:secret}), controller.update);
router.patch('/:id',jwt({secret:secret}), controller.update);
router.delete('/:id',jwt({secret:secret}), controller.destroy);
router.get('/last/logins',jwt({secret:secret}), controller.lastLogins);

module.exports = router;
