import { addAttendeeToEvent, fetchEventById, removeEventById, updateEventById } from "@/app/api/models/events";
import { CustomError } from "@/types/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const searchParams  = request.nextUrl.searchParams;
        const id = searchParams.get('id')

        if (id) {
            const event = await fetchEventById(id)
            return NextResponse.json({ event }, { status: 200 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}
   
export async function DELETE(request: NextRequest) {
    try {
        const searchParams  = request.nextUrl.searchParams;
        const id = searchParams.get('id')

        if (id) {
            await removeEventById(id)
            return new Response(null, { status: 204 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const searchParams  = request.nextUrl.searchParams;
        const id = searchParams.get('id')
        const { title, description, date, location, topic } = await request.json()

        if (id) {
            const updatedEvent = await updateEventById(id, title, description, date, location, topic)
            return NextResponse.json(updatedEvent, { status: 200 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const searchParams  = request.nextUrl.searchParams;
        const id = searchParams.get('id')
        const { name, email } = await request.json()
        
        if (id) {
            const updatedEvent = await addAttendeeToEvent(id, name, email)
            return NextResponse.json(updatedEvent, { status: 200 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}