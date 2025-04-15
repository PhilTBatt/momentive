import { fetchEventById, removeEventById, updateEventById } from "@/app/models/events";
import { NextRequest } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
	try {
        const event = await fetchEventById(params.id)
        return new Response(JSON.stringify({ event }), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (err: any) {
        return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
    }
}
   
export async function DELETE({ params }: { params: { id: string } }) {
	try {
        await removeEventById(params.id)
        return new Response(null, { status: 204 })
    } catch (err: any) {
        return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
        const { title, description, date, location } = await request.json();
        const updatedEvent = await updateEventById(params.id, title, description, date, location);
        return new Response(JSON.stringify(updatedEvent), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (err: any) {
        return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } });
    }
}