const express = require('express');
const path = require('path');

const users = require('./users');

const port = 3000;
const basePath = path.join(__dirname, 'templates');

const app = express();

// Para ler dados de formulário HTML
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Para ler dados JSON enviados via fetch, axios, etc.
app.use(express.json());

app.use('/users', users);

//a rota da home deve ficar no final, senão sempre vai cair na home por iniciar com '/'
app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
	console.log(`App rodando na porta ${port}...`);
});
