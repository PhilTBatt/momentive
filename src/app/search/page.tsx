'use client';

import { EventList } from "@/components/EventList";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import { UserModal } from "@/components/UserModel";
import { Event } from "@/types/event";
import { useState } from "react";
import styled from "styled-components";

const StyledHeading = styled.h2`
    font-size: 10vw;
    margin-top: 3vh;
    margin-bottom: 5vw;
`

export default function Search() {
	const [isModelOpen, setIsModelOpen] = useState(false)
	const [events, setEvents] = useState<Event[]>([])
    

  	return (
    	<>
      		<Header/>
            <PageWrapper>
                <StyledHeading>
                    Search Events
                </StyledHeading>
                <EventList events={events} setEvents={setEvents} />
			    {isModelOpen && <UserModal setIsModelOpen={setIsModelOpen}/>}
            </PageWrapper>
      		<NavBar setIsModelOpen={setIsModelOpen}/>
    	</>
  	)
}