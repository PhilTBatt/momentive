'use client'

import { useContext, useState } from "react";
import styled from "styled-components";
import { CreateEventsModal } from "./modals/CreateEvent";
import { UserContext } from "@/contexts/User";
import { FilterBar } from "./FilterBar";
import { StyledCard } from "./styled-components/StyledCard";
import { BlockButton } from "./styled-components/BlockButton";
import { EventsList } from "./EventsList";

const Card = styled(StyledCard)`
    @media (min-width: 768px) {
        width: 18vw;
        margin-top: 4vh;
        padding: 0;
    }
`

const CreateButton = styled(BlockButton)`
    width: 55vw;
    font-size: 7vw;

    @media (min-width: 768px) {
        font-size: 1.5vw;
        width: 14vw;
        margin: 1.5vh 0 1.5vh 0;
    }
`

const StyledText = styled.p`
  	font-size: 7.5vw;
  	margin-top: 3vh;
  	margin-bottom: 2vw;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);

    @media (min-width: 768px) {
        font-size: 2vw;
        margin: 3vh 0 1vh 0;
    }
`

const FilterBarWrapper = styled.div`
    && > * {
    @media (min-width: 768px) {
        width: 29vw;
        line-height: 0.8;
        
        select {
            width: 5vw;
            margin-right: 1vw;
        }
        select:nth-of-type(3) {
            width: 3vw;
            margin-right: 0;
        }
    }
  }
`;

export default function ManageEvents() {
    const [eventsModalOpen, setEventsModalOpen] = useState(false)
    const {user} = useContext(UserContext)
    const [sortBy, setSortBy] = useState('date')
    const [order, setOrder] = useState<'DESC' | 'ASC'>('ASC')
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
            <FilterBarWrapper>
                <FilterBar topic={topic} setTopic={setTopic} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
            </FilterBarWrapper>

            {user.id !== null && <EventsList userId={user.id} sortBy={sortBy} order={order} topic={topic}/>}
            
            {eventsModalOpen && <CreateEventsModal setEventsModalOpen={setEventsModalOpen}/>}
    	</>
  	)
}