import { fetchEvents, insertEvent } from "@/app/models/events"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams

	const sortBy = searchParams.get("sortBy") || "date"
	const order = searchParams.get("order") || "DESC"
	const topic = searchParams.get("topic")
	const limit = Number(searchParams.get("limit") || 10)
	const page = Number(searchParams.get("page") || 1)

	try {
		console.log("Entering try block")
		const events = await fetchEvents(sortBy, order, topic, limit, page)
		return new Response(JSON.stringify({ events }), { status: 200, headers: { "Content-Type": "application/json" } })
	} catch (err: any) {
		return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
	}
}
   
export async function POST(request: NextRequest) {
    const { title, description, date, location } = await request.json()

	try {
		const event = await insertEvent(title, description, date, location)
		return new Response(JSON.stringify({ event }), { status: 201, headers: { 'Content-Type': 'application/json' } })
	} catch (err: any) {
		return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
	}
}