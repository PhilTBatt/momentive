'use client'

import { useState } from "react";
import styled from "styled-components";
import { EventList } from "./EventList";
import { CreateEventsModal } from "./CreateEventsModal";
import { Event } from "@/types/event";

const ButtonCard = styled.div`
	background: ${props => props.theme.colours.primary};
	padding: 1vh 1vw;
	border-radius: 12px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	width: 92vw;
    margin-bottom: 3vw;
`

const CreateEvent = styled.button`
	font-size: 4.5vw;
    margin-top: 2vw;
    margin-bottom: 2vw;
`

const StyledText = styled.p`
  	font-size: 5.5vw;
  	margin-top: 2vw;
  	margin-bottom: 2vw;
`

export default function ManageEvents() {
    const [eventsModalOpen, setEventsModalOpen] = useState(false)
    const [events, setEvents] = useState<Event[]>([])
    
  	return (
    	<>
            <ButtonCard>
                <CreateEvent onClick={() => setEventsModalOpen(true)}>
                    Create Event
                </CreateEvent>
            </ButtonCard>

            <StyledText>
                Your Events
            </StyledText>
            <EventList events={events} setEvents={setEvents} />
            {eventsModalOpen && <CreateEventsModal setEventsModalOpen={setEventsModalOpen} setEvents={setEvents}/>}
    	</>
  	)
}