import { Router } from "express";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt"

const router = Router()

router.post("/login", async (req, res) => {
	const { email, password } = req.body
	// fetch user by email
	const user = await prisma.user.findUnique({
		where: { email }
	});

	if (!user) {
		return res.status(401).json({ message: "invalid credentials" })
	}

	if (user.status === "disabled") {
		return res.status(401).json({ message: "invalid credentials"})
	}

	// Check password
	const isMatch = await bcrypt.compare(password, user?.password)

	if (!isMatch) {
		return res.status(401).json({ message: "invalid credentials" })
	}

	return res.json({ message: "login succesful" })
})

router.get("/me", async (req, res) => {
	const email = req.headers["x-user-email"] as string
	if (!email) {
		return res.status(401).json({ message: "Unauthorize" })
	}

	const user = await prisma.user.findUnique({
		where: {email},
	})

	if (!user) {
		return res.status(401).json({ message: "Unauthorize"})
	}

	return res.json(user)
})

router.post("/change-password", (req, res) => {
	return res.json({ message: "change password route" })
})

export default router