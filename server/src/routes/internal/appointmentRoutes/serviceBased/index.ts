import { Router } from "express";
import { ServiceTypesRouter } from "./servicesRoutes.js";
import { UserTypesRouter } from "./userTypeRoutes.js";
import { AdditionalServicesRouter } from "./additionalServicesRoutes.js";
import { AvailabilityOptionsRouter } from "./availabilityOptionsRoutes.js"
import { DwellingAdjustmentsRouter } from "./dwellingAdjustmentsRoutes.js"

const router = Router();

router.use('/serviceTypes', ServiceTypesRouter);
router.use('/userTypes', UserTypesRouter);
router.use('/additionalServices', AdditionalServicesRouter);
router.use('/availabilityOptions', AvailabilityOptionsRouter);
router.use('/dwellingAdjustments', DwellingAdjustmentsRouter);



export { router as ServiceApiRouter };
