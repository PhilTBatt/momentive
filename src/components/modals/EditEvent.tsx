'use client'

import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../styled-components/StyledButton";
import { BlockButton } from "../styled-components/BlockButton";
import BlockLabel from "../styled-components/BlockLabel";
import StyledInput from "../styled-components/StyledInput";
import { Event } from "@/types/event";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";
import { AxiosError } from "axios";

const StyledHeading = styled.h3`
  	font-size: 7.5vw;
  	margin-top: 3vw;
  	margin-bottom: 4vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

const StyledText = styled.p`
	font-size: 8vw;
	margin-bottom: 4vw;
	margin-top: 3vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

export function EditEvent({event, setIsModalOpen}: {event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>>}) {
	const [title, setTitle] = useState(event.title)
	const [description, setDescription] = useState(event.description)
    const [location, setLocation] = useState(event.location)
    const [date, setDate] = useState((new Date(event.date)).toLocaleDateString())
    const [topic, setTopic] = useState(event.topic)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
	
	function confirmButton(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsEditing(true)

        try {
            setIsModalOpen(false)
            //setEvent({title: title.trim(), description: description.trim(), location: location.trim(), topic})
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
        <ModalBackground>
             <StyledModal>
                <form onSubmit={confirmButton} style={{display: 'grid' }}>
                    <StyledHeading>
                        Edit Event
                    </StyledHeading>

                    <BlockLabel htmlFor="title">
                        Title
                    </BlockLabel>
                    <StyledInput id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>

                    <BlockLabel htmlFor="email">
                        Description
                    </BlockLabel>
                    <StyledInput id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>

                    <BlockButton type="button" onClick={() => setTopic('Sports')} style={{marginBottom: '5vw' }}>
                        {topic[0].toUpperCase() + topic.slice(1)}
                    </BlockButton>
                    
                    <BlockLabel htmlFor="email">
                        Location
                    </BlockLabel>
                    <StyledInput id="location" value={location} onChange={(e) => setLocation(e.target.value)}/>

                    <BlockLabel htmlFor="email">
                        Date
                    </BlockLabel>
                    <StyledInput id="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                    
                    <BlockButton type="submit">
                        {isEditing ? 'Editing...' : 'Confirm'}
                    </BlockButton>

                    <StyledText>
                        Or <StyledButton type="button" onClick={() => {}} style={{fontSize: '6.5vw', marginTop: '0.75vw' , backgroundColor: 'red'}}>
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </StyledButton> the event
                    </StyledText>
                </form>
            </StyledModal>
        </ModalBackground>
    )
}