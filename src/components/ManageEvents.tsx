'use client'

import { useContext, useState } from "react";
import styled from "styled-components";
import { EventList } from "./EventList";
import { CreateEventsModal } from "./CreateEventsModal";
import { Event } from "@/types/event";
import { UserContext } from "@/contexts/User";
import { FilterBar } from "./FilterBar";
import { StyledCard } from "./styled-components/StyledCard";

const CreateEvent = styled.button`
	font-size: 6.5vw;
    margin-top: 2vw;
    margin-bottom: 2vw;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

const StyledText = styled.p`
  	font-size: 6.5vw;
  	margin-top: 4vw;
  	margin-bottom: 2vw;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);
`

export default function ManageEvents() {
    const [eventsModalOpen, setEventsModalOpen] = useState(false)
    const [events, setEvents] = useState<Event[]>([])
    const {user} = useContext(UserContext)
    const [sortBy, setSortBy] = useState('date')
    const [order, setOrder] = useState<'DESC' | 'ASC'>('DESC')
    const [topic, setTopic] = useState('')

  	return (
    	<>
            <StyledCard>
                <CreateEvent onClick={() => setEventsModalOpen(true)}>
                    Create Event
                </CreateEvent>
            </StyledCard>

            <StyledText>
                Your Events
            </StyledText>
            <FilterBar topic={topic} setTopic={setTopic} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
            {user.id !== null && <EventList events={events} setEvents={setEvents} userId={user.id} sortBy={sortBy} order={order} topic={topic}/>}
            
            {eventsModalOpen && <CreateEventsModal setEventsModalOpen={setEventsModalOpen} setEvents={setEvents}/>}
    	</>
  	)
}