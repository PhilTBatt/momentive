import { db } from "@/utils/connection"

export async function fetchEvents(sortBy = 'created_at', order = 'DESC', topic: string | null, limit = 10, page = 1) {
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
	if (topic) query += ` WHERE topic = ${topic}`
	query += ` ORDER BY ${sortBy} ${order} LIMIT ${limit} OFFSET ${(page - 1) * limit}`
	
	const events = await db`${query}`
	return events
}

export async function insertEvent(title: string, description: string, date: string, location: string) {
	for (const field of [title, description, date, location]) {
        if (!field) 
            throw { status: 400, msg: 'Field is missing' }
        if (typeof field !== 'string') 
            throw { status: 400, msg: 'Invalid input' }
    }

    const newEvent = await db`INSERT INTO events (title, description, date, location) VALUES
        (${title}, ${description}, ${date}, ${location}) RETURNING *`
	
	return newEvent[0]
}

export async function fetchEventById(id: string) {
    const event = await db`SELECT * FROM events WHERE id = ${id}`
    if (event.length === 0) 
        throw { status: 404, msg: "Event not found" }
    
    return event[0]
}

export async function removeEventById(id: string) {
    const result = await db`DELETE FROM events WHERE id = ${id} RETURNING *`

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

    const result = await db`UPDATE events SET title = ${title}, description = ${description}, date = ${date}, location = ${location} WHERE id = ${id} RETURNING *`
    if (result.length === 0) 
        throw { status: 404, msg: "Event not found" }

    return result[0]
}