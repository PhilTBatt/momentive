import { addAttendeeToEvent, fetchEventById, removeEventById, updateEventById } from "@/app/api/models/events";
import { CustomError } from "@/types/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params

        if (id) {
            const event = await fetchEventById(Number(id))
            return NextResponse.json({ event }, { status: 200 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params

        if (id) {
            await removeEventById(Number(id))
            return new Response(null, { status: 204 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params
        const { title, description, date, location, topic } = await request.json()

        if (id) {
            const updatedEvent = await updateEventById(Number(id), title, description, date, location, topic)
            return NextResponse.json(updatedEvent, { status: 200 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params
        const { name, email } = await request.json()
        
        if (id) {
            const updatedEvent = await addAttendeeToEvent(Number(id), name, email)
            return NextResponse.json(updatedEvent, { status: 200 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}