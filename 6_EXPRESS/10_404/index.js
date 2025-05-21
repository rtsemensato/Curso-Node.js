const express = require('express');
const path = require('path');

const users = require('./users');

const port = 3000;
const basePath = path.join(__dirname, 'templates');

const app = express();

/////////// Configurações gerais do app ///////////////

// Para ler dados de formulário HTML
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Para ler dados JSON enviados via fetch, axios, etc.
app.use(express.json());

//arquivos estáticos
app.use(express.static('public'));

/////////// Fim Configurações gerais do app ///////////////

app.use('/users', users);

//a rota da home deve ficar no final, senão sempre vai cair na home por iniciar com '/'
app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

app.use((req, res, next) => {
	res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
	console.log(`App rodando na porta ${port}...`);
});
