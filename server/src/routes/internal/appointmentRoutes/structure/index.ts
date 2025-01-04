import { Router } from "express";
import { StructureRouter } from "./structureRoutes.js";
// import { ServiceTypesRouter } from "./serviceRoutes.js";
// import { UserTypesRouter } from "./serviceRoutes.js";
// import { AdditionalServicesRouter } from "./additionalServicesRoutes.js";
// import { AvailabilityOptionsRouter } from "./availabilityOptionsRoutes.js"
// import { DwellingAdjustmentsRouter } from "./dwellingAdjustmentsRoutes.js"

const router = Router();

router.use('/structure', StructureRouter);
// router.use('/serviceTypes', ServiceTypesRouter);
// router.use('/userTypes', UserTypesRouter);
// router.use('/additionalServices', AdditionalServicesRouter);
// router.use('/availabilityOptions', AvailabilityOptionsRouter);
// router.use('/dwellingAdjustments', DwellingAdjustmentsRouter);



export { router as ServiceRouter };
