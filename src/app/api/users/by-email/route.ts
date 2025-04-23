import { NextRequest, NextResponse } from "next/server"
import { fetchUserByEmail } from "../../models/user"

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json()
		const user = await fetchUserByEmail(email)
		return NextResponse.json({ user }, { status: 200 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
	}
}