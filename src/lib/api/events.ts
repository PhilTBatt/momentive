import axios from 'axios'

interface Event {
	id: string
	title: string
	description: string
	date: string
	location: string
	topic: string
	created_by: string
	attendees: number[]
}
  
export async function getEvents({ sortBy, order, topic, limit, page }: { sortBy?: string; order?: string; topic?: string; limit?: number; page?: number }): Promise<Event[]> {
	const response = await axios.get(`/api/events`, { params: { sortBy, order, topic, limit, page } })
	return response.data.events
}
  
export async function getEventById(id: string): Promise<Event> {
	const response = await axios.get(`/api/events/${id}`)
	return response.data.event
}
  
export async function postNewEvent({ title, description, date, location }: { title: string; description: string; date: string; location: string }): Promise<Event> {
	const response = await axios.post('/api/events', { title, description, date, location })
	return response.data.event
}
  
export async function updateEvent(id: string, { title, description, date, location }: { title: string; description: string; date: string; location: string }): Promise<Event> {
	const response = await axios.patch(`/api/events/${id}`, { title, description, date, location })
	return response.data.event
}
  
export async function deleteEvent(id: string): Promise<{ status: number; msg: string }> {
	try {
		await axios.delete(`/api/events/${id}`)
		return { status: 204, msg: 'Event deleted successfully' }
	} catch (err: any) {
		return { status: err.status, msg: err.msg }
	}
}