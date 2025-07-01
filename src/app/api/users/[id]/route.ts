import { fetchUserById, removeUserById, updateUserById } from '@/app/api/models/user';
import { CustomError } from '@/types/error';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params

	try {
		if (id) {
            const user = await fetchUserById(Number(id))
            return NextResponse.json({ user }, { status: 200 })
        }
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params

	try {
		if (id) {
            await removeUserById(Number(id))
            return NextResponse.json({msg: 'User deleted successfully'}, { status: 204 })
        }
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const {id} = await params

	try {
		const { name, email } = await request.json()
		if (id) {
            const updatedUser = await updateUserById(Number(id), name, email)
            return NextResponse.json(updatedUser, { status: 200 })
        }
	} catch (err: unknown) {
        if (err instanceof CustomError) 
            return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })

        return NextResponse.json({ status: 500, msg: "Internal server error" }, { status: 500 })
    }
}