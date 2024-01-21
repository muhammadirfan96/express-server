// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';
// const UsersModel = require("../models/UsersModel");
import UsersModel from '../models/UsersModel.js';
import logger from '../config/logger.js';
// require("dotenv").config();
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		logger.error('401', { meta: req.logMeta });
		return res.sendStatus(401);
	}
	jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
		// if (err) return res.sendStatus(403);
		if (err) {
			logger.error('403', { meta: req.logMeta });
			return res.sendStatus(403);
		}
		// const user = UsersModel.findOne({ where: { email: decoded.email } });
		const user = UsersModel.findOne({ email: decoded.email, active: 1 });
		if (!user) {
			logger.error('403', { meta: req.logMeta });
			return res.sendStatus(403);
		}
		req.me = user;
	});
	next();
};

export default verifyToken;
