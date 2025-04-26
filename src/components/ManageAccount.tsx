'use client'

import { UserContext } from "@/contexts/User";
import { useContext, useState } from "react";
import styled from "styled-components";
import { EditNameModal } from "./EditName";
import { EditEmailModal } from "./EditEmail";

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

const Button = styled.button`
	font-size: 4.5vw;
    margin-left: 2vw;
    position: relative;
    top: -0.3vw;
`

export default function ManageAccount() {
    const {user} = useContext(UserContext)
    const [profileModal, setProfileModal] = useState<null | string>(null)
    
  	return (
    	<>
            <StyledCard>
                <StyledText>
                    {user.name}
                    <Button onClick={() => setProfileModal("name")}>
                        Edit Name
                    </Button>
                </StyledText>
                
                <StyledText>
                    {user.email}
                    <Button onClick={() => setProfileModal("email")}>
                        Edit Email
                    </Button>
                </StyledText>
                {profileModal === "name" && <EditNameModal setProfileModal={setProfileModal}/>}
                {profileModal === "email" && <EditEmailModal setProfileModal={setProfileModal}/>}
            </StyledCard>
    	</>
  	)
}