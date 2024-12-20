import { Router } from "express";
import { ContentApiRouter } from "./contentRoutes";
import { StructureApiRouter } from "./structureRoutes";


const router = Router();

router.use('/appointmentContent', ContentApiRouter);
router.use('/appointmentStructure', StructureApiRouter);



export { router as AppointmentApiRouter };