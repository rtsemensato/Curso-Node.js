const Product = require('../models/Product.js');

module.exports = class ProductController {
	static async showProducts(req, res) {
		const products = await Product.getProducts();

		res.render('products/all', { products });
	}

	static createProduct(req, res) {
		res.render('products/create');
	}

	static async createProductPost(req, res) {
		const product = new Product(req.body.name, req.body.image, req.body.price, req.body.description);

		product.save();

		res.redirect('/products');
	}

	static async getProduct(req, res) {
		const id = req.params.id;

		const product = await Product.getProductById(id);

		res.render('products/product', { product });
	}

	static async removeProduct(req, res) {
		const id = req.params.id;

		await Product.removeProductById(id);

		res.redirect('/products');
	}

	static async editProduct(req, res) {
		const id = req.params.id;

		const product = await Product.getProductById(id);
		console.log('product: ', product);

		res.render('products/edit', { product });
	}

	static async editProductPost(req, res) {
		const id = req.body.id;

		const product = new Product(req.body.name, req.body.image, req.body.price, req.body.description);

		await product.updateProduct(id);

		res.redirect('/products');
	}
};
