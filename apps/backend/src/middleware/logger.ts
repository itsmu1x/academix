import { Request, Response, NextFunction } from "express"

export const requestLogger = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const start = Date.now()

	res.on("finish", () => {
		const duration = Date.now() - start
		console.log(
			`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
		)
	})

	next()
}

export const errorLogger = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error(`Error on ${req.method} ${req.originalUrl}:`, err.message)
	next(err)
}
