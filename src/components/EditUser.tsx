'use client'

import { Dispatch, SetStateAction } from "react";
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

const StyledText = styled.h3`
	font-size: 6vw;
	margin-bottom: 5vw;
	margin-top: 9vw;
`

const StyledButton = styled.button`
	font-size: 4.5vw;
	padding: 0.1vh 0.7vw;
`

export function EditUser({setModalType, name, setName, email, setEmail}: {setModalType: Dispatch<SetStateAction<boolean>>, 
	name: string, setName: Dispatch<SetStateAction<string>>, email: string, setEmail: Dispatch<SetStateAction<string>>
}) {
    return (
        <StyledCard>
            <StyledHeading>
				Save your information for later
			</StyledHeading>

			<StyledLabel htmlFor="name">Name</StyledLabel>
            <StyledInput id="name" defaultValue={name ?? ""} onChange={(e) => setName(e.target.value)}>
			</StyledInput>
			<StyledLabel htmlFor="email">Email</StyledLabel>
			<StyledInput id="email" type="email" defaultValue={email ?? ""} onChange={(e) => setEmail(e.target.value)}>
			</StyledInput>

			<StyledText>
                Or <StyledButton >Sign In</StyledButton> to manage events
            </StyledText>
        </StyledCard>
    )
}