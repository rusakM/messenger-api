let express = require('express');
let bodyParser = require('body-parser');
let http = require('http');
let api = require('./routers/router');
//let cdn = require('./routers/cdn-router');

let app = express();
let port = 3001;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', api());
//app.use('/cdn', cdn());

let server = http.createServer(app);

server.listen(port, () => console.log(`Server is running on port: ${port}`));