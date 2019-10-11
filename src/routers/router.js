let Router = require('express').Router;
let users = require('./../controllers/users-controller');
let messages = require('./../controllers/msg-controller');
let searchController = require('./../controllers/search-controller');

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
    app.post('/getChats', messages.getChats);

    //localhost:port/api/getUserData
    app.post('/getUserData', messages.getUserData);

    //localhost:port/api/getMessages

    /*
    req: {
        user: 1,
        chat: 2
    }
    */
    app.post('/getMessages', messages.getMessages);

    //localhost:port/api/getLastMessageId
    app.get('/getLastMessageId', messages.getLastMessageId);

    //localhost:port/api/getMessage

    /*
    req: {
        message: 5
    }
    */
    app.post('/getMessage', messages.getMessage);

    //localhost:port/api/sendMessage
    /*
     req: {
         senderId: 3,
         chatId: 4,
         content: "Hej",
         messageType: 0
     }
    */
     app.post('/sendMessage', messages.sendMessage);

     //localhost:port/api/search
     /*
    req: {
        user: 4,
        query: "mat"
    }
     */
    app.post('/search', searchController.search);


    //localhost:port/api/startChat

    /*
    req: {
        first: 4,
        second: 6
    }
    */

    app.post('/startChat', messages.startChat);

    return app;
}