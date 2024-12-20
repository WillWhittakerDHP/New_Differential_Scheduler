import { Router } from 'express';
import { AppointmentApiRouter } from './appointmentRoutes/index.js';
import { ParticipantApiRouter } from './participantRoutes/index.js';

const router = Router();

router.use('/appointment', AppointmentApiRouter);
router.use('/participants', ParticipantApiRouter);

export { router as InternalRouter} ;

