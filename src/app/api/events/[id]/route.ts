import { addAttendeeToEvent, fetchEventById, removeEventById, updateEventById } from "@/app/api/models/events";
import { CustomError } from "@/types/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
	try {
        const event = await fetchEventById(params.id)

        return NextResponse.json({ event }, { status: 200 })
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}
   
export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
	try {
        await removeEventById(params.id)

        return new Response(null, { status: 204 })
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	try {
        const { title, description, date, location, topic } = await request.json()
        const updatedEvent = await updateEventById(params.id, title, description, date, location, topic)

        return NextResponse.json(updatedEvent, { status: 200 })
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { name, email } = await request.json()
		const updatedEvent = await addAttendeeToEvent(params.id, name, email)
		
		return NextResponse.json(updatedEvent, { status: 200 })
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}