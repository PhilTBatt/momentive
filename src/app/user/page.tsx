'use client'

import ManageAccount from "@/components/ManageAccount";
import ManageEvents from "@/components/ManageEvents";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { StyledHeading } from "@/components/styled-components/StyledHeading";
import styled from "styled-components";

const Grid = styled.section`
    display: block;
    justify-items: center;

    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8vw;
        font-size: 2vw;
        margin-top: 0vh;
    }
`

const Heading1 = styled(StyledHeading)`
    font-size: 10vw;
    margin-bottom: 1.5vh;

    @media (min-width: 768px) {
        font-size: 3vw;
        margin-top: 1vh;
    }
`

const Heading2 = styled(StyledHeading)`
    font-size: 10.5vw;
    margin-bottom: 1.5vh;
    margin-top: 2.5vh;

    @media (min-width: 768px) {
        font-size: 3vw;
        margin-top: 1vh;
    }
`

export default function Home() {
    
  	return (
    	<>
            <PageWrapper>
                <Grid>
                    <div style={{'justifyItems': 'center'}}>
                        <Heading1>
                            Manage Account
                        </Heading1>
                        <ManageAccount />
                    </div>

                    <div style={{'justifyItems': 'center'}}>
                        <Heading2>
                            Manage Events
                        </Heading2>
                        <ManageEvents />
                    </div>
                </Grid>
            </PageWrapper>
    	</>
  	)
}