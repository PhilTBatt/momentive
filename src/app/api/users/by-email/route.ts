import { NextRequest, NextResponse } from "next/server"
import { fetchUserByEmail } from "../../models/user"
import { CustomError } from "@/types/error"

export async function POST(request: NextRequest) {
	try {
		const { email } = await request.json()
		const user = await fetchUserByEmail(email)
		
		return NextResponse.json({ user }, { status: 200 })
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}