'use client'

import styled from "styled-components";
import type { Event } from "@/types/event";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/api/users";

const StyledCard = styled.li`
    border: 2px solid ${props => props.theme.colours.secondary};
    margin: 0 2vw 3vw 2vw;
    background-color: ${props => props.theme.colours.background};
    border-radius: 12px;
    overflow: hidden;
`;

const BannerImage = styled.img`
    width: 100%;
    height: 30vh;
    object-fit: cover;
    filter: brightness(70%);
`;

const StyledHeading = styled.h3`
    font-size: 7vw;
    margin: 0vw 0;
    color: ${props => props.theme.colours.primary};
`;

const CardInformation = styled.div`
    padding: 0vw 2vw;
    font-size: 4vw;
    margin: 1vw 0;

    p {
        margin: 1vw 0;
    }
`;

const CardFooter = styled.div`
    background-color: ${props => props.theme.colours.primary};
    padding: 2vw 2vw;
    font-size: 3.25vw;
    border-top: 1px solid ${props => props.theme.colours.primary};
    padding: 1vw 0;
    p {
        margin: 0 0;
    }
    filter: brightness(115%);
`;


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

    return (
        <StyledCard>
            <BannerImage src="event-banner.jpg" alt="Event Banner" />

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