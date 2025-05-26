const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true, // Impede string vazia
		},
	},
	occupation: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			notEmpty: true, // Impede string vazia
		},
	},
	newsletter: {
		type: DataTypes.BOOLEAN,
	},
});

module.exports = User;
