'use client'

import { UserContext } from "@/contexts/User";
import { useContext, useState } from "react";
import styled from "styled-components";
import { EditNameModal } from "./modals/EditName";
import { EditEmailModal } from "./modals/EditEmail";
import { StyledCard } from "./styled-components/StyledCard";
import { BlockButton } from "./styled-components/BlockButton";
import { useRouter } from 'next/navigation';

const StyledText = styled.p`
  	font-size: 9vw;
  	margin-top: 2vw;
  	margin-bottom: 0vw;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
`

export default function ManageAccount() {
    const {user, setUser} = useContext(UserContext)
    const [profileModal, setProfileModal] = useState<null | string>(null)
    const router = useRouter()

    const handleSignOut = () => {
        setUser({ id: null, name: null, email: null, role: 'guest' })
        router.push('/')
    }
    
  	return (
    	<>
            <StyledCard>
                <StyledText>
                    {user.name}
                </StyledText>
                <BlockButton onClick={() => setProfileModal("name")} style={{fontSize: '6vw'}}>
                    Edit Name
                </BlockButton>
                
                <StyledText style={{fontSize: '7.5vw'}}>
                    {user.email}
                    <br/>
                </StyledText>
                <BlockButton onClick={() => setProfileModal("email")} style={{fontSize: '6vw'}}>
                    Edit Email
                </BlockButton>

                <br/>
                <BlockButton onClick={handleSignOut} style={{fontSize: '7.5vw'}}>
                    Sign Out
                </BlockButton>
                    
                {profileModal === "name" && <EditNameModal setProfileModal={setProfileModal}/>}
                {profileModal === "email" && <EditEmailModal setProfileModal={setProfileModal}/>}
            </StyledCard>
    	</>
  	)
}