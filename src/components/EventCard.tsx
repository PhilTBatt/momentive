'use client'

import styled from "styled-components";
import type { Event } from "@/types/event";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/api/users";
import { topics } from "@/lib/topics";
import { EditEvent } from "./modals/EditEvent";
import { faSquareCheck, faSquareMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventSignUp } from "./modals/EventSignUp";
import { UnattendEvent } from "./modals/UnattendEvent";

const StyledCard = styled.li`
    border: 2px solid white;
    margin: 0 0 4vw 0;
    background-color: ${props => props.theme.colours.background};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    &:last-child {
        margin-bottom: 0;
    }
`

const BannerImage = styled.img`
    width: 100%;
    height: 9vh;
    object-fit: cover;
    filter: brightness(80%);
    border-radius: 10px;
    border: 2px solid white;
    box-sizing: border-box;
`

const StyledHeading = styled.h3`
    font-size: 9vw;
    margin: 0vw 0 0vw 0;
    color: ${props => props.theme.colours.primary};
    line-height: 1;
`

const CardInformation = styled.div`
    padding: 0vw 2vw;
    font-size: 4.5vw;
    margin: 0;
    p {
        margin: 1vw 0 2vw 0;
    }
`

const CardFooter = styled.div`
    background-color: ${props => props.theme.colours.primary};
    padding: 2vw 2vw;
    font-size: 4vw;
    border: 1px solid ${props => props.theme.colours.background};
    border-radius: 12px;
    padding: 0.5vw 0;
    filter: brightness(125%);
    p {
        margin: 0 0;
    }
`

const ExtraButton = styled.button`
    position: absolute;
    top: 19vw;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 40%;
    width: 6.5vw;
    height: 6.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4.5vw;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
        background-color: rgba(255, 255, 255, 1);
    }
`


export function EventCard({event}: {event: Event}) {
    const [eventHost, setEventHost] = useState('')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
    const [isUnattendModalOpen, setIsUnattendModalOpen] = useState(false)
    
    async function getEventHost() {
        const user = await getUserById(event.createdBy)
        setEventHost(user?.name || 'Error getting host')
    }

    useEffect(() => {
        getEventHost()
    }, [event.createdBy])

    const bannerImage = topics[event.topic]

    return (
        <StyledCard>
            <BannerImage src={bannerImage} alt="Event Banner" />

            <ExtraButton onClick={() => setIsUnattendModalOpen(true)} style={{left: '1.25vw', backgroundColor: 'red', color: 'white'}}>
                    <FontAwesomeIcon icon={faSquareMinus} />
            </ExtraButton>

            <ExtraButton onClick={() => setIsSignUpModalOpen(true)} style={{right: '1.25vw', backgroundColor: 'green', color: 'white'}}>
                <FontAwesomeIcon icon={faSquareCheck} />
            </ExtraButton>

            <CardInformation>
                <StyledHeading>{event.title}</StyledHeading>
                <p>{event.description}</p>
            </CardInformation>

            <CardFooter>
                <p>
                    <strong>Date:</strong> {(new Date(event.date)).toLocaleDateString()}
                    <br/>
                    <strong>Host:</strong> {eventHost}
                    <br/>
                    <strong>Location:</strong> {event.location}
                </p>
            </CardFooter>

            {isSignUpModalOpen && <EventSignUp event={event} setIsModalOpen={setIsSignUpModalOpen}/>}
            {isUnattendModalOpen && <UnattendEvent event={event} setIsModalOpen={setIsUnattendModalOpen} setIsEditModalOpen={setIsEditModalOpen}/>}
            {isEditModalOpen && <EditEvent event={event} setIsModalOpen={setIsEditModalOpen}/>}
        </StyledCard>

    )
}