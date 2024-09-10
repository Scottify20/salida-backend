import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import morgan from 'morgan';
require('dotenv').config();

import corsDomainWhitelistOptions from './middlewares/auth/corsWhitelist';
import api from './api';
import errorHandler from './middlewares/error_handling/errorHandler';
import notFound from './middlewares/error_handling/notFound';
// import DOMPurify from 'dompurify';
// import { JSDOM } from 'jsdom';
// import rateLimit from 'express-rate-limit';
// import { Jwt } from 'jsonwebtoken';
// import { body, validationResult } from 'express-validator';
// import bcrypt from 'bcrypt';
// import hpp, xss-clean, cors, express-validator, jsonwebtoken, express-rate-limit
// use bcrypt for hashing and salting
// const dom = new JSDOM('').window;
// const purify = DOMPurify(window);

const app: Application = express();

app.use(helmet());
app.use(hpp());
app.use(morgan('dev'));
app.use(cors(corsDomainWhitelistOptions));
app.use(express.json());

app.use('/api', api);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json('Hi there!');
});

app.use(notFound);
app.use(errorHandler);

export default app;
