import { db } from "@/utils/connection"

export async function fetchUsers(order: string, limit: number, page: number) {
	const validOrders = ['ASC', 'DESC']
	
	if (!validOrders.includes(order))
		throw { status: 400, msg: 'Invalid order query' }
	if (isNaN(limit))
		throw { status: 400, msg: 'Invalid limit query' }
	if (isNaN(page))
		throw { status: 400, msg: 'Invalid page query' }
		
	let query = `SELECT * FROM users`
	query += ` ORDER BY name ${order} LIMIT ${limit} OFFSET ${(page - 1) * limit}`

	const users = await db`${query}`
	return users
}

export async function insertUser(name: string, email: string) {
	for (const field of [name, email]) {
        if (!field) throw { status: 400, msg: 'Field is missing' }
        if (typeof field !== 'string') throw { status: 400, msg: 'Invalid input' }
    }

    const newUser = await db`INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING *`
	
	return newUser[0]
}

export async function fetchUserById(id: string) {
	const user = await db`SELECT * FROM users WHERE id = ${id}`
	if (user.length === 0) throw { status: 404, msg: "User not found" }
	return user[0]
}

export async function removeUserById(id: string) {
	const result = await db`DELETE FROM users WHERE id = ${id} RETURNING *`
	if (result.length === 0) throw { status: 404, msg: "User not found" }
	return true
}

export async function updateUserById(id: string, name: string, email: string) {
	for (const field of [name, email]) {
		if (!field) throw { status: 400, msg: "Field is missing" }
		if (typeof field !== 'string') throw { status: 400, msg: "Invalid input" }
	}

	const user = await db`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id} RETURNING *`

	if (user.length === 0) throw { status: 404, msg: "User not found" }
	return user[0]
}