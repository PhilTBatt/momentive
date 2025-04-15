import { fetchUserById, removeUserById, updateUserById } from '@/app/models/user';
import { NextRequest } from 'next/server';
 
export async function GET({ params }: { params: { id: string } }) {
	try {
		const user = await fetchUserById(params.id)
		return new Response(JSON.stringify({ user }), { status: 200, headers: { "Content-Type": "application/json" } })
	} catch (err: any) {
		return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
	}
}

export async function DELETE({ params }: { params: { id: string } }) {
  	try {
		await removeUserById(params.id)
		return new Response(null, { status: 204 })
	} catch (err: any) {
		return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
	}
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { name, email } = await request.json()
		const user = await updateUserById(params.id, name, email)
		return new Response(JSON.stringify({ user }), { status: 200, headers: { "Content-Type": "application/json" } })
	} catch (err: any) {
		return new Response(JSON.stringify({ status: err.status, msg: err.msg }), { status: err.status, headers: { "Content-Type": "application/json" } })
	}
}