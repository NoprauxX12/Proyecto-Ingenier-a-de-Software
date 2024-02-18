const mysql = require('mysql2');
require('dotenv').config();


module.exports=mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    port:parseInt(process.env.PORT),
    waitForConnections: true
})