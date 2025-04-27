'use client'

import { UserContext } from "@/contexts/User";
import { useContext, useState } from "react";
import styled from "styled-components";
import { EditNameModal } from "./EditName";
import { EditEmailModal } from "./EditEmail";
import { StyledCard } from "./styled-components/StyledCard";

const StyledText = styled.p`
  	font-size: 5.5vw;
  	margin-top: 3vw;
  	margin-bottom: 3vw;
`

const Button = styled.button`
    padding-top: 0.5vw;
	font-size: 4.5vw;
    margin-left: 2vw;
    position: relative;
    top: -0.3vw;
    border: 2px solid black;
    border-radius: 4px;
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