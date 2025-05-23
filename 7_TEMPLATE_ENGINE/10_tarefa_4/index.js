const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

//define o diretório onde serão buscados os partials
const hbs = exphbs.create({
	partialsDir: ['views/partials'],
});

//registra o mecanismo de template como handlebars no express
//diz ao Express para utilizar o handlebars para renderizar arquivos com a extensão handlebars
app.engine('handlebars', hbs.engine);

//informa ao Express que o mecanismo de visualização padrão será o handlebars
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const products = [
	{
		id: 1,
		name: 'Bolsa',
		description: 'Bolsa de camurça marrom',
		price: new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(85.9),
	},
	{
		id: 2,
		name: 'Mochila',
		description: 'Mochila escolar azul',
		price: new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(120.0),
	},
	{
		id: 3,
		name: 'Caderno 20 matérias',
		description: 'Caderno escolar capa dura 20 matérias',
		price: new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(19.99),
	},
	{
		id: 4,
		name: 'Estojo',
		description: 'Estojo duas partições, cinza escuro',
		price: new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(14.5),
	},
];

app.get('/product/:id', (req, res) => {
	const product = products.find((x) => x.id === parseInt(req.params.id));

	res.render('product', { product });
});

app.get('/', (req, res) => {
	res.render('home', { products });
});

app.use((req, res, next) => {
	res.status(404).render('404');
});

app.listen(3000, () => {
	console.log('App rodando na porta 3000...');
});
