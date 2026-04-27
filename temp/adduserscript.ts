import prisma from "../src/lib/prisma";
import { Prisma } from "@prisma/client";


const run = async () => {
	await prisma.user.create({
		data: {
			email: "admin@test.com",
			password: "$2b$10$SGipe2hFLLSHP6JF2oD3FOSv6cJFKhFZOhFDpha8layftdB5efHZC",
			status: "active"			
		}
	})
}