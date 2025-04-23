import { fetchUsers, insertUser } from "@/app/api/models/user"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) { 
	const searchParams = request.nextUrl.searchParams
	const order = searchParams.get("order") || "ASC"
	const limit = Number(searchParams.get("limit") || 10)
	const page = Number(searchParams.get("page") || 1)

	try {
		const users = await fetchUsers(order, limit, page)
		return NextResponse.json({ users }, { status: 200 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
	}
}

export async function POST(request: NextRequest) {
	const { name, email, password } = await request.json()

	try {
		const user = await insertUser(name, email, password)
		return NextResponse.json({ user }, { status: 201 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
	}
}