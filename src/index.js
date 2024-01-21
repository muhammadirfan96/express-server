import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './config/database.js';
import UsersRouter from './routers/UsersRouter.js';
import ProductsRouter from './routers/ProductsRouter.js';
import logger from './config/logger.js';
import logsMeta from './middlewares/logsMeta.js';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(logsMeta);
app.use(UsersRouter);
app.use(ProductsRouter);

database()
	.then(() => console.log(`database connected ${process.env.DB_URI}`))
	.catch(err => console.log('database not connect !'));

app.listen(process.env.APP_PORT, () =>
	console.log(`server running on port ${process.env.APP_PORT}`)
);
