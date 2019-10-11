let mysql = require('mysql');
let db = require('../middlewares/db');
let log = require('./../middlewares/log');
let headers = require('./../middlewares/headers');



const search = (req, res) => {
    let connection = mysql.createConnection(db);
    let {user, query} = req.body;
    
    let users = `SELECT userId, email, CONCAT_WS(" ", name, surname) AS name, photo 
    FROM users 
    WHERE (CONCAT_WS(" ", name, surname) LIKE "%${query}%" OR email LIKE "%${query}%")
    AND activated=1 
    AND userId != ${user}`;

    connection.query(users, (err, result, fields) => {
        if(err) throw err;

        res.set(headers).json(result).end();
        log(user, `Search: ${query}`);
        connection.destroy();
    });

}

module.exports = {
    search
}