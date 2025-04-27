'use client'

import Header from "@/components/Header";
import ManageAccount from "@/components/ManageAccount";
import ManageEvents from "@/components/ManageEvents";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import styled from "styled-components";

const StyledHeading = styled.h2`
    font-size: 10vw;
    margin-top: 3vh;
    margin-bottom: 3vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

export default function Home() {
    
  	return (
    	<>
      	    <Header/>
            <PageWrapper>
                <StyledHeading>
                    Manage Account
                </StyledHeading>
                <ManageAccount/>
                <StyledHeading>
                    Manage Events
                </StyledHeading>
                <ManageEvents/>
            </PageWrapper>
      		<NavBar setIsModelOpen={null}/>
    	</>
  	)
}