import { Router } from "express";
import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

const router = Router()

router.post('/', async (req, res) => {
	try {
		const {name, email, company} = req.body
	
		const lead = await prisma.lead.create({
			data: {
				name,
				email,
				company
			}
		})
	
		return res.json(lead)

	} catch (e) {
		return res.status(500).json({ message: "Internal server error" })
	}
})

router.get("/", async (req, res) => {
	try {
		const leads = await prisma.lead.findMany()
		return res.json(leads)
	} catch (e) {
		return res.status(500).json({ message: "Internal server error" })
	}
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
		if (
			e instanceof Prisma.PrismaClientKnownRequestError &&
			e.code === "P2025"
		) {
			return res.status(404).json({ message: "Lead not found."} )
		}

		return res.status(500).json({ message: "Internal server error" })
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params
	
		await prisma.lead.delete({
			where: { id }
		})
	
		return res.json({ message: "Lead deleted" })

 	} catch(e) {
		if (
			e instanceof Prisma.PrismaClientKnownRequestError &&
			e.code === "P2025"
		) {
			return res.status(404).json({ message: "Lead not found."} )
		}

		return res.status(500).json({ message: "Internal server error" })
	}
})

export default router