import { db } from '@/utils/connection';
import { NextRequest } from 'next/server';
 
export async function GET({ params }: { params: Promise<{ id: string }> }) {
  	const { id } = await params
  	const user = await db`SELECT * FROM users WHERE id = ${id}`

  	if (!user) return new Response('User not found', { status: 404 })
  
  	return new Response( JSON.stringify({ user }), { status: 200,  headers: { 'Content-Type': 'application/json' } })
}

export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
  	const { id } = await params
  	const user = await db`SELECT * FROM users WHERE id = ${id}`

  	if (!user) return new Response('User not found', { status: 404 })
    
  	return new Response(null, { status: 204 })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  	const { id } = await params
  
  	const body = await request.json()
  	const { name, email } = body

  	for (const field of [name, email]) {
    	if (!field) 
      		return new Response(JSON.stringify({ error: 'Field is missing' }), { status: 400 })

    	if (typeof field !== 'string') 
      		return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400, headers: { 'Content-Type': 'application/json' }})
  	}

  	const result = await db`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${id} RETURNING id, name, email`

  	if (result.length === 0) return new Response("User not found", { status: 404 })

  	return new Response(JSON.stringify(result[0]), { status: 200, headers: { 'Content-Type': 'application/json' } })
}