const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

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

	pool.query(sql, (err) => {
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

	pool.query(sql, (err, data) => {
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

	pool.query(sql, (err, data) => {
		if (err) {
			console.log(err);
			return;
		}

		const book = data[0];

		res.render('editbook', { book });
	});
});

app.post('/books/updatebook', (req, res) => {
	const id = req.body.id;
	const title = req.body.title;
	const pagesqty = req.body.pagesqty;

	const sql = `UPDATE BOOKS SET title = '${title}', pagesqty = ${pagesqty} WHERE id = ${id}`;

	pool.query(sql, (err, data) => {
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

	pool.query(sql, (err) => {
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

	pool.query(sql, (err, data) => {
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

app.listen(3000, () => {
	console.log('App rodando na porta 3000...');
});
