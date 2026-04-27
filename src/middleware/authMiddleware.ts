import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

interface AuthRequest extends Request {
	user?: string | JwtPayload
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization
	console.log('hit auth middleware')

	if (!authHeader) {
		console.log("No auth header")
		return res.status(401).json({ message: "unauthorized" })
	}

	const token = authHeader.split(" ")[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!)
		req.user = decoded
		next()
	} catch {
		return res.status(401).json({ message: "Invalid token" })
	}
}