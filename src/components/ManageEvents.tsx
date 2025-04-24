'use client'

import { useState } from "react";
import styled from "styled-components";
import { EditNameModal } from "./EditName";
import { EditEmailModal } from "./EditEmail";
import { EventList } from "./EventList";
import { CreateEventsModal } from "./CreateEventsModal";

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

const StyledCard = styled.div`
	background: ${props => props.theme.colours.primary};
	padding: 1vh 1vw;
	border-radius: 12px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	width: 92vw;
`

const StyledText = styled.p`
  	font-size: 5.5vw;
  	margin-top: 2vw;
  	margin-bottom: 2vw;
`

export default function ManageEvents() {
    const [eventsModalOpen, setEventsModalOpen] = useState(false)
    
  	return (
    	<>
            <ButtonCard>
                <CreateEvent onClick={() => setEventsModalOpen(true)}>
                    Create Event
                </CreateEvent>
            </ButtonCard>
            
            <StyledCard>
                <StyledText>
                    Your Events
                </StyledText>
                <EventList/>
                {eventsModalOpen && <CreateEventsModal setEventsModalOpen={setEventsModalOpen}/>}
            </StyledCard>
    	</>
  	)
}