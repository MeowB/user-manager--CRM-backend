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

router.get("/:id", async (req, res) => {
	const { id } = req.params

	const lead = await prisma.lead.findUnique({
		where: { id }
	})

	if (!lead){
		return res.status(404).json({ message: "Lead not found" })
	}

	return res.json(lead)
})

router.patch("/:id", async (req, res) => {
	try {
		const { id } = req.params
		const { name, email, company } = req.body
	
		const lead = await prisma.lead.update({
			where: { id },
			data: {
				name,
				email,
				company
			}
		})
	
		return res.json(lead)

	} catch(e) {
		return res.status(404).json({ message: "Lead not found."} )
	}
})

export default router