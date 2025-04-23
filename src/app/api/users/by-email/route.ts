import { NextRequest, NextResponse } from "next/server"
import { fetchUserByEmail } from "../../models/user"

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json()
		const user = await fetchUserByEmail(email)
		
		return NextResponse.json({ user }, { status: 200 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status || 500, msg: err.msg || "Internal server error" },
			{ status: err.status || 500 })
	}
}