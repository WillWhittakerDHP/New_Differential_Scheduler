import { Router } from 'express';
import { InternalRouter } from './internalRoutes/index.js';
import { ExternalRouter } from './externalRoutes/index.js';


const router = Router();

router.use('/external', ExternalRouter);
router.use('/internal', InternalRouter);

export default router;
