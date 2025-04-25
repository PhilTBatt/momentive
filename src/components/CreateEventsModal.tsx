'use client'

import { UserContext } from "@/contexts/User";
import { postNewEvent } from "@/lib/api/events";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 100;
`

const StyledCard = styled.form`
    display: grid;
	background: ${props => props.theme.colours.primary};
	padding: 1vh 1vw;
	border-radius: 12px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	width: 92vw;
	align-items: center;
	justify-content: center;
	text-align: center;
	z-index: 101;
`

const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 6vw;
  	margin-top: 2vw;
  	margin-bottom: 4vw;
`

const StyledLabel = styled.label`
  	font-size: 5vw;
  	margin: 0;
`

const StyledInput = styled.input`
  	font-size: 5vw;
	margin: 0;
	width: 60vw;
	justify-self: center;
	margin-top: 2vw;
	margin-bottom: 4vw;
`

const TopicButton = styled.button`
	font-size: 4.5vw;
	margin: 2vw 30vw 3vw 30vw;
`

const CreateButton = styled.button`
	font-size: 4.5vw;
	margin: 2vw 30vw 3vw 30vw;
`

export function CreateEventsModal({setEventsModalOpen}: {setEventsModalOpen: Dispatch<SetStateAction<boolean>>}) {
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
            if (user.id)
                await postNewEvent({id: user.id, title, description, location, date, topic})
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

                <StyledLabel htmlFor="name">
                    Title
                </StyledLabel>
                <StyledInput id="name" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <StyledLabel htmlFor="description">
                    Description
                </StyledLabel>
                <StyledInput id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <TopicButton type="button" onClick={() => setTopic('topic')}>
                    {topic[0].toUpperCase() + topic.slice(1)}
                </TopicButton>
                <StyledLabel htmlFor="location">
                    Location
                </StyledLabel>
                <StyledInput id="name" value={location} onChange={(e) => setLocation(e.target.value)}/>
                <StyledLabel htmlFor="date">
                    Date
                </StyledLabel>
                <StyledInput id="name" value={date} onChange={(e) => setDate(e.target.value)}/>

                <CreateButton type="submit">{isCreating ? 'Creating...' : 'Create'}</CreateButton>
            </StyledCard>
        </ModalBackground>
    )
}