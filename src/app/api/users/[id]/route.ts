import { db } from '@/utils/connection';
 
export async function GET({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await db`SELECT * FROM users WHERE id = ${id}`

  if (!user) return new Response('User not found', { status: 404 })
  
  return new Response( JSON.stringify({ user }), { status: 200,  headers: { 'Content-Type': 'application/json' } })
}