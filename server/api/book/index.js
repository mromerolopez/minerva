'use strict';

const express = require('express');
const controller = require('./book.controller');

const jwt = require('express-jwt');
const jwtConfig = require('../jwtConfig');
const secret = jwtConfig.getSecret();

const router = express.Router();

router.get('/', jwt({ secret }), controller.index);
router.get('/:id', jwt({ secret }), controller.show);
router.post('/', jwt({ secret }), controller.create);
router.put('/:id', jwt({ secret }), controller.update);
router.patch('/:id', jwt({ secret }), controller.update);
router.delete('/:id', jwt({ secret }), controller.destroy);
router.get('/get/filter/:query', jwt({ secret }), controller.findByFilter);

module.exports = router;
