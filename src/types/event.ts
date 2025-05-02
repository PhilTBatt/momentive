import { topics } from "@/lib/topics"
import { Attendee } from "./attendee"

export type Event = {
	id: number
	title: string
	description: string
	date: string
	location: string
	topic: keyof typeof topics
	createdBy: number
	attendees: Attendee[]
}