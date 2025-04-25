import { db } from "@/lib/connection"
import { CustomError } from "@/types/error"

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

    const events = await db.query(query, params)

	return events
}

export async function insertEvent(id: number, title: string, description: string, date: string, location: string, topic: string) {
	const params = [title, description, date, location, topic, id]

    for (const field of [title, description, date, location, topic]) {
        if (!field) 
            throw new CustomError(400, 'Field is missing')
		
        if (typeof field !== 'string') 
            throw new CustomError(400, 'Invalid input')
    }

    const query = `INSERT INTO events (title, description, date, location, topic, createdby) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

	const newEvent = await db.query(query, params)

	return newEvent[0]
}

export async function fetchEventById(id: string) {
    const query = `SELECT * FROM events WHERE id = $1`
	const event = await db.query(query, [id])

    if (event.length === 0) {
        new CustomError(404, "Event not found")
    }
    
    return event[0]
}

export async function removeEventById(id: string) {
    const query = `DELETE FROM events WHERE id = $1 RETURNING *`
	const result = await db.query(query, [id])

    if (result.length === 0) 
        throw new CustomError(404, "Event not found")

    return true
}

export async function updateEventById(id: string, title: string, description: string, date: string, location: string, topic: string) {
    const params = [title, description, date, location, topic, id]
    
    for (const field of params) {
        if (!field) 
            throw new CustomError(400, "Field is missing")
        if (typeof field !== 'string') 
            throw new CustomError(400, "Invalid input")
    }

    const query = `UPDATE events SET title = $1, description = $2, date = $3, location = $4, topic = $5 WHERE id = $6 RETURNING *`
    const result = await db.query(query, params)

    if (result.length === 0)
        throw new CustomError(404, "Event not found")

    return result[0]
}

export async function addAttendeeToEvent(eventId: string, name: string, email: string) {
    if (!name || !email)
        throw new CustomError(400, 'Name and email are required for attendees.')

    if (typeof name !== 'string' || typeof email !== 'string')
        throw new CustomError(400, 'Invalid input types for name or email.')

    const query = `UPDATE events SET attendees = array_append(attendees, ROW($1, $2)::attendee) WHERE id = $3 RETURNING *`

    const params = [name, email, eventId]
    const result = await db.query(query, params)

    if (result.length === 0)
		throw new CustomError(404, "Event not found")

    return result[0]
}