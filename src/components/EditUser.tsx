'use client'

import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const StyledCard = styled.div`
	display: grid;
`

const UserInfo = styled.div`
`

const StyledHeading = styled.h3`
  text-align: center;
  font-size: 5.5vw;
  margin-top: 3vh;
  margin-bottom: 5vh;
`

const StyledLabel = styled.label`
  font-size: 4.5vw;
  margin: 0;
`

const StyledInput = styled.input`
  font-size: 4vw;
  margin: 0;
  width: 60vw;
  justify-self: center;
  margin-top: 2vh;
  margin-bottom: 4vh;
`

const StyledText = styled.h3`
  font-size: 5vw;
  margin-bottom: 4vh;
  margin-top: 4vh;
`

const StyledButton = styled.button`
  font-size: 4.5vw;
  padding: 0.1vh 0.7vw;
`

export function EditUser({setModalType}: {setModalType: Dispatch<SetStateAction<boolean>>}) {

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