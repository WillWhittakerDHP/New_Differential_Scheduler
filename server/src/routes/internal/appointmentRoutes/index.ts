import { Router } from 'express';
import { ServiceRouter } from './structure/index.js';
import { DetailsRouter } from './details/index.js';


const router = Router();

router.use('/service', ServiceRouter);
router.use('/details', DetailsRouter);


export { router as AppointmentRouter };
