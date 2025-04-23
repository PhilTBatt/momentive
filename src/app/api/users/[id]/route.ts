import { fetchUserById, removeUserById, updateUserById } from '@/app/api/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const user = await fetchUserById(params.id)
		return NextResponse.json({ user }, { status: 200 })
	} catch (err: any) {
		console.error("Failed to fetch user:", err)
		return NextResponse.json({ status: err.status || 500, msg: err.msg || "Internal server error" },
			{ status: err.status || 500 })
	}
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
	try {
		await removeUserById(params.id)
		return new Response(null, { status: 204 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status || 500, msg: err.msg || "Internal server error" },
			{ status: err.status || 500 })
	}
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { name, email } = await request.json()
		const user = await updateUserById(params.id, name, email)
		return NextResponse.json({ user }, { status: 200 })
	} catch (err: any) {
		return NextResponse.json({ status: err.status || 500, msg: err.msg || "Internal server error" },
			{ status: err.status || 500 })
	}
}