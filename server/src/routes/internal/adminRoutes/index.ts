import { Router } from "express";
import { ServiceTypesRouter } from "./serviceTypesRoutes.js";
import { UserTypesRouter } from "./userTypesRoutes.js";
import { AdditionalServicesRouter } from "./additionalServicesRoutes.js";
import { AvailabilityOptionRouter } from "./availabilityOptionsRoutes.js";
import { DwellingAdjustmentRouter } from "./dwellingAdjustmentsRoutes.js";

const router = Router();

router.use('/serviceTypes', ServiceTypesRouter);
router.use('/userTypes', UserTypesRouter);
router.use('/additionalServices', AdditionalServicesRouter);
router.use('/availabilityOptions', AvailabilityOptionRouter);
router.use('/dwellingAdjustments', DwellingAdjustmentRouter);

export { router as AdminRouter };