let mysql = require('mysql');
let db = require('./db');

module.exports = (user, message) => {
    let time = new Date();
    let connection = mysql.createConnection(db);

    connection.query(`INSERT INTO logs (logId, user, timestamp, action) VALUES (NULL, ${user}, "${time.getTime()}", "${message}")`, (err, result, fields) => {
        if(err) throw err;
        connection.destroy();
    });
}