import { fetchEvents, postEvent } from "@/app/models/events"
import { db } from "@/utils/connection"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)

	const sortBy = searchParams.get("sortBy") || "created_at"
	const order = searchParams.get("order") || "DESC"
	const topic = searchParams.get("topic")
	const limit = Number(searchParams.get("limit") || 10)
	const page = Number(searchParams.get("page") || 1)

	try {
		const events = await fetchEvents(sortBy, order, topic, limit, page)
		return new Response(JSON.stringify({ events }), { status: 200, headers: { "Content-Type": "application/json" } })
	}
	catch (err: any) {
		return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
	}
}
   
export async function POST(request: NextRequest) {
    const { title, description, date, location } = await request.json()

	try {
		const event = await postEvent(title, description, date, location)
		return new Response(JSON.stringify({ event }), { status: 201, headers: { 'Content-Type': 'application/json' } })
	} 
	catch (err: any) {
		return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
	}
}