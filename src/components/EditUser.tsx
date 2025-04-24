'use client'

import { UserContext } from "@/contexts/User";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";

const StyledCard = styled.form`
	display: grid;
`

const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 6vw;
  	margin-top: 2vw;
  	margin-bottom: 4vw;
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
	margin-bottom: 3vw;
	margin-top: 6vw;
`

const ConfirmButton = styled.button`
	font-size: 4.5vw;
	margin: 2vw 30vw 1vw 30vw;
`

const SignInButton = styled.button`
	font-size: 4.5vw;
	padding: 0.1vh 0.7vw;
	margin-top: 0.75vw;
	vertical-align: top;
`

export function EditUser({setModalType, setIsModelOpen}: {setModalType: Dispatch<SetStateAction<string>>, setIsModelOpen: Dispatch<SetStateAction<boolean>>}) {
	const {user, setUser} = useContext(UserContext)
	const [name, setName] = useState(user.name ?? "")
	const [email, setEmail] = useState(user.email ?? "")
	
	function confirmButton(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (name === '' || email === '') alert('A name and email is required\nPlease try again')
		else {
            setIsModelOpen(false)
            setUser({name: name.trim(), email: email.trim(), role: 'guest', id: null})
        }
	}

    return (
        <StyledCard onSubmit={confirmButton}>
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
			<ConfirmButton type="submit">
                Confirm
            </ConfirmButton>

			<StyledText>
                Or <SignInButton type="button" onClick={() => setModalType('signIn')}>Sign In</SignInButton> to manage events
            </StyledText>
        </StyledCard>
    )
}