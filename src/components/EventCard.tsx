'use client'

import styled from "styled-components";
import type { Event } from "@/types/event";
import { useContext, useEffect, useState } from "react";
import { getUserById } from "@/lib/api/users";
import { topics } from "@/lib/topics";
import { UserContext } from "@/contexts/User";

const StyledCard = styled.li`
    border: 2px solid black;
    margin: 0 0 3vw 0;
    background-color: ${props => props.theme.colours.background};
    border-radius: 12px;
    overflow: hidden;
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
    font-size: 7.5vw;
    margin: 0vw 0 0vw 0;
    color: ${props => props.theme.colours.primary};
    line-height: 1;
`

const CardInformation = styled.div`
    padding: 0vw 2vw;
    font-size: 4.25vw;
    margin: 0;
    p {
        margin: 1vw 0 2vw 0;
    }
`

const CardFooter = styled.div`
    background-color: ${props => props.theme.colours.primary};
    padding: 2vw 2vw;
    font-size: 3.75vw;
    border: 1px solid ${props => props.theme.colours.background};
    border-radius: 12px;
    padding: 0.5vw 0;
    filter: brightness(115%);
    p {
        margin: 0 0;
    }
`

const EditButton = styled.button`
    position: absolute;
    top: 1vw;
    left: 1vw;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50%;
    width: 6vw;
    height: 6vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3vw;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 10;
    
    &:hover {
        background-color: rgba(255, 255, 255, 1);
    }
`


export function EventCard({event}: {event: Event}) {
    const [eventHost, setEventHost] = useState('')
    const { user } = useContext(UserContext)
    
    async function getEventHost() {
        const user = await getUserById(event.createdBy)
        if (user.name)
            setEventHost(user.name)
        else
            setEventHost('Error getting host')
    }

    useEffect(() => {
        getEventHost()
    }, [])

    const bannerImage = topics[event.topic]
    console.log(bannerImage)

    return (
        <StyledCard>
            <BannerImage src={bannerImage} alt="Event Banner" />

            {user.role === 'admin' && (
                <EditButton onClick={() => {}} aria-label="Edit event">
                    ✏️
                </EditButton>
            )}

            <CardInformation>
                <StyledHeading>{event.title}</StyledHeading>
                <p>{event.description}</p>
            </CardInformation>

            <CardFooter>
                <p><strong>Date:</strong> {(new Date(event.date)).toLocaleDateString()}</p>
                <p><strong>Host:</strong> {eventHost}</p>
                <p><strong>Location:</strong> {event.location}</p>
            </CardFooter>
        </StyledCard>

    )
}