'use client'

import { UserContext } from "@/contexts/User";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";
import { BlockButton } from "../styled-components/BlockButton";
import { Event } from "@/types/event";
import { deleteAttendee } from "@/lib/api/events";
import { StyledButton } from "../styled-components/StyledButton";

const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 8vw;
    margin: 2vw 0 3vw 0;
`

const StyledText = styled.p`
  	text-align: center;
  	font-size: 8vw;
    margin: 1vw 0 3vw 0;
`

export function UnattendEvent({event, setIsModalOpen, setIsEditModalOpen}: {event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>>, setIsEditModalOpen: Dispatch<SetStateAction<boolean>>}) {
	const {user} = useContext(UserContext)
    const [isRequestLoading, setIsRequestLoading] = useState(false)
	
	async function confirmButton() {
        setIsRequestLoading(true)
        
        try {
            if (user.name && user.email)
                await deleteAttendee(event.id, {name: user.name, email: user.email})

            setIsModalOpen(false)
        } catch (err: unknown) {
            if (err instanceof AxiosError){
                alert(`${err.response?.data.msg}`)
            } else 
                alert(`An error occurred\nPlease try again`)
        } finally {
            setIsRequestLoading(false)
        }
    }

    async function editButton() {
        setIsModalOpen(false)
        setIsEditModalOpen(true)
    }

    return (
        <ModalBackground onClick={() => setIsModalOpen(false)}>
            <StyledModal onClick={e => e.stopPropagation()}>
                    <StyledHeading>
                        Unattend this event?
                    </StyledHeading>

                    <BlockButton onClick={confirmButton} disabled={isRequestLoading}
                        style={{marginBottom: '2.5vh', marginTop: '0', width: '30vw'}}>
                        {isRequestLoading ? 'Loading...' : 'Confirm'}
                    </BlockButton>

                    {user.role === 'admin' && 
                        <StyledText>
                            Or do you want to <StyledButton onClick={editButton}
                                style={{marginTop: '0.8vh', width: '15vw', fontSize: '6.25vw', paddingRight: '2vw'}}>
                                    Edit
                                </StyledButton>
                            this event?
                        </StyledText>
                    }
            </StyledModal>
        </ModalBackground>
    )
}