import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import usersRouter from "./routes/users.js"
import { requestLogger, errorLogger } from "./middleware/logger.js"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)

// Health check endpoint
app.get("/health", (req, res) => {
	res.status(200).json({
		status: "OK",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	})
})

// API routes
app.get("/api/hello", (req, res) => {
	res.json({
		message: "Hello from Express.js backend!",
		timestamp: new Date().toISOString(),
	})
})

// Use modular routes
app.use("/api/users", usersRouter)

// 404 handler
app.use("*", (req, res) => {
	res.status(404).json({
		error: "Route not found",
		path: req.originalUrl,
	})
})

// Error handling middleware
app.use(errorLogger)
app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		console.error(err.stack)
		res.status(500).json({
			error: "Something went wrong!",
			message:
				process.env.NODE_ENV === "development"
					? err.message
					: "Internal server error",
		})
	}
)

// Start server only if not in Vercel environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
	app.listen(PORT, () => {
		console.log(`🚀 Server running on port ${PORT}`)
		console.log(`📊 Health check: http://localhost:${PORT}/health`)
		console.log(`🔗 API endpoint: http://localhost:${PORT}/api/hello`)
	})
}

// Export for Vercel
export default app
