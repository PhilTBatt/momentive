'use client'

import { useContext, useState } from "react";
import styled from "styled-components";
import { WideEventsList } from "./WideEventsList";
import { CreateEventsModal } from "./modals/CreateEventsModal";
import { UserContext } from "@/contexts/User";
import { FilterBar } from "./FilterBar";
import { StyledCard } from "./styled-components/StyledCard";
import { BlockButton } from "./styled-components/BlockButton";

const Card = styled(StyledCard)`
    @media (min-width: 768px) {
        width: 26vw;
        margin-top: 4vh;
        padding: 0;
    }
`

const CreateButton = styled(BlockButton)`
    width: 55vw;
    font-size: 8vw;

    @media (min-width: 768px) {
        font-size: 2.5vw;
        width: 20vw;
        margin: 2.5vh 0 2.5vh 0;
    }
`

const StyledText = styled.p`
  	font-size: 6.5vw;
  	margin-top: 4vw;
  	margin-bottom: 2vw;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.25);

    @media (min-width: 768px) {
        font-size: 3.25vw;
        margin: 6vh 0 1vh 0;
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
            {user.id !== null && <WideEventsList userId={user.id} sortBy={sortBy} order={order} topic={topic}/>}
            
            {eventsModalOpen && <CreateEventsModal setEventsModalOpen={setEventsModalOpen}/>}
    	</>
  	)
}