export async function getUsers(order: string, limit: number, page: number) {
	const queryParams = new URLSearchParams({ order, limit: String(limit), page: String(page)})

	try {
		const events = await fetch(`/api/events?${queryParams.toString()}`)
		return events.json()
	}
	catch (error) {
		console.error('Error fetching events:', error)
	}
}

export async function getUser(id: number) {
	
}