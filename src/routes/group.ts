import express from 'express';

const router = express.Router();

router.post('/api/groups');
router.get('/api/groups');
router.get('/api/groups/:group_id');
router.put('/api/groups/:group_id');
router.delete('/api/groups/:group_id');

export default router;
