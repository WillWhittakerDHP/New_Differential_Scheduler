import { Router } from 'express';
import { ContentApiRouter } from './contentRoutes/index.js';
import { StructureApiRouter } from './structureRoutes/index.js';


const router = Router();

router.use('/content', ContentApiRouter);
router.use('/structure', StructureApiRouter);


export { router as AppointmentApiRouter };
