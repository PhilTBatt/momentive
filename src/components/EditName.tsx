'use client'

import { UserContext } from "@/contexts/User";
import { updateUser } from "@/lib/api/users";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 100;
`

const StyledCard = styled.div`
    display: grid;
	background: ${props => props.theme.colours.primary};
	padding: 1vh 1vw;
	border-radius: 12px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	width: 92vw;
	align-items: center;
	justify-content: center;
	text-align: center;
	z-index: 101;
`

const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 6vw;
  	margin: 1vw 0 3vw 0;
`

const StyledLabel = styled.label`
  	font-size: 5vw;
  	margin: 0;
`

const StyledInput = styled.input`
  	font-size: 5vw;
	margin: 0;
	width: 50vw;
	margin: 2vw 0 4vw 2vw;
`

const ConfirmButton = styled.button`
	font-size: 4.5vw;
	margin: 1vw 30vw 3vw 30vw;
`

export function EditNameModal({setProfileModal}: {setProfileModal: Dispatch<SetStateAction<null | string>>}) {
	const {user, setUser} = useContext(UserContext)
	const [name, setName] = useState(user.name ?? "")
    const [isRequestLoading, setIsRequestLoading] = useState(false)
	
	async function confirmButton() {
        if (name === '') alert('A name is required\nPlease try again')

		try {
            if (user.id && user.name && user.email) {
                const updatedUser = await updateUser(user.id, {name, email: user.email})
                setProfileModal(null)
                setUser({...updatedUser, role: 'admin'})
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError){
                alert(`${err.response?.data.msg}\nPlease try again`)
            } else 
                alert(`An error occurred\nPlease try again`)
        } finally {
            setIsRequestLoading(false)
        }
    }

    return (
        <ModalBackground onClick={() => setProfileModal(null)}>
            <StyledCard onClick={(e) => e.stopPropagation()}>
                <StyledHeading>
                    Change your name 
                </StyledHeading>

                <StyledLabel htmlFor="name">
                    Name:
                </StyledLabel>
                <StyledInput id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <ConfirmButton onClick={confirmButton}>
                    {isRequestLoading ? 'Loading...' : 'Confirm'}
                </ConfirmButton>
            </StyledCard>
        </ModalBackground>
    )
}