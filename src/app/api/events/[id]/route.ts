import { fetchEventById, removeEventById, updateEventById } from "@/app/models/events";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
	try {
        const event = await fetchEventById(params.id)
        return NextResponse.json({ event }, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
    }
}
   
export async function DELETE({ params }: { params: { id: string } }) {
	try {
        await removeEventById(params.id)
        return new Response(null, { status: 204 })
    } catch (err: any) {
        return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
        const { title, description, date, location } = await request.json()
        const updatedEvent = await updateEventById(params.id, title, description, date, location)
        return NextResponse.json(updatedEvent, { status: 200 })
    } catch (err: any) {
        return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
    }
}