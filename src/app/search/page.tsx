'use client';

import { EventsList } from "@/components/EventsList";
import { FilterBar } from "@/components/FilterBar";
import PageWrapper from "@/components/PageWrapper";
import { UserModal } from "@/components/modals/UserModal";
import { StyledHeading } from "@/components/styled-components/StyledHeading";
import { useState } from "react";

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
                <EventsList sortBy={sortBy} order={order} topic={topic}/>
			    {isModalOpen && <UserModal setIsModalOpen={setIsModalOpen}/>}
            </PageWrapper>
    	</>
  	)
}