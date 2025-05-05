'use client'

import { EventList } from "@/components/EventList";
import PageWrapper from "@/components/PageWrapper";
import { StyledHeading } from "@/components/styled-components/StyledHeading";
import styled from "styled-components";

const StyledSubText = styled.p`
        font-size: 6vw;
        margin-top: 0;
        margin-bottom: 2vw;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

    @media (min-width: 768px) {
        font-size: 3vw;
        margin-top: 1vh;
        margin-bottom: 0vw;
        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
`

const StyledText = styled.h3`
    font-size: 10vw;
    margin-top: 0;
    margin-bottom: 5vw;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);

    @media (min-width: 768px) {
        margin-top: 6vh;
        font-size: 4.5vw;
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

                <StyledText>
                    Upcoming events
                </StyledText>
				<EventList sortBy='date' order='DESC'/>
			</PageWrapper>
    	</>
  	)
}