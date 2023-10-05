import express from 'express';

import {
  authRoutes,
  groupRoutes,
  userRoutes,
  groupMemberRoutes,
  contributionRoutes,
} from './routes';

const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(groupRoutes);
app.use(userRoutes);
app.use(groupMemberRoutes);
app.use(contributionRoutes);

const PORT = 2023 || process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on PORT - ${PORT}`));
