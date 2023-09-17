import express from 'express';

import { login, register } from '../controllers';

const router = express.Router();

router.post('/api/register', register);
router.post('/api/login', login);

// TODO: Add other controllers
// router.get('/api/refresh-token');
// router.get('/api/logout');
// router.get('/api/request-password-reset');
// router.get('/api/reset-password');

export default router;
