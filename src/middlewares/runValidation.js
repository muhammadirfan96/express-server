import logger from '../config/logger.js';
import { validationResult } from 'express-validator';

const runValidation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		logger.error(
			errors.array().map(error => error.msg),
			{ meta: req.logMeta }
		);
		return res.status(405).json({ message: errors.array() });
	}
	next();
};

export default runValidation;
