import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';

import errorMiddleware from './middlewares/error.middleware.js';

import connectDB from './database/mongodb.js';

import swaggerUI from 'swagger-ui-express';
import specs from './swagger/swagger.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/swagger', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);
    await connectDB();
});

export default app;