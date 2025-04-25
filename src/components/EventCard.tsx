'use client'

import styled from "styled-components";
import type { Event } from "@/types/event";
import { useEffect, useState } from "react";
import { getUserById } from "@/lib/api/users";

const StyledCard = styled.li`
    border: 2px solid ${props => props.theme.colours.background};
    margin: 0 2vw 3vw 2vw;
`

const CardInformation = styled.div`
    margin-bottom: 2vw;
`

const StyledHeading = styled.h3`
    margin-top: 1vw;
    margin-bottom: 1vw;
    font-size: 5vw;
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

    return (
        <StyledCard>
            <StyledHeading>
                {event.title}
            </StyledHeading>
			
            <CardInformation>
                Description: {event.description}
                <br/>
                Host: {eventHost}
                <br/>
                Topic: {event.topic.charAt(0).toUpperCase() + event.topic.slice(1)}
                <br/>
                Location: {event.location}
                <br/>
                Date: {(new Date(event.date)).toLocaleDateString()}
            </CardInformation>
        </StyledCard>
    )
}