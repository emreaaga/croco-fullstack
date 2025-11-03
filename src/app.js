import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { applicationRouter, authRouter, userRouter } from './routes/index.js';
import { globalLimiter, config } from './config/index.js';
import { globalErrorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(morgan('dev'));
app.use(
  cors({
    origin: config.db.clientUrl,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(globalLimiter);

app.use('/api/applications', applicationRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Error handler
app.use(globalErrorHandler);

export default app;
