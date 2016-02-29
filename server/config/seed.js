/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
//import Thing from '../api/thing/thing.model';
//
//Thing.find({}).removeAsync()
//  .then(() => {
//    Thing.create({
//      name: 'Development Tools',
//      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
//             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
//             'Stylus, Sass, and Less.'
//    }, {
//      name: 'Server and Client integration',
//      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
//             'AngularJS, and Node.'
//    }, {
//      name: 'Smart Build System',
//      info: 'Build system ignores `spec` files, allowing you to keep ' +
//             'tests alongside code. Automatic injection of scripts and ' +
//             'styles into your index.html'
//    }, {
//      name: 'Modular Structure',
//      info: 'Best practice client and server structures allow for more ' +
//             'code reusability and maximum scalability'
//    }, {
//      name: 'Optimized Build',
//      info: 'Build process packs up your templates as a single JavaScript ' +
//             'payload, minifies your scripts/css/images, and rewrites asset ' +
//             'names for caching.'
//    }, {
//      name: 'Deployment Ready',
//      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
//             'and openshift subgenerators'
//    });
//  });

import User from '../api/user/user.model.js';

User.find().removeAsync().then(()=>{
    User.create({
        _id: "56d00af1deb492e4006e612f",
        name: "Señor",
        surname1: "me enfado pero",
        surname2: "si me compras patatas se me pasa",
        username: "usuario1",
        password: "pass",
        last_login: Date.now()
    })
});


import Borrower from '../api/borrower/borrower.model.js';

Borrower.find().removeAsync().then(()=>{
    Borrower.create({
        _id: "56d40abe4df0c37c0601942b",
        name: "Paco",
        surname1: "Martinez",
        surname2: "Soria",
        classroom: "FP Basica 2",
        nif: "Y-56985-HJ",
        email: "falso@yosoy.com"
    })
});
