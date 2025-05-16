const fs = require('fs');

const arqAntigo = 'arquivo.txt';
const arqNovo = 'novoarquivo.txt';

fs.rename(arqAntigo, arqNovo, (err) => {
	if (err) {
		console.log(err);
		return;
	}

	console.log(`Arquivo renomeado de ${arqAntigo} para ${arqNovo}`);
});
