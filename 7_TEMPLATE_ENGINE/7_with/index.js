const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//registra o mecanismo de template como handlebars no express
//diz ao Express para utilizar o handlebars para renderizar arquivos com a extensão handlebars
app.engine('handlebars', exphbs.engine());

//informa ao Express que o mecanismo de visualização padrão será o handlebars
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
	const list = ['Banana', 'Maça', 'Uva', 'Pera'];

	res.render('dashboard', { list });
});

app.get('/post', (req, res) => {
	const post = {
		title: 'Aprender Node.js',
		category: 'Javascript',
		body: 'Este artivo vai te ajudar a aprender Node.js',
		comments: 7,
	};

	res.render('blogpost', { post });
});

app.get('/', (req, res) => {
	const data = {
		name: 'Ricardo',
		surname: 'Semensato',
	};

	const palavra = 'Teste';

	const auth = true;
	const approved = false;

	res.render('home', { user: data, palavra, auth, approved });
});

app.listen(3000, () => {
	console.log('App rodando na porta 3000');
});
