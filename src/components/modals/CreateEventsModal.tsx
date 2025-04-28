'use client'

import { UserContext } from "@/contexts/User";
import { postNewEvent } from "@/lib/api/events";
import { Event } from "@/types/event";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import ModalBackground from "../styled-components/ModalBackground";
import { BlockButton } from "../styled-components/BlockButton";
import StyledInput from "../styled-components/StyledInput";
import BlockLabel from "../styled-components/BlockLabel";


const StyledCard = styled.form`
    display: grid;
	background: ${props => props.theme.colours.primary};
    padding: 0.4vh 3vw;
    margin-bottom: 7.5vh;
    border-radius: 12px;
    border: 3px solid black;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    width: 90vw;
    z-index: 101;
`

const StyledHeading = styled.h3`
  	font-size: 7.5vw;
  	margin-top: 3vw;
  	margin-bottom: 4vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

export function CreateEventsModal({ setEventsModalOpen, setEvents }: {
    setEventsModalOpen: Dispatch<SetStateAction<boolean>>,
    setEvents: Dispatch<SetStateAction<Event[]>>
}) {
	const {user} = useContext(UserContext)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
    const [topic, setTopic] = useState("Topic")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [isCreating, setIsCreating] = useState(false)
	
	async function createEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsCreating(true)

        try {
            if (user.id) {
                const newEvent = await postNewEvent({id: user.id, title, description, location, date, topic})
                setEvents(prev => [newEvent, ...prev])
            }
            setEventsModalOpen(false)

        } catch (err: unknown) {
            if (err instanceof AxiosError){
                alert(`${err.response?.data.msg}\nPlease try again`)
            }
            else 
                alert(`An error occurred\nPlease try again`)

        } finally {
            setIsCreating(false)
        }
	}

    return (
        <ModalBackground onClick={() => setEventsModalOpen(false)}>
            <StyledCard onSubmit={createEvent} onClick={(e) => e.stopPropagation()}>
                <StyledHeading>
                    Create your event
                </StyledHeading>

                <BlockLabel htmlFor="name">
                    Title
                </BlockLabel>
                <StyledInput id="name" value={title} onChange={(e) => setTitle(e.target.value)}/>

                <BlockLabel htmlFor="description">
                    Description
                </BlockLabel>
                <StyledInput id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>

                <BlockButton type="button" onClick={() => setTopic('topic')} style={{marginBottom: '5vw' }}>
                    {topic[0].toUpperCase() + topic.slice(1)}
                </BlockButton>

                <BlockLabel htmlFor="location">
                    Location
                </BlockLabel>
                <StyledInput id="name" value={location} onChange={(e) => setLocation(e.target.value)}/>
                    
                <BlockLabel htmlFor="date">
                    Date
                </BlockLabel>
                <StyledInput id="name" value={date} onChange={(e) => setDate(e.target.value)} style={{width: '30vw'}}/>

                <BlockButton type="submit" style={{marginBottom: '5vw', fontSize: '7.5vw' }}>
                    {isCreating ? 'Creating...' : 'Create'}
                </BlockButton>
            </StyledCard>
        </ModalBackground>
    )
}