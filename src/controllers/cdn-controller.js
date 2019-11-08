const fs = require('fs');
const headers = require('../middlewares/headers');

const avatar = `${process.cwd()}/public/photos/avatar.png`;

const getPhoto = (req, res) => {
  const { id } = req.params;
  const link = `${process.cwd()}/public/photos/${id}.jpg`;
  if (fs.existsSync(link)) {
    fs.readFile(link, (err, data) => {
      if (err) console.log(err);
      res.set(headers);
      res.write(data);
      res.status(200);
      res.end();
    });
  } else {
    fs.readFile(avatar, (err, data) => {
      res.set(headers);
      res.write(data);
      res.status(200);
      res.end();
    });
  }
};

const getMessage = (req, res) => {
  const { id } = req.params;
  const link = `${process.cwd()}/public/messages/${id}.jpg`;
  if (fs.existsSync(link)) {
    fs.readFile(link, (err, data) => {
      if (err) console.log(err);
      res.set(headers);
      res.write(data);
      res.status(200);
      res.end();
    });
  } else {
    fs.readFile(avatar, (err, data) => {
      res.set(headers);
      res.write('Fetch photo error');
      res.status(200);
      res.end();
    });
  }
};

const saveMessage = (req, res) => {
  if (req.body.image) {
    req.body.image.write(`${process.cwd()}/public/messages/${req.body.id}.jpg`);
  }
  res.set(headers);
  res.status(200);
  res.end();
};

module.exports = {
  getPhoto,
  getMessage,
  saveMessage,
};
