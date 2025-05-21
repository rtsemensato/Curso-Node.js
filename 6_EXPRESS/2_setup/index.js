const express = require('express');

const port = 3000;

const app = express();

app.get('/', (req, res) => {
	res.send('Olá Mundo');
});

app.listen(port, () => {
	console.log(`App rodando na porta ${port}...`);
});
