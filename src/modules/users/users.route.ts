import { Router } from "express"

const router = Router()

export default router

router.post('/', (req, res) => {
	return res.json({ message: "create new user"})
}) 