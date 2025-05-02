'use client'

import styled from 'styled-components'
import type { Event } from "@/types/event"
import { StyledCard } from '../styled-components/StyledCard'
import { UserCard } from '../UserCard'
import ModalBackground from '../styled-components/ModalBackground'
import { Dispatch, SetStateAction } from 'react'

const StyledList = styled.ul`
    list-style: none;
    padding: 2vw 1vw;
    margin: 1vw;
`

const StyledHeading = styled.h3`
    font-size: 8vw;
    margin: 2vw 0.25vw 2vw 0.25vw;
`

export function AttendingList({ event, setIsModalOpen }: { event: Event, setIsModalOpen: Dispatch<SetStateAction<boolean>> }) {
    const users = Object.values(event.attendees)

    return (
        <ModalBackground onClick={() => setIsModalOpen(false)}>
            <StyledCard>
                <StyledHeading>
                    People Attending
                </StyledHeading>
                <StyledList>
                        {users.map( user =>  <UserCard user={user} key={user.email}/> )}
                </StyledList>
            </StyledCard>
        </ModalBackground>
    )
}