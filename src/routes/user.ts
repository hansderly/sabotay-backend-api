import express from 'express';
import { addUser, getUserDetail, deleteUser, userList } from '../controllers';

const router = express.Router();

router.post('/api/users', addUser);
router.get('/api/users/', userList);
router.get('/api/users/:user_id', getUserDetail);
router.put('/api/users/:user_id');
router.delete('/api/users/:user_id', deleteUser);

export default router;
