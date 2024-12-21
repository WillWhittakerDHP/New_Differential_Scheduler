import { Router } from "express";
import { UserRouter } from "./user-routes.js";
import { UserTypesRouter } from "./userTypeRoutes.js";
import { authenticateToken } from "../../../middleware/auth.js";
import { LoginRouter } from './login-routes.js';


const router = Router();

router.use('/users', UserRouter);
router.use('/userTypes', UserTypesRouter);
router.use('/login', authenticateToken, LoginRouter);


export { router as ParticipantRouter };