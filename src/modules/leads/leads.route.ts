import { Router } from "express";
import prisma from "../../lib/prisma";

const router = Router()

router.post('/', async (req, res) => {
	const {name, email, company} = req.body

	const lead = await prisma.lead.create({
		data: {
			name,
			email,
			company
		}
	})

	return res.json(lead)
})

router.get("/", async (req, res) => {
	const leads = await prisma.lead.findMany()
	return res.json(leads)
})

export default router