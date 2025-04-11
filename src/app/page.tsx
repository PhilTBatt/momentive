'use client'

import { EventList } from "@/components/EventList";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import styled from "styled-components";

const StyledText = styled.h2`
  text-align: center;
  font-size: 10vw;
  margin: 3vh auto;
`

export default function Home() {
  return (
    <>
      <Header/>
        <StyledText>
          Welcome!
        </StyledText>
        <EventList/>
      <NavBar/>
    </>
  )
}