import { Router } from "express"
import bcrypt from "bcrypt"
import prisma from "../../lib/prisma"
import { Prisma } from "@prisma/client"

const router = Router()

const userSelect = {
  id: true,
  email: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true
}

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: userSelect,
      orderBy: { createdAt: "desc"},
    })

    return res.json(users)
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" })
  }
})

router.post('/', async (req, res) => {
  try {
    const { email, password, role, status } = req.body

    if (!email || !password || !role || !status) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        status,
      },
      select: userSelect
    })

    return res.status(201).json(user)
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return res.status(409).json({ message: "Email already exists" })
    }

    return res.status(500).json({ message: "Internal server error" })
  }
})

export default router
