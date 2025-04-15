import { db } from "@/utils/connection";
import { NextRequest } from "next/server";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  	const { id } = await params
  	const event = await db`SELECT * FROM events WHERE id = ${id}`

	if (!event) return new Response('Event not found', { status: 404 })

  	return new Response(JSON.stringify({ event }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}
   
export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const event = await db`SELECT * FROM events WHERE id = ${id}`

  	if (!event) return new Response('Event not found', { status: 404 })

  	return new Response(null, { status: 201, headers: { 'Content-Type': 'application/json' } })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const body = await request.json()
    const { title, description, date, location } = body

    for (const field of [title, description, date, location]) {
        if (!field) 
            return new Response(JSON.stringify({ error: 'Field is missing' }), { status: 400 })

        if (typeof field !== 'string') 
            return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400, headers: { 'Content-Type': 'application/json' }})
    }

	const result = await db`UPDATE users SET title = ${title}, description = ${description}, date = ${date}, 
		location = ${location} WHERE id = ${id} RETURNING id, name, email`

	if (result.length === 0) return new Response("Event not found", { status: 404 })

	return new Response(JSON.stringify(result[0]), { status: 200, headers: { 'Content-Type': 'application/json' } })
}