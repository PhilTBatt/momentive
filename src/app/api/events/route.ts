import { fetchEvents, insertEvent } from "@/app/api/models/events"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams

	const sortBy = searchParams.get("sortBy") || "date"
	const order = searchParams.get("order") || "DESC"
	const topic = searchParams.get("topic")
	const limit = Number(searchParams.get("limit") || 10)
	const page = Number(searchParams.get("page") || 1)

	try {
		const events = await fetchEvents(sortBy, order, topic, limit, page)

		return NextResponse.json({ events }, { status: 200 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
	}
}
   
export async function POST(request: NextRequest) {
    const { title, description, date, location } = await request.json()

	try {
		const event = await insertEvent(title, description, date, location)

		return NextResponse.json({ event }, { status: 201 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
	}
}