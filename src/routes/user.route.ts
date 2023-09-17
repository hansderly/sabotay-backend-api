import express from 'express';
import { addUser, getUserDetail, deleteUser, userList } from '../controllers';
import { authToken, checkUser } from '../middlewares';

const router = express.Router();

router.post('/api/users', [authToken], addUser);
router.get('/api/users/', userList);
router.get('/api/users/:user_id', checkUser, getUserDetail);
router.put('/api/users/:user_id');
router.delete('/api/users/:user_id', checkUser, deleteUser);

export default router;
