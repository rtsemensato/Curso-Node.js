const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', 'Banco1234!', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = sequelize;
