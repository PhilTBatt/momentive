'use client'

import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../styled-components/StyledButton";
import { BlockButton } from "../styled-components/BlockButton";
import BlockLabel from "../styled-components/BlockLabel";
import StyledInput from "../styled-components/StyledInput";
import { Event } from "@/types/event";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";
import { AxiosError } from "axios";
import { deleteEvent, updateEvent } from "@/lib/api/events";

const StyledHeading = styled.h3`
  	font-size: 7.5vw;
  	margin-top: 3vw;
  	margin-bottom: 4vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

const StyledText = styled.p`
	font-size: 8vw;
	margin-bottom: 5vw;
	margin-top: 4vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

export function EditEvent({event, setIsModalOpen}: {event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>>}) {
	const [title, setTitle] = useState(event.title)
	const [description, setDescription] = useState(event.description)
    const [location, setLocation] = useState(event.location)
    const [date, setDate] = useState((new Date(event.date)).toISOString().slice(0, 16))
    const [topic, setTopic] = useState(event.topic)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isConfirmingDeleting, setIsConfirmingDeleting] = useState(false)
	
	async function confirmButton(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsEditing(true)

        try {
            await updateEvent(event.id, 
                {title: title.trim(), description: description.trim(), date, location: location.trim(), topic})
            setIsModalOpen(false)

        } catch (err: unknown) {
            if (err instanceof AxiosError){
                alert(`${err.response?.data.msg}\nPlease try again`)
            }
            else 
                alert(`An error occurred\nPlease try again`)
        
        } finally {
            setIsEditing(false)
        }
	}

    async function removeEvent() {
        setIsDeleting(true)

        try {
            await deleteEvent(event.id)
            setIsModalOpen(false)

        } catch (err: unknown) {
            if (err instanceof AxiosError){
                alert(`${err.response?.data.msg}\nPlease try again`)
            }
            else 
                alert(`An error occurred\nPlease try again`)
        
        } finally {
            setIsEditing(false)
        }
	}

    return (
        <ModalBackground onClick={() => setIsModalOpen(false)}>
             <StyledModal onClick={(e) => e.stopPropagation()}>
                {isConfirmingDeleting ? <>
                    <StyledHeading>
                        Are you sure?
                    </StyledHeading>
                
                    <BlockButton onClick={removeEvent} disabled={isDeleting}
                        style={{marginBottom: '2.5vh', marginTop: '0', width: '36vw', backgroundColor: 'red'}}>
                            {isDeleting ? 'Deleting...' : 'Confirm'}
                    </BlockButton>
                </>
                :
                <form onSubmit={confirmButton} style={{display: 'grid' }}>
                    <StyledHeading>
                        Edit Event
                    </StyledHeading>

                    <BlockLabel htmlFor="title">
                        Title
                    </BlockLabel>
                    <StyledInput id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>

                    <BlockLabel htmlFor="email">
                        Description
                    </BlockLabel>
                    <StyledInput id="description" value={description} onChange={(e) => setDescription(e.target.value)} required/>

                    <BlockButton type="button" onClick={() => setTopic('Sports')} style={{marginBottom: '5vw' }}>
                        {topic[0].toUpperCase() + topic.slice(1)}
                    </BlockButton>
                    
                    <BlockLabel htmlFor="email">
                        Location
                    </BlockLabel>
                    <StyledInput id="location" value={location} onChange={(e) => setLocation(e.target.value)} required/>

                    <BlockLabel htmlFor="email">
                        Date
                    </BlockLabel>
                    <StyledInput id="date" value={date} onChange={(e) => setDate(e.target.value)} type="datetime-local"
                        min={(new Date).toISOString().slice(0, 16)} required style={{width: '65vw'}}/>
                    
                    <BlockButton type="submit" disabled={isEditing}>
                        {isEditing ? 'Editing...' : 'Confirm'}
                    </BlockButton>

                    <StyledText>
                        Or <StyledButton type="button" onClick={() => {setIsConfirmingDeleting(true)}} 
                            style={{ marginTop: '0.75vw' , backgroundColor: 'red'}}
                        >
                            Delete
                        </StyledButton> the event
                    </StyledText>
                </form>}
            </StyledModal>
        </ModalBackground>
    )
}