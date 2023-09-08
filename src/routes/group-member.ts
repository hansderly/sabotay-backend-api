import express from 'express';
import { checkGroup, checkMember, checkUser } from '../middlewares';

import { addMember, deleteMemberFromGroup, listMember } from '../controllers';

const router = express.Router();

router.post(
  '/api/groups/:group_id/members',
  [checkUser, checkGroup],
  addMember
);
router.get('/api/groups/:group_id/members', listMember);
router.delete(
  '/api/groups/:group_id/members/:user_id',
  checkMember,
  deleteMemberFromGroup
);

export default router;
