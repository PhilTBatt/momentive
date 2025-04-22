'use client'

import Image from "next/image";
import styled from "styled-components";

const StyledCard = styled.li`
`

const CardInformation = styled.div`
`

export function EventCard({event}: {event: any}) {
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