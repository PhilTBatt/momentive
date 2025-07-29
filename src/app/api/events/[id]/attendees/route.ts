import { addAttendeeToEvent, fetchEventById, removeAttendeeFromEvent } from "@/app/api/models/events"
import { CustomError } from "@/types/error"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params
        const { name, email } = await request.json()
        
        if (id) {
            await addAttendeeToEvent(Number(id), name, email)
            const updatedEvent = await fetchEventById(Number(id))

            return NextResponse.json({ event: updatedEvent }, { status: 200 })
        }
    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const {id} = await params

        const searchParams = request.nextUrl.searchParams
        let name = searchParams.get("name")
        let email = searchParams.get("email")

        if (!id || !name || !email) {
            const body = await request.json()
            name = body.name
            email = body.email
        }
        
        if (!id || !name || !email)
            throw new CustomError(400, "Missing required parameters.")

        await removeAttendeeFromEvent(Number(id), name, email)
        const updatedEvent = await fetchEventById(Number(id))
        
        return NextResponse.json({ event: updatedEvent }, { status: 200 })

    } catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}