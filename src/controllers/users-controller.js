let mysql = require('mysql');
let md5 = require('md5');
let mailer = require('../middlewares/send-mail');
let db = require('../middlewares/db');
let log = require('./../middlewares/log');
let links = require('./../middlewares/links');
let headers = require('./../middlewares/headers');

const login = (req, res) => {
    let connection = mysql.createConnection(db);

    connection.query(`SELECT userId, activated FROM users WHERE email="${req.body.email}" AND password="${md5(req.body.password)}"`, (err, result, fields) => {
        if(err) throw err;
        
        res.set(headers);
        if(result.length === 1) {
            if(result[0].activated === 1) {
                res.json({
                    loginStatus: 1,
                    user: result[0].userId
                }).end();
                log(result[0].userId, 'Login');
            }
            else {
                res.json({
                    loginStatus: 0
                }).end();
            }
        }
        else {
            res.json({
                loginStatus: -1
            }).end();
        }
        connection.destroy();
    });
}

const logout = (req, res) => {
    let connection = mysql.createConnection(db);
    let time = new Date();

    connection.query(`UPDATE users SET isActive=0, lastSeen="${time.getTime()}" WHERE userId=${req.body.user}`, (err, result, fields) => {
        if(err) throw err;

        res.set(headers).status(200).end();
        log(req.body.user, "Logout");

        connection.destroy();
    });
}

const setActive = (req, res) => {
    let connection = mysql.createConnection(db);

    connection.query(`UPDATE users SET isActive=1 WHERE userId=${req.body.user}`, (err, result, fields) => {
        if(err) throw err;

        res.set(headers).status(200).end();

        connection.destroy();
    });
}

let register = (req, res) => {
    let connection = mysql.createConnection(db);
    let {email, password, name, surname} = req.body;
    let query = `SELECT userId FROM users WHERE email="${email}"`;
    let registerStatus = 0;
    connection.query(query, (err, result, fields) => {
        if(err) throw err;
        if(result.length > 0) {
            res.set(headers).json({
                registerStatus: registerStatus
            }).end();
            connection.destroy();
        } 
        else {
            registerStatus = 1;
        }
    });

    if(registerStatus === 0) {
        return;
    }
    if(email == '' || password == '' || name == '' || surname == '') {
        connection.destroy();
        res.set(headers).json({
            registerStatus: -1
        }).end();
        return;
    }
    
    connection.query(`INSERT INTO users (userId, email, password, name, surname, isActive, lastSeen, photo, activated) VALUES (NULL, "${req.body.email}", "${md5(req.body.password)}", "${req.body.name}", "${req.body.surname}", 0, NULL, NULL, NULL)`, (err, result, fields) => {
        if(err) throw err;
        mailer(req.body.email, result.insertId, `${req.body.name} ${req.body.surname}`);
        res.set(headers).json({
            registerStatus: 1
        }).end();
        connection.destroy();
    });
}

const confirm = (req, res) => {
    let userId = req.params.id;
    let connection = mysql.createConnection(db);

    connection.query(`UPDATE users SET activated=1 WHERE userId=${userId}`, (err, result, fields) => {
        if(err) throw (err);

        res.set(headers)
        .status(200)
        .send(`<h2>Account is activated</h2><br><a href="${links.frontend}/login">Login here</a>`)
        .end();

        log(userId, "Account activated");
        connection.destroy();
    });
}



module.exports = {
    login,
    logout,
    setActive,
    register,
    confirm
}