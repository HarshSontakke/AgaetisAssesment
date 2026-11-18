const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'employee_db',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});

pool.getConnection()
    .then((conn) => {
        console.log('Connected To MySQL Successfully');
        conn.release();
    })
    .catch((err) => {
        console.error('MySQLConnection Error : ', err.message);
    });
module.exports = pool;
