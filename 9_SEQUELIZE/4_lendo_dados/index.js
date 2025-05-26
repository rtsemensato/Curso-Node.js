const express = require('express');
const exphbs = require('express-handlebars');
const coon = require('./db/conn');

const User = require('./models/User');

const app = express();

//CONFIGS
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

//FIM CONFIGS

app.get('/users/create', (req, res) => {
	res.render('adduser');
});

app.post('/users/create', async (req, res) => {
	const name = req.body.name;
	const occupation = req.body.occupation;
	const newsletter = req.body.newsletter === 'on';

	await User.create({ name, occupation, newsletter });
	[];
	res.redirect('/');
});

app.get('/', async (req, res) => {
	const users = await User.findAll({ raw: true });

	res.render('home', { users });
});

coon.sync().then(() => {
	app.listen(3000, () => {
		console.log('App rodando na porta 3000...');
	});
});
