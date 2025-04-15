import { db } from "@/utils/connection"
import { NextRequest } from "next/server"

export async function GET(sortBy = 'created_at', order = 'DESC', topic: string, limit = 10, page = 1) {
	const validColumns = ['title', 'date', 'created_by', 'location', 'topic', 'attendees']
    const validOrders = ['ASC', 'DESC']

	if (!validColumns.includes(sortBy))
		return new Response(JSON.stringify({status: 400, msg: 'Invalid sort_by query'}), { status: 400, headers: { 'Content-Type': 'application/json' }})
	if (!validOrders.includes(order))
		return new Response(JSON.stringify({status: 400, msg: 'Invalid order query'}), { status: 400, headers: { 'Content-Type': 'application/json' }})
	if (isNaN(limit))
		return new Response(JSON.stringify({status: 400, msg: 'Invalid limit query'}), { status: 400, headers: { 'Content-Type': 'application/json' }})
	if (isNaN(page))
		return new Response(JSON.stringify({status: 400, msg: 'Invalid page query'}), { status: 400, headers: { 'Content-Type': 'application/json' }})
	
	let query = `SELECT * FROM events`

	if (topic) query += ` WHERE topic = ${topic}`

	query += `ORDER BY ${sortBy} ${order} LIMIT ${limit} OFFSET ${(page - 1) * limit}'`

    const events = await db`${query}`
    return new Response(JSON.stringify({ events }), { status: 200, headers: { 'Content-Type': 'application/json' }})
}
   
export async function POST(request: NextRequest) {
    const body = await request.json()
    const { title, description, date, location } = body

    for (const field of [title, description, date, location]) {
        if (!field) 
            return new Response(JSON.stringify({ error: 'Field is missing' }), { status: 400, headers: { 'Content-Type': 'application/json' }})

        if (typeof field !== 'string') 
            return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400, headers: { 'Content-Type': 'application/json' }})
    }

    const newEvent = await db`INSERT INTO events (title, description, date, location) VALUES
        (${title}, ${description}, ${date}, ${location}) RETURNING *`

    return new Response(JSON.stringify({ event: newEvent[0] }), { status: 201, headers: { 'Content-Type': 'application/json' } })
}