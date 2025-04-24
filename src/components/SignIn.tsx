'use client'

import { UserContext } from "@/contexts/User";
import { authenticateUser, getUserByEmail } from "@/lib/api/users";
import { CustomError } from "@/types/error";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";

const StyledCard = styled.div`
	display: grid;
`

const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 6vw;
  	margin-top: 3vw;
  	margin-bottom: 6vw;
`

const StyledLabel = styled.label`
  	font-size: 5vw;
  	margin: 0;
`

const StyledInput = styled.input`
  	font-size: 5vw;
	margin: 0;
	width: 60vw;
	justify-self: center;
	margin-top: 2vw;
	margin-bottom: 4vw;
`

const SignInButton = styled.button`
	font-size: 4.5vw;
	margin: 2vw 30vw 1vw 30vw;
`

const StyledText = styled.h3`
	font-size: 6vw;
	margin-bottom: 5vw;
	margin-top: 6vw;
`

const SignUpButton = styled.button`
	font-size: 4.5vw;
	padding: 0.1vh 0.7vw;
	margin-top: 0.75vw;
	vertical-align: top;
`

export function SignIn({setModalType, setIsModelOpen}: {setModalType: Dispatch<SetStateAction<string>>, setIsModelOpen: Dispatch<SetStateAction<boolean>>}) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isSignInLoading, setIsSignInLoading] = useState(false)
	const { setUser } = useContext(UserContext)
    const router = useRouter()

	async function handleSignIn() {
		setIsSignInLoading(true)

		try {
			await authenticateUser({email, password})
            const user = await getUserByEmail(email)
            setUser({...user, role: 'admin'})
            setIsModelOpen(false)
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
        <StyledCard>
            <StyledHeading>
				Sign In
			</StyledHeading>

			<StyledLabel htmlFor="email">
				Email
			</StyledLabel>
			<StyledInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
			<StyledLabel htmlFor="password">
				Password
			</StyledLabel>
			<StyledInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

			<SignInButton onClick={handleSignIn}>{isSignInLoading ? 'Loading...' : 'Sign In'}</SignInButton>

			<StyledText>
                Or <SignUpButton onClick={() => setModalType('signUp')}>Sign Up</SignUpButton> to manage events
            </StyledText>
        </StyledCard>
    )
}