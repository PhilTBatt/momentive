'use client'

import { UserContext } from "@/contexts/User";
import { useContext, useState } from "react";
import styled from "styled-components";
import { EditNameModal } from "./modals/EditName";
import { EditEmailModal } from "./modals/EditEmail";
import { StyledCard } from "./styled-components/StyledCard";
import { BlockButton } from "./styled-components/BlockButton";

const StyledText = styled.p`
  	font-size: 8vw;
  	margin-top: 2vw;
  	margin-bottom: 0vw;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
`

export default function ManageAccount() {
    const {user} = useContext(UserContext)
    const [profileModal, setProfileModal] = useState<null | string>(null)
    
  	return (
    	<>
            <StyledCard>
                <StyledText>
                    {user.name}
                </StyledText>
                <BlockButton onClick={() => setProfileModal("name")} style={{fontSize: '6vw'}}>
                    Edit Name
                </BlockButton>
                
                <StyledText style={{fontSize: '7vw'}}>
                    {user.email}
                    <br/>
                </StyledText>
                <BlockButton onClick={() => setProfileModal("email")} style={{fontSize: '6vw'}}>
                    Edit Email
                </BlockButton>
                    
                {profileModal === "name" && <EditNameModal setProfileModal={setProfileModal}/>}
                {profileModal === "email" && <EditEmailModal setProfileModal={setProfileModal}/>}
            </StyledCard>
    	</>
  	)
}