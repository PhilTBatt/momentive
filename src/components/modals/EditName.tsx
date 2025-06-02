'use client'

import { UserContext } from "@/contexts/User";
import { updateUser } from "@/lib/api/users";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";
import StyledInput from "../styled-components/StyledInput";
import { BlockButton } from "../styled-components/BlockButton";
import ModalHeading from "../styled-components/ModalHeading";
import styled from "styled-components";

const Input = styled(StyledInput)`
    @media (min-width: 768px) {
        font-size: 1.5vw;
        width: 20vw;
    }
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
            <StyledModal onClick={(e) => e.stopPropagation()}>
                <ModalHeading>
                    Change your name 
                </ModalHeading>

                <Input id="name" value={name} onChange={(e) => setName(e.target.value)}/>

                <BlockButton onClick={confirmButton}>
                    {isRequestLoading ? 'Loading...' : 'Confirm'}
                </BlockButton>
            </StyledModal>
        </ModalBackground>
    )
}