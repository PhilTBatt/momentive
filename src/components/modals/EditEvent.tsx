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
import ModalHeading from "../styled-components/ModalHeading";
import { topics } from "@/lib/topics";

const Input = styled(StyledInput)`
    @media (min-width: 768px) {
        margin-top: 0vh;
        margin-bottom: 3vh;
        padding: 0.25vw;
    }
`

const StyledText = styled.p`
	font-size: 8vw;
	margin-bottom: 5vw;
	margin-top: 4vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    @media (min-width: 768px) {
        font-size: 1.5vw;
        margin-top: 1vh;
        margin-bottom: 3vh;
    }
`

const StyledSelect = styled.select`
    margin: 1vw auto 5vw auto;
    font-size: 6vw;
    padding: 2vw;
    border: 2px solid ${props => props.theme.colours.primary};
    border-radius: 10px;
    background-color: ${props => props.theme.colours.background};
    color: ${props => props.theme.colours.primary};

    @media (min-width: 768px) {
        font-size: 1vw;
        margin-top: 1vh;
        margin-bottom: 2vh;
        padding: 0.5vw;
    }
`

export function EditEvent({event, setIsModalOpen, updateList}: 
    {event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>>, updateList: () => void}) 
{
	const [title, setTitle] = useState(event.title)
	const [description, setDescription] = useState(event.description)
    const [location, setLocation] = useState(event.location)
    const [date, setDate] = useState((new Date(event.date)).toISOString().slice(0, 16))
    const [topic, setTopic] = useState<string>(event.topic)
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
            updateList()

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
            updateList()

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
                    <ModalHeading>
                        Are you sure?
                    </ModalHeading>
                
                    <BlockButton onClick={removeEvent} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Confirm'}
                    </BlockButton>
                </>
                :
                <form onSubmit={confirmButton} style={{display: 'grid' }}>
                    <ModalHeading>
                        Edit Event
                    </ModalHeading>

                    <BlockLabel htmlFor="title">
                        Title
                    </BlockLabel>
                    <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required/>

                    <BlockLabel htmlFor="description">
                        Description
                    </BlockLabel>
                    <Input id="description" value={description} onChange={e => setDescription(e.target.value)} required/>

                    <BlockLabel htmlFor="topic">
                        Topic
                    </BlockLabel>
                    <StyledSelect id="topic" value={topic} onChange={e => setTopic(e.target.value)}>
                        {Object.keys(topics).map(key => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </StyledSelect>
                    
                    <BlockLabel htmlFor="location">
                        Location
                    </BlockLabel>
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required/>

                    <BlockLabel htmlFor="date">
                        Date
                    </BlockLabel>
                    <Input id="date" value={date} onChange={(e) => setDate(e.target.value)} type="datetime-local"
                        min={(new Date).toISOString().slice(0, 16)} required/>
                    
                    <BlockButton type="submit" disabled={isEditing}>
                        {isEditing ? 'Editing...' : 'Confirm'}
                    </BlockButton>

                    <StyledText>
                        Or <StyledButton type="button" onClick={() => {setIsConfirmingDeleting(true)}} style={{backgroundColor: 'red'}}>
                            Delete
                        </StyledButton> this event
                    </StyledText>
                </form>}
            </StyledModal>
        </ModalBackground>
    )
}