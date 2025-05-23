const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home');
});

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Banco1234!',
	database: 'nodemysql',
});

conn.connect((err) => {
	if (err) console.log(err);

	console.log('Conectou ao MySql');

	app.listen(3000, () => {
		console.log('App rodando na porta 3000...');
	});
});
