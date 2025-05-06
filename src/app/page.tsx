'use client'

import { EventsList } from "@/components/EventsList";
import PageWrapper from "@/components/PageWrapper";
import { StyledHeading } from "@/components/styled-components/StyledHeading";
import styled from "styled-components";

const StyledSubText = styled.p`
    font-size: 6vw;
    margin-top: 0;
    margin-bottom: 2vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        
    @media (min-width: 768px) {
        font-size: 2.5vw;
        margin: 2vh 1vw 0 1vw;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
`
const StyledSection = styled.section`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0 5vw;
    }
`
            
const StyledSubheading = styled.h3`
    font-size: 10vw;
    margin-top: 0;
    margin-bottom: 5vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                
    @media (min-width: 768px) {
        font-size: 4vw;
        margin-top: 10vh;
        margin-bottom: 4vh;
    }
`

const DesktopStyledSubheading = styled(StyledSubheading)`
    @media (max-width: 768px) {
        display: none
    }
`

const DesktopOnlyWrapper = styled.span`
    @media (max-width: 768px) {
        display: none;
    }
`

export default function Home() {

  	return (
    	<>
            <PageWrapper>
				<StyledHeading>
                    Welcome!
                </StyledHeading>
                <StyledSubText>
                    Browse our avaliable events and sign up to them
                </StyledSubText>
                <StyledSubText>
                    You can add them to your calender or even download our mobile app
                </StyledSubText>

                <StyledSection>
                    <StyledSubheading>
                        Upcoming events
                    </StyledSubheading>
                    <DesktopStyledSubheading>
                        Popular events
                    </DesktopStyledSubheading>
                    
                    <EventsList sortBy='date' order='DESC'/>
                    <DesktopOnlyWrapper>
                        <EventsList sortBy='attendees' order='DESC'/>
                    </DesktopOnlyWrapper>
                </StyledSection>
			</PageWrapper>
    	</>
  	)
}