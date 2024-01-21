import express from 'express';
import {
	showProduct,
	findProducts,
	createProduct,
	updateProduct,
	deleteProduct
} from '../controllers/ProductsController.js';
import {
	showProductValidation,
	findProductsValidation,
	createProductValidation,
	updateProductValidation,
	deleteProductValidation
} from '../validations/ProductsValidation.js';
import verifyToken from '../middlewares/verifyToken.js'
const ProductsRouter = express.Router();

ProductsRouter.get(
	'/product/:id',
	verifyToken,
	showProductValidation,
	showProduct
);
ProductsRouter.get(
	'/products',
	verifyToken,
	findProductsValidation,
	findProducts
);
ProductsRouter.post(
	'/product',
	verifyToken,
	createProductValidation,
	createProduct
);
ProductsRouter.patch(
	'/product/:id',
	verifyToken,
	updateProductValidation,
	updateProduct
);
ProductsRouter.delete(
	'/product/:id',
	verifyToken,
	deleteProductValidation,
	deleteProduct
);

export default ProductsRouter;
