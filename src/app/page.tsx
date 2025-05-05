'use client'

import { EventList } from "@/components/EventList";
import PageWrapper from "@/components/PageWrapper";
import styled from "styled-components";

const StyledHeading = styled.h2`
    font-size: 12vw;
    margin-top: 3.5vh;
    margin-bottom: 0vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

const StyledSubText = styled.p`
    font-size: 6vw;
    margin-top: 0;
    margin-bottom: 2vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`

const StyledText = styled.h3`
    font-size: 8vw;
    margin-top: 0;
    margin-bottom: 5vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
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
                <StyledSubText style={{marginBottom: '2vh'}}>
                    You can even add them to your calender
                </StyledSubText>

                <StyledText>
                    Upcoming events
                </StyledText>
				<EventList sortBy='date' order='DESC'/>
			</PageWrapper>
    	</>
  	)
}