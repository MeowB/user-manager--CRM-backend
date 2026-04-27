import { Router } from "express";
import healthRouter from "./health.route"
import authRouter from "../modules/auth/auth.route"
import leadsRouter from "../modules/leads/leads.route"
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router()

router.use('/health', healthRouter)
router.use('/auth', authRouter)
router.use('/leads', authMiddleware, leadsRouter)

export default router