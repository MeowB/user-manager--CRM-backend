import { Router } from "express";
import healthRouter from "./health.route"
import authRouter from "../modules/auth/auth.route"
import leadsRouter from "../modules/leads/leads.route"
import { authMiddleware } from "../middleware/authMiddleware";
import usersRouter from "../modules/users/users.route";

const router = Router()

router.use('/health', healthRouter)
router.use('/auth', authRouter)
router.use('/leads', authMiddleware, leadsRouter)
router.use('/users', authMiddleware, usersRouter)

export default router
