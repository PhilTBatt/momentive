import { RESTDataSource } from '@apollo/datasource-rest'
import { Event, CreateEventInput } from '../__generated__/types'

export class EventAPI extends RESTDataSource {
  baseURL = 'http://localhost:3000/api/'

  async getEvents(params?: Partial<{
    sortBy: string
    order: string
    topic: string
    userId: string
    limit: number
    page: number
  }>): Promise<{ events: Event[] }> {
    const stringParams = new URLSearchParams(Object.entries(params ?? {}).map(([k, v]) => [k, String(v)]))
    return this.get('events', {params: stringParams})
  }

  async getEvent(id: string): Promise<{ event: Event }> {
    return this.get(`events/${id}`)
  }

  async createEvent(input: CreateEventInput): Promise<{ event: Event }> {
    return this.post('events', { body: input })
  }

  async updateEvent(id: string, input: Partial<Omit<CreateEventInput, 'createdBy'>>): Promise<{ updatedEvent: Event }> {
    return this.patch(`events/${id}`, { body: input })
  }

  async deleteEvent(id: string): Promise<{ msg: string }> {
    return this.delete(`events/${id}`)
  }

  async addAttendee(eventId: string, input: { name: string; email: string }): Promise<{ event: Event }> {
      return this.post(`events/${eventId}/attendees`, { body: input })
  }

  async removeAttendee(eventId: string, input: { name: string; email: string }): Promise<{ event: Event }> {
    return this.delete(`events/${eventId}/attendees`, { body: input })
  }
}