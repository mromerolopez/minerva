/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import User from './user.model';
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
var jwtConfig=require('../jwtConfig');
var secret=jwtConfig.getSecret();

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Users
export function index(req, res) {
  User.findAsync({active:true})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single User from the DB
export function show(req, res) {
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new User in the DB
export function create(req, res) {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            
            if (err) {
                res.status(500).end();
            }
            
            req.body.password = hash;
            User.createAsync(req.body)
                .then(respondWithResult(res, 201))
                .catch(handleError(res));
            
        });
    });
}

// Updates an existing User in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  
  bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            
            if (err) {
                res.status(500).end();
            }
            
            req.body.password = hash;
             User.findByIdAsync(req.params.id)
                .then(handleEntityNotFound(res))
                .then(saveUpdates(req.body))
                .then(respondWithResult(res))
                .catch(handleError(res));
        });
    });
  
 
}

// Deletes a User from the DB
export function destroy(req, res) {
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Login

export function login(req, res){
    var username = req.body.user;
    var password = req.body.pass;
    
    User.findOne({
        username: username
    }, function (err, user) {
        
        if (err) {
            throw err;
        }
        
        if (!user) {
            res.json({
                success: false,
                message: "Atopouse un erro. O usuario parece que non existe"
            });

        } else if (user) {
           
            bcrypt.compare(password, user.password, function(err, result) {

                if (!result) {
                    res.json({success: false, message: "Atopouse un erro. O contrasinal non encaixa"});
                } else {
                    
                    User.findByIdAndUpdate(user._id, {last_login: new Date()});
                   
                    delete user.password;
                    
                    var token=jwt.sign(user,secret,{expiresIn:"1d"}); 
                    
                    res.json({
                        message:'All right',
                        success: true,
                        user: user,
                        token: token
                    });
                }
            });
           
        }
    });
}
    
    
export function lastLogins(req, res){
    
    User.find({active:true})
            .sort({'last_login':-1})
            .limit(10)
            .then(function(users){
                res.json(users);
            });
     
            
}

export function checkEmail(req, res){
    var email =  req.body.email;
    
    User.findOne({email: email}, "email")
            .then(function(user){
                res.json(user);
            })
            .catch(handleError(res));
}

export function rememberPassword(req, res){

    
    var randomstring = require("randomstring");
    
    var options = {
            length: 12,
            charset: 'alphabetic'
        };
    var newPassword = randomstring.generate(options);
    
    hashPassword(newPassword, function(hashedPassword){
        User.findByIdAndUpdate(req.params.id, {'password': hashedPassword})
                .then(function(user){
                    sendMail(user.email, 'Your password has been reseted. Your new password is '+newPassword);
                    res.status(200).send(user);
                })
                .catch(handleError(res));
    });
}