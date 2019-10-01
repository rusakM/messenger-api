let Router = require('express').Router;
let users = require('./../controllers/users-controller');
//let data = require('./../controllers/data-controller');

module.exports = () => {
    const app = Router();
    //localhost:port/api/login
    app.post('/login', users.login);

    //localhost:port/api/logout
    app.post('/logout', users.logout);

    //localhost:port/api/setActive
    app.post('/setActive', users.setActive);

    //localhost:port/api/register
    app.post('/register', users.register);

    //localhost:port/api/confirm/:id
    app.get('/confirm/:id', users.confirm);

    //localhost:port/api/getChats
    app.post('/getChats', users.getChats);

    //localhost:port/api/getUserData
    app.post('/getUserData', users.getUserData);


    return app;
}