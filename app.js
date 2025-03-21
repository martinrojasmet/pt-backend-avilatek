import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import productRouter from './routes/product.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import connectDB from './database/mongodb.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/products', productRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);
    await connectDB();
});

export default app;