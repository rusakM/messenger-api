const { Router } = require('express');
const Cdn = require('./../controllers/cdn-controller');

module.exports = () => {
  const app = Router();

  app.get('/photo/:id', Cdn.getPhoto);

  app.get('/message/:id', Cdn.getMessage);

  app.post('/saveMessage', Cdn.saveMessage);

  return app;
};
