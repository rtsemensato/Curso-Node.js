const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const Pet = require('../models/Pet');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class PetController {
	//create a pet
	static async create(req, res) {
		const { name, age, weight, color } = req.body;

		const images = req.files;

		const available = true;

		// images upload

		// validations
		if (!name) {
			res.status(422).json({ message: 'O nome é obrigatório!' });
			return;
		}

		if (!age) {
			res.status(422).json({ message: 'A idade é obrigatória!' });
			return;
		}

		if (!weight) {
			res.status(422).json({ message: 'O peso é obrigatório!' });
			return;
		}

		if (!color) {
			res.status(422).json({ message: 'A cor é obrigatória!' });
			return;
		}

		if (!images || images.length === 0) {
			res.status(422).json({ message: 'A imagem é obrigatória!' });
			return;
		}

		//get pet owner
		const token = getToken(req);
		const user = await getUserByToken(token);

		//create a pet
		const pet = new Pet({
			name,
			age,
			weight,
			color,
			available,
			images: [],
			user: {
				_id: user._id,
				name: user.name,
				image: user.image,
				phone: user.phone,
			},
		});

		images.map((image) => {
			pet.images.push(image.filename);
		});

		try {
			const newPet = await pet.save();

			res.status(201).json({ message: 'Pet cadastrado com sucesso', pet: newPet });
		} catch (error) {
			res.status(500).json({ message: error });
		}
	}

	static async getAll(req, res) {
		const pets = await Pet.find().sort('-createdAt');

		res.status(200).json({ pets });
	}

	static async getAllUserPets(req, res) {
		//get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt'); //o filtro é feito entre aspas pq é um subdocument

		res.status(200).json({ pets });
	}

	static async getAllUserAdoptions(req, res) {
		//get user from token
		const token = getToken(req);
		const user = await getUserByToken(token);

		const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt'); //o filtro é feito entre aspas pq é um subdocument

		res.status(200).json({ pets });
	}

	static async getPetById(req, res) {
		const id = req.params.id;

		//check is id is a valid id
		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: 'Id inválido!' });
			return;
		}

		//check if pet exists
		const pet = await Pet.findById(id);

		if (!pet) {
			res.status(404).json({ message: 'Pet não encontrado!' });
			return;
		}

		res.status(200).json({ pet });
	}

	static async removePetById(req, res) {
		const id = req.params.id;

		//check is id is a valid id
		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: 'Id inválido!' });
			return;
		}

		//check if pet exists
		const pet = await Pet.findById(id);

		if (!pet) {
			res.status(404).json({ message: 'Pet não encontrado!' });
			return;
		}

		//check if logged in user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({
				message: 'Houve um problema em processar a sua solicitação. Tente novamente mais tarde!',
			});
			return;
		}

		await Pet.findByIdAndDelete(id);

		res.status(200).json({ message: 'Pet removido com sucesso!' });
	}

	static async updatePet(req, res) {
		const id = req.params.id;

		const { name, age, weight, color, available } = req.body;

		const images = req.files;

		const updatedData = {};

		//check is id is a valid id
		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: 'Id inválido!' });
			return;
		}

		//check if pet exists
		const pet = await Pet.findById(id);

		if (!pet) {
			res.status(404).json({ message: 'Pet não encontrado!' });
			return;
		}

		//check if logged in user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.toString() !== user._id.toString()) {
			res.status(422).json({
				message: 'Houve um problema em processar a sua solicitação. Tente novamente mais tarde!',
			});
			return;
		}

		// validations
		if (!name) {
			res.status(422).json({ message: 'O nome é obrigatório!' });
			return;
		}

		updatedData.name = name;

		if (!age) {
			res.status(422).json({ message: 'A idade é obrigatória!' });
			return;
		}

		updatedData.age = age;

		if (!weight) {
			res.status(422).json({ message: 'O peso é obrigatório!' });
			return;
		}

		updatedData.weight = weight;

		if (!color) {
			res.status(422).json({ message: 'A cor é obrigatória!' });
			return;
		}

		updatedData.color = color;

		if (!images || images.length === 0) {
			res.status(422).json({ message: 'A imagem é obrigatória!' });
			return;
		} else {
			updatedData.images = [];

			images.map((image) => {
				updatedData.images.push(image.filename);
			});
		}

		const { _id, ...petData } = updatedData;
		await Pet.findByIdAndUpdate(id, { $set: petData });

		res.status(200).json({ message: 'Pet atualizado com sucesso!' });
	}

	static async schedule(req, res) {
		const id = req.params.id;

		//check if pet exists
		const pet = await Pet.findById(id);

		if (!pet) {
			res.status(404).json({ message: 'Pet não encontrado!' });
			return;
		}

		//check if logged in user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (pet.user._id.equals(user._id)) {
			res.status(422).json({
				message: 'Você não pode agendar uma visita com o seu próprio Pet!',
			});
			return;
		}

		//check if user has already scheduled a visit
		if (pet.adopter) {
			if (pet.adopter._id.equals(user._id)) {
				res.status(422).json({
					message: 'Você já agendou uma visita para este Pet!',
				});

				return;
			}
		}

		// add user to Pet
		pet.adopter = {
			_id: user._id,
			name: user.name,
			image: user.image,
		};

		await Pet.findByIdAndUpdate(id, pet);

		res.status(200).json({ message: `A visita foi agendada com sucesso. Entre em contato com ${pet.user.phone}.` });
	}

	static async concludeAdoption(req, res) {
		const id = req.params.id;

		//check is id is a valid id
		if (!ObjectId.isValid(id)) {
			res.status(422).json({ message: 'Id inválido!' });
			return;
		}

		//check if pet exists
		const pet = await Pet.findById(id);

		if (!pet) {
			res.status(404).json({ message: 'Pet não encontrado!' });
			return;
		}

		//check if logged in user registered the pet
		const token = getToken(req);
		const user = await getUserByToken(token);

		if (!pet.user._id.equals(user._id)) {
			res.status(422).json({
				message: 'Você não é o dono do Pet!',
			});
			return;
		}

		pet.available = false;

		try {
			await Pet.findByIdAndUpdate(id, pet);

			res.status(200).json({ message: 'Parabéns! O ciclo de adoção foi concluído com sucesso!' });
		} catch (error) {
			res.status(500).json({ message: error });
		}
	}
};
