import { Router } from "express";
import { ServiceRouter } from "./serviceTypesRoutes.js";
import { UserTypesRouter } from "./userTypesRoutes.js";
import { AdditionalServicesRouter } from "./additionalServicesRoutes.js";
import { AvailabilityOptionRouter } from "./availabilityOptionsRoutes.js";
import { DwellingAdjustmentRouter } from "./dwellingAdjustmentsRoutes.js";

const router = Router();

router.use('/serviceTypes', ServiceRouter);
router.use('/userTypes', UserTypesRouter);
router.use('/additionalServiceTypes', AdditionalServicesRouter);
router.use('/availabilityOptionTypes', AvailabilityOptionRouter);
router.use('/dwellingAdjustmentTypes', DwellingAdjustmentRouter);

export { router as AdminRouter };