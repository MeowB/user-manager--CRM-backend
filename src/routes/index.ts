import { Router } from "express";
import healthRouter from "./health.route"
import authRouter from "../modules/auth/auth.route"
import leadsRouter from "../modules/leads/leads.route"

const router = Router()

router.use('/health', healthRouter)
router.use('/auth', authRouter)
router.use('/lead', leadsRouter)

export default router