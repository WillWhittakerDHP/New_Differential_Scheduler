import { Router } from 'express';
import { AppointmentApiRouter } from './appointmentAPI/index.js';
import { ParticipantApiRouter } from './participantAPI/index.js';

const router = Router();

router.use('/appointment', AppointmentApiRouter);
router.use('/participants', ParticipantApiRouter);

export { router as InternalRouter} ;
