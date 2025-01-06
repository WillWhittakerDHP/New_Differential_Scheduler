import { Router } from 'express';
import { ServiceRouter } from './structure/index.js';


const router = Router();

router.use('/service', ServiceRouter);


export { router as AppointmentRouter };
