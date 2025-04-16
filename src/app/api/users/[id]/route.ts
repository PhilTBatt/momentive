import { fetchUserById, removeUserById, updateUserById } from '@/app/api/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET({ params }: { params: { id: string } }) {
	try {
		const user = await fetchUserById(params.id)
		return NextResponse.json({ user }, { status: 200 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
	}
}

export async function DELETE({ params }: { params: { id: string } }) {
	try {
		await removeUserById(params.id)
		return new Response(null, { status: 204 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
	}
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { name, email } = await request.json()
		const user = await updateUserById(params.id, name, email)
		return NextResponse.json({ user }, { status: 200 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status, msg: err.msg }, { status: err.status })
	}
}