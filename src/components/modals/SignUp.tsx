'use client'

import { UserContext } from "@/contexts/User";
import { postNewUser } from "@/lib/api/users";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import { useRouter } from 'next/navigation'
import { AxiosError } from "axios";
import { BlockButton } from "../styled-components/BlockButton";
import { StyledButton } from "../styled-components/StyledButton";
import BlockLabel from "../styled-components/BlockLabel";
import StyledInput from "../styled-components/StyledInput";

const StyledCard = styled.form`
	display: grid;
`

const StyledHeading = styled.h3`
  	font-size: 7.5vw;
  	margin-top: 3vw;
  	margin-bottom: 4vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

const StyledText = styled.p`
	font-size: 7vw;
	margin-bottom: 3vw;
	margin-top: 3vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

export function SignUp({setModalType, setIsModalOpen}: {setModalType: Dispatch<SetStateAction<string>>, setIsModalOpen: Dispatch<SetStateAction<boolean>>}) {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [staffCode, setStaffCode] = useState("")
	const [password, setPassword] = useState("")
	const [isSignUpLoading, setIsSignUpLoading] = useState(false)
	const { setUser } = useContext(UserContext)
	const router = useRouter()

	async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
		setIsSignUpLoading(true)
        
		try {
            const user = await postNewUser({name, email, password, staffCode})
			setUser({...user, id: Number(user.id), role: 'admin'})
            
			setIsModalOpen(false)
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
        <StyledCard onSubmit={handleSignUp}>
            <StyledHeading>
				Sign Up Information
			</StyledHeading>

			<BlockLabel htmlFor="name">
				Name
			</BlockLabel>
            <StyledInput id="name" value={name} onChange={(e) => setName(e.target.value)}/>

			<BlockLabel htmlFor="email">
				Email
			</BlockLabel>
			<StyledInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

			<BlockLabel htmlFor="staffCode">
				Staff Code
			</BlockLabel>
			<StyledInput id="staffCode" value={staffCode} onChange={(e) => setStaffCode(e.target.value)}/>

			<BlockLabel htmlFor="password">
				Password
			</BlockLabel>
			<StyledInput id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

			<BlockButton type="submit">{isSignUpLoading ? 'Loading...' : 'Sign Up'}</BlockButton>

			<StyledText>
                Or <StyledButton type="button" onClick={() => setModalType('signIn')}>Sign In</StyledButton> if you have an account
            </StyledText>
        </StyledCard>
    )
}