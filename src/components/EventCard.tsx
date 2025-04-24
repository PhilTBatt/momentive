'use client'

import Image from "next/image";
import styled from "styled-components";

const StyledCard = styled.li`
`

const CardInformation = styled.div`
`
type Event = {
    title: string
    event_img_url: string
    author: string
    topic: string
    date: string
}

export function EventCard({event}: {event: Event}) {
    return (
        <StyledCard>
            <h3>
                {event.title}
            </h3>
			
            <CardInformation>
                <Image src={event.event_img_url} alt='Image of event topic'/>
                Author: {event.author}
                <br/>
                Topic: {event.topic.charAt(0).toUpperCase() + event.topic.slice(1)}
                <br/>
                Posted: {event.date}
            </CardInformation>
        </StyledCard>
    )
}