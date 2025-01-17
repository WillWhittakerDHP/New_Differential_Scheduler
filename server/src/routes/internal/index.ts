import { Router } from "express";
import { AppointmentRouter } from "./appointmentRoutes.js";
import { AdminRouter } from "./adminRoutes/index.js";
import { AvaiabilityRouter } from "./availabilityRoutes.js";

const router = Router();

router.use('/appointment', AppointmentRouter);
router.use('/admin', AdminRouter);
router.use('/availability', AvaiabilityRouter)

export { router as InternalRouter };
