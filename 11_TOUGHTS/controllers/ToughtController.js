const User = require('../models/User');
const Tought = require('../models/Tought');

module.exports = class toughtsController {
	static async showToughts(req, res) {
		const dataToughts = await Tought.findAll({ include: User });

		const toughts = dataToughts.map((result) => result.get({ plain: true }));

		res.render('toughts/home', { toughts });
	}

	static async dashboard(req, res) {
		const userId = req.session.userid;

		const user = await User.findOne({ where: { id: userId }, include: Tought, plain: true });

		//check if user exists
		if (!user) {
			res.redirect('/login');
		}

		const toughts = user.Toughts.map((result) => result.dataValues);

		const emptyToughts = toughts.length === 0;

		res.render('toughts/dashboard', {
			toughts,
			emptyToughts,
		});
	}

	static createTought(req, res) {
		res.render('toughts/create');
	}

	static async createToughtSave(req, res) {
		const tought = {
			title: req.body.title,
			UserId: req.session.userid,
		};

		await Tought.create(tought);

		req.flash('message', 'Pensamento criado com sucesso!');

		try {
			req.session.save(() => {
				res.redirect('/toughts/dashboard');
			});
		} catch (error) {
			console.log(`Aconteceu um erro: ${error}`);
		}
	}

	static async removeTought(req, res) {
		const id = req.body.id;
		const userId = req.session.userid;

		try {
			await Tought.destroy({ where: { id: id }, UserId: userId });

			req.flash('message', 'Pensamento criado com sucesso!');

			req.session.save(() => {
				res.redirect('/toughts/dashboard');
			});
		} catch (error) {
			console.log(`Aconteceu um erro: ${error}`);
		}
	}

	static async updateTought(req, res) {
		const id = req.params.id;

		const tought = await Tought.findOne({ raw: true, where: { id: id } });

		res.render('toughts/edit', { tought });
	}

	static async updateToughtSave(req, res) {
		const id = req.body.id;

		const tought = {
			title: req.body.title,
		};

		try {
			await Tought.update(tought, { where: { id: id } });

			req.flash('message', 'Pensamento atualizado com sucesso!');

			req.session.save(() => {
				res.redirect('/toughts/dashboard');
			});
		} catch (error) {
			console.log(`Aconteceu um erro: ${error}`);
		}
	}
};
