const { Router } = require('express');
const multer = require('multer');
const Cdn = require('./../controllers/cdn-controller');

const upload = multer({ dest: `${process.cwd()}/public/messagess` });

module.exports = () => {
  const app = Router();

  app.get('/photo/:id', Cdn.getPhoto);

  app.get('/message/:id', Cdn.getMessage);

  app.post('/saveMessage', Cdn.saveMessage);

  app.post('/savePhoto', upload.single('avatar'), () =>
    console.log('image saved'),
  );

  return app;
};
