let Router = require('express').Router;
let users = require('./../controllers/users-controller');
//let data = require('./../controllers/data-controller');

module.exports = () => {
    const app = Router();
    //localhost:port/api/login

    /* 
    req: {
        login: "mati",
        password: "password"
    }
    */
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

    /*
    req: {
        user: 4
    }
    */
    app.post('/getChats', users.getChats);

    //localhost:port/api/getUserData
    app.post('/getUserData', users.getUserData);

    //localhost:port/api/getMessages

    /*
    req: {
        user: 1,
        chat: 2
    }
    */
    app.post('/getMessages', users.getMessages);

    //localhost:port/api/getLastMessageId
    app.get('/getLastMessageId', users.getLastMessageId);

    //localhost:port/api/getMessage

    /*
    req: {
        message: 5
    }
    */
    app.post('/getMessage', users.getMessage);

    //localhost:port/api/sendMessage
    /*
     req: {
         senderId: 3,
         chatId: 4,
         content: "Hej",
         messageType: 0
     }
    */
     app.post('/sendMessage', users.sendMessage);

    return app;
}