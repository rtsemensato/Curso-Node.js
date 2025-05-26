const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.post('/books/insertbook', (req, res) => {
	const title = req.body.title;
	const pagesqty = req.body.pagesqty;

	const sql = `INSERT INTO books (title, pagesqty) VALUES ('${title}','${pagesqty}')`;

	conn.query(sql, (err) => {
		if (err) {
			console.log(err);
			return;
		}

		res.redirect('/books');
	});
});

app.get('/books/:id', (req, res) => {
	const id = req.params.id;

	const sql = `SELECT * FROM books WHERE id = ${id}`;

	conn.query(sql, (err, data) => {
		if (err) {
			console.log(err);
			return;
		}

		const book = data[0];

		res.render('book', { book });
	});
});

app.get('/books/edit/:id', (req, res) => {
	const id = req.params.id;

	const sql = `SELECT * FROM books WHERE ID = ${id}`;

	conn.query(sql, (err, data) => {
		if (err) {
			console.log(err);
			return;
		}

		const book = data[0];
		console.log('book: ', book);

		res.render('editbook', { book });
	});
});

app.post('/books/updatebook', (req, res) => {
	const id = req.body.id;
	const title = req.body.title;
	const pagesqty = req.body.pagesqty;

	const sql = `UPDATE BOOKS SET title = '${title}', pagesqty = ${pagesqty} WHERE id = ${id}`;

	conn.query(sql, (err, data) => {
		if (err) {
			console.log(err);
			return;
		}

		res.redirect('/books');
	});
});

app.post('/books/remove/:id', (req, res) => {
	const id = req.params.id;

	const sql = `DELETE FROM books WHERE id = ${id}`;

	conn.query(sql, (err) => {
		if (err) {
			console.log(err);
			return;
		}

		console.log('Livro removido');

		res.redirect('/books');
	});
});

app.get('/books', (req, res) => {
	const sql = 'SELECT * FROM books';

	conn.query(sql, (err, data) => {
		if (err) {
			console.log(err);
			return;
		}

		const books = data;

		res.render('books', { books });
	});
});

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
