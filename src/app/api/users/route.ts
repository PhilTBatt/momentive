import { db } from "@/utils/connection"
import { NextRequest } from "next/server"

export async function GET(order = 'ASC', limit = 10, page = 1) {
    const validOrders = ['ASC', 'DESC']

	if (!validOrders.includes(order))
		return new Response(JSON.stringify({status: 400, msg: 'Invalid order query'}), { status: 400, headers: { 'Content-Type': 'application/json' }})
	if (isNaN(limit))
		return new Response(JSON.stringify({status: 400, msg: 'Invalid limit query'}), { status: 400, headers: { 'Content-Type': 'application/json' }})
	if (isNaN(page))
		return new Response(JSON.stringify({status: 400, msg: 'Invalid page query'}), { status: 400, headers: { 'Content-Type': 'application/json' }})
	
	let query = `SELECT * FROM events`

	query += `ORDER BY name ${order} LIMIT ${limit} OFFSET ${(page - 1) * limit}'`
    const users = await db`SELECT * FROM users`
    return new Response(JSON.stringify({ users }), { status: 200, headers: { 'Content-Type': 'application/json' }})
}
   
export async function POST(request: NextRequest) {
    const body = await request.json()
    const { name, email } = body

    for (const field of [name, email]) {
        if (!field) 
            return new Response(JSON.stringify({ error: 'Field is missing' }), { status: 400, headers: { 'Content-Type': 'application/json' }})

        if (typeof field !== 'string') 
            return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400, headers: { 'Content-Type': 'application/json' }})
    }

    const newUser = await db`INSERT INTO users (name, email) VALUES
        (${name}, ${email}) RETURNING *`

    return new Response(JSON.stringify({ user: newUser[0] }), { status: 201, headers: { 'Content-Type': 'application/json' } })
}