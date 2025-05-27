const sequelize = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
	name: {
		type: sequelize.DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: sequelize.DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: sequelize.DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = User;
