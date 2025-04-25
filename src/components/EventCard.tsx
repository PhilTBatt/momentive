'use client'

import styled from "styled-components";
import type { Event } from "@/types/event";

const StyledCard = styled.li`
    border: 2px solid ${props => props.theme.colours.background};
    margin: 0 2vw;
`

const CardInformation = styled.div`
    margin-bottom: 2vw;
`

const StyledHeading = styled.h3`
    margin-top: 1vw;
    margin-bottom: 2vw;
    font-size: 5vw;
`

export function EventCard({event}: {event: Event}) {
    return (
        <StyledCard>
            <StyledHeading>
                {event.title}
            </StyledHeading>
			
            <CardInformation>
                Description: {event.description}
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