const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'el_que_sabe',
    port: 3306
  });

module.exports = connection;