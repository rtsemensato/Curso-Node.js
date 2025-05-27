const Sequelize = require('sequelize');
const db = require('../db/conn');

const Task = db.define('Task', {
	title: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	done: {
		type: Sequelize.DataTypes.BOOLEAN,
		allowNull: false,
	},
});

module.exports = Task;
