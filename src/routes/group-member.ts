import express from 'express';

import { addMember, deleteMemberFromGroup, listMember } from '../controllers';

const router = express.Router();

router.post('/api/groups/:group_id/members', addMember);
router.get('/api/groups/:group_id/members', listMember);
router.delete('/api/groups/:group_id/members/:user_id', deleteMemberFromGroup);

export default router;
