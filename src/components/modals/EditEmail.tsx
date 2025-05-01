'use client'

import { UserContext } from "@/contexts/User";
import { updateUser } from "@/lib/api/users";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";
import StyledInput from "../styled-components/StyledInput";
import { BlockButton } from "../styled-components/BlockButton";

const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 8vw;
    margin: 1vw 0 3vw 0;
`

export function EditEmailModal({setProfileModal}: {setProfileModal: Dispatch<SetStateAction<null | string>>}) {
	const {user, setUser} = useContext(UserContext)
	const [email, setEmail] = useState(user.email ?? "")
    const [isRequestLoading, setIsRequestLoading] = useState(false)
	
	async function confirmButton() {
        if (email === '') alert('An email is required\nPlease try again')

        try {
            if (user.id && user.name && user.email) {
                const updatedUser = await updateUser(user.id, {name: user.name, email})
                setProfileModal(null)
                setUser({...updatedUser, role: 'admin', id: Number(user.id)})
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
            <StyledModal onClick={e => e.stopPropagation()}>
                    <StyledHeading>
                        Change your email
                    </StyledHeading>

                    <StyledInput id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        style={{fontSize: '6vw', width: '70vw'}}
                    />

                    <BlockButton onClick={confirmButton} style={{marginBottom: '2.25vh', width: '30vw'}} disabled={isRequestLoading}>
                        {isRequestLoading ? 'Loading...' : 'Confirm'}
                    </BlockButton>
            </StyledModal>
        </ModalBackground>
    )
}