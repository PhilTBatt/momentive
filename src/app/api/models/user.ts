import { db } from "@/lib/connection"
import { CustomError } from "@/types/error";
import bcrypt from 'bcrypt';

export async function fetchUsers(order = 'ASC', limit = 10, page = 1) {
	const validOrders = ['ASC', 'DESC']
	
	if (!validOrders.includes(order))
		throw { status: 400, msg: 'Invalid order query' }
	if (isNaN(limit))
		throw { status: 400, msg: 'Invalid limit query' }
	if (isNaN(page))
		throw { status: 400, msg: 'Invalid page query' }
		
	const query = `SELECT * FROM users ORDER BY name ${order} LIMIT $1 OFFSET $2`
	const params = [limit, (page - 1) * limit]

	const users = await db.query(query, params)

	return users
}

export async function insertUser(name: string, email: string, password: string) {
	for (const field of [name, email, password]) {
        if (!field) 
			throw new CustomError(400, 'Field is missing')
		
        if (typeof field !== 'string') 
			throw new CustomError(400, 'Invalid input')
    }

	const existingUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

	if (existingUser.length > 0)
		throw new CustomError(409, 'Email already in use')

	const hashedPassword = await bcrypt.hash(password, 10)

    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`
    const params = [name, email, hashedPassword]
	
	const newUser = await db.query(query, params)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _password, ...userWithoutPassword } = newUser[0]
	
	return userWithoutPassword
}

export async function fetchUserById(id: number) {
	const query = `SELECT * FROM users WHERE id = $1`
	const user = await db.query(query, [id])

	if (user.length === 0)
		throw new CustomError(404, "User not found")

	const { password, ...userWithoutPassword } = user[0]
	return userWithoutPassword
}

export async function fetchUserByEmail(email: string) {
	const query = `SELECT * FROM users WHERE email = $1`
	const user = await db.query(query, [email])

	if (user.length === 0) 
		throw new CustomError(404, "User not found")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...userWithoutPassword } = user[0]
	return userWithoutPassword
}

export async function removeUserById(id: number) {
	const query = `DELETE FROM users WHERE id = $1 RETURNING *`
	const result = await db.query(query, [id])

	if (result.length === 0) 
		throw new CustomError(404, "User not found")

	return true
}

export async function updateUserById(id: number, name: string, email: string) {
	for (const field of [name, email]) {
		if (!field)
			throw new CustomError(400, "Field is missing")
		
		if (typeof field !== 'string')
			throw new CustomError(400, "Invalid input")
	}

	const query = `UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *`
	const params = [name, email, id]

	const user = await db.query(query, params)

	if (user.length === 0)
		throw new CustomError(404, "User not found")

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...userWithoutPassword } = user[0]
	return userWithoutPassword
}

export async function checkUserPassword(email: string, password: string) {
    const query = `SELECT password FROM users WHERE email = $1`
    const result = await db.query(query, [email])
  
    if (result.length === 0) 
      throw new CustomError(404, "User not found")
  
    const hashedPassword = result[0].password
    return bcrypt.compare(password, hashedPassword)
}