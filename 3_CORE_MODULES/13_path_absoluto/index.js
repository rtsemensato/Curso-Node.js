const path = require('path');

//path absoluto
console.log(path.resolve('arquivo.txt'));

//formando um path
const midFolder = 'relatorios';
const fileName = 'ricardo.txt';

const finalPath = path.join('/', 'arquivos', midFolder, fileName);

console.log('finalPath: ', finalPath);
