import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    // Fetch data
    return new Response(JSON.stringify(''), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
  }
   
  export async function POST(request: NextRequest) {
    const body = await request.json()
    const { title, description, date, location, createdBy } = body
  
    // const newEvent = await db.events.create({ data: { title, description, date, location, createdBy } })

    return new Response(JSON.stringify(''), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    })
}