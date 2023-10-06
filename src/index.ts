import 'dotenv/config';
import express from 'express';

import {
  authRoutes,
  groupRoutes,
  userRoutes,
  groupMemberRoutes,
  contributionRoutes,
} from './routes';

import { errorHandler } from './middlewares';

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(groupRoutes);
app.use(userRoutes);
app.use(groupMemberRoutes);
app.use(contributionRoutes);
app.use(errorHandler);

const PORT = 4000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on PORT - ${PORT}`));
