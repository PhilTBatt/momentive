import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  	const id = (await params).id
  	// Fetch data
  	return new Response(JSON.stringify(id), { status: 200, headers: { 'Content-Type': 'application/json' } })
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