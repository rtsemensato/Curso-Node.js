const express = require('express');
const path = require('path');

const port = 3000;

const app = express();

const basePath = path.join(__dirname, 'templates');

const checkAuth = function (req, res, next) {
	req.authStatus = true;

	if (req.authStatus) {
		console.log('Está logado. Pode continuar');
		next(); //passa para a próxima etapa
	} else {
		console.log('Não está logado. Faça o login para continuar');
		next();
	}
};

app.use(checkAuth);

app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
	console.log(`App rodando na porta ${port}...`);
});
