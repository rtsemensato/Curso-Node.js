const fs = require('fs');
const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
	const q = url.parse(req.url, true);
	const filename = q.pathname.substring(1); //recebe a rota removendo o primeiro caracter que é a '/'

	if (filename.includes('html')) {
		if (fs.existsSync(filename)) {
			fs.readFile(filename, (err, data) => {
				res.writeHead(200, { 'Cotent-Type': 'text/html' });
				res.write(data);
				return res.end();
			});
		} else {
			fs.readFile('404.html', (err, data) => {
				res.writeHead(404, { 'Cotent-Type': 'text/html' });
				res.write(data);
				return res.end();
			});
		}
	}
});

server.listen(port, () => {
	console.log(`Server rodando na porta ${port}...`);
});
