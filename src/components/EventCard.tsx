'use client'

import styled from "styled-components";
import type { Event } from "@/types/event";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/api/users";
import { topics } from "@/lib/topics";

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
    height: 10vh;
    object-fit: cover;
    filter: brightness(80%);
    border-radius: 10px;
    border: 2px solid ${props => props.theme.colours.background};
    box-sizing: border-box;
`

const StyledHeading = styled.h3`
    font-size: 7vw;
    margin: 0vw 0;
    color: ${props => props.theme.colours.primary};
`

const CardInformation = styled.div`
    padding: 0vw 2vw;
    font-size: 4vw;
    margin: 0;
    p {
        margin: 1vw 0;
    }
`

const CardFooter = styled.div`
    background-color: ${props => props.theme.colours.primary};
    padding: 2vw 2vw;
    font-size: 3.25vw;
    border: 1px solid ${props => props.theme.colours.background};
    border-radius: 12px;
    padding: 0.5vw 0;
    filter: brightness(115%);
    p {
        margin: 0 0;
    }
`


export function EventCard({event}: {event: Event}) {
    const [eventHost, setEventHost] = useState('')
    
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