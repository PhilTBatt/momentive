'use client';

import { EventList } from "@/components/EventList";
import { FilterBar } from "@/components/FilterBar";
import PageWrapper from "@/components/PageWrapper";
import { UserModal } from "@/components/modals/UserModal";
import { useState } from "react";
import styled from "styled-components";

const StyledHeading = styled.h2`
    font-size: 12vw;
    margin-top: 3.5vh;
    margin-bottom: 4vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

export default function Search() {
	const [isModalOpen, setIsModalOpen] = useState(false)
    const [sortBy, setSortBy] = useState('attendees')
    const [order, setOrder] = useState<'DESC' | 'ASC'>('DESC')
    const [topic, setTopic] = useState('')

  	return (
    	<>
            <PageWrapper>
                <StyledHeading>
                    Search Events
                </StyledHeading>
                <FilterBar topic={topic} setTopic={setTopic} sortBy={sortBy} setSortBy={setSortBy} order={order} setOrder={setOrder}/>
                <EventList sortBy={sortBy} order={order} topic={topic}/>
			    {isModalOpen && <UserModal setIsModalOpen={setIsModalOpen}/>}
            </PageWrapper>
    	</>
  	)
}