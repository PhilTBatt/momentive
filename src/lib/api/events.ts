import { CustomError } from '@/types/error'
import axios from 'axios'
import type { Event } from "@/types/event"

export async function getEvents({ sortBy, order, topic, limit, page, userId }: 
    { sortBy?: string, order?: string, topic?: string, userId?: number, limit?: number, page?: number }
): Promise<Event[]> {
	const response = await axios.get(`/api/events`, { params: { sortBy, order, topic, userId, limit, page } })
	return response.data.events
}
  
export async function getEventById(id: string): Promise<Event> {
	const response = await axios.get(`/api/events/${id}`)
	return response.data.event
}

export async function postNewEvent({ id, title, description, date, location, topic }: 
    { id: number, title: string; description: string; date: string; location: string, topic: string }
): Promise<Event> {
	const response = await axios.post('/api/events', { id, title, description, date, location, topic })
	return response.data.event
}

export async function updateEvent(id: number, { title, description, date, location, topic }: 
    { title: string; description: string; date: string; location: string, topic: string }
): Promise<Event> {
	const response = await axios.patch(`/api/events/${id}`, { title, description, date, location, topic })
	return response.data.event
}

export async function deleteEvent(id: number): Promise<{ status: number; msg: string }> {
	try {
		await axios.delete(`/api/events/${id}`)
		return { status: 204, msg: 'Event deleted successfully' }
	} catch (err: unknown) {
        if (err instanceof CustomError)
		    return { status: err.status, msg: err.msg }
        else
            return { status: 500, msg: 'Internal server error' }
	}
}

export async function postAttendee(id: number, { name, email }: { name: string; email: string }): Promise<Event> {
    const response = await axios.post(`/api/events/${id}/attendees`, { name, email })
    return response.data.event
}

export async function deleteAttendee(id: number, { name, email }: { name: string; email: string }): Promise<Event> {
    const response = await axios.delete(`/api/events/${id}/attendees`, { params: { name, email } })
    return response.data.event
}