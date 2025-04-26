import { topics } from "@/lib/topics"

export type Event = {
	id: number
	title: string
	description: string
	date: string
	location: string
	topic: keyof typeof topics
	createdBy: number
	attendees: number[]
}