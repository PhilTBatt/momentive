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
	query += `ORDER BY ${sortBy} ${order} LIMIT ${limit} OFFSET ${(page - 1) * limit}'`
	
	const events = await db`${query}`
	return events
}

export async function postEvent(title: string, description: string, date: string, location: string) {
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