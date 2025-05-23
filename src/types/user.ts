export type User = {
    id: number | null
	name: string | null
	email: string | null
    role: 'guest' | 'admin'
}