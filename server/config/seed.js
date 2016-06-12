/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import User from '../api/user/user.model.js';
import Configuration from '../api/configuration/configuration.model.js';
import Borrower from '../api/borrower/borrower.model.js';

User.find().removeAsync().then(()=>{
    User.create({
        _id: "56d00af1deb492e4006e612f",
        name: "Manolo",
        surname1: "Fernández",
        surname2: "Vázquez",
        username: "usuario1",
        email: 'manolo@fernandez.com',
        password: "$2a$10$dluPGALL3gZCGlTy6aGZmeHxkuOayjDvDoqCyhvWXSZiPaFygkc/W",
        configuration: "56d00af1deb492e4006e612f",
        last_login: Date.now()
    })
});

Borrower.find().removeAsync().then(()=>{
    Borrower.create({
        _id: "56d40abe4df0c37c0601942b",
        name: "Paco",
        surname1: "Martinez",
        surname2: "Soria",
        classroom: "FP Basica 2",
        nif: "Y-56985-HJ",
        email: "falso@yosoy.com",
        type: "Alumno"

    })
});



Configuration.find().removeAsync().then(()=>{
    Configuration.create({
        _id: "56e53c74a2085f9013286537",
        user: "56d00af1deb492e4006e612f",
        incident_types: [{name: "Esnaquizado"}, {name: "Retraso"}],
        borrower_types: [{name:"Profesor"}, {name:"Alumno"}, {name:"FP básica"}],
        book_type: [{name:"Fp básica"}, {name:"Sanitario"}],
        locations: [{name:"Biblioteca"}, {name:"Aula de bioloxía"}]
    })
});

