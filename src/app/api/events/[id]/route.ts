import { fetchEventById, removeEventById, updateEventById } from "@/app/api/models/events";
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

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params

        if (id) {
            await removeEventById(Number(id))
            return NextResponse.json({ msg: 'Event deleted successfully' }, { status: 200 })
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
            await updateEventById(Number(id), title, description, date, location, topic)

            const updatedEvent = await fetchEventById(Number(id))

            return NextResponse.json({ updatedEvent }, { status: 200 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}