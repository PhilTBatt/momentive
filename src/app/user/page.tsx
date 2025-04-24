'use client'

import Header from "@/components/Header";
import ManageAccount from "@/components/ManageAccount";
import ManageEvents from "@/components/ManageEvents";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import styled from "styled-components";

const StyledText = styled.h2`
    font-size: 10vw;
    margin: 3vh auto;
`

export default function Home() {
    
  	return (
    	<>
      	    <Header/>
            <PageWrapper>
                <StyledText>
                    Manage Account
                </StyledText>
                <ManageAccount/>
                <StyledText>
                    Manage Events
                </StyledText>
                <ManageEvents/>
            </PageWrapper>
      		<NavBar setIsModelOpen={null}/>
    	</>
  	)
}