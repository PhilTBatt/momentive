'use client'

import styled from "styled-components";
import type { Event } from "@/types/event";
import { useContext, useEffect, useState } from "react";
import { getUserById } from "@/lib/api/users";
import { topics } from "@/lib/topics";
import { EditEvent } from "./modals/EditEvent";
import { faPenToSquare, faSquareCheck, faSquareMinus, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EventSignUp } from "./modals/EventSignUp";
import { UnattendEvent } from "./modals/UnattendEvent";
import { UserContext } from "@/contexts/User";
import { AttendingList } from "./modals/AttendingList";

const StyledCard = styled.li`
    border: 2px solid white;
    margin: 0 0 4vw 0;
    background-color: ${props => props.theme.colours.background};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    &:last-child {
        margin-bottom: 0;
    }

    @media (min-width: 768px) {
        width: 30vw;
        margin: 0 auto 4vh auto;
    }
`

const BannerImage = styled.img`
    width: 100%;
    height: 9vh;
    object-fit: cover;
    filter: brightness(80%);
    border-radius: 8px;
    border: 2px solid white;
    box-sizing: border-box;

    @media (min-width: 768px) {
        height: 12vh;
    }
`

const StyledHeading = styled.h3`
    font-size: 9vw;
    margin: 0vw 0 0vw 0;
    color: ${props => props.theme.colours.primary};
    line-height: 1;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    @media (min-width: 768px) {
        font-size: 2.5vw;
        margin: 1vh 0 0vw 0;
    }
`

const CardInformation = styled.div`
    padding: 0vw 2vw;
    font-size: 4.5vw;
    margin: 0;
    p {
        margin: 1vw 0 2vw 0;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    @media (min-width: 768px) {
        font-size: 1.25vw;
        p {
            margin: 1vh 0 1.5vh 0;
        }
    }
`

const CardFooter = styled.div`
    background-color: ${props => props.theme.colours.primary};
    padding: 2vw 2vw;
    font-size: 4vw;
    border: 1px solid ${props => props.theme.colours.background};
    border-radius: 8px;
    padding: 0.5vw 0;
    filter: brightness(125%);
    p {
        margin: 0 0;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    @media (min-width: 768px) {
        font-size: 1.1vw;
    }
`

type ExtraButtonProps = {
    $left?: string;
    $right?: string;
    $bottom?: string;
    $bg?: string;
}
  
const ExtraButton = styled.button<ExtraButtonProps>`
    font-size: 4.5vw;
    position: absolute;
    bottom: ${props => props.$bottom || '14vw'};
    left: ${props => props.$left || 'auto'};
    right: ${props => props.$right || 'auto'};
    border: none;
    border-radius: 40%;
    width: 6.5vw;
    height: 6.5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${props => props.$bg || 'gray'};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
  
    svg {
        color: white;
    }
  
    @media (min-width: 768px) {
        font-size: 1.4vw;
        width: 2vw;
        height: 2vw;
        bottom: ${props => props.$bottom || '4.5vw'};
        left: ${props => props.$left ? `${parseFloat(props.$left) / 3}vw` : 'auto'};
        right: ${props => props.$right ? `${parseFloat(props.$right) / 3}vw` : 'auto'};
    }
`;


export function EventCard({event, updateList}: {event: Event, updateList: () => void}) {
    const [eventHost, setEventHost] = useState('')
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
    const [isUnattendModalOpen, setIsUnattendModalOpen] = useState(false)
    const [isAttendingListOpen, setIsAttendingListOpen] = useState(false)
    const {user} = useContext(UserContext)
    
    async function getEventHost() {
        const user = await getUserById(event.createdBy)
        setEventHost(user?.name || 'Error getting host')
    }

    useEffect(() => {
        getEventHost()
    }, [])

    const bannerImage = topics[event.topic]

    return (
        <StyledCard>
            <BannerImage src={bannerImage} alt="Event Banner" />

            <ExtraButton onClick={() => setIsUnattendModalOpen(true)} $left="1.5vw" $bg="red">
                <FontAwesomeIcon icon={faSquareMinus} />
            </ExtraButton>
 
            <ExtraButton onClick={() => setIsSignUpModalOpen(true)} $right="1.5vw" $bg="green">
                <FontAwesomeIcon icon={faSquareCheck} />
            </ExtraButton>

            {user.role === 'admin' && 
                <>
                    <ExtraButton onClick={() => setIsEditModalOpen(true)} $left="1.5vw" $bottom="1vw" $bg="orange">
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </ExtraButton>

                    <ExtraButton onClick={() => setIsAttendingListOpen(true)} $right="1.5vw" $bottom="1vw" $bg="blue">
                        <FontAwesomeIcon icon={faUsers} />
                    </ExtraButton>
                </>
            }

            <CardInformation>
                <StyledHeading>{event.title}</StyledHeading>
                <p>{event.description}</p>
            </CardInformation>

            <CardFooter>
                <p>
                    <strong>
                        People Attending:
                    </strong> {event.attendees.length}
                    <br/>
                    <strong>
                        Date:
                    </strong> {(new Date(event.date)).toLocaleString(undefined, {dateStyle: 'medium', timeStyle: 'short'})}
                    <br/>
                    <strong>
                        Host:
                    </strong> {eventHost}
                    <br/>
                    <strong>Location:</strong> {event.location}
                </p>
            </CardFooter>

            {isSignUpModalOpen && <EventSignUp event={event} setIsModalOpen={setIsSignUpModalOpen} updateList={updateList}/>}
            {isUnattendModalOpen && <UnattendEvent event={event} setIsModalOpen={setIsUnattendModalOpen} updateList={updateList}/>}
            {isEditModalOpen && <EditEvent event={event} setIsModalOpen={setIsEditModalOpen} updateList={updateList}/>}
            {isAttendingListOpen && <AttendingList event={event} setIsModalOpen={setIsAttendingListOpen}/>}
        </StyledCard>

    )
}