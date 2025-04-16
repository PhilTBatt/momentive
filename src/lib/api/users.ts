interface User {
	id: string;
	name: string;
	email: string;
}
  
export async function getUsers({ order, limit, page }: { order?: string; limit?: number; page?: number }): Promise<User[]> {
	const response = await fetch(`/api/users?order=${order}&limit=${limit}&page=${page}`);
	const data = await response.json()
	return data.users;
}
  
export async function getUserById(id: string): Promise<User> {
	const response = await fetch(`/api/users/${id}`)
	const data = await response.json()
	return data.user
}
  
export async function postNewUser({ name, email }: { name: string; email: string }): Promise<User> {
	const response = await fetch('/api/users', {
	  	method: 'POST',
	  	headers: {
			'Content-Type': 'application/json'
	  	},
	  	body: JSON.stringify({ name, email })
	})
	const data = await response.json()
	return data.user
}
  
export async function updateUser(id: string, { name, email }: { name: string; email: string }): Promise<User> {
	const response = await fetch(`/api/users/${id}`, {
	  	method: 'PATCH',
	  	headers: {
			'Content-Type': 'application/json'
	  	},
	  	body: JSON.stringify({ name, email })
	})

	const data = await response.json()
	return data.user
}
  
export async function deleteUser(id: string): Promise<{ status: number; msg: string }> {
	const response = await fetch(`/api/users/${id}`, {
	  	method: 'DELETE'
	})

	if (response.status === 204) {
	  	return { status: 204, msg: 'User deleted successfully' }
	} else {
	  	throw new Error('Failed to delete user')
	}
}  