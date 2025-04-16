import axios from 'axios'

interface User {
	id: string
	name: string
	email: string
}

export async function getUsers({ order, limit, page }: { order?: string; limit?: number; page?: number }): Promise<User[]> {
	const response = await axios.get('/api/users', { params: { order, limit, page } })
	return response.data.users
}

export async function getUserById(id: string): Promise<User> {
	const response = await axios.get(`/api/users/${id}`)
	return response.data.user
}

export async function postNewUser({ name, email }: { name: string; email: string }): Promise<User> {
	const response = await axios.post('/api/users', { name, email })
	return response.data.user
}

export async function updateUser(id: string, { name, email }: { name: string; email: string }): Promise<User> {
	const response = await axios.patch(`/api/users/${id}`, { name, email })
	return response.data.user
}

export async function deleteUser(id: string): Promise<{ status: number; msg: string }> {
	try {
		await axios.delete(`/api/users/${id}`)
		return { status: 204, msg: 'User deleted successfully' }
	} catch (err: any) {
		return { status: err.status, msg: err.msg }
	}
}