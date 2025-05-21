const express = require('express');
const path = require('path');

const pessoas = require('./pessoas');
const produtos = require('./produtos');

const app = express();

const port = 5000;
const basePath = path.join(__dirname, 'templates');

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

app.use('/pessoas', pessoas);
app.use('/produtos', produtos);

app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

app.use((req, res, next) => {
	res.sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
	console.log(`App rodando na porta ${port}...`);
});
