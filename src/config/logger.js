import winston from 'winston';
import 'winston-mongodb';
import { uri } from './database.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const logDirectory = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory);
}

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.File({
			filename: path.join(logDirectory, 'combined.log')
		}),
		new winston.transports.Console(),
		new winston.transports.MongoDB({
			level: 'info',
			db: uri,
			collection: 'combined-logs',
			options: { useUnifiedTopology: true },
			metaKey: 'meta'
		})
	],
	exceptionHandlers: [
		new winston.transports.File({
			filename: path.join(logDirectory, 'exceptions.log')
		})
	],
	rejectionHandlers: [
		new winston.transports.File({
			filename: path.join(logDirectory, 'rejections.log')
		})
	]
});

export default logger;
