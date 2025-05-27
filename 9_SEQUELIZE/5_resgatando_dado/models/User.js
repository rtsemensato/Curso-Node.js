const { Sequelize } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true, // Impede string vazia
		},
	},
	occupation: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true, // Impede string vazia
		},
	},
	newsletter: {
		type: Sequelize.BOOLEAN,
	},
});

module.exports = User;
