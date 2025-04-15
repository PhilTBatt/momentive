import { db } from "@/utils/connection";
import { NextRequest } from "next/server";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
  	const { id } = await params
  	const event = await db`SELECT * FROM events WHERE id = ${id}`

	if (!event) return new Response('Event not found', { status: 404 })

  	return new Response(JSON.stringify({ event }), { status: 200, headers: { 'Content-Type': 'application/json' } })
}
   
export async function POST(request: NextRequest) {
  	const body = await request.json()
  	const { name } = body
  	// Save to database

  	return new Response(JSON.stringify(name), {
    	status: 201,
    	headers: { 'Content-Type': 'application/json' }
  	})
}