'use client'

import { UserContext } from "@/contexts/User";
import { postNewUser } from "@/lib/api/users";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import zxcvbn from 'zxcvbn'
import { useRouter } from 'next/navigation'
import { AxiosError } from "axios";

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

const StyledText = styled.h3`
	font-size: 6vw;
	margin-bottom: 5vw;
	margin-top: 7vw;
`

const SignUpButton = styled.button`
	font-size: 4.5vw;
	margin: 2vw 30vw 1vw 30vw;
`

const SignInButton = styled.button`
	font-size: 4.5vw;
	padding: 0.1vh 0.7vw;
	margin-top: 0.75vw;
	vertical-align: top;
`

export function SignUp({setModalType, setIsModelOpen}: {setModalType: Dispatch<SetStateAction<string>>, setIsModelOpen: Dispatch<SetStateAction<boolean>>}) {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [staffCode, setStaffCode] = useState("")
	const [password, setPassword] = useState("")
	const [isSignUpLoading, setIsSignUpLoading] = useState(false)
	const { setUser } = useContext(UserContext)
	const router = useRouter()

	async function handleSignUp() {
		setIsSignUpLoading(true)
        
		try {
            const user = await postNewUser({name, email, password, staffCode})
			setUser({...user, role: 'admin'})
            
			setIsModelOpen(false)
			router.push('/user')
		} catch (err: unknown) {
            if (err instanceof AxiosError){
                if (err.status === 400)
                    alert(`${err.response?.data.msg}\nPlease try again`)
                else if (err.status === 409)
                    alert("Email already in use\nPlease try again")
                else
                    alert("Invalid email or password\nPlease try again")
            }
            else 
                alert(`An error occurred\nPlease try again`)
        } finally {
			setIsSignUpLoading(false)
		}
	}

    return (
        <StyledCard>
            <StyledHeading>
				Save your information for later
			</StyledHeading>

			<StyledLabel htmlFor="name">
				Name
			</StyledLabel>
            <StyledInput id="name" value={name} onChange={(e) => setName(e.target.value)}/>
			<StyledLabel htmlFor="email">
				Email
			</StyledLabel>
			<StyledInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
			<StyledLabel htmlFor="staffCode">
				Staff Code
				</StyledLabel>
			<StyledInput id="staffCode" value={staffCode} onChange={(e) => setStaffCode(e.target.value)}/>
			<StyledLabel htmlFor="password">
				Password
			</StyledLabel>
			<StyledInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

			<SignUpButton onClick={handleSignUp}>{isSignUpLoading ? 'Loading...' : 'Sign Up'}</SignUpButton>

			<StyledText>
                Or <SignInButton onClick={() => setModalType('signIn')}>Sign In</SignInButton> if you have an account
            </StyledText>
        </StyledCard>
    )
}