import { Router } from 'express';

import {
  contributionList,
  deleteContribution,
  newContribution,
} from '../controllers';
import { checkGroup } from '../middlewares';

const router = Router();

router.post('/api/groups/:group_id/contributions', checkGroup, newContribution);
router.get('/api/groups/:group_id/contributions', checkGroup, contributionList);
router.delete( '/api/groups/:group_id/contributions/:contribution_id', checkGroup, deleteContribution);

export default router;
