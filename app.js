import express from 'express';
import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

export default app;