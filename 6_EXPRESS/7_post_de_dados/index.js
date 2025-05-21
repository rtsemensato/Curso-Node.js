const express = require('express');
const path = require('path');

const port = 3000;

const app = express();

const basePath = path.join(__dirname, 'templates');

//ler body
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.get('/users/add', (req, res) => {
	res.sendFile(`${basePath}/userform.html`);
});

app.post('/users/save', (req, res) => {
	const name = req.body.name;
	const age = req.body.age;

	console.log(`O nome do usuário é ${name} e ele tem ${age} anos`);

	res.sendFile(`${basePath}/userform.html`);
});

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
