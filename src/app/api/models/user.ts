import { db } from "@/lib/connection"

export async function fetchUsers(order = 'ASC', limit = 10, page = 1) {
	const validOrders = ['ASC', 'DESC']
	
	if (!validOrders.includes(order))
		throw { status: 400, msg: 'Invalid order query' }
	if (isNaN(limit))
		throw { status: 400, msg: 'Invalid limit query' }
	if (isNaN(page))
		throw { status: 400, msg: 'Invalid page query' }
		
	let query = `SELECT * FROM users ORDER BY name ${order} LIMIT $1 OFFSET $2`
	const params = [limit, (page - 1) * limit]

	const users = await db.query(query, params)

	return users
}

export async function insertUser(name: string, email: string) {
	for (const field of [name, email]) {
        if (!field) throw { status: 400, msg: 'Field is missing' }
        if (typeof field !== 'string') throw { status: 400, msg: 'Invalid input' }
    }

    const query = `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`
    const params = [name, email]
	
	const newUser = await db.query(query, params)
	
	return newUser[0]
}

export async function fetchUserById(id: string) {
	const query = `SELECT * FROM users WHERE id = $1`
	const user = await db.query(query, [id])

	if (user.length === 0) throw { status: 404, msg: "User not found" }
	return user[0]
}

export async function removeUserById(id: string) {
	const query = `DELETE FROM users WHERE id = $1 RETURNING *`
	const result = await db.query(query, [id])

	if (result.length === 0) throw { status: 404, msg: "User not found" }
	return true
}

export async function updateUserById(id: string, name: string, email: string) {
	for (const field of [name, email]) {
		if (!field) throw { status: 400, msg: "Field is missing" }
		if (typeof field !== 'string') throw { status: 400, msg: "Invalid input" }
	}

	const query = `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`
	const params = [name, email, id]

	const user = await db.query(query, params)

	if (user.length === 0) throw { status: 404, msg: "User not found" }
	return user[0]
}