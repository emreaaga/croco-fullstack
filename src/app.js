import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

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

const swaggerPath = path.join(process.cwd(), 'src/docs/application.yaml');
const swaggerDocument = YAML.load(swaggerPath);

app.use('/api/applications', applicationRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handler
app.use(globalErrorHandler);

export default app;
