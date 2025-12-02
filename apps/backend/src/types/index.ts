export interface User {
	id: string
	name: string
	email: string
	createdAt: string
}

export interface CreateUserRequest {
	name: string
	email: string
}

export interface ApiResponse<T = any> {
	success: boolean
	data?: T
	error?: string
	message?: string
}

export interface HealthCheckResponse {
	status: string
	timestamp: string
	uptime: number
}
