import { Router } from "express";
import { ServiceTypesRouter } from "./serviceTypesRoutes.js";
import { UserTypesRouter } from "./userTypesRoutes.js";
import { AdditionalServicesTypesRouter } from "./additionalServicesRoutes.js";
import { AvailabilityOptionsTypesRouter } from "./availabilityOptionsRoutes.js"
import { DwellingAdjustmentsTypesRouter } from "./dwellingAdjustmentsRoutes.js"

const router = Router();

router.use('/serviceTypes', ServiceTypesRouter);
router.use('/userTypes', UserTypesRouter);
router.use('/additionalServices', AdditionalServicesTypesRouter);
router.use('/availabilityOptions', AvailabilityOptionsTypesRouter);
router.use('/dwellingAdjustments', DwellingAdjustmentsTypesRouter);

export { router as AdminRouter };
