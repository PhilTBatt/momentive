'use client'

import { UserContext } from "@/contexts/User";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";
import { BlockButton } from "../styled-components/BlockButton";
import { Event } from "@/types/event";
import { postAttendee } from "@/lib/api/events";
import { UserModal } from "./UserModal";
import { AddEventToCalender } from "./AddEventToCalender";
import ModalHeading from "../styled-components/ModalHeading";

export function EventSignUp({event, setIsModalOpen, updateList}: 
    {event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>>, updateList: () => void}) 
{
	const {user} = useContext(UserContext)
    const [isRequestLoading, setIsRequestLoading] = useState(false)
    const [isUserModalOpen, setIsUserModelOpen] = useState(false) 
    const [isCalenderModal, setIsCalenderModal] = useState(false)
	
	async function confirmButton() {
        setIsRequestLoading(true)
        
        try { 
            if (!user.name || !user.email) {
                setIsUserModelOpen(true)
                return
            }

            await postAttendee(event.id, {name: user.name, email: user.email})
            updateList()
            setIsCalenderModal(true)
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
        isCalenderModal ? <AddEventToCalender event={event} setIsModalOpen={setIsModalOpen}/> :
            <ModalBackground onClick={() => setIsModalOpen(false)}>
                <StyledModal onClick={e => e.stopPropagation()}>
                        <ModalHeading>
                            Sign up to event?
                        </ModalHeading>

                        <BlockButton onClick={confirmButton} disabled={isRequestLoading}>
                            {isRequestLoading ? 'Loading...' : 'Confirm'}
                        </BlockButton>
                </StyledModal>
            </ModalBackground>
    )
}