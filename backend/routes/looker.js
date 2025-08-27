import { Router } from 'express';
import { getProcesses } from '../controllers/lookerController.js';
import { getInsights } from '../controllers/insightsController.js';

const router = Router();

router.get('/processes', getProcesses);
router.post('/insights', getInsights);

export default router;