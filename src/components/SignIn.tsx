'use client'

import { getUserByEmail, signInUser } from "@/lib/api/users";
import { Dispatch, SetStateAction, useState } from "react";
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
	margin: 1vw 30vw;
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

export function SignIn({setModalType}: {setModalType: Dispatch<SetStateAction<string>>}) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isSignInLoading, setIsSignInLoading] = useState(false)

	async function handleSignIn() {
		setIsSignInLoading(true)
		try {
			await signInUser({email, password})
		}
		catch (err: any) {
			alert(`${err.response.data.msg}`)
		}
		finally {
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
			<StyledInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}>
			</StyledInput>
			<StyledLabel htmlFor="password">
				Password
			</StyledLabel>
			<StyledInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}>
			</StyledInput>

			<SignInButton onClick={handleSignIn}>{isSignInLoading ? 'Loading...' : 'Sign In'}</SignInButton>

			<StyledText>
                Or <SignUpButton onClick={() => setModalType('signUp')}>Sign Up</SignUpButton> to manage events
            </StyledText>
        </StyledCard>
    )
}