let mysql = require('mysql');
let md5 = require('md5');
let mailer = require('../middlewares/send-mail');
let db = require('../middlewares/db');
let log = require('./../middlewares/log');
let links = require('./../middlewares/links');

let headers = {
    "API": "Api rusia", 
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH, DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Charset, Accept"
};

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

const getChats = (req, res) => {
    let {user} = req.body;
    let connection = mysql.createConnection(db);

    let sql = `SELECT chats.chatId, usersAndTheirChats.name, latestMessagesByChats.timestamp, latestMessagesByChats.messageId, messages.content, messages.type AS messageType, users.photo AS userPhoto, messages.isRead, users.isActive AS userIsActive, users.userId, messages.userId AS senderId
    FROM latestMessagesByChats, usersAndTheirChats, chats, userChat, messages, users 
    WHERE userChat.userId = ${user}
    AND chats.chatId = usersAndTheirChats.chatId 
    AND userChat.chatId = chats.chatId 
    AND usersAndTheirChats.chatId = chats.chatId 
    AND latestMessagesByChats.chatId = chats.chatId 
    AND usersAndTheirChats.userId != userChat.userId 
    AND messages.messageId = latestMessagesByChats.messageId 
    AND users.userId = usersAndTheirChats.userId 
    ORDER BY latestMessagesByChats.timestamp DESC`;

    connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        res.set(headers).json(result).status(200).end();
        connection.destroy();
    });
}

const getUserData = (req, res) => {
    let {user} = req.body;
    let connection = mysql.createConnection(db);

    connection.query(`SELECT CONCAT_WS(" ", name, surname) AS name, email, photo FROM users WHERE userId=${user}`, (err, result, fields) => {
        if(err) throw err;
        res.set(headers).json(result[0]).status(200).end();
        connection.destroy();
    }); 
}

const getMessages = (req, res) => {
    let {user, chat, limit} = req.body;
    let connection = mysql.createConnection(db);

        let sql = `SELECT chatId, messageId, content, timestamp, isRead, type AS messageType, userId AS senderId 
        FROM messages 
        WHERE chatId=${chat}
        AND (
            (userId=${user} AND senderCanSee=1)
            OR
            (userId!=${user} AND receiverCanSee=1)
        )
        ORDER BY messageId
        LIMIT 25`;
    if(limit) {
        sql = `SELECT chatId, messageId, content, timestamp, isRead, type AS messageType, userId senderId 
        FROM messages 
        WHERE chatId=${chat}
        AND (
            (userId=${user} AND senderCanSee=1)
            OR
            (userId!=${user} AND receiverCanSee=1)
        )
        AND messageId < ${limit}
        ORDER BY messageId
        LIMIT 25`
    }

    connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        res.set(headers).json(result).status(200).end();
        connection.destroy();
    });
}

const getLastMessageId = (req, res) => {
    let connection = mysql.createConnection(db);
    connection.query(`SELECT COUNT(*) AS count FROM messages`, (err, result, fields) => {
        if(err) throw err;
        res.set(headers).json(result[0]).status(200).end();
        connection.destroy();
    })
}

const getMessage = (req, res) => {
    let connection = mysql.createConnection(db);
    connection.query(`SELECT chatId, messageId, content, timestamp, isRead, type AS messageType, userId AS senderId 
    FROM messages WHERE messageId=${req.body.message}`, (err, result, fields) => {
        if(err) throw err;
        res.set(headers).json(result).status(200).end();
        connection.destroy();
    });
}

const sendMessage = (req, res) => {
    let connection = mysql.createConnection(db);
    let {content, messageType, senderId, chatId} = req.body;
    let timestamp = new Date();
    let sql = `INSERT INTO messages 
    (messageId, chatId, content, timestamp, isRead, type, senderCanSee, receiverCanSee, userId)
    VALUES (NULL, ${chatId}, "${content}", "${timestamp.getTime()}", 0, ${messageType}, 1, 1, ${senderId})`;

    connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        res.set(headers).json({
            chatId: chatId,
            messageId: result.insertId,
            content: content,
            timestamp: timestamp,
            isRead: 0,
            messageType: messageType,
            senderId: senderId
        }).status(200).end();
        connection.destroy();
    })
}

const search = (req, res) => {
    let { word } = req.body;
    let connection = mysql.createConnection(db);
}

module.exports = {
    login,
    logout,
    setActive,
    register,
    confirm,
    getChats,
    getUserData,
    getMessages,
    getLastMessageId,
    getMessage,
    sendMessage
}