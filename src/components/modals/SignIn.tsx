'use client'

import { UserContext } from "@/contexts/User";
import { authenticateUser, getUserByEmail } from "@/lib/api/users";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../styled-components/StyledButton";
import { BlockButton } from "../styled-components/BlockButton";
import BlockLabel from "../styled-components/BlockLabel";
import StyledInput from "../styled-components/StyledInput";

const StyledCard = styled.form`
    display: grid
`

const StyledHeading = styled.h3`
  	font-size: 7.5vw;
  	margin-top: 3vw;
  	margin-bottom: 4vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    @media (min-width: 768px) {
        font-size: 2.5vw;
        margin-top: 3vh;
  	    margin-bottom: 4vh;
    }
`

const StyledText = styled.p`
	font-size: 7vw;
	margin-bottom: 3vw;
	margin-top: 6vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    @media (min-width: 768px) {
        font-size: 2vw;
        margin-top: 6vh;
        margin-bottom: 4vh;
    }
`

export function SignIn({setModalType, setIsModalOpen}: {setModalType: Dispatch<SetStateAction<string>>, setIsModalOpen: Dispatch<SetStateAction<boolean>>}) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isSignInLoading, setIsSignInLoading] = useState(false)
	const { setUser } = useContext(UserContext)
    const router = useRouter()

	async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
		setIsSignInLoading(true)

		try {
			await authenticateUser({email, password})
            const user = await getUserByEmail(email)
            setUser({...user, id: Number(user.id), role: 'admin'})

            setIsModalOpen(false)
            router.push('/user')
		} catch (err: unknown) {
            if (err instanceof AxiosError){
                if (err.status === 404)
                    alert("User not found\nPlease try again")
                else
                alert("Invalid email or password\nPlease try again")
            }
            else 
                alert(`An error occurred\nPlease try again`)
        } finally {
			setIsSignInLoading(false)
		}
	}

    return (
        <StyledCard onSubmit={handleSignIn}>
            <StyledHeading>
				Sign In
			</StyledHeading>

			<BlockLabel htmlFor="email">
				Email
			</BlockLabel>
			<StyledInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                
			<BlockLabel htmlFor="password">
				Password
			</BlockLabel>
			<StyledInput id="password" type="password" disabled={isSignInLoading} value={password}
                onChange={(e) => setPassword(e.target.value)}/>

			<BlockButton type="submit">
                {isSignInLoading ? 'Loading...' : 'Sign In'}
            </BlockButton>

			<StyledText>
                Or <StyledButton type="button" onClick={() => setModalType('signUp')}>Sign Up</StyledButton> to manage events
            </StyledText>
        </StyledCard>
    )
}