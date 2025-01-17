
import { Router, Request, Response } from 'express';
import makeAvailabilities from '../../utils/makeAvailabilities';

const router = Router();

const DEFAULT_INCREMENT = 30;

// TODO: make " const busyPeriods = {GoogleCalendarAPI response}"
// TODO: make " const startOfDay = {based in logic for admin constraints and NOW}"
// TODO: make " const endOfDay = {Logic based on calendar day}"

router.post('/batch', (req: Request, res: Response) => {
  const { appointment } = req.body;

  if (!appointment) {
    return res.status(400).json({ error: 'Appointment data is required.' });
  }

  const startOfDay = new Date(2024, 11, 1, 0, 0);
  const endOfDay = new Date(2024, 11, 1, 23, 59);
  const busyPeriods = appointment.busyTimes || []; // Assume `busyTimes` is part of the appointment object.

  const availabilities = makeAvailabilities(
    startOfDay,
    endOfDay,
    busyPeriods,
    {
      onSite: appointment.onSiteDuration,
      formalPresentation: appointment.formalPresentationDuration,
      offSite: appointment.offSiteDuration,
    },
    DEFAULT_INCREMENT
  );

  res.json(availabilities);
});

export { router as AvaiabilityRouter };