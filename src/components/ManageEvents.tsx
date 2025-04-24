'use client'

import { UserContext } from "@/contexts/User";
import { useContext, useState } from "react";
import styled from "styled-components";
import { EditNameModal } from "./EditName";
import { EditEmailModal } from "./EditEmail";
import { EventList } from "./EventList";

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
    const {user} = useContext(UserContext)
    const [profileModal, setProfileModal] = useState<null | string>(null)
    
  	return (
    	<>
            <ButtonCard>
                <CreateEvent onClick={() => setProfileModal("name")}>
                    Create Event
                </CreateEvent>
            </ButtonCard>
            <StyledCard>
                <StyledText>
                    Your Events
                </StyledText>
                <EventList/>
                {profileModal === "name" && <EditNameModal setProfileModal={setProfileModal}/>}
                {profileModal === "email" && <EditEmailModal setProfileModal={setProfileModal}/>}
            </StyledCard>
    	</>
  	)
}