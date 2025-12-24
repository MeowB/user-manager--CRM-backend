import prisma from "../lib/prisma";
import { Router } from "express";

const healthRouter = Router()


healthRouter.get('/', async (_req, res) => {
	const checks = {
		server: 'up',
		database: {
			status: 'unknown' as 'up' | 'down',
			error: null as string | null,
		},
	}

	let httpStatus = 200

	// DB check
	try {
		await prisma.$queryRaw`SELECT 1`
		checks.database.status = 'up'
	} catch (err) {
		checks.database.status = 'down'
		checks.database.error =
			err instanceof Error ? err.message : 'unknown error'
		httpStatus = 503
	}

	const overallStatus =
		checks.database.status === 'up' ? 'ok' : 'degraded'

	res.status(httpStatus).json({
		status: overallStatus,
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
		checks,
	})
})

export default healthRouter