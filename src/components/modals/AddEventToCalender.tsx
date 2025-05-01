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
import { UserModal } from "./UserModal";

const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 8vw;
    margin: 2vw 0 3vw 0;
`

export function AddEventToCalender({event, setIsModalOpen, updateList}: 
    {event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>>, updateList: () => void}) 
{
	const {user} = useContext(UserContext)
    const [isRequestLoading, setIsRequestLoading] = useState(false)
    const [isUserModalOpen, setIsUserModelOpen] = useState(false)
	
	async function confirmButton() {
        setIsRequestLoading(true)
        
        try {
            if (!user.name || !user.email) {
                setIsUserModelOpen(true)
                return
            }

            await postAttendee(event.id, {name: user.name, email: user.email})
            updateList()

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
        isUserModalOpen ? <UserModal setIsModalOpen={setIsModalOpen}/> :
            <ModalBackground onClick={() => setIsModalOpen(false)}>
                <StyledModal onClick={e => e.stopPropagation()}>
                        <StyledHeading>
                            Add this event to your calender?
                        </StyledHeading>

                        <BlockButton onClick={confirmButton} disabled={isRequestLoading} style={{marginBottom: '1.75vh', width: '30vw'}}>
                            {isRequestLoading ? 'Loading...' : 'Confirm'}
                        </BlockButton>
                </StyledModal>
            </ModalBackground>
    )
}