import { Router } from "express";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { authMiddleware, AuthRequest } from "../../middleware/authMiddleware";

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


	const token = jwt.sign(
		{ userId: user.id, email: user.email},
		process.env.JWT_SECRET!,
		{ expiresIn: "1h"}
	)

	return res.json({ 
		message: "login succesful",
		token
	})
})


router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.user?.userId
  if(!userId) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId},
  })

	if (!user) {
		return res.status(401).json({ message: "Unauthorize"})
	}

  const { password, ...safeUser } = user

	return res.json(safeUser)
})

router.post("/change-password", (req, res) => {
	return res.json({ message: "change password route" })
})

export default router
