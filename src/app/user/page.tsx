'use client'

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
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
            <PageWrapper>
                <StyledText>
                    Manage your Events
                </StyledText>
                <StyledText>
                    Manage your Account
                </StyledText>
            </PageWrapper>
      		<NavBar setIsModelOpen={null}/>
    	</>
  	)
}