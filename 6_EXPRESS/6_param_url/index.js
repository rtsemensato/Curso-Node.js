const express = require('express');
const path = require('path');

const port = 3000;

const app = express();

const basePath = path.join(__dirname, 'templates');

app.get('/users/:id', (req, res) => {
	const id = req.params.id;

	//leitura da tabela users, resgatar um usuário do banco
	console.log(`Estamos buscando pelo usuário: ${id}`);

	res.sendFile(`${basePath}/users.html`);
});

//a rota da home deve ficar no final, senão sempre vai cair na home por iniciar com '/'
app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
	console.log(`App rodando na porta ${port}...`);
});
