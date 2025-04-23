import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcrypt';
import {fetchUserByEmail } from "../../models/user"

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json()
		const user = await fetchUserByEmail(email)
		const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
		
		return NextResponse.json(isPasswordCorrect, { status: 200 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
	}
}