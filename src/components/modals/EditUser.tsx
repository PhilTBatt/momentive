'use client'

import { UserContext } from "@/contexts/User";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../styled-components/StyledButton";
import { BlockButton } from "../styled-components/BlockButton";
import BlockLabel from "../styled-components/BlockLabel";
import StyledInput from "../styled-components/StyledInput";
import ModalHeading from "../styled-components/ModalHeading";

const StyledCard = styled.form`
    display: grid
`

const StyledText = styled.p`
	font-size: 7vw;
	margin-bottom: 4vw;
	margin-top: 6vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    @media (min-width: 768px) {
        font-size: 1.5vw;
        margin-top: 4vh;
        margin-bottom: 2vh;
    }
`

export function EditUser({setModalType, setIsModalOpen}: {setModalType: Dispatch<SetStateAction<string>>, setIsModalOpen: Dispatch<SetStateAction<boolean>>}) {
	const {user, setUser} = useContext(UserContext)
	const [name, setName] = useState(user.name ?? "")
	const [email, setEmail] = useState(user.email ?? "")
	
	function confirmButton(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (name === '' || email === '') alert('A name and email is required\nPlease try again')
		else {
            setIsModalOpen(false)
            setUser({name: name.trim(), email: email.trim(), role: 'guest', id: null})
        }
	}

    return (
        <StyledCard onSubmit={confirmButton}>
            <ModalHeading>
				Save your information to use later
			</ModalHeading>

			<BlockLabel htmlFor="name">
                Name
            </BlockLabel>
            <StyledInput id="name" value={name} onChange={(e) => setName(e.target.value)}/>

			<BlockLabel htmlFor="email">
                Email
            </BlockLabel>
			<StyledInput id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            
			<BlockButton type="submit">
                Confirm
            </BlockButton>

			<StyledText>
                Or <StyledButton type="button" onClick={() => setModalType('signIn')}>
                    Sign In
                </StyledButton> to manage events
            </StyledText>

            <StyledText>
                Or <StyledButton type="button" onClick={() => setModalType('signUp')}>
                    Sign Up
                </StyledButton> to create an acccount
            </StyledText>
        </StyledCard>
    )
}