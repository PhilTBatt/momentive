import { db } from "@/utils/connection"
import { NextRequest } from "next/server"

export async function GET() {
    const users = await db`SELECT * FROM users`
    return new Response(JSON.stringify({ users }), { status: 200, headers: { 'Content-Type': 'application/json' }})
}
   
export async function POST(request: NextRequest) {
    const body = await request.json()
    const { name, email } = body

    for (const field of [name, email]) {
        if (!field) 
            return new Response(JSON.stringify({ error: 'Field is missing' }), { status: 400, headers: { 'Content-Type': 'application/json' }})

        if (typeof field !== 'string') 
            return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400, headers: { 'Content-Type': 'application/json' }})
    }

    const newUser = await db`INSERT INTO users (name, email) VALUES
        (${name}, ${email}) RETURNING *`

    return new Response(JSON.stringify({ user: newUser[0] }), { status: 201, headers: { 'Content-Type': 'application/json' } })
}