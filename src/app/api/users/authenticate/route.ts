import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcrypt';
import {fetchUserByEmail } from "../../models/user"
import { CustomError } from "@/types/error";

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json()
		const user = await fetchUserByEmail(email)
		const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

		if (isPasswordCorrect)
			return NextResponse.json({ status: 200, msg: "User authenticated successfully" }, { status: 200 })
		else
			return NextResponse.json({ status: 401, msg: "Invalid email password" }, { status: 401 })
		
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}