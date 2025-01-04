import { Router } from "express";
import { StructureRouter } from "./structureRoutes.js";
import { AdminRouter } from "./adminRoutes/index.js";

const router = Router();

router.use('/structure', StructureRouter);
router.use('/admin', AdminRouter);

export { router as ServiceRouter };
