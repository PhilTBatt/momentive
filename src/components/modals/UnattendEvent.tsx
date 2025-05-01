'use client'

import { UserContext } from "@/contexts/User";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";
import { BlockButton } from "../styled-components/BlockButton";
import { Event } from "@/types/event";
import { postAttendee } from "@/lib/api/events";
import { StyledButton } from "../styled-components/StyledButton";

const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 8vw;
    margin: 1vw 0 3vw 0;
`

export function UnattendEvent({event, setIsModalOpen}: {event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>>}) {
	const {user} = useContext(UserContext)
    const [isRequestLoading, setIsRequestLoading] = useState(false)
	
	async function confirmButton() {
        try {
            if (user.name && user.email)
                await postAttendee(event.id, {name: user.name, email: user.email})

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

    return (
        <ModalBackground onClick={() => setIsModalOpen(false)}>
            <StyledModal onClick={e => e.stopPropagation()}>
                    <StyledHeading>
                        Unattend this event?
                    </StyledHeading>

                    <BlockButton onClick={confirmButton} style={{marginBottom: '3vh', width: '30vw'}}>
                        {isRequestLoading ? 'Loading...' : 'Confirm'}
                    </BlockButton>

                    {user.role === 'admin' && 
                        <StyledHeading>
                            Or do you want to <StyledButton>edit</StyledButton> this event?
                        </StyledHeading>
                    }
            </StyledModal>
        </ModalBackground>
    )
}