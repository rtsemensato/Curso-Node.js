const express = require('express');
const exphbs = require('express-handlebars');
const coon = require('./db/conn');

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

app.get('/', (req, res) => {
	res.render('home');
});
