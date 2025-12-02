import { Router } from "express"

const router = Router()

// GET /api/users
router.get("/", (req, res) => {
	res.json({
		users: [
			{ id: 1, name: "John Doe", email: "john@example.com" },
			{ id: 2, name: "Jane Smith", email: "jane@example.com" },
		],
	})
})

// GET /api/users/:id
router.get("/:id", (req, res) => {
	const { id } = req.params
	res.json({
		id,
		name: `User ${id}`,
		email: `user${id}@example.com`,
		createdAt: new Date().toISOString(),
	})
})

// POST /api/users
router.post("/", (req, res) => {
	const { name, email } = req.body

	if (!name || !email) {
		return res.status(400).json({
			error: "Name and email are required",
		})
	}

	res.status(201).json({
		id: Math.random().toString(36).substr(2, 9),
		name,
		email,
		createdAt: new Date().toISOString(),
	})
})

export default router
