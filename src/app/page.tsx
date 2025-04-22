'use client'

import { EventList } from "@/components/EventList";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { UserModal } from "@/components/UserModel";
import { useState } from "react";
import styled from "styled-components";

const StyledText = styled.h2`
  text-align: center;
  font-size: 10vw;
  margin: 3vh auto;
`

export default function Home() {
	const [isModelOpen, setIsModelOpen] = useState(false)

  	return (
    	<>
      		<Header/>
        	<StyledText>
          		Welcome!
        	</StyledText>
			{isModelOpen && <UserModal setIsModelOpen={setIsModelOpen}/>}
        	<EventList/>
      		<NavBar setIsModelOpen={setIsModelOpen}/>
    	</>
  	)
}