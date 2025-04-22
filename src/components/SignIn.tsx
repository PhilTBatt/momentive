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
	margin-top: 7vw;
`

const StyledButton = styled.button`
	font-size: 4.5vw;
	padding: 0.1vh 0.7vw;
`

export function SignIn({setModalType}: {setModalType: Dispatch<SetStateAction<string>>}) {
    return (
        <StyledCard>
            <StyledHeading>
				Sign In
			</StyledHeading>

			<StyledLabel htmlFor="email">
				Email
			</StyledLabel>
			<StyledInput id="email" type="email" value="" onChange={(e) => (e.target.value)}>
			</StyledInput>
			<StyledLabel htmlFor="password">
				Password
			</StyledLabel>
			<StyledInput id="email" type="email" value="" onChange={(e) => (e.target.value)}>
			</StyledInput>

			<StyledText>
                Or <StyledButton onClick={() => setModalType('signUp')}>Sign Up</StyledButton>
            </StyledText>
        </StyledCard>
    )
}