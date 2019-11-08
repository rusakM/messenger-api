const mysql = require('mysql');
const base64img = require('base64-img');
const md5 = require('md5');
const db = require('../middlewares/db');
const log = require('./../middlewares/log');
const headers = require('./../middlewares/headers');

const getChats = (req, res) => {
  const { user } = req.body;
  const connection = mysql.createConnection(db);

  const sql = `SELECT chats.chatId, usersAndTheirChats.name, latestMessagesByChats.timestamp, latestMessagesByChats.messageId, messages.content, messages.type AS messageType, users.photo AS userPhoto, messages.isRead, users.isActive AS userIsActive, users.userId, messages.userId AS senderId
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
    if (err) throw err;
    res
      .set(headers)
      .json(result)
      .status(200)
      .end();
    connection.destroy();
  });
};

const getUserData = (req, res) => {
  const { user } = req.body;
  const connection = mysql.createConnection(db);

  connection.query(
    `SELECT CONCAT_WS(" ", name, surname) AS name, email, photo FROM users WHERE userId=${user}`,
    (err, result, fields) => {
      if (err) throw err;
      res
        .set(headers)
        .json(result[0])
        .status(200)
        .end();
      connection.destroy();
    },
  );
};

const getMessages = (req, res) => {
  const { user, chat, limit } = req.body;
  const connection = mysql.createConnection(db);

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
  if (limit) {
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
        LIMIT 25`;
  }

  connection.query(sql, (err, result, fields) => {
    if (err) throw err;
    res
      .set(headers)
      .json(result)
      .status(200)
      .end();
    connection.destroy();
  });
};

const getLastMessageId = (req, res) => {
  const connection = mysql.createConnection(db);
  connection.query(
    'SELECT COUNT(*) AS count FROM messages',
    (err, result, fields) => {
      if (err) throw err;
      res
        .set(headers)
        .json(result[0])
        .status(200)
        .end();
      connection.destroy();
    },
  );
};

const getMessage = (req, res) => {
  const connection = mysql.createConnection(db);
  connection.query(
    `SELECT chatId, messageId, content, timestamp, isRead, type AS messageType, userId AS senderId 
    FROM messages WHERE messageId=${req.body.message}`,
    (err, result, fields) => {
      if (err) throw err;
      res
        .set(headers)
        .json(result)
        .status(200)
        .end();
      connection.destroy();
    },
  );
};

const sendMessage = (req, res) => {
  res.set(headers);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  const { content, messageType, senderId, chatId } = req.body;
  const { photo } = req.body;
  console.log(req.body);
  const connection = mysql.createConnection(db);
  const timestamp = new Date();
  const sql = `INSERT INTO messages 
    (messageId, chatId, content, timestamp, isRead, type, senderCanSee, receiverCanSee, userId)
    VALUES (NULL, ${chatId}, "${content}", "${timestamp.getTime()}", 0, ${messageType}, 1, 1, ${senderId})`;

  res.status(200).end();

  // connection.query(sql, (err, result, fields) => {
  //   if (err) throw err;
  //   if (photo) {
  //     console.log(md5(photo));
  //     base64img.imgSync(
  //       photo,
  //       `${process.cwd()}/public/messages`,
  //       `${result.insertId}`,
  //     );
  //   }
  //   res
  //     .set(headers)
  //     .json({
  //       chatId,
  //       messageId: result.insertId,
  //       content,
  //       timestamp,
  //       isRead: 0,
  //       messageType,
  //       senderId,
  //     })
  //     .status(200)
  //     .end();
  //   connection.destroy();
  // });
};

const startChat = (req, res) => {
  const { first, second } = req.body;
  const connection = mysql.createConnection(db);

  connection.query(
    'INSERT INTO chats (chatId) VALUES (NULL)',
    (err, result, fields) => {
      if (err) throw err;
      const { insertId } = result;
      const timestamp = new Date();
      // res.set(headers).json(result).end();
      // connection.destroy();

      connection.query(
        `INSERT INTO userChat (userChatId, userId, chatId) 
            VALUES (NULL, ${first}, ${insertId}),
            (NULL, ${second}, ${insertId})`,
        (err, results, fields) => {
          if (err) throw err;
          connection.query(
            `INSERT INTO messages (messageId, chatId, content, timestamp, isRead, type, senderCanSee, receiverCanSee, userId)
            VALUES (NULL, ${insertId}, "Hello!", ${timestamp.getTime()}, 0, 0, 1, 1, ${first})`,
            (err, result, fields) => {
              if (err) throw err;
              res
                .set(headers)
                .json({ chatId: insertId })
                .status(200)
                .end();
              connection.destroy();
            },
          );
        },
      );
    },
  );
};

module.exports = {
  getChats,
  getUserData,
  getMessages,
  getLastMessageId,
  getMessage,
  sendMessage,
  startChat,
};
