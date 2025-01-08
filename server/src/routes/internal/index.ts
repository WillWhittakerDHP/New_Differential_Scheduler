import { Router } from "express";
import { AppointmentRouter } from "./appointmentRoutes.js";
import { AdminRouter } from "./adminRoutes/index.js";

const router = Router();

router.use('/appointment', AppointmentRouter);
router.use('/admin', AdminRouter);

export { router as InternalRouter };
