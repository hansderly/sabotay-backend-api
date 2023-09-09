import express from 'express';
import {
  allGroup,
  createGroup,
  deleteGroup,
  groupDetail,
} from '../controllers';
import { checkGroup, checkUser } from '../middlewares';

const router = express.Router();

router.post('/api/groups', checkUser, createGroup);
router.get('/api/groups', allGroup);
router.get('/api/groups/:group_id', checkGroup, groupDetail);
router.put('/api/groups/:group_id');
router.delete('/api/groups/:group_id', deleteGroup);

export default router;
