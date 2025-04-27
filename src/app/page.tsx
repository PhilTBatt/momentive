'use client'

import { EventList } from "@/components/EventList";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import { UserModal } from "@/components/UserModel";
import { Event } from "@/types/event";
import { useState } from "react";
import styled from "styled-components";

const StyledHeading = styled.h2`
    font-size: 12vw;
    margin-top: 3.5vh;
    margin-bottom: 0vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

const StyledSubText = styled.p`
    font-size: 6vw;
    margin-top: 0;
    margin-bottom: 5vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

const StyledText = styled.h3`
    font-size: 8vw;
    margin-top: 0;
    margin-bottom: 5vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

export default function Home() {
	const [isModelOpen, setIsModelOpen] = useState(false)
    const [events, setEvents] = useState<Event[]>([])

  	return (
    	<>
      		<Header/>

            <PageWrapper>
				<StyledHeading>
                    Welcome!
                </StyledHeading>
                <StyledSubText>
                    Browse our avaliable events and add them to your calender
                </StyledSubText>

                <StyledText>
                    Upcoming events
                </StyledText>
				<EventList events={events} setEvents={setEvents} sortBy='date' order='DESC'/>
				{isModelOpen && <UserModal setIsModelOpen={setIsModelOpen}/>}
			</PageWrapper>

      		<NavBar setIsModelOpen={setIsModelOpen}/>
    	</>
  	)
}