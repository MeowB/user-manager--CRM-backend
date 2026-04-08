import router from "../auth/auth.route";

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