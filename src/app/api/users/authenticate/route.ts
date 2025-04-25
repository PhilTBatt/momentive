import { NextRequest, NextResponse } from "next/server"
import { checkUserPassword } from "../../models/user";
import { CustomError } from "@/types/error";

export async function POST(request: NextRequest) {
	try {
        const { email, password } = await request.json()
        const isPasswordCorrect = await checkUserPassword(email, password)
            
        return NextResponse.json({ success: isPasswordCorrect }, { status: isPasswordCorrect ? 200 : 401 })
    } catch (err: unknown) {
        if (err instanceof CustomError)
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
    
        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}