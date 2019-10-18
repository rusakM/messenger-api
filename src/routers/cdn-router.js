let Router = require('express').Router;
let Cdn = require('./../controllers/cdn-controller');


module.exports = () => {
    const app = Router();

    app.get('/photo/:id', Cdn.getPhoto);

    app.get('/message/:id', Cdn.getMessage);

    return app;
}