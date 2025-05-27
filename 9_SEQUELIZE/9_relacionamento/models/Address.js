const { Sequelize } = require('sequelize');
const db = require('../db/conn');
const User = require('./User');

const Address = db.define('Address', {
	street: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	number: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	city: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
});

Address.belongsTo(User);

module.exports = Address;
