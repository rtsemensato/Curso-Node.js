const http = require('http');
const fs = require('fs');

const port = 3000;

const server = http.createServer((req, res) => {
	const urlInfo = require('url').parse(req.url, true);

	const name = urlInfo.query.name;

	if (!name) {
		fs.readFile('index.html', (err, data) => {
			if (err) throw new Error(err);

			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(data);
			return res.end();
		});
	} else {
		fs.writeFile('arquivo.txt', name, (err, data) => {
			if (err) throw new Error(err);

			res.writeHead(302, { location: '/' });
			return res.end();
		});
	}
});

server.listen(port, () => {
	console.log(`Server rodando na porta ${port}...`);
});
