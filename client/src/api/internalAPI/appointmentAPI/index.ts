import { Router } from "express";
import { ContentApiRouter } from "./contentAPI";
import { StructureApiRouter } from "./structureAPI";


const router = Router();

router.use('/appointmentContent', ContentApiRouter);
router.use('/appointmentStructure', StructureApiRouter);



export { router as AppointmentApiRouter };