'use client'

import { UserContext } from "@/contexts/User";
import { useContext, useState } from "react";
import styled from "styled-components";
import { EditNameModal } from "./modals/EditName";
import { EditEmailModal } from "./modals/EditEmail";
import { StyledCard } from "./styled-components/StyledCard";
import { BlockButton } from "./styled-components/BlockButton";
import { useRouter } from 'next/navigation';

const DesktopGrid = styled.span`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        place-items: center;
        padding-right: 4vw;
    }
`

const Card = styled(StyledCard)`
    @media (min-width: 768px) {
        margin-top: 4vh;
        margin-bottom: 2vh;
        padding-bottom: 2vh;
    }
`

const StyledText = styled.p`
  	font-size: 9vw;
  	margin: 0.75vh 0 0 0vw;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);

    @media (min-width: 768px) {
        font-size: 3vw;
        margin: 2vh 0 0 1vw;
    }
`

const StyledEmail = styled(StyledText)`
    font-size: 7.5vw;

    @media (min-width: 768px) {
        font-size: 2.75vw;
    }
`

const EditButton = styled(BlockButton)`
    @media (min-width: 768px) {
        font-size: 2.25vw;
        margin-top: 2.25vh;
        padding: 0.5vh 1vw 0.5vh 1vw;
    }
`

const SignOutCard = styled(StyledCard)`
    margin-top: 2vh;

    @media (min-width: 768px) {
        width: 20vw;
    }
`

const SignOutButton = styled(BlockButton)`
    font-size: 7.5vw;
  	margin-top: 1.5vh;
  	margin-bottom: 1.75vh;

    @media (min-width: 768px) {
        font-size: 2vw;
    }
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
            <Card>
                <DesktopGrid>
                    <StyledText>
                        {user.name}
                    </StyledText>
                    <EditButton onClick={() => setProfileModal("name")}>
                        Edit Name
                    </EditButton>
                    
                    <StyledEmail>
                        {user.email}
                        <br/>
                    </StyledEmail>
                    <EditButton onClick={() => setProfileModal("email")}>
                        Edit Email
                    </EditButton>
                </DesktopGrid>
            </Card>
            <SignOutCard>
                <SignOutButton onClick={handleSignOut}>
                    Sign Out
                </SignOutButton>
                    
                {profileModal === "name" && <EditNameModal setProfileModal={setProfileModal}/>}
                {profileModal === "email" && <EditEmailModal setProfileModal={setProfileModal}/>}
            </SignOutCard>
    	</>
  	)
}