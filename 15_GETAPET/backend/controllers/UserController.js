const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class UserController {
	static async register(req, res) {
		const { name, email, phone, password, confirmpassword } = req.body;

		//validations
		if (!name) {
			res.status(422).json({ message: 'O nome é obrigatório' });
			return;
		}

		if (!email) {
			res.status(422).json({ message: 'O e-mail é obrigatório' });
			return;
		}

		if (!phone) {
			res.status(422).json({ message: 'O telefone é obrigatório' });
			return;
		}

		if (!password) {
			res.status(422).json({ message: 'A senha é obrigatória' });
			return;
		}

		if (!confirmpassword) {
			res.status(422).json({ message: 'A confirmação de senha é obrigatória' });
			return;
		}

		if (password !== confirmpassword) {
			res.status(422).json({ message: 'A senha e confirmação de senha devem ser iguais' });
			return;
		}

		//check if user exists
		const userExists = await User.findOne({ email: email });

		if (userExists) {
			res.status(422).json({ message: 'Já existe um usuário com esse e-mail. Por favor, utilize outro e-mail' });
			return;
		}

		//create a password
		const salt = await bcrypt.genSalt(12);
		const passwordHash = await bcrypt.hash(password, salt);

		//create user
		const user = new User({
			name,
			email,
			phone,
			password: passwordHash,
		});

		try {
			const newUser = await user.save();

			await createUserToken(newUser, req, res);
		} catch (error) {
			res.status(500).json({ message: error });
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;

		if (!email) {
			res.status(422).json({ message: 'O e-mail é obrigatório' });
			return;
		}

		if (!password) {
			res.status(422).json({ message: 'A senha é obrigatória' });
			return;
		}

		//check if user exists
		const user = await User.findOne({ email: email });

		if (!user) {
			res.status(422).json({ message: 'Não há usuário cadastrado com esse e-mail!' });
			return;
		}

		//check if password match with db password
		const checkpassword = await bcrypt.compare(password, user.password);

		if (!checkpassword) {
			res.status(422).json({ message: 'Senha inválida!' });
			return;
		}

		await createUserToken(user, req, res);
	}

	static async checkUser(req, res) {
		let currentUser;

		if (req.headers.authorization) {
			const token = getToken(req);
			const decoded = jwt.verify(token, 'nossosecret');

			currentUser = await User.findById(decoded.id);
			currentUser.password = undefined;
		} else {
			currentUser = null;
		}

		res.status(200).send(currentUser);
	}

	static async getUserById(req, res) {
		const id = req.params.id;

		const user = await User.findById(id).select('-password -phone');

		if (!user) {
			res.status(422).json({ message: 'Usuário não encontrado!' });
			return;
		}

		res.status(200).json({ user });
	}

	static async editUser(req, res) {
		const { name, email, phone, password, confirmpassword } = req.body;

		//check if user exists
		const token = getToken(req);
		const user = await getUserByToken(token, res);

		if (!user) {
			res.status(422).json({ message: 'Usuário não encontrado!' });
			return;
		}

		//validations
		if (!name) {
			res.status(422).json({ message: 'O nome é obrigatório' });
			return;
		}

		user.name = name;

		if (!email) {
			res.status(422).json({ message: 'O e-mail é obrigatório' });
			return;
		}

		//check if email has already been taken
		const userExists = await User.findOne({ email });

		if (userExists && user.email !== email) {
			res.status(422).json({ message: 'Já existe um usuário com esse e-mail. Por favor, utilize outro e-mail!' });
			return;
		}

		user.email = email;

		if (!phone) {
			res.status(422).json({ message: 'O telefone é obrigatório' });
			return;
		}

		user.phone = phone;

		if (password !== confirmpassword) {
			res.status(422).json({ message: 'A senha e confirmação de senha devem ser iguais' });
			return;
		} else if (password && password === confirmpassword) {
			//creating password
			const salt = await bcrypt.genSalt(12);
			const passwordHash = await bcrypt.hash(password, salt);

			user.password = passwordHash;
		}

		if (req.file) {
			user.image = req.file.filename;
		}

		try {
			//returns user updated data
			const { _id, ...userData } = user; //removendo o _id do user para não ir pra atualização
			await User.findOneAndUpdate({ _id }, { $set: userData }, { new: true }); //o new: true retorna o documento já atualizado

			res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
		} catch (error) {
			res.status(500).json({ message: error });
			return;
		}
	}
};
