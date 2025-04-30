import { fetchEvents, insertEvent } from "@/app/api/models/events"
import { CustomError } from "@/types/error"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams

	const sortBy = searchParams.get("sortBy") || "date"
	const order = searchParams.get("order") || "DESC"
	const topic = searchParams.get("topic")
    const userId = searchParams.get("userId")
    const userIdNumber = userId !== null ? Number(userId) : null
	const limit = Number(searchParams.get("limit") || 10)
	const page = Number(searchParams.get("page") || 1)

	try {
		const events = await fetchEvents(sortBy, order, topic, userIdNumber, limit, page)

		return NextResponse.json({ events }, { status: 200 })
	} catch (err: unknown) {
        console.log(err)
        if (err instanceof CustomError)
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}
   
export async function POST(request: NextRequest) {
    const { id, title, description, date, location, topic } = await request.json()

	try {
		const event = await insertEvent(Number(id), title, description, date, location, topic)

		return NextResponse.json({ event }, { status: 201 })
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}