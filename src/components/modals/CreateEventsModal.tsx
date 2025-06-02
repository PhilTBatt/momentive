'use client'

import { UserContext } from "@/contexts/User";
import { postNewEvent } from "@/lib/api/events";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import ModalBackground from "../styled-components/ModalBackground";
import { BlockButton } from "../styled-components/BlockButton";
import StyledInput from "../styled-components/StyledInput";
import BlockLabel from "../styled-components/BlockLabel";
import StyledModal from "../styled-components/StyledModal";
import { topics } from "@/lib/topics";
import ModalHeading from "../styled-components/ModalHeading";

const Input = styled(StyledInput)`
    @media (min-width: 768px) {
        margin-top: 1vh;
        margin-bottom: 3vh;
        padding: 0.25vw;
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
        font-size: 1.5vw;
        margin-top: 1vh;
        margin-bottom: 2vh;
        padding: 0.5vw;
    }
`

export function CreateEventsModal({ setEventsModalOpen }: {setEventsModalOpen: Dispatch<SetStateAction<boolean>>}) {
	const {user} = useContext(UserContext)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
    const [topic, setTopic] = useState("")
    const [location, setLocation] = useState("")
    const [date, setDate] = useState((new Date()).toISOString().slice(0, 16))
    const [isCreating, setIsCreating] = useState(false)
	
	async function createEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsCreating(true)

        try {
            if (user.id) {
                await postNewEvent({id: user.id, title, description, location, date, topic})
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
            <StyledModal>
                <form onSubmit={createEvent} onClick={e => e.stopPropagation()} style={{display: 'grid' }}>
                    <ModalHeading>
                        Create your event
                    </ModalHeading>

                    <BlockLabel htmlFor="title">
                        Title
                    </BlockLabel>
                    <Input id="title" name="title" value={title}  onChange={e => setTitle(e.target.value)} required/>

                    <BlockLabel htmlFor="description">
                        Description
                    </BlockLabel>
                    <Input id="description" name="description" value={description}
                        onChange={e => setDescription(e.target.value)} required/>

                    <BlockLabel htmlFor="topic">
                        Topic
                    </BlockLabel>
                    <StyledSelect id="topic" name="topic" value={topic} onChange={e => setTopic(e.target.value)}>
                        {Object.keys(topics).map(key => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </StyledSelect>

                    <BlockLabel htmlFor="location">
                        Location
                    </BlockLabel>
                    <Input id="location" name="location" value={location} onChange={e => setLocation(e.target.value)}required />

                    <BlockLabel htmlFor="date">
                        Date
                    </BlockLabel>
                    <Input id="date" name="date" value={date} onChange={e => setDate(e.target.value)}
                        type="datetime-local" min={(new Date()).toISOString().slice(0, 16)} required/>

                    <BlockButton type="submit" disabled={isCreating}>
                        {isCreating ? 'Creating...' : 'Create'}
                    </BlockButton>
                </form>
            </StyledModal>
        </ModalBackground>
    )
}