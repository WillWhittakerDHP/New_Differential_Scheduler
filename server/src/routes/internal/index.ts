import { Router } from 'express';
import { AppointmentRouter } from './appointmentRoutes/index.js';
// import { ParticipantRouter } from './participantRoutes/index.js';

const router = Router();

router.use('/appointment', AppointmentRouter);
// router.use('/participants', ParticipantRouter);

export { router as InternalRouter} ;