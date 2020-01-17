const mysql = require('mysql');
const db = require('./db');

module.exports = (chatId) => {
    const connection = mysql.createConnection(db);
    const timeNow = new Date();
    const query = `UPDATE chats SET lastTimestamp="${timeNow.getTime()}" WHERE chatId=${chatId}`;

    connection.query(query, (err, result, fields) => {
        if (err) throw err;
        connection.destroy();
    });
};
