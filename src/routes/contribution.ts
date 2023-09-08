import { Router } from 'express';

import {
  contributionList,
  deleteContribution,
  newContribution,
} from '../controllers';
import { checkGroupParams } from '../middlewares';

const router = Router();

router.post(
  '/api/groups/:group_id/contributions',
  checkGroupParams,
  newContribution
);
router.get(
  '/api/groups/:group_id/contributions',
  checkGroupParams,
  contributionList
);
router.delete(
  '/api/groups/:group_id/contributions/:contribution_id',
  checkGroupParams,
  deleteContribution
);

export default router;
