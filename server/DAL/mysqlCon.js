const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000000',
    database: 'el_que_sabe1',
    port: 3300
  });

module.exports = connection;