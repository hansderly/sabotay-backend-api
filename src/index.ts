import express from 'express';

const app = express();
app.use(express.json());

const PORT = 2023;
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
