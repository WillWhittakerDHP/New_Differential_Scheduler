import { Router } from "express";
import { authenticateToken } from "../../../middleware/auth.js";
import { UserRouter } from "./user-routes.js";
import { LoginRouter } from './login-routes.js';


const router = Router();

router.use('/users', UserRouter);
router.use('/login', authenticateToken, LoginRouter);


export { router as ParticipantApiRouter };