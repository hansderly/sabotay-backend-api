import { Router } from 'express';

import { contributionList, deleteContribution, newContribution } from '../controllers';

const router = Router();

router.post('/api/groups/:group_id/contributions', newContribution);
router.get('/api/groups/:group_id/contributions', contributionList);
router.delete( '/api/groups/:group_id/contributions/:contribution_id', deleteContribution);

export default router;
