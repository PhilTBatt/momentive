import { CustomError } from '@/types/error';
import { User } from '@/types/user';
import axios from 'axios'

export async function getUsers({ order, limit, page }: { order?: string; limit?: number; page?: number }): Promise<User[]> {
	const response = await axios.get('/api/users', { params: { order, limit, page } })
	return response.data.users
}

export async function getUserById(id: number): Promise<User> {
	const response = await axios.get(`/api/users/${id}`)
	return response.data.user
}

export async function getUserByEmail(email: string): Promise<User> {
	const response = await axios.post('/api/users/by-email', { email })
	return response.data.user
}

export async function postNewUser({ name, email, password, staffCode }: { name: string; email: string, password: string, staffCode: string }): Promise<User> {
	const response = await axios.post('/api/users', { name, email, password, staffCode })
	return response.data.user
}

export async function updateUser(id: number, { name, email }: { name: string; email: string }): Promise<User> {
	const response = await axios.patch(`/api/users/${id}`, { name, email })
	return response.data.user
}

export async function deleteUser(id: number): Promise<{ status: number; msg: string }> {
	try {
		await axios.delete(`/api/users/${id}`)
		return { status: 204, msg: 'User deleted successfully' }
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return { status: err.status, msg: err.msg }
        else
            return { status: 500, msg: 'Internal server error' }
    }
}

export async function authenticateUser({ email, password }: { email: string; password: string }): Promise<boolean> {
	const response = await axios.post('/api/users/authenticate', { email, password })
	return response.data.success
}