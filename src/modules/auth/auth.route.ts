import { Router } from "express";

const router = Router()

router.post("/login", (req, res) => {
	return res.json({ message: "login route"})
})

router.post("/change-password", (req, res) => {
	return res.json({ message: "change password route"})
})

export default router