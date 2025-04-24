import { fetchUserById, removeUserById, updateUserById } from '@/app/api/models/user';
import { CustomError } from '@/types/error';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const user = await fetchUserById(params.id)
		
		return NextResponse.json({ user }, { status: 200 })
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
	try {
		await removeUserById(params.id)

		return new Response(null, { status: 204 })
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { name, email } = await request.json()
		const user = await updateUserById(params.id, name, email)

		return NextResponse.json({ user }, { status: 200 })
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}