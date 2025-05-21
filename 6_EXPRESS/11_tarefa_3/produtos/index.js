const express = require('express');
const path = require('path');

const router = express.Router();

const basePath = path.join(__dirname, '../templates');

router.get('/details', (req, res) => {
	res.sendFile(`${basePath}/detalhesproduto.html`);
});

router.get('/', (req, res) => {
	res.sendFile(`${basePath}/produtos.html`);
});

module.exports = router;
