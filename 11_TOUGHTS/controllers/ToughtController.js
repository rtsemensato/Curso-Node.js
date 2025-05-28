const User = require('../models/User');
const Tought = require('../models/Tought');

module.exports = class toughtsController {
	static async showToughts(req, res) {
		const toughts = await Tought.findAll({ raw: true });

		res.render('toughts/home', toughts);
	}

	static async dashboard(req, res) {
		res.render('toughts/dashboard');
	}

	static createTought(req, res) {
		res.render('toughts/create');
	}
};
