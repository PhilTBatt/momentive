'use client'

import styled from 'styled-components'
import type { Event } from "@/types/event"
import { StyledCard } from '../styled-components/StyledCard'
import { UserCard } from '../UserCard'
import ModalBackground from '../styled-components/ModalBackground'
import { Dispatch, SetStateAction } from 'react'
import ModalHeading from '../styled-components/ModalHeading'

const StyledCardContainer = styled(StyledCard)`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    @media (min-width: 768px) {
        width: 34vw;
    }
`;

const StyledList = styled.ul`
    list-style: none;
    padding: 2vw 1vw;
    margin: 1vw;
    overflow-y: auto;
    flex: 1;
    max-height: 40vh;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        margin: 0vh 1vw 1vh 1vw;
        padding: 1vh 0vw;
    }
`

export function AttendingList({ event, setIsModalOpen }: { event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>> }) {
    const users = Object.values(event.attendees)

    return (
        <ModalBackground onClick={() => setIsModalOpen(false)}>
            <StyledCardContainer>
                <ModalHeading>
                    People Attending
                </ModalHeading>
                <StyledList>
                        {users.map( user =>  <UserCard user={user} key={user.email}/> )}
                </StyledList>
            </StyledCardContainer>
        </ModalBackground>
    )
}