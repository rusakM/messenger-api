let mysql = require('mysql');
let md5 = require('md5');
let mailer = require('../middlewares/send-mail');
let db = require('../middlewares/db');
let log = require('./../middlewares/log');
let links = require('./../middlewares/links');
let headers = require('./../middlewares/headers');

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
    
    let {content, messageType, senderId, chatId} = req.body;
    let connection = mysql.createConnection(db);
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
    });
}

const search = (req, res) => {
    let { word } = req.body;
    let connection = mysql.createConnection(db);
}

module.exports = {
    getChats,
    getUserData,
    getMessages,
    getLastMessageId,
    getMessage,
    sendMessage
}