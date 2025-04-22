'use client'

import { UserContext, UserContextProvider } from "@/contexts/User";
import { Dispatch, SetStateAction, useContext } from "react";
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

export function EditUser({setModalType}: {setModalType: Dispatch<SetStateAction<boolean>>}) {
	const {user, setUser} = useContext(UserContext)

    return (
        <StyledCard>
            <StyledHeading>
				Save your information for later
			</StyledHeading>

			<StyledLabel htmlFor="name">Name</StyledLabel>
            <StyledInput id="name"></StyledInput>
			<StyledLabel htmlFor="email">Email</StyledLabel>
			<StyledInput id="email" type="email"></StyledInput>

			<StyledText>
                Or <StyledButton >Sign In</StyledButton> to manage events
            </StyledText>
        </StyledCard>
    )
}