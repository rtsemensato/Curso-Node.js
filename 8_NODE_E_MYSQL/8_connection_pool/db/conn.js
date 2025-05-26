const mysql = require('mysql2');

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'Banco1234!',
	database: 'nodemysql',
});

module.exports = pool;
