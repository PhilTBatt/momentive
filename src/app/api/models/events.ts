import { db } from "@/lib/connection"
import { CustomError } from "@/types/error"

export async function fetchEvents(sortBy = 'date', order = 'DESC', topic: string | null, userId: number | null, limit = 10, page = 1) {
    if (sortBy === 'createdBy') sortBy = '"createdBy"'

    const validColumns = ['title', 'date', '"createdBy"', 'location', 'topic', 'attendees']
	const validOrders = ['ASC', 'DESC']
	
	if (!validColumns.includes(sortBy)) 
		throw { status: 400, msg: 'Invalid sort_by query' }
	if (!validOrders.includes(order)) 
		throw { status: 400, msg: 'Invalid order query' }
    if (userId && isNaN(userId)) 
		throw { status: 400, msg: 'Invalid userId query' }
	if (isNaN(limit)) 
		throw { status: 400, msg: 'Invalid limit query' }
	if (isNaN(page)) 
		throw { status: 400, msg: 'Invalid page query' }
	
	let query = `SELECT id, title, description, location, date, "createdBy", topic, array_to_json(attendees) AS attendees,
       "createdAt" FROM events`

	const params = []
    const conditions = []

	if (userId){
        conditions.push(`"createdBy" = $${params.length + 1}`)
        params.push(userId)
    }
      
    if (topic && topic !== '') {
        conditions.push(`topic = $${params.length + 1}`)
        params.push(topic)
    }
      
    if (conditions.length > 0)
        query += ' WHERE ' + conditions.join(' AND ')

    if (sortBy === 'attendees')
        query += ` ORDER BY cardinality(attendees) ${order}`
    else
        query += ` ORDER BY ${sortBy} ${order}`   

	query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
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

    const query = `INSERT INTO events (title, description, date, location, topic, "createdBy") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

	const newEvent = await db.query(query, params)

	return newEvent[0]
}

export async function fetchEventById(id: number) {
    const query = `SELECT id, title, description, location, date, "createdBy", topic, array_to_json(attendees) AS attendees,
       "createdAt" FROM events WHERE id = $1`
	const event = await db.query(query, [id])

    if (event.length === 0) {
        new CustomError(404, "Event not found")
    }
    
    return event[0]
}

export async function removeEventById(id: number) {
    const query = `DELETE FROM events WHERE id = $1 RETURNING *`
	const result = await db.query(query, [id])

    if (result.length === 0) 
        throw new CustomError(404, "Event not found")

    return true
}

export async function updateEventById(id: number, title: string, description: string, date: string, location: string, topic: string) {
    const params = [title, description, date, location, topic, id]
    
    for (const field of [title, description, date, location, topic]) {
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

export async function addAttendeeToEvent(eventId: number, name: string, email: string) {
    if (!name || !email)
        throw new CustomError(400, 'Name and email are required for attendees.')

    if (typeof name !== 'string' || typeof email !== 'string')
        throw new CustomError(400, 'Invalid input types for name or email.')

    const checkQuery = `SELECT 1 FROM events WHERE id = $3 AND attendees @> ARRAY[ROW($1, $2)::attendee]`

    const checkResult = await db.query(checkQuery, [name, email, eventId])

    if (checkResult.length > 0)
        throw new CustomError(400, 'This email is already attending the event.')

    const query = `UPDATE events SET attendees = array_append(attendees, ROW($1, $2)::attendee) WHERE id = $3 RETURNING *`

    const params = [name, email, eventId]
    const result = await db.query(query, params)

    if (result.length === 0)
		throw new CustomError(404, "Event not found")

    return result[0]
}

export async function removeAttendeeFromEvent(eventId: number, name: string, email: string) {
    if (!name || !email)
        throw new CustomError(400, 'Name and email are required to remove an attendee.')

    if (typeof name !== 'string' || typeof email !== 'string')
        throw new CustomError(400, 'Invalid input types for name or email.')

    const checkQuery = `SELECT * FROM events WHERE id = $3 AND attendees @> ARRAY[ROW($1, $2)::attendee]`
    const checkResult = await db.query(checkQuery, [name, email, eventId])

    if (checkResult.length === 0)
        throw new CustomError(400, 'This attendee is not part of the event.')

    const removeQuery = `UPDATE events SET attendees = array_remove(attendees, ROW($1, $2)::attendee)
        WHERE id = $3 RETURNING *`

    const result = await db.query(removeQuery, [name, email, eventId])

    if (result.length === 0)
        throw new CustomError(404, 'Event not found.')

    return result[0]
}
