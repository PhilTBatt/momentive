'use client'

import { EventList } from "@/components/EventList";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import { UserModal } from "@/components/UserModel";
import { useState } from "react";
import styled from "styled-components";

const StyledText = styled.h2`
    font-size: 10vw;
    margin-top: 3vh;
`

export default function Home() {
	const [isModelOpen, setIsModelOpen] = useState(false)

  	return (
    	<>
      		<Header/>
            <PageWrapper>
				<StyledText>Welcome!</StyledText>
				{isModelOpen && <UserModal setIsModelOpen={setIsModelOpen}/>}
				<EventList/>
			</PageWrapper>
      		<NavBar setIsModelOpen={setIsModelOpen}/>
    	</>
  	)
}