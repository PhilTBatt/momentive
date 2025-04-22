'use client'

import { User } from "@/types/user"
import { createContext, Dispatch, JSX, SetStateAction, useEffect, useState } from "react"


type UserContextType = {
	user: User
	setUser: Dispatch<SetStateAction<User>>
}

export const UserContext = createContext<UserContextType>({ user: { name: null, email: null }, setUser: () => {} })

export function UserContextProvider({children}: {children: JSX.Element}) {
    const [user, setUser] = useState<User>({ name: null, email: null })

	useEffect(() => {
		const storedUser = localStorage.getItem("user")
		if (storedUser) setUser(JSON.parse(storedUser))
	}, [])

	useEffect(() => {
		if (user.name !== null || user.email !== null) localStorage.setItem("user", JSON.stringify(user))
		else localStorage.removeItem("user")
	}, [user])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}