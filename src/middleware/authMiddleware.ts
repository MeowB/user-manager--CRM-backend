import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export interface AuthUser extends JwtPayload {
  userId: string
  email: string
}

export interface AuthRequest extends Request {
	user?: AuthUser
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "unauthorized" })
	}

	const token = authHeader.split(" ")[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    if (typeof decoded === "string" || !decoded.userId || !decoded.email) {
      return res.status(401).json({ message: "Invalid token"})
    }

		req.user = decoded as AuthUser
		next()

  } catch {
		return res.status(401).json({ message: "Invalid token" })
	}
}
