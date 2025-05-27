const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts', 'root', 'Banco1234!', {
	host: 'localhost',
	dialect: 'mysql',
});

try {
	sequelize.authenticate();
	console.log('Conectado ao MySql');
} catch (error) {
	console.log(`Não foi possível se conectar ao MySql: ${error}`);
}

module.exports = sequelize;
