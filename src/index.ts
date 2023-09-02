import express from 'express';

import { authRoutes } from './routes';

const app = express();
app.use(express.json());

app.use(authRoutes);

const PORT = 2023;
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
