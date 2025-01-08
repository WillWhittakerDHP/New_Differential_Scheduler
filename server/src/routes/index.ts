import { Router } from 'express';
import { InternalRouter } from './internal/index.js';
import { ExternalRouter } from './external/index.js';

const router = Router();

router.use('/external', ExternalRouter);
router.use('/internal', InternalRouter);

export default router;