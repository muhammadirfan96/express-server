import ProductsModel from '../models/ProductsModel.js';
import logger from '../config/logger.js';

const showProduct = async (req, res) => {
	try {
		logger.info('data readed', { meta: req.logMeta });
		return res.status(200).json(req.product);
	} catch (err) {
		logger.error(err.message, { meta: req.logMeta });
		return res.status(500).json(err.message);
	}
};

const findProducts = async (req, res) => {
	try {
		const limit = parseInt(req.query.limit ?? 20);
		const page = parseInt(req.query.page ?? 1);
		const offset = limit * page - limit;

		const name = req.query.name ?? '';
		const price = req.query.price ?? '0-999999999999';

		const filter = {
			name: { $regex: name },
			price: {
				$gte: parseInt(price.split('-')[0]),
				$lte: parseInt(price.split('-')[1])
			}
		};

		const all_data = (await ProductsModel.find(filter)).length;
		const data = await ProductsModel.find(filter).skip(offset).limit(limit);

		const result = {
			all_data: all_data,
			all_page: Math.ceil(all_data / limit),
			crr_page: page,
			data: data
		};

		logger.info('data readed', { meta: req.logMeta });
		return res.status(200).json(result);
	} catch (err) {
		logger.error(err.message, { meta: req.logMeta });
		return res.status(500).json(err.message);
	}
};

const createProduct = async (req, res) => {
	try {
		const data = {
			name: req.body.name,
			price: req.body.price,
			createdBy: req.uid || 12,
			updatedBy: req.uid || 12
		};

		const newProduct = new ProductsModel(data);
		const savedProduct = await newProduct.save();

		logger.info('data created', { meta: req.logMeta });
		return res.status(201).json(savedProduct);
	} catch (err) {
		logger.error(err.message, { meta: req.logMeta });
		return res.status(500).json(err.message);
	}
};

const updateProduct = async (req, res) => {
	try {
		const data = {
			name: req.body.name,
			price: req.body.price,
			createdBy: req.uid || 12,
			updatedBy: req.uid || 12
		};

		const updatedProduct = await ProductsModel.findByIdAndUpdate(
			req.params.id,
			data,
			{ new: true }
		);

		logger.info('data updated', { meta: req.logMeta });
		return res.status(200).json(updatedProduct);
	} catch (err) {
		logger.error(err.message, { meta: req.logMeta });
		return res.status(500).json(err.message);
	}
};

const deleteProduct = async (req, res) => {
	try {
		const deletedProduct = await ProductsModel.findByIdAndDelete(
			req.params.id
		);

		logger.info('data deleted', { meta: req.logMeta });
		return res.status(200).json(deletedProduct);
	} catch (err) {
		logger.error(err.message, { meta: req.logMeta });
		return res.status(500).json(err.message);
	}
};

export {
	showProduct,
	findProducts,
	createProduct,
	updateProduct,
	deleteProduct
};
