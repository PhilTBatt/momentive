import { db } from "@/utils/connection"

export async function fetchEvents(sortBy = 'date', order = 'DESC', topic: string | null, limit = 10, page = 1) {
	const validColumns = ['title', 'date', 'created_by', 'location', 'topic', 'attendees']
	const validOrders = ['ASC', 'DESC']
	
	if (!validColumns.includes(sortBy)) 
		throw { status: 400, msg: 'Invalid sort_by query' }
	if (!validOrders.includes(order)) 
		throw { status: 400, msg: 'Invalid order query' }
	if (isNaN(limit)) 
		throw { status: 400, msg: 'Invalid limit query' }
	if (isNaN(page)) 
		throw { status: 400, msg: 'Invalid page query' }
	
	let query = `SELECT * FROM events`
	const params = []

	if (topic) {
		query += ` WHERE topic = ${topic}`
		params.push(topic)
	}

	query += ` ORDER BY ${sortBy} ${order} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
	params.push(limit, (page - 1) * limit)

    const events = await db.query(query, params) // Run the query with values

	return events
}

export async function insertEvent(title: string, description: string, date: string, location: string) {
	for (const field of [title, description, date, location]) {
        if (!field) 
            throw { status: 400, msg: 'Field is missing' }
        if (typeof field !== 'string') 
            throw { status: 400, msg: 'Invalid input' }
    }

    const query = `INSERT INTO events (title, description, date, location) VALUES ($1, $2, $3, $4) RETURNING *`
    const params = [title, description, date, location]

	const newEvent = await db.query(query, params)

	return newEvent[0]
}

export async function fetchEventById(id: string) {
    const query = `SELECT * FROM events WHERE id = $1`
	const event = await db.query(query, [id])

    if (event.length === 0) 
        throw { status: 404, msg: "Event not found" }
    
    return event[0]
}

export async function removeEventById(id: string) {
    const query = `DELETE FROM events WHERE id = $1 RETURNING *`
	const result = await db.query(query, [id])

    if (result.length === 0) 
        throw { status: 404, msg: "Event not found" }

    return true
}

export async function updateEventById(id: string, title: string, description: string, date: string, location: string) {
    for (const field of [title, description, date, location]) {
        if (!field) 
            throw { status: 400, msg: "Field is missing" }
        if (typeof field !== 'string') 
            throw { status: 400, msg: "Invalid input" }
    }

    const query = `UPDATE events SET title = $1, description = $2, date = $3, location = $4 WHERE id = $5 RETURNING *`
    const params = [title, description, date, location, id]
    const result = await db.query(query, params)

    if (result.length === 0)
        throw { status: 404, msg: "Event not found" }

    return result[0]
}