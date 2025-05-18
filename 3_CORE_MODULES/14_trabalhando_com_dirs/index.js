const fs = require('fs');

if (!fs.existsSync('./diretorio')) {
	console.log('Não existe');
	fs.mkdirSync('diretorio');
} else if (fs.existsSync('./diretorio')) {
	console.log('Existe');
}
