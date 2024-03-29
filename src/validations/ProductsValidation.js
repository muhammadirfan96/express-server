import { body, param, query } from 'express-validator';
import ProductsModel from '../models/ProductsModel.js';
import runValidation from '../middlewares/runValidation.js';

const showProductValidation = [
	param('id')
		.isMongoId()
		.withMessage('invalid ID')
		.bail('chain')
		.custom(async (value, { req }) => {
			try {
				const product = await ProductsModel.findById(value);
				if (!product) throw new Error('data not found');
				req.product = product;
			} catch (err) {
				throw new Error(err.message);
			}
			return true;
		}),
	runValidation
];

const findProductsValidation = [
	query('limit')
		.optional()
		.isInt({ min: 1, max: 100 })
		.withMessage('limit min: 1 and max: 100'),
	query("page").optional().isInt().withMessage("page must integer"),
	runValidation
];

const createProductValidation = [
	body('name')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('title required')
		.bail()
		.isString()
		.withMessage('title must string'),
	body('price')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('price required')
		.bail()
		.isNumeric()
		.withMessage('price must numeric'),
	runValidation
];

const updateProductValidation = [
	...showProductValidation,
	...createProductValidation,
	runValidation
];

const deleteProductValidation = [...showProductValidation, runValidation];

export {
	showProductValidation,
	findProductsValidation,
	createProductValidation,
	updateProductValidation,
	deleteProductValidation

};