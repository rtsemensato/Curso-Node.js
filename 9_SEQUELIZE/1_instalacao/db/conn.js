const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', 'Banco1234!', {
	host: 'localhost',
	dialect: 'mysql',
});

try {
	sequelize.authenticate();
	console.log('Conectado ao banco com o Sequelize');
} catch (err) {
	console.log('Não foi possível conectar: ', err);
}

module.exports = sequelize;
