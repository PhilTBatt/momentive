import { fetchUsers, insertUser } from "@/app/models/user"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) { 
    const searchParams = request.nextUrl.searchParams
	const order = searchParams.get("order") || "ASC"
	const limit = Number(searchParams.get("limit") || 10)
	const page = Number(searchParams.get("page") || 1)

	try {
		const users = await fetchUsers(order, limit, page)
		return new Response(JSON.stringify({ users }), { status: 200, headers: { "Content-Type": "application/json" } })
	} catch (err: any) {
		return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
	}
}
   
export async function POST(request: NextRequest) {
    const { name, email } = await request.json()

    try {
		const user = await insertUser(name, email)
		return new Response(JSON.stringify({ user }), { status: 201, headers: { "Content-Type": "application/json" } })
	} catch (err: any) {
		return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
	}
}