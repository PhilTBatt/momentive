import { fetchUserById, removeUserById, updateUserById } from '@/app/api/models/user';
import { CustomError } from '@/types/error';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

	try {
		if (id) {
            const user = await fetchUserById(id)
            return NextResponse.json({ user }, { status: 200 })
        }
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

	try {
		if (id) {
            await removeUserById(id)
            return new Response(null, { status: 204 })
        }
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

	try {
		const { name, email } = await request.json()
		if (id) {
            const updatedUser = await updateUserById(id, name, email)
            return NextResponse.json(updatedUser, { status: 200 })
        }
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}