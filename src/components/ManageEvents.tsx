'use client'

import { useContext, useState } from "react";
import styled from "styled-components";
import { EventsList } from "./EventsList";
import { CreateEventsModal } from "./modals/CreateEventsModal";
import { UserContext } from "@/contexts/User";
import { FilterBar } from "./FilterBar";
import { StyledCard } from "./styled-components/StyledCard";
import { BlockButton } from "./styled-components/BlockButton";

const Card = styled(StyledCard)`
    @media (min-width: 768px) {
        width: 40vw
    }
`

const StyledText = styled.p`
  	font-size: 6.5vw;
  	margin-top: 4vw;
  	margin-bottom: 2vw;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);

    @media (min-width: 768px) {
        font-size: 3vw;
        margin: 3vh 0 3vh 0;
    }
`

const CreateButton = styled(BlockButton)`
    width: 55vw;
    font-size: 8vw;

    @media (min-width: 768px) {
        font-size: 3vw;
        width: 30vw;
        margin: 3vh 0 3vh 0;
    }
`

export default function ManageEvents() {
    const [eventsModalOpen, setEventsModalOpen] = useState(false)
    const {user} = useContext(UserContext)
    const [sortBy, setSortBy] = useState('date')
    const [order, setOrder] = useState<'DESC' | 'ASC'>('DESC')
    const [topic, setTopic] = useState('')

  	return (
    	<>
            <Card>
                <CreateButton onClick={() => setEventsModalOpen(true)}>
                    Create Event
                </CreateButton>
            </Card>

            <StyledText>
                Your Events
            </StyledText>
            <FilterBar topic={topic} setTopic={setTopic} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
            {user.id !== null && <EventsList userId={user.id} sortBy={sortBy} order={order} topic={topic}/>}
            
            {eventsModalOpen && <CreateEventsModal setEventsModalOpen={setEventsModalOpen}/>}
    	</>
  	)
}