const mongoose = require('mongoose');

async function main() {
	await mongoose.connect('mongodb://localhost:27017/testemongoose');
	console.log('Conectou ao MongoDB com Mongoose!');
}

main().catch((err) => console.log(err));

module.exports = mongoose;
