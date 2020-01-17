const { Router } = require('express');
const multer = require('multer');
const users = require('./../controllers/users-controller');
const messages = require('./../controllers/msg-controller');
const searchController = require('./../controllers/search-controller');

const upload = multer({ dest: 'public/messages/' });

module.exports = () => {
  const app = Router();
  // localhost:port/api/login

  /*
    req: {
        login: "mati",
        password: "password"
    }
    */
  app.post('/login', users.login);

  // localhost:port/api/logout
  app.post('/logout', users.logout);

  // localhost:port/api/register
  app.post('/register', users.register);

  // localhost:port/api/confirm/:id
  app.get('/confirm/:id', users.confirm);

  // localhost:port/api/getChats

  /*
    req: {
        user: 4
    }
    */
  app.post('/getChats', messages.getChats);

  // localhost:port/api/getUserData
  app.post('/getUserData', messages.getUserData);

  // localhost:port/api/getMessages

  /*
    req: {
        user: 1,
        chat: 2
    }
    */
  app.post('/getMessages', messages.getMessages);

  // localhost:port/api/getLastMessageId
  app.get('/getLastMessageId', messages.getLastMessageId);

  // localhost:port/api/getMessage

  /*
    req: {
        message: 5
    }
    */
  app.post('/getMessage', messages.getMessage);

  // localhost:port/api/sendMessage
  /*
     req: {
         senderId: 3,
         chatId: 4,
         content: "Hej",
         messageType: 0
     }
    */
  app.post('/sendMessage', upload.single('photo'), messages.sendMessage);

  // localhost:port/api/search
  /*
    req: {
        user: 4,
        query: "mat"
    }
     */
  app.post('/search', searchController.search);

  // localhost:port/api/startChat

  /*
    req: {
        first: 4,
        second: 6
    }
    */

  app.post('/startChat', messages.startChat);

  // localhost:port/api/setViewed/?userId=4&chatId=2

  app.get('/setViewed', messages.setViewed);

  // localhost:port/api/checkNewMessages/?chatId=6&messageId=25

  app.get('/checkNewMessages', messages.checkNewMessages);

  // localhost:port/api/getNewMessages/?chatId=6&messageId=25

  app.get('/getNewMessages', messages.getNewMessages);

  // localhost:port/api/getNewMessages/?userId=4&timestamp=1579166482811

  app.get('/checkUpdates', messages.checkUpdates);
  return app;
};
