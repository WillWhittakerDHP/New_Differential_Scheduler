import { Router } from "express";
import { AppointmentPartsRouter } from "./appointmentPartsRoutes.js";
import { AppointmentPartTypesRouter } from "./appointmentPartTypeRoutes.js"
import { DwellingTypesRouter } from "./dwellingTypeRoutes.js"
import { TimeBlockSetsRouter } from "./timeBlockSetsRoutes.js"
import { UIDescriptionsRouter } from "./uiDescriptionsRoutes.js";

const router = Router();

router.use('/AppointmentParts', AppointmentPartsRouter);
router.use('/appointmentPartTypes', AppointmentPartTypesRouter);
router.use('/dwellingType', DwellingTypesRouter);
router.use('/timeBlockSets', TimeBlockSetsRouter);
router.use('/uiDescriptions', UIDescriptionsRouter);


export { router as StructureApiRouter };