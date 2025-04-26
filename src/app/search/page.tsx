'use client';

import { EventList } from "@/components/EventList";
import { FilterBar } from "@/components/FilterBar";
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
    margin-bottom: 3vw;
`

export default function Search() {
	const [isModelOpen, setIsModelOpen] = useState(false)
	const [events, setEvents] = useState<Event[]>([])
    const [sortBy, setSortBy] = useState('date')
    const [order, setOrder] = useState<'DESC' | 'ASC'>('DESC')
    const [topic, setTopic] = useState('')

  	return (
    	<>
      		<Header/>
            <PageWrapper>
                <StyledHeading>
                    Search Events
                </StyledHeading>
                <FilterBar topic={topic} setTopic={setTopic} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
                <EventList events={events} setEvents={setEvents} sortBy={sortBy} order={order} topic={topic}/>
			    {isModelOpen && <UserModal setIsModelOpen={setIsModelOpen}/>}
            </PageWrapper>
      		<NavBar setIsModelOpen={setIsModelOpen}/>
    	</>
  	)
}