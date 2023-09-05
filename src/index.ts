import express from 'express';

import {
  authRoutes,
  groupRoutes,
  userRoutes,
  groupMemberRoutes,
} from './routes';

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(groupRoutes);
app.use(userRoutes);
app.use(groupMemberRoutes);

const PORT = 2023;
app.listen(PORT, () => console.log(`Server listening on PORT - ${PORT}`));
