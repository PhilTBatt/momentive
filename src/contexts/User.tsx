'use client'

import { createContext, Dispatch, JSX, SetStateAction, useEffect, useState } from "react"

type UserContextType = {
	user: string | null
	setUser: Dispatch<SetStateAction<string | null>>
}

const UserContext = createContext<UserContextType>({ user: null, setUser: () => {} })

export function UserProvider({children}: {children: JSX.Element}) {
    const [user, setUser] = useState<string | null>(null)

	useEffect(() => {
		const storedUser = localStorage.getItem("user")
		if (storedUser) setUser(storedUser)
	}, [])

	useEffect(() => {
		if (user) localStorage.setItem("user", user)
		else localStorage.removeItem("user")
	}, [user])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}