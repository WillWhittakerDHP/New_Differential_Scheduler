import { Router } from 'express';
import { ServiceApiRouter } from './serviceBased/index.js';
import { StructureApiRouter } from './structureRoutes/index.js';


const router = Router();

router.use('/service', ServiceApiRouter);
router.use('/structure', StructureApiRouter);


export { router as AppointmentRouter };
